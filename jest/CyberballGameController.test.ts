import { expect, test } from '@jest/globals';
import { SettingsModel, defaultSettings } from '../src/models/settings-model';
import addCpuTargeting from '../src/game/CpuTargeting';
import CyberballGameModel from "../src/game/CyberballGameModel";
import CyberballGameController from '../src/game/CyberballGameController'

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

    let settings:SettingsModel = defaultSettings;
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

    let settings:SettingsModel = defaultSettings;
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
 * TODO: this test focuses on the randomness of the scheduler
 */
// test('scheduler test #3', () => {
//     let controller:CyberballGameController = new CyberballGameController(CyberballGameModel.humanPlayerId, 2);

//     controller.CPULeaveCallbacks.exceptionHandler = (exception, callbackId) => {
//         fail('cpu leave callback exception: ' + exception + 'callbackID: ' + callbackId);
//     }
//     controller.throwBallCallbacks.exceptionHandler = (exception, callbackId) => {
//         fail('throw ball callback exception: ' + exception + 'callbackID: ' + callbackId);
//     }
//     controller.catchBallCallbacks.exceptionHandler = (exception, callbackId) => {
//         fail('catch ball callback exception: ' + exception + 'callbackID: ' + callbackId);
//     }
//     controller.humanPlayerMayLeaveCallbacks.exceptionHandler = (exception, callbackId) => {
//         fail('human player may leave callback exception: ' + exception + 'callbackID: ' + callbackId);
//     }
//     controller.gameEndCallbacks.exceptionHandler = (exception, callbackId) => {
//         fail('game end callback exception: ' + exception + 'callbackID: ' + callbackId);
//     }

//     let settings:SettingsModel = defaultSettings;
//     settings.useSchedule = true;
//     settings.scheduleText = '2, 13, 13\n3, 12, 12';

//     addCpuTargeting(controller, settings);

//     controller.throwBall(0);
//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(0);
//     expect(controller.model.throwTargetId).toBeNull();

//     controller.cpuThrowBall();

//     expect(controller.model.playerHoldingBallId).toBeNull();
//     expect(controller.model.throwTargetId).toBe(1);

//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(1);
//     expect(controller.model.throwTargetId).toBeNull();

//     controller.cpuThrowBall();

//     expect(controller.model.playerHoldingBallId).toBeNull();
//     expect(controller.model.throwTargetId).toBe(0);

//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(0);
//     expect(controller.model.throwTargetId).toBeNull();

//     controller.cpuThrowBall();

//     expect(controller.model.playerHoldingBallId).toBeNull();
//     expect(controller.model.throwTargetId).toBe(1);

//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(1);
//     expect(controller.model.throwTargetId).toBeNull();

//     controller.cpuThrowBall();

//     expect(controller.model.playerHoldingBallId).toBeNull();
//     expect(controller.model.throwTargetId).toBe(0);

//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(0);
//     expect(controller.model.throwTargetId).toBeNull();

//     controller.cpuThrowBall();

//     expect(controller.model.playerHoldingBallId).toBeNull();
//     expect(controller.model.throwTargetId).toBe(1);

//     controller.completeCatch();

//     expect(controller.model.playerHoldingBallId).toBe(1);
//     expect(controller.model.throwTargetId).toBeNull();
// })
