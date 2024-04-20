import { expect, test, jest } from '@jest/globals';
import { SettingsModel, defaultSettings } from '../src/models/settings-model';
import addCpuTargeting from '../src/game/CpuTargeting';
import addGameOverTriggers from '../src/game/GameOverTriggers';
import addAllLeaveTriggers from '../src/game/LeaveTriggers';
import CyberballGameModel from "../src/game/CyberballGameModel";
import CyberballGameController from '../src/game/CyberballGameController';
import { LeaveTrigger } from '../src/enums/leave-trigger';
import { CpuSettingsModel } from '../src/models/cpu-settings-model';

afterEach(() => {    
    jest.clearAllMocks();
});

function addExceptionCallbacks(controller:CyberballGameController) {
    controller.CPULeaveCallbacks.exceptionHandler = (exception, callbackId) => {
        fail('cpu leave callback exception: ' + exception + 'callbackID: ' + callbackId);
    }
    controller.throwBallCallbacks.exceptionHandler = (exception, callbackId) => {
        fail('throw ball callback exception: ' + exception + 'callbackID: ' + callbackId);
    }
    controller.catchBallCallbacks.exceptionHandler = (exception, callbackId) => {
        fail('catch ball callback exception: ' + exception + 'callbackID: ' + callbackId);
    }
    controller.humanPlayerMayLeaveCallbacks.exceptionHandler = (exception, callbackId) => {
        fail('human player may leave callback exception: ' + exception + 'callbackID: ' + callbackId);
    }
    controller.gameEndCallbacks.exceptionHandler = (exception, callbackId) => {
        fail('game end callback exception: ' + exception + 'callbackID: ' + callbackId);
    }
}

/*
 * GENERAL GAME TESTS
 */

test('human throw to cpu', () => {
    let controller = new CyberballGameController(CyberballGameModel.humanPlayerId, 5);

    addExceptionCallbacks(controller);

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(1);

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(1);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(1);
    expect(controller.model.throwTargetId).toBeNull();
})

test('cpu throw to human', () => {
    let controller = new CyberballGameController(0, 5);

    addExceptionCallbacks(controller);

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(CyberballGameModel.humanPlayerId);

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(CyberballGameModel.humanPlayerId);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();
})

test('human tries to throw to self', () => {
    let controller = new CyberballGameController(CyberballGameModel.humanPlayerId, 5);

    addExceptionCallbacks(controller);

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(CyberballGameModel.humanPlayerId);

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();
})

test('cpu tries to throw to self', () => {
    let controller = new CyberballGameController(0, 5);

    addExceptionCallbacks(controller);

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(0);

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();
})

/*
 * GAMEPLAY TESTS
 */

/*
 * this test only has one target per comma and focuses on CPUs
 */
test('scheduler test #1', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.useSchedule = true;
    settings.scheduleText = '2, 3, 3, 3, 3\n3, 2, 2, 2, 2';

    addCpuTargeting(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(1);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(1);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(0);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(1);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(1);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(0);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(1);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(1);
    expect(controller.model.throwTargetId).toBeNull();
})

/*
 * this test only has one target per comma and focuses on human with CPUs
 */
test('scheduler test #2', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.useSchedule = true;
    settings.scheduleText = '2, 1, 1, 1, 1\n3, 1, 1, 1, 1';

    addCpuTargeting(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(CyberballGameModel.humanPlayerId);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(1);

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(1);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(1);
    expect(controller.model.throwTargetId).toBeNull();

    controller.cpuThrowBall();

    expect(controller.model.playerHoldingBallId).toBeNull();
    expect(controller.model.throwTargetId).toBe(CyberballGameModel.humanPlayerId);

    controller.completeCatch();

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();
})

/*
 * this test focuses on scheduler completing all throws despite randomness
 * TODO sometimes fails because scheduler runs out
 */
test('scheduler test #3', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 3);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.useSchedule = true;
    settings.scheduleText = '2, 34, 34\n3, 24, 24\n4, 23, 23';
    settings.selectedGameOverCondition = 'throwCount';
    settings.throwCount = 12;

    addCpuTargeting(controller, settings);
    addGameOverTriggers(controller, settings);

    let counts:Array<number> = [0, 0, 0];

    while(controller.model.gameHasEnded === false) {
        controller.cpuThrowBall();
        counts[controller.model.throwTargetId!]++;
        controller.completeCatch();
    }

    // need to just count throws
    for (let i = 0; i < 3; i++) {
        expect(counts[i]).toBeGreaterThan(2);
    }
})

// TODO more tests focusing on randomness of scheduler

test('throw count test', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.selectedGameOverCondition = 'throwCount';
    settings.throwCount = 15;
    settings.computerPlayers[0].targetPreference = [0, 100];
    settings.computerPlayers[1].targetPreference = [0, 100];

    addGameOverTriggers(controller, settings);
    addCpuTargeting(controller, settings);
    while(controller.model.gameHasEnded === false) {
        controller.cpuThrowBall();
        controller.completeCatch();
    }

    expect(controller.model.gameHasEnded).toBeTruthy();
    expect(controller.model.throwCount).toEqual(15);
})

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
test('time limit test', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.selectedGameOverCondition = 'timeLimit';
    settings.timeLimit = 500;

    addGameOverTriggers(controller, settings);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
})

test('all CPUs left', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 1);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.selectedGameOverCondition = 'allCPUsLeft';
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Turn;
    settings.computerPlayers[0].leaveTurn = 1;
    settings.computerPlayers[0].leaveTurnVariance = 0;

    addGameOverTriggers(controller, settings);
    addAllLeaveTriggers(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();
    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    setTimeout(() => {
        expect(controller.model.gameHasEnded).toBeTruthy();
        done();
    }, 100);
    jest.runAllTimers();
})

test('test schedule honors throw count', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.useSchedule = true;
    settings.scheduleHonorsThrowCount = true;
    settings.throwCount = 2;
    settings.scheduleText = '2, 1, 1, 1, 1\n3, 1, 1, 1, 1';

    addGameOverTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    controller.cpuThrowBall();
    controller.completeCatch();

    expect(controller.model.gameHasEnded).toBeTruthy();
    expect(controller.model.throwCount).toBe(2);
})

/*
 * PLAYER TESTS
 */
test('player throws elapsed leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.Turn;
    settings.player.leaveTurn = 2;
    settings.player.leaveTurnVariance = 0;

    addAllLeaveTriggers(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    expect(controller.model.humanPlayerMayLeave).toBeTruthy();
})

test('player throws elapsed variance leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].targetPreference = [0, 100];
    settings.computerPlayers[1].targetPreference = [0, 100];
    settings.player.leaveTrigger = LeaveTrigger.Turn;
    settings.player.leaveTurn = 3;
    settings.player.leaveTurnVariance = 1;

    addAllLeaveTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    while(controller.model.humanPlayerMayLeave === false) {
        controller.cpuThrowBall();
        controller.completeCatch();
    }

    expect(controller.model.throwCount).toBeGreaterThanOrEqual(2);
    expect(controller.model.throwCount).toBeLessThanOrEqual(4);
})

test('player time elapsed leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.Time;
    settings.player.leaveTime = 1;
    settings.player.leaveTimeVariance = 0;

    addAllLeaveTriggers(controller, settings);

    setTimeout(() => {
        expect(controller.model.humanPlayerMayLeave).toBeTruthy();
        done();
    }, 1000);
    jest.runAllTimers();
})

test('player time elapsed variance leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.Time;
    settings.player.leaveTime = 2;
    settings.player.leaveTimeVariance = 1;

    addAllLeaveTriggers(controller, settings);

    const start = Date.now();
    controller.humanPlayerMayLeaveCallbacks.addCallback('start', () => {
        const end = Date.now();
        const diff = end - start;
        expect(diff).toBeGreaterThanOrEqual(1000);
        expect(diff).toBeLessThanOrEqual(3000);
        done();
    })
    jest.runAllTimers();
})

test('player throws ignored leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.Ignored;
    settings.player.leaveIgnored = 2;
    settings.player.leaveIgnoredVariance = 0;

    addAllLeaveTriggers(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(1);
    controller.completeCatch();

    expect(controller.model.humanPlayerMayLeave).toBeFalsy();

    controller.throwBall(0);
    controller.completeCatch();

    expect(controller.model.humanPlayerMayLeave).toBeTruthy();
})

test('player throws ignored variance leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].targetPreference = [0, 100];
    settings.computerPlayers[1].targetPreference = [0, 100];
    settings.player.leaveTrigger = LeaveTrigger.Ignored;
    settings.player.leaveIgnored = 5;
    settings.player.leaveIgnoredVariance = 2;

    addAllLeaveTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    while(controller.model.humanPlayerMayLeave === false) {
        controller.cpuThrowBall();
        controller.completeCatch();
    }

    expect(controller.model.throwCount).toBeGreaterThanOrEqual(3);
    expect(controller.model.throwCount).toBeLessThanOrEqual(7);
})

test('player time ignored leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.TimeIgnored;
    settings.player.leaveTimeIgnored = 1;
    settings.player.leaveTimeVariance = 0;

    addAllLeaveTriggers(controller, settings);

    setTimeout(() => {
        controller.throwBall(0);
        controller.completeCatch();
        expect(controller.model.humanPlayerMayLeave).toBeFalsy();
    }, 1000);

    setTimeout(() => {
        expect(controller.model.humanPlayerMayLeave).toBeTruthy();
        done();
    }, 2500);
    jest.runAllTimers();
})

test('player other leavers leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.player.leaveTrigger = LeaveTrigger.OtherLeaver;
    settings.player.leaveOtherLeaver = 2;

    addAllLeaveTriggers(controller, settings);

    controller.removeCPUfromGame(0, 'test');
    expect(controller.model.humanPlayerMayLeave).toBeFalsy();
    controller.removeCPUfromGame(1, 'test');
    expect(controller.model.humanPlayerMayLeave).toBeTruthy();
})

/*
 * CPU TESTS
 */

test('cpu throws elapsed leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Turn;
    settings.computerPlayers[0].leaveTurn = 2;
    settings.computerPlayers[0].leaveTurnVariance = 0;

    addAllLeaveTriggers(controller, settings);

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).not.toContain(0);
})

test('cpu throws elapsed variance leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(1, 3);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers.push(new CpuSettingsModel());
    settings.computerPlayers[1].targetPreference = [0, 0, 100];
    settings.computerPlayers[2].targetPreference = [0, 0, 100];
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Turn;
    settings.computerPlayers[0].leaveTurn = 3;
    settings.computerPlayers[0].leaveTurnVariance = 1;

    addAllLeaveTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    while(controller.model.remainingCpuPlayerIds.has(0)) {
        controller.cpuThrowBall();
        controller.completeCatch();
    }

    expect(controller.model.throwCount).toBeGreaterThanOrEqual(2);
    expect(controller.model.throwCount).toBeLessThanOrEqual(4);
})

test('cpu throws elapsed chance leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].targetPreference = [0, 100];
    settings.computerPlayers[1].targetPreference = [0, 100];
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Turn;
    settings.computerPlayers[0].leaveTurn = 2;
    settings.computerPlayers[0].leaveTurnVariance = 0;
    settings.computerPlayers[0].leaveTurnChance = 0;

    addAllLeaveTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    controller.cpuThrowBall();
    controller.completeCatch();
    controller.cpuThrowBall();
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).toContain(0);
})

test('cpu time elapsed leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Time;
    settings.computerPlayers[0].leaveTime = 1;
    settings.computerPlayers[0].leaveTimeVariance = 0;

    addAllLeaveTriggers(controller, settings);

    setTimeout(() => {
        expect(controller.model.remainingCpuPlayerIds).not.toContain(0);
        done();
    }, 1000);
    jest.runAllTimers();
})

test('cpu time elapsed variance leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Time;
    settings.computerPlayers[0].leaveTime = 2;
    settings.computerPlayers[0].leaveTimeVariance = 1;

    addAllLeaveTriggers(controller, settings);

    const start = Date.now();
    controller.CPULeaveCallbacks.addCallback('start', () => {
        const end = Date.now();
        const diff = end - start;
        expect(diff).toBeGreaterThanOrEqual(1000);
        expect(diff).toBeLessThanOrEqual(3000);
        done();
    })
    jest.runAllTimers();
})

test('cpu time elapsed leave chance trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Time;
    settings.computerPlayers[0].leaveTime = 1;
    settings.computerPlayers[0].leaveTimeVariance = 0;
    settings.computerPlayers[0].leaveTimeChance = 0;

    addAllLeaveTriggers(controller, settings);

    setTimeout(() => {
        expect(controller.model.remainingCpuPlayerIds).toContain(0);
        done();
    }, 1000);
    jest.runAllTimers();
})

test('cpu throws ignored leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Ignored;
    settings.computerPlayers[0].leaveIgnored = 2;
    settings.computerPlayers[0].leaveIgnoredVariance = 0;

    addAllLeaveTriggers(controller, settings);

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    controller.throwBall(1);
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).toContain(0);

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).not.toContain(0);
})

test('cpu throws ignored variance leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(1, 3);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[1].targetPreference = [0, 0, 100];
    settings.computerPlayers.push(new CpuSettingsModel());
    settings.computerPlayers[2].targetPreference = [0, 0, 100];
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Ignored;
    settings.computerPlayers[0].leaveIgnored = 5;
    settings.computerPlayers[0].leaveIgnoredVariance = 2;

    addAllLeaveTriggers(controller, settings);
    addCpuTargeting(controller, settings);

    while(controller.model.remainingCpuPlayerIds.has(0)) {
        controller.cpuThrowBall();
        controller.completeCatch();
    }

    expect(controller.model.throwCount).toBeGreaterThanOrEqual(3);
    expect(controller.model.throwCount).toBeLessThanOrEqual(7);
})

test('cpu throws ignored leave chance trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Ignored;
    settings.computerPlayers[0].leaveIgnored = 2;
    settings.computerPlayers[0].leaveIgnoredVariance = 0;
    settings.computerPlayers[0].leaveIgnoredChance = 0;

    addAllLeaveTriggers(controller, settings);

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    controller.throwBall(0);
    controller.completeCatch();

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    controller.throwBall(1);
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).toContain(0);

    controller.throwBall(CyberballGameModel.humanPlayerId);
    controller.completeCatch();

    expect(controller.model.remainingCpuPlayerIds).toContain(0);
})

test('cpu time ignored leave trigger', done => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.TimeIgnored;
    settings.computerPlayers[0].leaveTimeIgnored = 1000;
    settings.computerPlayers[0].leaveTimeVariance = 0;

    addAllLeaveTriggers(controller, settings);

    setTimeout(() => {
        controller.throwBall(1);
        controller.completeCatch();
        expect(controller.model.remainingCpuPlayerIds).toContain(0);
    }, 800);

    setTimeout(() => {
        expect(controller.model.remainingCpuPlayerIds).not.toContain(0);
        done();
    }, 3000);
    jest.runAllTimers();
})

test('cpu other leavers leave trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 3);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.OtherLeaver;
    settings.computerPlayers[0].leaveOtherLeaver = 2;
    settings.computerPlayers[0].leaveOtherLeaverChance = 100;
    settings.computerPlayers.push(new CpuSettingsModel());

    addAllLeaveTriggers(controller, settings);

    controller.removeCPUfromGame(1, 'test');
    expect(controller.model.remainingCpuPlayerIds).toContain(0);
    controller.removeCPUfromGame(2, 'test');
    expect(controller.model.remainingCpuPlayerIds).not.toContain(0);
})

test('cpu other leavers leave chance trigger', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 3);

    addExceptionCallbacks(controller);

    let settings:SettingsModel = defaultSettings();
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.OtherLeaver;
    settings.computerPlayers[0].leaveOtherLeaver = 2;
    settings.computerPlayers[0].leaveOtherLeaverChance = 0;
    settings.computerPlayers.push(new CpuSettingsModel());

    addAllLeaveTriggers(controller, settings);

    controller.removeCPUfromGame(1, 'test');
    expect(controller.model.remainingCpuPlayerIds).toContain(0);
    controller.removeCPUfromGame(2, 'test');
    expect(controller.model.remainingCpuPlayerIds).toContain(0);
})
