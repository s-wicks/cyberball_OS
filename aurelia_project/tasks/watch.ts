// watch.ts

import * as gulp from 'gulp';
import * as path from 'path';
import * as minimatch from 'minimatch';
import * as debounce from 'debounce';
import * as project from '../aurelia.json';

import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import processJson from './process-json';
import copyFiles from './copy-files';
import { build } from 'aurelia-cli';

const debounceWaitTime = 100;
let isBuilding = false;
let pendingRefreshPaths: string[] = [];
let watchCallback = () => {};

// 1) 定义需要监听的文件列表
let watches = [
  { name: 'transpile', callback: transpile, source: project.transpiler.source },
  { name: 'markup',    callback: processMarkup, source: project.markupProcessor.source },
  { name: 'CSS',       callback: processCSS,    source: project.cssProcessor.source },
  { name: 'JSON',      callback: processJson,   source: project.jsonProcessor.source }
];

// 如果有额外的 copyFiles 需求，把它也加进去
if (typeof project.build.copyFiles === 'object') {
  for (let src of Object.keys(project.build.copyFiles)) {
    watches.push({ name: 'file copy', callback: copyFiles, source: src });
  }
}

// 2) 主导出函数：创建 gulp.watch 监听器
let watch = (callback?: Function) => {
  watchCallback = callback || watchCallback;

  // 逐个监听
  for (let watcher of watches) {
    if (Array.isArray(watcher.source)) {
      for (let glob of watcher.source) {
        setupWatch(glob);
      }
    } else {
      setupWatch(watcher.source);
    }
  }
};

function setupWatch(globPattern: string) {
  // 使用 gulp.watch 代替 gulp-watch
  const watcher = gulp.watch(globPattern, { ignoreInitial: false });
  console.log(`Watcher: now watching ${globPattern}`);

  // 对不同事件都调用 processChange
  watcher.on('change',  filePath => handleFileEvent(filePath));
  watcher.on('add',     filePath => handleFileEvent(filePath));
  watcher.on('unlink',  filePath => handleFileEvent(filePath));
}

function handleFileEvent(filePath: string) {
  // 模拟原 gulp-watch 返回的 vinyl 对象
  const vinyl = {
    path: path.resolve(filePath), // 绝对路径
    cwd: process.cwd()            // 当前工作目录
  };
  processChange(vinyl);
}

// 3) processChange & refresh：原有逻辑保持不变
function processChange(vinyl: { path: string, cwd: string }) {
  if (vinyl.path && vinyl.cwd && vinyl.path.startsWith(vinyl.cwd)) {
    let pathToAdd = vinyl.path.slice(vinyl.cwd.length + 1);
    log(`Watcher: Adding path ${pathToAdd} to pending build changes...`);
    pendingRefreshPaths.push(pathToAdd);
    refresh();
  }
}

let refresh = debounce(() => {
  if (isBuilding) {
    log('Watcher: A build is already in progress, deferring change detection...');
    return;
  }

  isBuilding = true;
  let paths = pendingRefreshPaths.splice(0);
  let refreshTasks: any[] = [];

  // 根据变化的文件路径匹配哪些任务需要执行
  for (let watcher of watches) {
    if (Array.isArray(watcher.source)) {
      for (let source of watcher.source) {
        if (paths.find(path => minimatch(path, source))) {
          refreshTasks.push(watcher);
        }
      }
    } else {
      if (paths.find(path => minimatch(path, watcher.source))) {
        refreshTasks.push(watcher);
      }
    }
  }

  if (refreshTasks.length === 0) {
    log('Watcher: No relevant changes found, skipping next build.');
    isBuilding = false;
    return;
  }

  log(`Watcher: Running ${refreshTasks.map(x => x.name).join(', ')} tasks on next build...`);

  let toExecute = gulp.series(
    readProjectConfiguration,
    gulp.parallel(refreshTasks.map(x => x.callback)),
    writeBundles,
    (done: any) => {
      isBuilding = false;
      watchCallback();
      done();

      // 如果还有新的变动，继续构建
      if (pendingRefreshPaths.length > 0) {
        log('Watcher: Found more pending changes after finishing build, triggering next one...');
        refresh();
      }
    }
  );

  toExecute();
}, debounceWaitTime);

function log(message: string) {
  console.log(message);
}

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}

export default watch;
