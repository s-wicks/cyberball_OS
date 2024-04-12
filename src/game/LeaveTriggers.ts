import { SettingsModel } from '../models/settings-model';
import CyberballGameController from './CyberballGameController';
import { CpuSettingsModel } from 'models/cpu-settings-model';
import { LeaveTrigger } from 'enums/leave-trigger';
import { PlayerSettingsModel } from 'models/player-settings-model';
import CyberballGameModel from './CyberballGameModel';

export default function addAllLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    addAllCpuLeaveTriggers(controller, settings);
    addPlayerMayLeaveTriggers(controller, settings);
}

export function addAllCpuLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    settings.computerPlayers.forEach((cpuSettings, index) => {
        const callback = (reason: string): void => controller.removeCPUfromGame(index, reason);
        addLeaveTriggers(controller, index, callback, cpuSettings, settings.computerPlayers.length);
    });
}

export function addPlayerMayLeaveTriggers(controller: CyberballGameController, settings: SettingsModel) {
    const callback = (reason: string): void => controller.allowPlayerToLeave(reason);
    addLeaveTriggers(controller, CyberballGameModel.humanPlayerId, callback, settings.player, settings.computerPlayers.length);
}

function shouldDisableLeaveTrigger(settings: CpuSettingsModel | PlayerSettingsModel, leavePercentageAttr: string): boolean {
    const leavePercentage = leavePercentageAttr in settings ? settings[leavePercentageAttr] : 100;
    return leavePercentage <= Math.random() * 100;
}

function floatingRandom(mean: number, variance: number): number {
    return mean + (Math.random() * 2 * variance - variance);
}

function integralRandom(mean: number, variance: number): number {
    return Math.floor(mean + (Math.random() * (2 * variance + 1) - variance));
}

export function addLeaveTriggers(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    settings: CpuSettingsModel | PlayerSettingsModel,
    totalNumberOfCpus: number,
) {
    if (settings.leaveTrigger & LeaveTrigger.Turn) {
        if (shouldDisableLeaveTrigger(settings, 'leaveTurnChance')) return;
        let leaveTurn = integralRandom(settings.leaveTurn, settings.leaveTurnVariance);
        addTurnLeaveTrigger(controller, playerId, leaveCallback, leaveTurn);
    }
    if (settings.leaveTrigger & LeaveTrigger.Time) {
        if (shouldDisableLeaveTrigger(settings, 'leaveTimeChance')) return;
        let leaveTimeSeconds = floatingRandom(settings.leaveTime, settings.leaveTimeVariance);
        let leaveTimeMilliseconds = leaveTimeSeconds * 1000;
        addTimeLeaveTrigger(controller, playerId, leaveCallback, leaveTimeMilliseconds);
    }
    if (settings.leaveTrigger & LeaveTrigger.Ignored) {
        if (shouldDisableLeaveTrigger(settings, 'leaveIgnoredChance')) return;
        let leaveThrows = integralRandom(settings.leaveIgnored, settings.leaveIgnoredVariance);
        addIgnoredLeaveTrigger(controller, playerId, leaveCallback, leaveThrows);
    }
    if (settings.leaveTrigger & LeaveTrigger.OtherLeaver) {
        if (shouldDisableLeaveTrigger(settings, 'leaveOtherLeaverChance')) return;
        addOtherLeaverLeaveTrigger(controller, playerId, leaveCallback, settings.leaveOtherLeaver, totalNumberOfCpus);
    }
    if (settings.leaveTrigger & LeaveTrigger.TimeIgnored) {
        if (shouldDisableLeaveTrigger(settings, 'leaveTimeIgnoredChance')) return;
        let leaveTimeMilliseconds = floatingRandom(settings.leaveTimeIgnored, settings.leaveTimeIgnored);
        addTimeIgnoredLeaveTrigger(controller, playerId, leaveCallback, leaveTimeMilliseconds);
    }
}

export function addTurnLeaveTrigger(
    controller: CyberballGameController, 
    playerId: number,
    leaveCallback: (reason: string) => void, 
    leaveTurn: number, 
) {
    controller.catchBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Turn`, () => {
        if (controller.model.throwCount >= leaveTurn) {
            leaveCallback("throws elapsed");
        }
    });
}

export function addTimeLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveTime: number,
) {
    if (leaveTime <= 0) {
        return;
    }
    setTimeout(() => {
        leaveCallback('time elapsed');
        // need to add a callback just in case this cpu is currenty catching or holding the ball
        controller.throwBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Time`, () => {
            leaveCallback('time elapsed');
        });
    }, leaveTime);
}

export function addIgnoredLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveThrows: number,
) {
    let throwsIgnored = controller.model.playerHoldingBallId === playerId ? 0 : 1;
    controller.catchBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.Ignored`, id => {
        if (id == playerId) {
            throwsIgnored = 0;
        } else {
            throwsIgnored += 1;
        }

        if (throwsIgnored > leaveThrows) {
            leaveCallback('throws ignored')
        }
    });
}

export function addOtherLeaverLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveOtherLeaver: number,
    totalNumberOfCpus: number
) {
    controller.CPULeaveCallbacks.addCallback(`Player ${playerId} LeaveTrigger.OtherLeaver`, () => {
        let enoughPlayersLeft = totalNumberOfCpus - controller.model.remainingCpuPlayerIds.size >= leaveOtherLeaver;
        if (enoughPlayersLeft) {
            leaveCallback('other leavers')
        }
    });
}

export function addTimeIgnoredLeaveTrigger(
    controller: CyberballGameController,
    playerId: number,
    leaveCallback: (reason: string) => void,
    leaveTime: number,
) {
    let interactionId = 0;
    let callback = (originalInteractionId: number) => {
        let isHolding = controller.model.playerHoldingBallId === playerId;
        let isCatching = controller.model.throwTargetId === playerId;
        if (isHolding || isCatching) {
            return;
        }
        
        if (originalInteractionId === interactionId) {
            leaveCallback('time ignored');
        }
    };
    setTimeout(callback, leaveTime);
    controller.throwBallCallbacks.addCallback(`Player ${playerId} LeaveTrigger.TimeIgnored`, (thrower, reciever) => {
        if (thrower === playerId) {
            interactionId++;
            setTimeout(() => callback(interactionId), leaveTime);
        }
        if (reciever === playerId) {
            interactionId++;
        }
    });
}