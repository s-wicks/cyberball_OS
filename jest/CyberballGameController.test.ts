import { expect, test, jest } from '@jest/globals';
import { SettingsModel, defaultSettings } from '../src/models/settings-model';
import addCpuTargeting from '../src/game/CpuTargeting';
import addGameOverTriggers from '../src/game/GameOverTriggers';
import addLeaveTriggers from '../src/game/LeaveTriggers';
import CyberballGameModel from "../src/game/CyberballGameModel";
import CyberballGameController from '../src/game/CyberballGameController';
import { LeaveTrigger } from '../src/enums/leave-trigger';

test('human throw to cpu', () => {
    let controller = new CyberballGameController(CyberballGameModel.humanPlayerId, 5);

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

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(CyberballGameModel.humanPlayerId);

    expect(controller.model.playerHoldingBallId).toBe(CyberballGameModel.humanPlayerId);
    expect(controller.model.throwTargetId).toBeNull();
})

test('cpu tries to throw to self', () => {
    let controller = new CyberballGameController(0, 5);

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

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();

    controller.throwBall(0);

    expect(controller.model.playerHoldingBallId).toBe(0);
    expect(controller.model.throwTargetId).toBeNull();
})

/*
 * this test only has one target per comma and focuses on CPUs
 */
test('scheduler test #1', () => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

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
        expect(counts[i]).toEqual(4);
    }
})

// TODO more tests focusing on randomness of scheduler

test('throw count test', () => {
    let controller:CyberballGameController = new CyberballGameController(0, 2);

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

    let settings:SettingsModel = defaultSettings();
    settings.selectedGameOverCondition = 'timeLimit';
    settings.timeLimit = 500;

    addGameOverTriggers(controller, settings);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
})

test('all CPUs left', done => {
    let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 1);

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

    let settings:SettingsModel = defaultSettings();
    settings.selectedGameOverCondition = 'allCPUsLeft';
    settings.computerPlayers[0].leaveTrigger = LeaveTrigger.Turn;
    settings.computerPlayers[0].leaveTurn = 1;
    settings.computerPlayers[0].leaveTurnVariance = 0;

    addGameOverTriggers(controller, settings);
    addLeaveTriggers(controller, settings);

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
