import { CyberballScene } from '../../scenes/cyberball';
import { defaultSettings, SettingsModel } from '../../models/settings-model';
import Phaser from 'phaser';
import { PhaserGameCustomElement } from 'resources/phaser-game/phaser-game';
import CyberballGameController from 'game/cyberball-game-controller';

export class GameViewModel {
    settings: SettingsModel = defaultSettings;

    // Game:

    game: PhaserGameCustomElement;

    gameWidth = 800;
    gameHeight = 460;

    gameConfig: Phaser.Types.Core.GameConfig;

    activate(params: { settings?: string, playerName?: string }) {
        if('settings' in params) {
            this.settings = new SettingsModel(JSON.parse(atob(params.settings)));
        }

        if('playerName' in params) {
            this.settings.player.name = params.playerName;
        }

        if(this.settings.hasPortraits) {
            this.gameHeight += this.settings.portraitHeight * 2 + this.settings.portraitPadding * 4;
        }
    }

    bind() {
        let cpuPlayers: Set<string> = new Set();
        for (const cpuSetting of this.settings.computerPlayers) {
            cpuPlayers.add(cpuSetting.name);
        }
        let cyberballGameController = new CyberballGameController(this.settings.player.name, this.settings.player.name, cpuPlayers);
        let scene = new CyberballScene(this.settings, cyberballGameController);

        this.gameConfig  = {
            type: Phaser.AUTO,
            width: this.gameWidth,
            height: this.gameHeight,
            scene,
            physics: {
                default: 'arcade'
            }
        };

        setTimeout(() => {
            cyberballGameController.removeCPUfromGame(this.settings.computerPlayers[0].name);
        }, 5000);

        setTimeout(() => {
            cyberballGameController.endGame("timeout");
        }, 10000);
    }
}
