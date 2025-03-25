import { PlayerSettingsModel } from './player-settings-model';
import { CpuSettingsModel } from './cpu-settings-model';

export class SettingsModel {
    player: PlayerSettingsModel = new PlayerSettingsModel();
    computerPlayers: Array<CpuSettingsModel>;

    // Gameplay
    throwCount: number = 10;
    timeLimit: number = 0;
    displayTimeLimit: boolean = false;
    timeLimitText: string = 'Time Limit:';
    ballSpeed: number = 500;
    displayBallSettings: boolean = false;

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
        'https://i.postimg.cc/W4jQ3j9H/2.jpg',
        'https://i.postimg.cc/m2vvv77R/1.jpg',
        'https://i.postimg.cc/NMjS6Dv8/3.webp',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_DlPQf9wjfoyMdPG',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8IVmkRqv8V9GWLs',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_01DJWLlvQ8DJMbk',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3dY8AVAWm0815DD',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_djnWjzYvLRhtiaF',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_88OSdwFkStKYFBH',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_cCKy6HqbTnpNKLz',
        
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


