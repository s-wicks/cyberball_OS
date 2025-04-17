import { PlayerSettingsModel } from './player-settings-model';

export class CpuSettingsModel extends PlayerSettingsModel {
    // A set of weights for each possible target, adding up to 100%.
    targetPreference: Array<number> = [50, 50];

    throwDelay: number = 3000;
    throwDelayVariance: number = 1000;

    catchDelay: number = 500;
    catchDelayVariance: number = 200;

    leaveTurnChance?: number = 100;
    leaveTimeChance?: number = 100;
    leaveIgnoredChance?: number = 100;
    leaveTimeIgnoredChance?: number = 100;
    leaveOtherLeaverChance?: number = 100;

    constructor(init?: Partial<CpuSettingsModel>) {
        super();

        if(init)
            Object.assign(this, init);
    }
}
