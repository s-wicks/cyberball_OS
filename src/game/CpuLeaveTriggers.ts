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
        let leaveTimeSeconds = settings.leaveTimeIgnored + (Math.random() * 2 - 1) * settings.leaveTimeIgnored;
        let leaveTimeMilliseconds = leaveTimeSeconds * 1000;
        addCpuTimeIgnoredLeaveTrigger(controller, index, leaveTimeMilliseconds);
    }
}

export function addCpuTurnLeaveTrigger(controller: CyberballGameController, index: number, leaveTurn: number, leaveTurnChance: number) {
    controller.catchBallCallbacks.addCallback(`CPU ${index} LeaveTrigger.Turn`, () => {
        let rnd = Math.random() * 100 <= leaveTurnChance;
        if (controller.model.throwCount >= leaveTurn && rnd) {
            controller.removeCPUfromGame(index, 'throws elapsed');
        }
    });
}

export function addCpuTimeLeaveTrigger(controller: CyberballGameController, index: number, leaveTime: number) {
    if (leaveTime > 0) {
        setTimeout(() => {
            controller.removeCPUfromGame(index, 'time elapsed');
            // need to add a callback just in case this cpu is currenty catching or holding the ball
            controller.catchBallCallbacks.addCallback(`CPU ${index} LeaveTrigger.Time`, () => {
                controller.removeCPUfromGame(index, 'time elapsed');
            });
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
    controller.CPULeaveCallbacks.addCallback(`CPU ${index} LeaveTrigger.OtherLeaver`, () => {
        let rnd = Math.random() * 100 <= leaveOtherLeaverChance;
        let enoughPlayersLeft = totalNumberOfCpus - controller.model.remainingCpuPlayerIds.size >= leaveOtherLeaver;
        if (enoughPlayersLeft && rnd) {
            controller.removeCPUfromGame(index, 'other leavers');
        }
    });
}

export function addCpuTimeIgnoredLeaveTrigger(controller: CyberballGameController, index: number, leaveTime: number) {
    const callback = () => {
        // its ok if this fails because it means that they will be recieving the ball
        controller.removeCPUfromGame(index, 'time ignored');
    };
    let timeout = setTimeout(callback, leaveTime);
    controller.catchBallCallbacks.addCallback(`CPU ${index} LeaveTrigger.TimeIgnored`, id => {
        if (id !== index) {
            return;
        }
        clearTimeout(timeout);
        setTimeout(callback, leaveTime);
    });
}