import { SettingsModel } from '../models/settings-model';
import CyberballGameController from './CyberballGameController';

export default function addGameOverTriggers(controller: CyberballGameController, settings: SettingsModel) {
    if (settings.selectedGameOverCondition === "throwCount") {
        if (settings.useSchedule && !settings.scheduleHonorsThrowCount) {
            return;
        }
        addThrowCountGameOverTrigger(controller, settings.throwCount);
    } else if (settings.selectedGameOverCondition === "timeLimit") {
        addTimeLimitGameOverTrigger(controller, settings.timeLimit);
    } else if (settings.selectedGameOverCondition === "allCPUsLeft") {
        addAllCpusLeftGameOverTrigger(controller);
    }
}

export function addThrowCountGameOverTrigger(controller: CyberballGameController, throwCount: number) {
    controller.catchBallCallbacks.addCallback("Game Over", () => {
        if (controller.model.throwCount >= throwCount) {
            controller.endGame("throw-count-met");
        }
    });
}

export function addTimeLimitGameOverTrigger(controller: CyberballGameController, timeLimit: number) {
    let timeLimitMilliSeconds = timeLimit * 1000;
    if (timeLimitMilliSeconds <= 0) {
        return;
    }
    setTimeout(() => {
        controller.endGame("global-time-limit");
    }, timeLimitMilliSeconds);
}

export function addAllCpusLeftGameOverTrigger(controller: CyberballGameController) {
    controller.CPULeaveCallbacks.addCallback("Game Over", () => {
        if (controller.model.remainingCpuPlayerIds.size === 0) {
            controller.endGame("All CPUs left");
        }
    });
}