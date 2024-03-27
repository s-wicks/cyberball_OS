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
    controller.catchBallCallbacks.addCallback("Game Over", _ => {
        if (controller.model.throwCount >= throwCount) {
            controller.endGame("throw-count-met");
        }
    });
}

export function addTimeLimitGameOverTrigger(controller: CyberballGameController, timeLimit: number) {
    if (timeLimit <= 0) {
        return;
    }
    setTimeout(() => {
        controller.endGame("global-time-limit");
    }, timeLimit);
}

export function addAllCpusLeftGameOverTrigger(controller: CyberballGameController) {
    controller.CPULeaveCallbacks.addCallback("Game Over", _ => {
        if (controller.model.remainingCpuPlayers.size === 0) {
            controller.endGame("All CPUs left");
        }
    });
}