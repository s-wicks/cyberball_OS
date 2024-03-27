import { SettingsModel } from '../models/settings-model';
import CyberballGameModel from './CyberballGameModel';
import CyberballGameController from './CyberballGameController';

export default function addCpuTargeting(controller: CyberballGameController, settings: SettingsModel) {
    if (settings.useSchedule) {
        addCpuTargetingSchedule(settings);
    } else {
        addCpuTargetingPreference(controller, settings);
    }
}

function addCpuTargetingSchedule(settings: SettingsModel) {
    // TODO
}

function addCpuTargetingPreference(controller: CyberballGameController, settings: SettingsModel) {
    controller.setCpuTargeting(thrower => {
        let targetPreference = settings.computerPlayers[thrower].targetPreference;
        let probablyityDensityFunction = targetPreference.map(el => el / 100);
        let cumultiveDistributionFunction = probablyityDensityFunction.map((sum => value => sum += value)(0));
        let rand = Math.random();
        let index = cumultiveDistributionFunction.findIndex(el => rand <= el);
        if (index === thrower) {
            return CyberballGameModel.humanPlayerId;
        }
        return index;
    });

    controller.CPULeaveCallbacks.addCallback("Target Preference", (id) => {
        // TODO redistribute weight
    });
}