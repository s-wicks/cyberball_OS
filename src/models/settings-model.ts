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

    useSchedule: boolean = false;
    scheduleHonorsThrowCount: boolean = false;
    schedule: Map<number, Array<number>>;
    scheduleText:string;
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
        'https://i.postimg.cc/ZYWSnMcz/IMG-20200927-182007.jpg',
        'https://osunewarkcotc.pdx1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_82GAiAY7LbdYqs6',
        'https://drive.google.com/file/d/1tS43nO5tEN1oOUHpFDaEIYk_I_-sY8C-/view?usp=sharing'
        
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
