import { PlayerSettingsModel } from './player-settings-model';
import { CpuSettingsModel } from './cpu-settings-model';

export class SettingsModel {
    player: PlayerSettingsModel = new PlayerSettingsModel();
    computerPlayers: Array<CpuSettingsModel>;

    // Gameplay
    throwCount: number = 30;
    timeLimit: number = 120000;
    displayTimeLimit: boolean = false;
    timeLimitText: string = 'Time Limit:';
    ballSpeed: number = 400;

    displayBallSettings: boolean = false;
    
    displayPlayerCustomizations: boolean = false;
    displayPlayerLeaveTriggers: boolean = false;

    displayCPUCustomizations: boolean = false;
    displayCPULeaveTriggers: boolean = false;
    displayCPUTargetPreferences: boolean = true;
    displayCPUThrowCatchDelays: boolean = false;

    useSchedule: boolean = false;
    scheduleHonorsThrowCount: boolean = false;
    schedule: Map<number, Array<number>>;
    scheduleText: Map<string, string> = new Map<string, string>();
    selectedGameOverCondition: string = 'throwCount';
    gameOverConditions = [
        { id: 'throwCount', label: 'Throw Count'},
        { id: 'timeLimit', label: 'Time Limit'},
        { id: 'allCPUsLeft', label: 'All CPUs Left'}
    ];

    // Graphics
    baseUrl: string = './assets';

    ballSprite: string = 'ball.png';
    ballTint: string = '#ffffff';

    portraitHeight: number = 75;
    portraitPadding: number = 10;

    get hasPortraits(): boolean | ArrayBuffer {
        return !!(this.player.portraitBuff || this.computerPlayers.some(cpu => cpu.portraitBuff));
    }

    // Misc
    chatEnabled: boolean = false;

    gameOverText: string = "Game Over";
    gameOverOpacity: number = 0.5;

    constructor(init?: Partial<SettingsModel>) {
        Object.assign(this, init);
    }

    defaultPortraits: string[] = [
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FD4MuyE9xvXsw4N',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9WAB10zvcNpYCay',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9N8Q6TidKIbmmCG',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_50COcfLIQHBGGRo',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cNkphviD8lW6Aui',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eaO3Q2E2zIHGilU',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cCulSSpb7ydhO8S',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0Gtm9MRNwNePo90',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_eA0WUiP4s6xfelg',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_5mSCyUoqClgL5fo',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_elhZ8gV4ra10TIy',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_dcKcMkN46o0bxeC',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_7WhGUn4IfqKl7qm',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0qayRbawfVh3SfA',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_b2FWU72a1pAPBfU',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4TujTNJGvEa9jfM',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_80UFyMIwRPvlhbw',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_9yrharkWwnbCR7g',
      ];

      selectedDefaultPortraitIndex?: number = undefined;
    }


export function defaultSettings() {
    return new SettingsModel({
            player: new PlayerSettingsModel({
            name: 'Player 1'
        }),
        computerPlayers: [
            new CpuSettingsModel({
                name: 'Player 2'
            }),
            new CpuSettingsModel({
                name: 'Player 3'
            })
        ]
    })
}


