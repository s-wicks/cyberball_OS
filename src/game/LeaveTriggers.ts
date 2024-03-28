import { SettingsModel } from '../models/settings-model';
import CyberballGameController from './CyberballGameController';
import { CpuSettingsModel } from 'models/cpu-settings-model';
import { LeaveTrigger } from 'enums/leave-trigger';
import { PlayerSettingsModel } from 'models/player-settings-model';
import CyberballGameModel from './CyberballGameModel';

export default function addLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    addAllCpuLeaveTriggers(controller, settings);
    addPlayerMayLeaveTriggers(controller, settings);
}

export function addAllCpuLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    settings.computerPlayers.forEach((cpuSettings, index) => {
        const callback = (reason: string): void => controller.removeCPUfromGame(index, reason);
        addCpuLeaveTriggers(controller, index, callback, cpuSettings, settings.computerPlayers.length);
    });
}

export function addPlayerMayLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    const callback = (reason: string): void => controller.allowPlayerToLeave(reason);
    addCpuLeaveTriggers(controller, CyberballGameModel.humanPlayerId, callback, settings.player, settings.computerPlayers.length);
}

export function addCpuLeaveTriggers(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    settings: CpuSettingsModel | PlayerSettingsModel,
    totalNumberOfCpus: number,
) {
    if (settings.leaveTrigger & LeaveTrigger.Turn) {
        let leaveTurn = settings.leaveTurn + (Math.random() * 2 - 1) * settings.leaveTurnVariance;
        const leaveTurnChance = 'leaveTurnChance' in settings ? settings.leaveTurnChance : 100;
        addCpuTurnLeaveTrigger(controller, playerId, leaveCallback, leaveTurn, leaveTurnChance);
    }
    if (settings.leaveTrigger & LeaveTrigger.Time) {
        let leaveTimeSeconds = settings.leaveTime + (Math.random() * 2 - 1) * settings.leaveTimeVariance;
        let leaveTimeMilliseconds = leaveTimeSeconds * 1000;
        let leaveTimeChance = 'leaveTimeChance' in settings ? settings.leaveTimeChance : 100;
        addCpuTimeLeaveTrigger(controller, playerId, leaveCallback, leaveTimeMilliseconds, leaveTimeChance);
    }
    if (settings.leaveTrigger & LeaveTrigger.Ignored) {
        let leaveThrows = settings.leaveIgnored + (Math.random() * 2 - 1) * settings.leaveIgnoredVariance;
        let leaveIgnoredChance = 'leaveIgnoredChance' in settings ? settings.leaveIgnoredChance : 100;
        addCpuIgnoredLeaveTrigger(controller, playerId, leaveCallback, leaveThrows, leaveIgnoredChance);
    }
    if (settings.leaveTrigger & LeaveTrigger.OtherLeaver) {
        let leaveOtherLeaverChance = 'leaveOtherLeaverChance' in settings ? settings.leaveOtherLeaverChance : 100;
        addCpuOtherLeaverLeaveTrigger(controller, playerId, leaveCallback, settings.leaveOtherLeaver, leaveOtherLeaverChance, totalNumberOfCpus);
    }
    if (settings.leaveTrigger & LeaveTrigger.TimeIgnored) {
        let leaveTimeSeconds = settings.leaveTimeIgnored + (Math.random() * 2 - 1) * settings.leaveTimeIgnored;
        let leaveTimeMilliseconds = leaveTimeSeconds * 1000;
        let leaveTimeIgnoredChance = 'leaveTimeIgnoredChance' in settings ? settings.leaveTimeIgnoredChance : 100;
        addCpuTimeIgnoredLeaveTrigger(controller, playerId, leaveCallback, leaveTimeMilliseconds, leaveTimeIgnoredChance);
    }
}

export function addCpuTurnLeaveTrigger(
    controller: CyberballGameController, 
    playerId: number,
    leaveCallback: (reason: string) => void, 
    leaveTurn: number, 
    leaveTurnChance: number
) {
    controller.catchBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Turn`, () => {
        let rnd = Math.random() * 100 <= leaveTurnChance;
        if (controller.model.throwCount >= leaveTurn && rnd) {
            leaveCallback("throws elapsed");
        }
    });
}

export function addCpuTimeLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveTime: number,
    leaveTimeChance: number
) {
    let rnd = Math.random() * 100 <= leaveTimeChance;
    if (leaveTime > 0 && rnd) {
        setTimeout(() => {
            leaveCallback('time elapsed');
            // need to add a callback just in case this cpu is currenty catching or holding the ball
            controller.throwBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Time`, () => {
                leaveCallback('time elapsed');
            });
        }, leaveTime);
    }
}

export function addCpuIgnoredLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveThrows: number,
    leaveIgnoredChance: number
) {
    let throwsIgnored = 0;
    controller.catchBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Ignored`, id => {
        if (id == playerId) {
            throwsIgnored = 0;
        } else {
            throwsIgnored += 1;
        }
        let rnd = Math.random() * 100 <= leaveIgnoredChance;

        if (throwsIgnored >= leaveThrows && rnd) {
            leaveCallback('throws ignored')
        }
    });
}

export function addCpuOtherLeaverLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveOtherLeaver: number,
    leaveOtherLeaverChance: number,
    totalNumberOfCpus: number
) {
    controller.CPULeaveCallbacks.addCallback(`Player ${playerId} LeaveTrigger.OtherLeaver`, () => {
        let rnd = Math.random() * 100 <= leaveOtherLeaverChance;
        let enoughPlayersLeft = totalNumberOfCpus - controller.model.remainingCpuPlayerIds.size >= leaveOtherLeaver;
        if (enoughPlayersLeft && rnd) {
            leaveCallback('other leavers')
        }
    });
}

export function addCpuTimeIgnoredLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveTime: number,
    leaveTimeIgnoredChance: number
) {
    const callback = () => {
        let rnd = Math.random() * 100 <= leaveTimeIgnoredChance;
        if (rnd) {
            // its ok if this fails because it means that they will be recieving the ball
            leaveCallback('time ignored')
        }
    };
    let timeout = setTimeout(callback, leaveTime);
    controller.catchBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.TimeIgnored`, id => {
        if (id !== playerId) {
            return;
        }
        clearTimeout(timeout);
        setTimeout(callback, leaveTime);
    });
}