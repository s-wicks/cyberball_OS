export enum LeaveTrigger {
    None = 0,
    Turn = 1,
    Time = 1 << 1,
    Ignored = 1 << 2,
    OtherLeaver = 1 << 3,
    TimeIgnored = 1 << 4
}

export class PlayerSettingsModel {
    name: string;
    tint: string = '#ffffff';

    portrait?: string;
    portraitBuff?: string;

    /** Actions that may trigger a leave by this player. */
    leaveTrigger?: LeaveTrigger = LeaveTrigger.None;

    /** This player may leave after this many turns. */
    leaveTurn?: number = 10;
    leaveTurnVariance?: number = 2;

    /** This player may leave after this much time. */
    leaveTime?: number = 120;
    leaveTimeVariance?: number = 30;

    /** This player may leave after not catching the ball for this many turns. */
    leaveIgnored?: number = 10;
    leaveIgnoredVariance?: number = 2;

    /** This player may leave after not catching the ball for this much time. */
    leaveTimeIgnored?: number = 45;
    leaveTimeIgnoredVariance?: number = 15;

    /** This player may leave after this many other players leave. */
    leaveOtherLeaver?: number = 2;

    constructor(init?: Partial<PlayerSettingsModel>) {
        if(init)
            Object.assign(this, init);
    }
}
