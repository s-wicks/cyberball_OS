import {expect, test} from '@jest/globals';
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