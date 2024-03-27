import { SettingsModel } from '../models/settings-model';
import CyberballGameController from './CyberballGameController';
import { CpuSettingsModel } from 'models/cpu-settings-model';
import { LeaveTrigger } from 'enums/leave-trigger';

export default function addAllCpuLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    settings.computerPlayers.forEach((cpuSettings, index) => {
        addCpuLeaveTriggers(controller, cpuSettings, index, settings.computerPlayers.length);
    });
}

export function addCpuLeaveTriggers(controller: CyberballGameController, settings: CpuSettingsModel, index: number, totalNumberOfCpus: number) {
    if (settings.leaveTrigger & LeaveTrigger.Turn) {
        let leaveTurn = settings.leaveTurn + (Math.random() * 2 - 1) * settings.leaveTurnVariance;
        addCpuTurnLeaveTrigger(controller, index, leaveTurn, settings.leaveTurnChance);
    }
    if (settings.leaveTrigger & LeaveTrigger.Time) {
        let leaveTimeSeconds = settings.leaveTime + (Math.random() * 2 - 1) * settings.leaveTimeVariance;
        let leaveTimeMilliseconds = leaveTimeSeconds * 1000;
        addCpuTimeLeaveTrigger(controller, index, leaveTimeMilliseconds);
    }
    if (settings.leaveTrigger & LeaveTrigger.Ignored) {
        let leaveThrows = settings.leaveIgnored + (Math.random() * 2 - 1) * settings.leaveIgnoredVariance;
        addCpuIgnoredLeaveTrigger(controller, index, leaveThrows, settings.leaveIgnoredVariance);
    }
    if (settings.leaveTrigger & LeaveTrigger.OtherLeaver) {
        addCpuOtherLeaverLeaveTrigger(controller, index, settings.leaveOtherLeaver, settings.leaveOtherLeaverChance, totalNumberOfCpus);
    }
    if (settings.leaveTrigger & LeaveTrigger.TimeIgnored) {
        addCpuTimeIgnoredLeaveTrigger(controller, settings, index);
    }
}

export function addCpuTurnLeaveTrigger(controller: CyberballGameController, index: number, leaveTurn: number, leaveTurnChance: number) {
    controller.catchBallCallbacks.addCallback(`CPU ${index} LeaveTrigger.Turn`, _ => {
        let rnd = Math.random() * 100 <= leaveTurnChance;
        if (controller.model.throwCount >= leaveTurn && rnd) {
            controller.removeCPUfromGame(index, 'throws elapsed');
        }
    });
}

export function addCpuTimeLeaveTrigger(controller: CyberballGameController, index: number, leaveTime: number) {
    if (leaveTime > 0) {
        setTimeout(() => {
            // TODO check if cpu can leave / add method to schedule a leave
            controller.removeCPUfromGame(index, 'time elapsed');
        }, leaveTime);
    }
}

export function addCpuIgnoredLeaveTrigger(controller: CyberballGameController, index: number, leaveThrows: number, leaveIgnoredChance: number) {
    let throwsIgnored = 0;
    controller.catchBallCallbacks.addCallback(`CPU ${index} LeaveTrigger.Ignored`, id => {
        if (id == index) {
            throwsIgnored = 0;
        } else {
            throwsIgnored += 1;
        }
        let rnd = Math.random() * 100 <= leaveIgnoredChance;

        if (throwsIgnored >= leaveThrows && rnd) {
            controller.removeCPUfromGame(index, 'throws ignored');
        }
    });
}

export function addCpuOtherLeaverLeaveTrigger(controller: CyberballGameController, index: number, leaveOtherLeaver: number, leaveOtherLeaverChance: number, totalNumberOfCpus: number) {
    controller.CPULeaveCallbacks.addCallback(`CPU ${index} LeaveTrigger.OtherLeaver`, _ => {
        let rnd = Math.random() * 100 <= leaveOtherLeaverChance;
        let enoughPlayersLeft = totalNumberOfCpus - controller.model.remainingCpuPlayers.size >= leaveOtherLeaver;
        if (enoughPlayersLeft && rnd) {
            controller.removeCPUfromGame(index, 'other leavers');
        }
    });
}

export function addCpuTimeIgnoredLeaveTrigger(controller: CyberballGameController, settings: CpuSettingsModel, index: number) {
    // TODO
}