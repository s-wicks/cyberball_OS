define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Cyberball';
            config.map([
                { route: ['', 'LandingPage'], name: 'LandingPage', moduleId: 'pages/LandingPage/LandingPage' },
                { route: 'home', name: 'home', moduleId: 'pages/Home/home' },
                { route: 'game', name: 'game', moduleId: 'pages/Game/game' },
                { route: 'PresetPage', name: 'PresetPage', moduleId: 'pages/PresetPage/PresetPage' },
                { route: 'message-test', name: 'message-test', moduleId: 'pages/message-test' }
            ]);
        };
        return App;
    }());
    exports.App = App;
});
;
define('text!app.html',[],function(){return "<template>\n    <router-view></router-view>\n</template>\n";});;
define('behaviors/get-variant-value',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getVariantValue = void 0;
    function getVariantValue(base, variance) {
        return base + (Phaser.Math.RND.between(0, variance) * Phaser.Math.RND.sign());
    }
    exports.getVariantValue = getVariantValue;
});
;
define('enums/leave-trigger',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LeaveTrigger = void 0;
    var LeaveTrigger;
    (function (LeaveTrigger) {
        LeaveTrigger[LeaveTrigger["None"] = 0] = "None";
        LeaveTrigger[LeaveTrigger["Turn"] = 1] = "Turn";
        LeaveTrigger[LeaveTrigger["Time"] = 2] = "Time";
        LeaveTrigger[LeaveTrigger["Ignored"] = 4] = "Ignored";
        LeaveTrigger[LeaveTrigger["OtherLeaver"] = 8] = "OtherLeaver";
        LeaveTrigger[LeaveTrigger["TimeIgnored"] = 16] = "TimeIgnored";
    })(LeaveTrigger || (exports.LeaveTrigger = LeaveTrigger = {}));
});
;
define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});
;
define('helpers',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActiveBallPosition = exports.getCaughtBallPosition = void 0;
    function getCaughtBallPosition(player) {
        return { x: player.x + (player.flipX ? -50 : 50), y: player.y - 15 };
    }
    exports.getCaughtBallPosition = getCaughtBallPosition;
    function getActiveBallPosition(player) {
        return { x: player.x + (player.flipX ? 40 : -40), y: player.y - 20 };
    }
    exports.getActiveBallPosition = getActiveBallPosition;
});
;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    environment_1 = __importDefault(environment_1);
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        aurelia.use.developmentLogging(environment_1.default.debug ? 'debug' : 'warn');
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
;
define('models/banter-model',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BanterModel = void 0;
    var BanterModel = (function () {
        function BanterModel() {
        }
        return BanterModel;
    }());
    exports.BanterModel = BanterModel;
});
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('models/cpu-model',["require", "exports", "./player-model"], function (require, exports, player_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cpu = void 0;
    var Cpu = (function (_super) {
        __extends(Cpu, _super);
        function Cpu(settings, gameReference) {
            return _super.call(this, settings, gameReference) || this;
        }
        return Cpu;
    }(player_model_1.Player));
    exports.Cpu = Cpu;
});
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define('models/cpu-settings-model',["require", "exports", "./player-settings-model"], function (require, exports, player_settings_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CpuSettingsModel = void 0;
    var CpuSettingsModel = (function (_super) {
        __extends(CpuSettingsModel, _super);
        function CpuSettingsModel(init) {
            var _this = _super.call(this) || this;
            _this.targetPreference = [50, 50];
            _this.throwDelay = 500;
            _this.throwDelayVariance = 200;
            _this.catchDelay = 500;
            _this.catchDelayVariance = 200;
            _this.leaveTurnChance = 100;
            _this.leaveTimeChance = 100;
            _this.leaveIgnoredChance = 100;
            _this.leaveTimeIgnoredChance = 100;
            _this.leaveOtherLeaverChance = 50;
            if (init)
                Object.assign(_this, init);
            return _this;
        }
        return CpuSettingsModel;
    }(player_settings_model_1.PlayerSettingsModel));
    exports.CpuSettingsModel = CpuSettingsModel;
});
;
define('models/player-model',["require", "exports", "./../behaviors/get-variant-value", "enums/leave-trigger"], function (require, exports, get_variant_value_1, leave_trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    var Player = (function () {
        function Player(settings, gameReference) {
            this.hasBall = false;
            this.settings = settings;
            this.gameReference = gameReference;
        }
        Player.prototype.create = function () {
            var position = this.getPosition();
            this.group = this.gameReference.physics.add.group({ immovable: true, allowGravity: false });
            this.sprite = this.group.create(position.x, position.y, 'player', 'active/1.png');
            if (this.settings.tint)
                this.sprite.setTint(parseInt(this.settings.tint.substring(1), 16));
            this.nameText = this.gameReference.add.text(position.x, position.y + this.sprite.height / 2 + 10, this.settings.name, { fontFamily: 'Arial', color: '#000000' }).setOrigin(0.5);
            if (this.settings.portrait) {
                var portraitPosition = this.getPortraitPosition();
                this.portrait = this.gameReference.add.image(portraitPosition.x, portraitPosition.y, 'playerPortrait');
            }
            if ((this.settings.leaveTrigger & leave_trigger_1.LeaveTrigger.Time) === leave_trigger_1.LeaveTrigger.Time) {
                this.leaveTimeThreshold = Date.now() + (0, get_variant_value_1.getVariantValue)(this.settings.leaveTime, this.settings.leaveTimeVariance) * 1000;
            }
            if ((this.settings.leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored) {
                this.leaveIgnoreTimeThreshold = Date.now() + (0, get_variant_value_1.getVariantValue)(this.settings.leaveTimeIgnored, this.settings.leaveTimeIgnoredVariance) * 1000;
            }
        };
        Player.prototype.getPosition = function () {
            var padding = 75;
            if (this.gameReference.settings.hasPortraits)
                padding += this.gameReference.settings.portraitHeight + this.gameReference.settings.portraitPadding * 2;
            return new Phaser.Geom.Point(this.gameReference.sys.canvas.width / 2, this.gameReference.sys.canvas.height - padding);
        };
        Player.prototype.getPortraitPosition = function () {
            var position = this.getPosition();
            return new Phaser.Geom.Point(position.x, position.y + this.gameReference.settings.portraitHeight / 2 + this.gameReference.settings.portraitPadding * 2 + this.sprite.height / 2 + 10);
        };
        return Player;
    }());
    exports.Player = Player;
});
;
define('models/player-settings-model',["require", "exports", "enums/leave-trigger"], function (require, exports, leave_trigger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayerSettingsModel = void 0;
    var PlayerSettingsModel = (function () {
        function PlayerSettingsModel(init) {
            this.leaveTrigger = leave_trigger_1.LeaveTrigger.None;
            this.leaveTurn = 10;
            this.leaveTurnVariance = 2;
            this.leaveTime = 120;
            this.leaveTimeVariance = 30;
            this.leaveIgnored = 10;
            this.leaveIgnoredVariance = 2;
            this.leaveTimeIgnored = 45;
            this.leaveTimeIgnoredVariance = 15;
            this.leaveOtherLeaver = 2;
            if (init)
                Object.assign(this, init);
        }
        return PlayerSettingsModel;
    }());
    exports.PlayerSettingsModel = PlayerSettingsModel;
});
;
define('models/settings-model',["require", "exports", "./player-settings-model", "./cpu-settings-model"], function (require, exports, player_settings_model_1, cpu_settings_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultSettings = exports.SettingsModel = void 0;
    var SettingsModel = (function () {
        function SettingsModel(init) {
            this.player = new player_settings_model_1.PlayerSettingsModel();
            this.throwCount = 10;
            this.timeLimit = 0;
            this.displayTimeLimit = false;
            this.timeLimitText = 'Time Limit:';
            this.ballSpeed = 500;
            this.useSchedule = false;
            this.scheduleHonorsThrowCount = false;
            this.schedule = [
                1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0
            ];
            this.baseUrl = './assets';
            this.ballSprite = 'ball.png';
            this.portraitHeight = 75;
            this.portraitPadding = 10;
            this.chatEnabled = false;
            this.gameOverText = "Game Over";
            this.gameOverOpacity = 0.5;
            Object.assign(this, init);
        }
        Object.defineProperty(SettingsModel.prototype, "hasPortraits", {
            get: function () {
                return this.player.portrait || this.computerPlayers.some(function (cpu) { return cpu.portrait; });
            },
            enumerable: false,
            configurable: true
        });
        return SettingsModel;
    }());
    exports.SettingsModel = SettingsModel;
    exports.defaultSettings = new SettingsModel({
        player: new player_settings_model_1.PlayerSettingsModel({
            name: 'Player 1'
        }),
        computerPlayers: [
            new cpu_settings_model_1.CpuSettingsModel({
                name: 'Player 2'
            }),
            new cpu_settings_model_1.CpuSettingsModel({
                name: 'Player 3'
            })
        ]
    });
});
;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('pages/Game/game',["require", "exports", "../../scenes/cyberball", "../../models/settings-model", "phaser"], function (require, exports, cyberball_1, settings_model_1, phaser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameViewModel = void 0;
    phaser_1 = __importDefault(phaser_1);
    var GameViewModel = (function () {
        function GameViewModel() {
            this.settings = settings_model_1.defaultSettings;
            this.gameWidth = 800;
            this.gameHeight = 460;
            this.chatMessages = [];
        }
        GameViewModel.prototype.activate = function (params) {
            if ('settings' in params) {
                this.settings = new settings_model_1.SettingsModel(JSON.parse(atob(params.settings)));
            }
            if ('playerName' in params) {
                this.settings.player.name = params.playerName;
            }
            if (this.settings.hasPortraits) {
                this.gameHeight += this.settings.portraitHeight * 2 + this.settings.portraitPadding * 4;
            }
        };
        GameViewModel.prototype.bind = function () {
            this.gameConfig = {
                type: phaser_1.default.AUTO,
                width: this.gameWidth,
                height: this.gameHeight,
                scene: new cyberball_1.CyberballScene(this.settings),
                physics: {
                    default: 'arcade'
                }
            };
        };
        GameViewModel.prototype.sendMessage = function () {
            this.chatMessages.push({
                sender: this.settings.player.name,
                text: this.chatMessage
            });
            this.chatMessage = '';
        };
        return GameViewModel;
    }());
    exports.GameViewModel = GameViewModel;
});
;
define('text!pages/Game/game.css',[],function(){return "canvas {\n    max-width: 100%;\n}\n\n.chat-log {\n    border: 1px solid black;\n    border-bottom: 0;\n    height: 100px;\n    overflow-y: auto;\n}\n\n.chat-input {\n    display: flex;\n}\n\n.chat-input input {\n    flex: 1;\n}\n";});;
define('text!pages/Game/game.html',[],function(){return "<template>\n    <require from=\"./game.css\"></require>\n\n    <phaser-game config.bind=\"gameConfig\"></phaser-game>\n\n    <div if.bind=\"settings.chatEnabled\" class=\"chat\" css=\"width: ${gameWidth}px\">\n        <div class=\"chat-log\">\n            <div repeat.for=\"message of chatMessages\">\n                <strong>${message.sender}</strong>: <span>${message.text}</span>\n            </div>\n        </div>\n\n        <form class=\"chat-input\" submit.delegate=\"sendMessage()\">\n            <input value.bind=\"chatMessage\" />\n            <button type=\"submit\">Send</button>\n        </form>\n    </div>\n</template>\n";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('pages/Home/home',["require", "exports", "aurelia-templating-resources", "aurelia-framework", "models/settings-model", "models/cpu-settings-model", "clipboard", "../Setting-Service"], function (require, exports, aurelia_templating_resources_1, aurelia_framework_1, settings_model_1, cpu_settings_model_1, clipboard_1, Setting_Service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HomeViewModel = void 0;
    clipboard_1 = __importDefault(clipboard_1);
    var HomeViewModel = (function () {
        function HomeViewModel(signaler, settingsService) {
            this.signaler = signaler;
            this.settingsService = settingsService;
            this.activeTab = 'player';
            this.activeCPUTab = 0;
            this.settings = settings_model_1.defaultSettings;
            this.currentSetting = '';
            this.showModal = false;
            this.presetName = '';
            this.presetDescription = '';
            this.showFileModal = false;
            this.fileName = '';
            this.sliderValue = this.settings.gameOverOpacity;
        }
        HomeViewModel.prototype.updateOpacity = function () {
            this.settings.gameOverOpacity = this.sliderValue / 100;
            this.previewGame();
        };
        HomeViewModel.prototype.bind = function () {
            var _this = this;
            this.clipboard = new clipboard_1.default('#copy');
            setTimeout(function () {
                _this.previewGame();
            }, 0);
        };
        HomeViewModel.prototype.unbind = function () {
            this.clipboard.destroy();
        };
        HomeViewModel.prototype.showInfo = function (setting) {
            var sidebar = this.sidebar;
            var content = this.sidebarContent;
            var newContent = '';
            switch (setting) {
                case 'color':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit the color of the participant’s player by clicking on the box next to “Tint Color” to bring up a color palette.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'Here, you will edit the color of the participant’s player. By clicking on the box next to “Color,” a color palette will come up that you can use to determine the color you would like to fill in the participant’s player. You can also enter values into the RGB scales if you would like to find a color of your choosing this way. We recommend using <a href="https://www.color-hex.com" target="_blank">color-hex.com</a> when trying to find specific RGB values when choosing the color to make your participant’s player. Click for more information.';
                    break;
                case 'playerHeader':
                    newContent = '<span class="description-header">Brief Description:</span><br>This is the player the participant in your study will control.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'This is the player the participant in your study will control. The participant will use this player to throw and catch a virtual ball with one or more computer-controlled avatars. In this respective section, you have the option to edit the name of the player the participant will be using, the color of the participant’s player, and the image that will be attached to the participant’s player during the game (“Portrait”). Click for more information.';
                    break;
                case 'portrait':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can insert an image that will be placed below the participant’s player. Be sure to include your image with (format dimensions).<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'This is where you will insert a portrait presented below the participant’s player. By using an image with (specific setting), you will be able to insert any image of your choosing. Anything larger than (specific setting) will not load. Click for more information.';
                    break;
                case 'leaveTrigger':
                    newContent = '<span class="description-header">Brief Description:</span><br>By editing the “Leave Triggers” settings, you are indicating when the participant is presented with a button they can click to leave the game.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'By editing the “Leave Triggers” settings, you are setting when the participant is presented with a button they can click to leave Cyberball. In this respective section, you have the option to choose when the participant is presented with a button to leave based on how many throws are performed collectively between the participant and the computer-controlled players (“Throws Elapsed”), how long the game is played (“Time Elapsed”), how many times the participant is ignored by the computer-controlled players (“Throws Ignored”), the accumulation of the time the player is ignored by the computer-controlled players (“Time Ignored”), or based on how many other computer-controlled players left the game (“Other Players Leaving”). Click for more information.';
                    break;
                case 'throwsElapsed':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set the number of throws between all players before the participant is given the option to leave the game.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'Here, you will set the number of throws that must be thrown between all players (including the participant) before the participant is given the option to leave the game. After the set number of throws, a red, “next” button will appear in Qualtrics that the participant will click on to leave the game.\n' +
                        '\n' +
                        'For example, if you wanted to see how soon the participant would leave after 30 throws, you would set the value under “Throws Elapsed Leave Threshold” to 30. You also have the option to add variability to the number of total throws before the participant is give the option to leave by setting the throws elapsed variance. Let’s use 5-toss variance as an example. By placing a variance of 5 under “Variance” for our 30-toss example, the games will now range from 25 to 35 tosses total before a participant is presented with a button they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.';
                    break;
                case 'timeElapsed':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how much time has to pass before the participant is given the option to leave the game.<br><br>' +
                        'Here, you will set the amount of time that has to pass before the participant is given the opportunity to leave the game. After the set amount of time has passed, a red, “next” button will appear in Qualtrics that the participant will click to leave the game. For example, if you wanted to see how soon the participant would leave after 60 seconds of being in the game, you would set the value under “Time Elapsed Leave Threshold” to 60. You also have the option to add variability to the amount of time that has to pass before the participant is given the option to leave with time elapsed variance. Let’s use a 20-second variance as an example. By placing a variance of 20 under “Variance” for our 60-second example, the games will now range from 40 to 80 seconds total before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.';
                    break;
                case 'throwsIgnored':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how many times the participant is ignored by the computer-controlled players before they are given the option to leave the game.<br><br>' +
                        'Here, you will set the number of times the participant has to be ignored by the computer-controlled players before the participant is given the opportunity to leave the game. After being ignored for the set number of times has passed, a red, “next” button will appear in Qualtrics that the participant will click to leave the game.\n' +
                        '\n' +
                        'For example, if you wanted to see how soon the participant would leave after being ignored 10 times by the computer-controlled players, you would set the value under “Ignored Throws\n' +
                        '\n' +
                        'Leave Threshold” to 10. You can also use the throws ignored variance to add variability in the amount of throws participants are ignored for before the participant is given the option to leave. Let’s use a 3-throws variance as an example. By placing a variance of 3 under “Variance” for our 10-throws-ignored example, the games will now range from 7-13 throws where the participant is ignored before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.';
                    break;
                case 'timeIgnored':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how long the participant is ignored by the computer-controlled players before they are given the option to leave the game.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'Here, you will set how long the participant is ignored by the computer-controlled players before they are given the option to leave the game. After the set time of being ignored has passed, a red, “next” button will appear in Qualtrics that the participant will click to leave the game.\n' +
                        '\n' +
                        'For example, if you wanted to see how soon the participant would leave after being ignored for 45 seconds by the computer-controlled players, you would set the value under “Ignored Time Leave Threshold” to 45. You also have the option to add variability to the amount of time participants are ignored for before the participant is given the option to leave with time ignored variance. Let’s use a 15-second variance as an example. By placing a variance of 15 under “Variance” for our 45-second example, the games will now range from 30-60 seconds where the participant is ignored before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.';
                    break;
                case 'otherPlayersLeaving':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how many computer-controlled players leave the game before the participant is given the option to leave.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'Here, you will set how many computer-controlled players leave the game before the participant is given the option to leave. After the set number of players leave, a red, “next” button will appear in Qualtrics that the participant can click to leave the game.\n' +
                        '\n' +
                        'For example, if you wanted to see how soon the participant would leave after 2 of the computer-controlled players in your study left, you would set the value under “Other Players Leaving” to 2. Click for more information.';
                    break;
                case 'cpus':
                    newContent = '<span class="description-header">Brief Description:</span><br>This is the computer-controlled player that your participant will play a virtual game of catch-and-toss with. You can also add additional computer-controlled players<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'This is the computer-controlled player that your participant will play a virtual game of catch-and-toss with. The CPUs will conduct themselves in different ways throughout the game depending on the settings you, as the researcher, set for them. In this respective section, you have the option to edit the name of the computer-controlled player, the color of the computer-controlled player, and the image that will be attached to the computer-controlled player during the game (“Portrait”). You also have the option to add additional CPUs if you would like more than one computer-controlled player to participate with the participant’s player by clicking on “Add CPU”. Click for more information.';
                    break;
                case 'throwDelay':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands in a “throw-ready” stance before they actually throw the ball<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'You can edit how long the computer-controlled player stands in a “throw-ready” stance before they actually throw the ball. For example, a value of 500 in the Throw Delay column will result in the computer-controlled player standing in a “throw-ready” stance for 5 seconds before they throw the ball to their next target. You also have the option to add variability to how long the computer-controlled player stays in this stance before they throw the ball. Let’s use a variance of 200 as an example. By placing a variance of 200 for our 500-valued throw delay, the computer-controlled player will now hold the ball for 3-7 seconds before they throw the ball to their next target. This allows you the opportunity to lower participants’ suspicion by not having the computer-controlled player in the “throw-ready” position for the same amount of time each time they get in position before throwing. Each computer-controlled player that you choose to add can be set with a unique throw delay, as well as a unique variance. Click for more information.';
                    break;
                case 'catchDelay':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands with the ball after catching it before they prepare to throw the ball.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'You can edit how long the computer-controlled player stands with the ball after catching it before they prepare to throw the ball. For example, a value of 500 in the Catch Delay column will result in the computer-controlled player standing in a “caught-ball” stance for 5 seconds before they move into a “throw-ready” stance. You also have the option to add variability to how long the computer-controlled player stays in this stance before they move into their “throw-ready” stance. Let’s use a variance of 200 as an example. By placing a variance of 200 for our 500-valued catch delay, the computer-controlled player will now hold the ball for 3-7 seconds before they move into their “throw-ready” stance. This allows you the opportunity to lower participants’ suspicion by not having the computer-controlled player in the “caught-ball” position for the same amount of time each time they get the ball before moving into the “throw-ready” position. Each computer-controlled player that you choose to add can be set with a unique catch delay, as well as a unique variance. Click for more information.';
                    break;
                case 'targetPreference':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how often the computer-controlled player throws to the participant’s player and additional CPU players you add.<br><br>' +
                        '<span class="description-header">Full Description:</span><br>' +
                        'You can edit how often the computer-controlled player throws to the participant’s player and additional CPU players you add. For example, if you had a study that consisted of the participant’s player, the original computer-controlled player that you have\n' +
                        '\n' +
                        'been editing, and a computer-controlled player that you chose to add, you would enter two values that would constitute how often the computer-controlled player that you have been editing will throw to the other two players. In this example, if you were to place 50 in one box and 50 in the second box, the computer-controlled player that you have been editing will equally throw the ball to the other two players throughout the game (50%/50%). The first box’s value represents the share of throws that the participant’s player will receive from this computer-controlled player, while the second box’s value represents the share of throws that the added CPU will receive.';
                    break;
                default:
                    newContent = "Here's some information about your settings...";
            }
            if (sidebar.classList.contains('sidebar-open') && this.currentSetting === setting) {
                this.closeSidebar();
                this.currentSetting = '';
                return;
            }
            content.innerHTML = newContent;
            this.currentSetting = setting;
            if (!sidebar.classList.contains('sidebar-open')) {
                sidebar.classList.add('sidebar-open');
            }
        };
        HomeViewModel.prototype.closeSidebar = function () {
            this.sidebar.classList.remove('sidebar-open');
        };
        HomeViewModel.prototype.addCPU = function () {
            var _this = this;
            this.settings.computerPlayers.push(new cpu_settings_model_1.CpuSettingsModel({
                name: "Player ".concat(this.settings.computerPlayers.length + 2)
            }));
            this.settings.computerPlayers.forEach(function (cpu) {
                while (cpu.targetPreference.length != _this.settings.computerPlayers.length)
                    cpu.targetPreference.push(0);
            });
            this.activeCPUTab = this.settings.computerPlayers.length - 1;
        };
        HomeViewModel.prototype.removeCPU = function () {
            if (this.settings.computerPlayers.length > 1) {
                this.settings.computerPlayers.pop();
                this.settings.computerPlayers.forEach(function (cpu) {
                    cpu.targetPreference.pop();
                });
                if (this.activeCPUTab >= this.settings.computerPlayers.length) {
                    this.activeCPUTab = this.settings.computerPlayers.length - 1;
                }
            }
        };
        HomeViewModel.prototype.saveSettings = function () {
            this.signaler.signal('save-settings');
        };
        Object.defineProperty(HomeViewModel.prototype, "url", {
            get: function () {
                var url = document.location.origin + document.location.pathname;
                url += '#game?settings=';
                url += btoa(JSON.stringify(this.settings));
                return url;
            },
            enumerable: false,
            configurable: true
        });
        HomeViewModel.prototype.testGame = function () {
            window.open(this.url);
        };
        Object.defineProperty(HomeViewModel.prototype, "clipboardText", {
            get: function () {
                return JSON.stringify(this.settings, null, 2);
            },
            enumerable: false,
            configurable: true
        });
        HomeViewModel.prototype.setupButtons = function () {
            var _this = this;
            var startPreviewButton = document.getElementById('startPreview');
            startPreviewButton.addEventListener('click', function () {
                _this.previewGame();
            });
            var refreshPreviewButton = document.getElementById('refreshPreview');
            refreshPreviewButton.addEventListener('click', function () {
                var iframe = document.getElementById('gamePreview');
                iframe.src = 'about:blank';
                setTimeout(function () {
                    iframe.src = _this.url;
                }, 100);
            });
        };
        HomeViewModel.prototype.previewGame = function () {
            var gamePreviewUrl = this.url;
            var iframe = document.getElementById('gamePreview');
            iframe.src = 'about:blank';
            iframe.src = gamePreviewUrl;
        };
        HomeViewModel.prototype.attached = function () {
            if (this.settingsService.settings) {
                this.settings = this.settingsService.settings;
            }
            this.setupButtons();
            this.updatePreviewOnInputChange();
        };
        HomeViewModel.prototype.updatePreviewOnInputChange = function () {
            var _this = this;
            var inputElements = document.querySelectorAll('.input input');
            inputElements.forEach(function (input) {
                input.addEventListener('input', function () {
                    _this.previewGame();
                });
            });
        };
        HomeViewModel.prototype.nextTab = function () {
            if (this.activeTab === 'player') {
                this.activeTab = 'cpus';
            }
            else if (this.activeTab === 'cpus') {
                this.activeTab = 'gameplay';
            }
            else if (this.activeTab === 'gameplay') {
                this.activeTab = 'buttons';
            }
        };
        HomeViewModel.prototype.previousTab = function () {
            if (this.activeTab === 'buttons') {
                this.activeTab = 'gameplay';
            }
            else if (this.activeTab === 'gameplay') {
                this.activeTab = 'cpus';
            }
            else if (this.activeTab === 'cpus') {
                this.activeTab = 'player';
            }
        };
        Object.defineProperty(HomeViewModel.prototype, "settingsForPreview", {
            get: function () {
                return this.settings;
            },
            enumerable: false,
            configurable: true
        });
        HomeViewModel.prototype.saveSettingsToLocalStorage = function () {
            this.showModal = true;
        };
        HomeViewModel.prototype.cancelSave = function () {
            this.showModal = false;
            this.presetName = '';
            this.presetDescription = '';
        };
        HomeViewModel.prototype.confirmSave = function () {
            if (this.presetName.trim() === '') {
                alert('Please enter a preset name.');
                return;
            }
            var presetData = {
                description: this.presetDescription,
                settings: this.settings
            };
            localStorage.setItem(this.presetName, JSON.stringify(presetData));
            this.showModal = false;
            this.presetName = '';
            this.presetDescription = '';
        };
        HomeViewModel.prototype.saveSettingsToFile = function () {
            this.showFileModal = true;
        };
        HomeViewModel.prototype.cancelFileSave = function () {
            this.showFileModal = false;
            this.fileName = '';
        };
        HomeViewModel.prototype.confirmFileSave = function () {
            if (this.fileName.trim() === '') {
                alert('Please enter a file name.');
                return;
            }
            var settingsString = JSON.stringify(this.settings, null, 2);
            var blob = new Blob([settingsString], { type: 'text/plain;charset=utf-8' });
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = this.fileName.endsWith('.txt') ? this.fileName : "".concat(this.fileName, ".txt");
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            this.showFileModal = false;
            this.fileName = '';
        };
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], HomeViewModel.prototype, "sliderValue", void 0);
        __decorate([
            (0, aurelia_framework_1.computedFrom)('settings', 'settings.player', 'settings.computerPlayers', 'settings.someOtherProperty', 'settings.anotherProperty'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], HomeViewModel.prototype, "settingsForPreview", null);
        HomeViewModel = __decorate([
            (0, aurelia_framework_1.autoinject)(),
            __metadata("design:paramtypes", [aurelia_templating_resources_1.BindingSignaler, Setting_Service_1.SettingsService])
        ], HomeViewModel);
        return HomeViewModel;
    }());
    exports.HomeViewModel = HomeViewModel;
});
;
define('text!pages/Home/home.css',[],function(){return "\n\n\nbody {\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n    background-color: #f7f7f7;\n    color: #181818;\n    margin: 0;\n    padding: 0;\n}\n\niframe {\n    transform: scale(3) translate(-50px, -50px);\n    transform-origin: 100px 100px;\n}\n\n.container {\n    text-align: center;\n    background-color: #ffffff;\n    padding: 50px;\n    border-radius: 10px;\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\n    position: relative;\n    /*//width: 80%; !* This is the current width setting, which is responsive *!*/\n    max-width: 400px; /* This is the maximum width it can grow to */\n    min-width: 400px; /* This is the minimum width it can shrink to */\n}\n\na {\n    text-decoration: none;\n    display: inline-block;\n    padding: 8px 16px;\n}\n\na:hover {\n    background-color: #9d9d9d;\n    color: black;\n}\n\n.previous {\n    background-color: #ddd;\n    color: black;\n    position: absolute;\n    top: 50%;  /* This will center the button vertically */\n    left: 0;  /* This will make the button hug the left wall */\n    transform: translateY(-50%); /* This will ensure the button is truly vertically centered */\n    left: 6px;\n}\n\n.next {\n\n    background-color: #ddd;\n    color: black;\n    position: absolute;\n    top: 50%;  /* This will center the button vertically */\n    right: 0;  /* This will make the button hug the right wall */\n    transform: translateY(-50%); /* This will ensure the button is truly vertically centered */\n    right: 6px;\n}\n\n.round {\n    border-radius: 50%;\n}\n\n\n.landing-page {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n    background-color: #f7f7f7;\n}\n\n.container {\n    text-align: center;\n    background-color: #ffffff;\n    padding: 50px;\n    border-radius: 10px;\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\n    position: relative;\n    width: 80%;\n    max-width: 1200px;\n}\n\n.input {\n    display: flex;\n    align-items: center;\n}\n\n\n\n.input label {\n    flex: 1; /* Allow label to grow as needed */\n    text-align: left; /* Left-align the label text */\n    margin-right: 10px; /* Space between the label and the input */\n    margin-top: 5px;\n    margin-bottom: 5px;\n}\n\n.input input[type=\"number\"] {\n    flex: 1; /* Allow input to take up the remaining space */\n    max-width: 200px; /* Remove max-width to allow it to grow */\n\n}\n\n.input input[type=\"text\"] {\n    flex: 1; /* Allow input to take up the remaining space */\n    max-width: 200px; /* Remove max-width to allow it to grow */\n\n}\n\n.input input[type=\"checkbox\"] {\n   margin-right: 185px;\n\n}\n\n.input input[type=\"color\"] {\n    margin-right: 150px;\n    margin-top: 5px;\n    margin-bottom: 5px;\n}\n\n.input input[type=\"range\"] {\n    margin-right: 30px;\n\n}\n\n.range-container {\n    display: flex;\n    align-items: center;\n}\n\n.range-value {\n    margin-left: 2px; /* Add some spacing between the range input and the value */\n}\n\n.button-container {\n    display: flex;\n    flex-direction: column; /* Stack items vertically */\n    align-items: center; /* Center items horizontally */\n}\n\n.button-container button {\n    display: block;\n    margin-bottom: 5px;\n}\n\n\n.tooltip-icon {\n    margin-right: 1px;\n}\n\n.input-label{\n    margin-bottom: 1px;\n}\n\n.h2-tooltip {\n    font-size: 1rem;\n    vertical-align: middle;\n}\n\n.input label + * {\n    box-sizing: border-box;\n    max-width: 300px;\n}\n\n.description-header {\n    font-weight: bold;\n    text-decoration: underline;\n    margin-bottom: 8px; /* Add space below the headers */\n    display: block; /* Ensure each header is on a new line */\n}\n\n.input input[type=text], .input input[type=number], textarea {\n    flex: 1 1 100%;\n    min-width: 0;\n    width: auto;\n}\n\n.column {\n    display: flex;\n    flex-direction: column;\n}\n\n.target-preference-inputs {\n    display: flex;\n}\n\n\n\n\n\n.bottom-buttons {\n    background-color: #007BFF;\n    color: #FFFFFF;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 5px;\n    font-size: 16px;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n}\n\n.bottom-buttons:hover {\n    background-color: #0056b3;\n}\n\n.bottom-buttons:active {\n    background-color: #003d80;\n}\n\n.bottom-buttons:focus {\n    outline: none;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);\n}\n.tabs {\n    position: absolute;\n    top: 0;\n    right: 0;\n    display: flex;\n    /* This will ensure the tabs are displayed horizontally and new tabs are added to the left */\n    padding: 0;\n    margin: 0;\n    align-items: flex-start; /* This ensures the tabs hug the top of the container */\n}\n\n\n.tablinks:first-child {\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n.tablinks {\n    padding: 10px 15px;\n    margin-bottom: -2px;\n    border: 1px solid #ccc;\n    border-bottom: none;\n    cursor: pointer;\n    background-color: #e0e0e0;\n    transition: background-color 0.3s;\n}\n\n.tablinks:not(:last-child) {\n    margin-right: 5px;\n}\n\n.tablinks:hover {\n    background-color: #d0d0d0;\n}\n\n.tablinks.active {\n    background-color: #007BFF;\n    font-weight: bold;\n    border-color: #007BFF;\n    color: white;\n}\n\n.bottom-buttons.disabled {\n    background-color: #a5a5a5;\n    cursor: not-allowed;\n    pointer-events: none;\n    color: #777777;\n}\n\n.tablinks:focus {\n    outline: none;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);\n}\n\niframe {\n    pointer-events: auto;\n}\n\n.tooltip-icon {\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    background-color: #007BFF;\n    color: #FFFFFF;\n    border-radius: 50%;\n    text-align: center;\n    line-height: 20px;\n    cursor: pointer;\n\n}\n\n.cpuButtons{\n    margin-bottom: 10px;\n}\n.configHeader{\n    text-align: center;\n}\n\n.sidebar {\n    position: fixed;\n    top: 0;\n    right: -340px;\n    width: 300px;\n    height: 100%;\n    background-color: #FFFFFF;\n    padding: 20px;\n    transition: right 0.3s;\n    z-index: 1000;\n    color: #050505;\n}\n\n.close-btn {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    background-color: #FF0000;\n    color: #FFFFFF;\n    border: none;\n    border-radius: 50%;\n    width: 25px;\n    height: 25px;\n    text-align: center;\n    line-height: 25px;\n    cursor: pointer;\n}\n\n.sidebar-open {\n    right: 0;\n}\n\n.modal {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 2000;\n}\n\n.modal-content {\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 10px;\n    width: 80%;\n    max-width: 400px;\n}\n\n.modal-buttons {\n    display: flex;\n    justify-content: space-between;\n    margin-top: 20px;\n}\n";});;
define('text!pages/Home/home.html',[],function(){return "<template>\n    <require from=\"resources/value-converters/json-value-converter\"></require>\n    <require from=\"resources/value-converters/integer-value-converter\"></require>\n    <require from=\"resources/value-converters/number-value-converter\"></require>\n    <require from=\"resources/value-converters/integer-array-value-converter\"></require>\n    <require from=\"resources/value-converters/flag-value-converter\"></require>\n    <require from=\"./home.css\"></require>\n    <require from=\"../LandingPage/LandingPage.css\"></require>\n\n    <div class=\"landing-page\">\n\n        <div>\n            <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\" class=\"welcome-image\">\n            <h1 class=\"configHeader\">Cyberball Configuration Builder</h1>\n            <div style=\"width: 100%; height: 40%; overflow: hidden; position: relative; margin-topG: -20px; margin-bottom: -60px \">\n                <iframe id=\"gamePreview\" ></iframe>\n            </div>\n            <div class=\"container\">\n\n                <!-- Player Tab -->\n                <div if.bind=\"activeTab === 'player'\" class=\"tabcontent\">\n\n                    <h2>Human <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('playerHeader')\">?</span>\n                    </h2>\n                    <div style=\"position: relative; z-index: 1;\">\n\n                    <div class=\"input\">\n                        <label>Name</label>\n                        <input type=\"text\" value.bind=\"settings.player.name\" keyup.delegate=\"previewGame()\"/>\n\n                    </div>\n\n                        <div class=\"input\">\n                            <label>Portrait <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('portrait')\">?</span></label>\n                            <input type=\"text\" value.bind=\"settings.player.portrait\" keyup.delegate=\"previewGame()\">\n                        </div>\n\n                    <div class=\"input\">\n                        <label>Tint Color <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('color')\">?</span></label>\n                        <input type=\"color\" value.bind=\"settings.player.tint\" input.delegate=\"previewGame()\"\n                               change.delegate=\"previewGame()\"/>\n                    </div>\n\n                    <h2>Leave Triggers <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('leaveTrigger')\">?</span></h2>\n                    <div class=\"column\">\n                        <label>\n                            <input type=\"checkbox\"\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:1\"/>\n                            Throws Elapsed <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsElapsed')\">?</span>\n                        </label>\n                        <label>\n                            <input type=\"checkbox\"\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:2\"/>\n                            Time\n                            Elapsed\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeElapsed')\">?</span>\n                        </label>\n                        <label>\n                            <input type=\"checkbox\"\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:4\"/>\n                            Throws Ignored\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsIgnored')\">?</span>\n                        </label>\n                        <label>\n                            <input type=\"checkbox\"\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:16\"/>\n                            Time\n                            Ignored\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeIgnored')\">?</span>\n                        </label>\n                        <label>\n                            <input type=\"checkbox\"\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:8\"/>\n                            Other\n                            Players Leaving\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('otherPlayersLeaving')\">?</span>\n                        </label>\n                    </div>\n\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:1\">\n                        <label>Throws Elapsed Leave Threshold/Variance</label>\n\n                        <div>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTurn\"/>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTurnVariance\"/>\n                        </div>\n                    </div>\n\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:2\">\n                        <label>Time Elapsed Leave (s) Threshold/Variance (s)</label>\n\n                        <div>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTime\"/>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeVariance\"/>\n                        </div>\n                    </div>\n\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:4\">\n                        <label>Ignored Throws Leave Threshold/Variance</label>\n\n                        <div>\n                            <input type=\"number\" value.bind=\"settings.player.leaveIgnored\"/>\n                            <input type=\"number\" value.bind=\"settings.player.leaveIgnoredVariance\"/>\n                        </div>\n                    </div>\n\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:16\">\n                        <label>Ignored Time Leave (ms) Threshold/Variance (ms)</label>\n\n                        <div>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeIgnored\"/>\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeIgnoredVariance\"/>\n                        </div>\n                    </div>\n\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:8\">\n                        <label>Others Left Leave Threshold</label>\n\n                        <div>\n                            <input type=\"number\" value.bind=\"settings.player.leaveOtherLeaver\"/>\n                        </div>\n                    </div>\n                </div>\n</div>\n                <!-- CPUs Tab -->\n                <div if.bind=\"activeTab === 'cpus'\" class=\"tabcontent\">\n                    <div class=\"tab\">\n                        <button repeat.for=\"cpu of settings.computerPlayers\"\n                                class=\"tablinks ${$index === activeCPUTab ? 'active' : ''}\"\n                                click.delegate=\"activeCPUTab = $index\">\n                            CPU ${$index + 1}\n                        </button>\n                    </div>\n                    <h2>\n                        CPUs <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('cpus')\">?</span>\n                    </h2>\n                    <div class=\"cpuButtons\">\n                        <button class=\"bottom-buttons\" click.delegate=\"addCPU()\">+ Add CPU</button>\n                        <button class=\"bottom-buttons ${settings.computerPlayers.length == 1 ? 'disabled' : ''}\"\n                                click.delegate=\"removeCPU()\">- Remove CPU\n                        </button>\n                    </div>\n\n                    <!-- Sub-tabs for each CPU -->\n\n\n                    <!-- Details for each CPU -->\n                    <div repeat.for=\"cpu of settings.computerPlayers\" if.bind=\"$index === activeCPUTab\">\n                        <div class=\"input\">\n                            <label>Name</label>\n                            <input type=\"text\" value.bind=\"cpu.name\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Tint Color <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('color')\">?</span> </label>\n                            <input type=\"color\" value.bind=\"cpu.tint\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Portrait <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('portrait')\">?</span></label>\n                            <input type=\"text\" value.bind=\"cpu.portrait\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Throw Delay (ms) <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwDelay')\">?</span></label>\n                            <input type=\"number\" value.bind=\"cpu.throwDelay\" placeholder=\"Enter delay in milliseconds\" class=\"ms-input\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Throw Delay Variance (ms)</label>\n                            <input type=\"number\" value.bind=\"cpu.throwDelayVariance\" placeholder=\"Enter delay in milliseconds\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Catch Delay (ms) <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('catchDelay')\">?</span></label>\n                            <input type=\"number\" value.bind=\"cpu.catchDelay\" placeholder=\"Enter delay in milliseconds\"/>\n                        </div>\n\n                        <div class=\"input\">\n                            <label>Catch Delay Variance (ms) </label>\n                            <input type=\"number\" value.bind=\"cpu.catchDelayVariance\" placeholder=\"Enter delay in milliseconds\"/>\n                        </div>\n\n\n                        <div class=\"input\">\n                            <label>Target Preference <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('targetPreference')\">?</span></label>\n\n                            <div>\n                                <input repeat.for=\"target of cpu.targetPreference\" type=\"number\"\n                                       value.bind=\"cpu.targetPreference[$index]\"/>\n                            </div>\n                        </div>\n\n                        <h2>Leave Triggers <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('leaveTrigger')\">?</span></h2>\n                        <div class=\"column\">\n                            <label>\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:1\"/>\n                                Throws\n                                Elapsed\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsElapsed')\">?</span>\n                            </label>\n                            <label>\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:2\"/> Time\n                                Elapsed\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeElapsed')\">?</span>\n                            </label>\n                            <label>\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:4\"/>\n                                Throws\n                                Ignored\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsIgnored')\">?</span>\n                            </label>\n                            <label>\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:16\"/> Time\n                                Ignored\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeIgnored')\">?</span>\n                            </label>\n                            <label>\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:8\"/> Other\n                                Players Leaving\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('otherPlayersLeaving')\">?</span>\n                            </label>\n                        </div>\n\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:1\">\n                            <label>Throws Elapsed Leave Threshold/Variance/Chance</label>\n\n                            <div>\n                                <input type=\"number\" value.bind=\"cpu.leaveTurn\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTurnVariance\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTurnChance\"/>\n                            </div>\n                        </div>\n\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:2\">\n                            <label>Time Elapsed Leave (s) Threshold/Variance/Chance (s)</label>\n\n                            <div>\n                                <input type=\"number\" value.bind=\"cpu.leaveTime\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeVariance\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeChance\"/>\n                            </div>\n                        </div>\n\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:4\">\n                            <label>Ignored Throws Leave Threshold/Variance/Chance</label>\n\n                            <div>\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnored\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnoredVariance\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnoredChance\"/>\n                            </div>\n                        </div>\n\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:16\">\n                            <label>Ignored Time Leave (ms) Threshold/Variance/Chance (ms)</label>\n\n                            <div>\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnored\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnoredVariance\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnoredChance\"/>\n                            </div>\n                        </div>\n\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:8\">\n                            <label>Others Left Leave Threshold/Chance</label>\n\n                            <div>\n                                <input type=\"number\" value.bind=\"cpu.leaveOtherLeaver\"/>\n                                <input type=\"number\" value.bind=\"cpu.leaveOtherLeaverChance\"/>\n                            </div>\n                        </div>\n\n\n                    </div>\n                </div>\n\n                <!-- Gameplay Tab -->\n                <div if.bind=\"activeTab === 'gameplay'\" class=\"tabcontent\">\n                    <h2>Gameplay</h2>\n\n                    <div class=\"input\">\n                        <label>Throw Count</label>\n                        <input type=\"number\" value.bind=\"settings.throwCount\" />\n                    </div>\n\n\n                    <div class=\"input\">\n                        <label>Time Limit (ms) </label>\n                        <input type=\"number\" value.bind=\"settings.timeLimit\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Display Time Limit</label>\n                        <input type=\"checkbox\" checked.bind=\"settings.displayTimeLimit\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Time Limit Label</label>\n                        <input type=\"text\" value.bind=\"settings.timeLimitText\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Ball Speed</label>\n                        <input type=\"number\" value.bind=\"settings.ballSpeed\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Ball Tint Color</label>\n                        <input type=\"color\" value.bind=\"settings.ballTint\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Portrait Height (px)</label>\n                        <input type=\"number\" value.bind=\"settings.portraitHeight\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Use Schedule</label>\n                        <input type=\"checkbox\" checked.bind=\"settings.useSchedule\"/>\n                    </div>\n\n                    <div class=\"input\" if.bind=\"settings.useSchedule\">\n                        <label>Schedule</label>\n                        <textarea value.bind=\"settings.scheduleArray & updateTrigger:'blur'\"></textarea>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Schedule Honors Throw Count</label>\n                        <input type=\"checkbox\" checked.bind=\"settings.scheduleHonorsThrowCount\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Game Over Text</label>\n                        <input type=\"text\" value.bind=\"settings.gameOverText\"/>\n                    </div>\n\n                    <div class=\"input\">\n                        <label>Game Over Opacity (%)</label>\n                        <div class=\"range-container\">\n                            <input\n                                type=\"range\"\n                                min=\"0\"\n                                max=\"100\"\n                                step=\"1\"\n                                value.bind=\"sliderValue\"\n                                change.delegate=\"updateOpacity()\"\n                            />\n                            <span class=\"range-value\">${sliderValue}%</span>\n                        </div>\n                    </div>\n\n                </div>\n                <div if.bind=\"activeTab === 'buttons'\" class=\"tabcontent\">\n\n                        <div class=\"button-container\">\n                            <button class=\"bottom-buttons\" click.delegate=\"testGame()\">&#129514; Run Game</button>\n                            <button class=\"bottom-buttons\" click.delegate=\"saveSettingsToLocalStorage()\">&#128190; Save To Preset</button>\n                            <button class=\"bottom-buttons\" click.delegate=\"saveSettingsToFile()\">&#128190; Save To File</button>\n                            <button class=\"bottom-buttons\" id=\"copy1\" data-clipboard-target=\"#code\">&#10697; Copy Link</button>\n                        </div>\n\n\n\n                </div>\n                <div class=\"navigation-buttons\">\n                    <a href=\"#\" if.bind=\"activeTab !== 'player'\" class=\"previous round\" click.delegate=\"previousTab()\">\n                        &#8249;\n                    </a>\n\n                    <!-- Next Button: Only show if on 'player', 'cpus', or 'gameplay' -->\n                    <a href=\"#\" if.bind=\"activeTab !== 'buttons'\" class=\"next round\" click.delegate=\"nextTab()\">\n                        &#8250;\n                    </a>\n                </div>\n\n\n            </div>\n\n\n        </div>\n\n\n\n    </div>\n\n    <div class=\"modal\" if.bind=\"showFileModal\">\n        <div class=\"modal-content\">\n            <h2>Save to File</h2>\n            <div class=\"input\">\n                <label>File Name:</label>\n                <input type=\"text\" value.bind=\"fileName\" placeholder=\"Enter filename\">\n            </div>\n            <div class=\"modal-buttons\">\n                <button click.delegate=\"cancelFileSave()\">Cancel</button>\n                <button click.delegate=\"confirmFileSave()\">Save</button>\n            </div>\n        </div>\n    </div>\n\n\n    <div class=\"modal\" if.bind=\"showModal\">\n        <div class=\"modal-content\">\n            <h2>Save as Preset</h2>\n            <div class=\"input\">\n                <label>Preset Name:</label>\n                <input type=\"text\" value.bind=\"presetName\">\n            </div>\n            <div class=\"input\">\n                <label>Description:</label>\n                <textarea value.bind=\"presetDescription\"></textarea>\n            </div>\n            <div class=\"modal-buttons\">\n                <button click.delegate=\"cancelSave()\">Cancel</button>\n                <button click.delegate=\"confirmSave()\">Save</button>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"sidebar\" ref=\"sidebar\">\n        <button class=\"close-btn\" click.delegate=\"closeSidebar()\">X</button>\n        <h2>Information</h2>\n        <p ref=\"sidebarContent\">Here's some information about your settings...</p>\n    </div>\n\n\n\n</template>\n\n\n\n";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/LandingPage/LandingPage',["require", "exports", "aurelia-framework", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LandingPage = void 0;
    var LandingPage = (function () {
        function LandingPage(router) {
            this.router = router;
        }
        LandingPage.prototype.startFromScratch = function () {
            console.log(this.router);
            this.router.navigateToRoute('home');
        };
        LandingPage.prototype.loadPreset = function () {
            console.log(this.router);
            this.router.navigateToRoute('PresetPage');
        };
        LandingPage.prototype.openManual = function () {
            console.log("Opening manual...");
        };
        LandingPage = __decorate([
            (0, aurelia_framework_1.inject)(aurelia_router_1.Router),
            __metadata("design:paramtypes", [Object])
        ], LandingPage);
        return LandingPage;
    }());
    exports.LandingPage = LandingPage;
});
;
define('text!pages/LandingPage/LandingPage.css',[],function(){return ".landing-page {\n    font-family: Arial, sans-serif;\n    height: 100vh;\n    margin: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: #f7f7f7;\n    position: relative; /* Added for positioning */\n}\n\n.landing-page .container {\n    text-align: center;\n    background-color: #ffffff;\n    padding: 50px;\n    border-radius: 10px;\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\n    position: relative; /* Added for positioning */\n}\n\n.landing-page .welcome-image {\n    width: 100%;\n    max-width: 300px;\n    margin-bottom: 20px;\n    position: relative; /* Position the image relative to its parent (.landing-page) */\n    display: block; /* Ensure the image takes its own block-level space */\n    margin: 0 auto; /* Center the image horizontally within .landing-page */\n}\n\n\n.landing-page h1 {\n    margin-bottom: 30px;\n    color: #333;\n}\n\n.landing-page .btn {\n    display: inline-block;\n    padding: 10px 20px;\n    margin: 5px;\n    border: none;\n    border-radius: 5px;\n    background-color: #007BFF;\n    color: #ffffff;\n    cursor: pointer;\n    transition: background-color 0.3s ease;\n    text-decoration: none;\n}\n\n.landing-page .btn:hover {\n    background-color: #0056b3;\n}\n\n";});;
define('text!pages/LandingPage/LandingPage.html',[],function(){return "<template>\n    <require from=\"./LandingPage.css\"></require>\n\n    <div class=\"landing-page\">\n        <head>\n            <meta charset=\"UTF-8\">\n\n            <title>Welcome to wefefwCyberball</title>\n        </head>\n        <body>\n        <div>\n        <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\">\n        <div class=\"container\">\n            <h1>Welcome to Cyberball</h1>\n\n            <!-- Replace '#' in href with the actual path to your pages -->\n            <a click.delegate=\"startFromScratch()\" class=\"btn\">Start From Scratch</a>\n            <a click.delegate=\"loadPreset()\" class=\"btn\">Load Preset</a>\n            <a href=\"#\" class=\"btn\">Manual</a>\n        </div>\n        </div>\n        </body>\n    </div>\n</template>\n";});;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/PresetPage/PresetPage',["require", "exports", "aurelia-framework", "aurelia-router", "../Setting-Service"], function (require, exports, aurelia_framework_1, aurelia_router_1, Setting_Service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PresetPage = void 0;
    var PresetPage = (function () {
        function PresetPage(router, settingsService) {
            this.router = router;
            this.settingsService = settingsService;
            this.presets = [];
            this.activeTab = 'presets';
        }
        Object.defineProperty(PresetPage.prototype, "isLoadFromFile", {
            get: function () {
                return this.activeTab === 'load-file';
            },
            enumerable: false,
            configurable: true
        });
        PresetPage.prototype.attached = function () {
            console.log("attached method called");
            this.loadPresetsFromLocalStorage();
        };
        PresetPage.prototype.loadPresetsFromLocalStorage = function () {
            console.log("Number of items in localStorage:", localStorage.length);
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                if (value) {
                    var presetData = JSON.parse(value);
                    this.presets.push({
                        name: key,
                        description: presetData.description || 'No description provided',
                        settings: presetData.settings
                    });
                }
            }
            console.log("Presets array:", this.presets);
        };
        PresetPage.prototype.loadPresetAndNavigate = function (presetName) {
            var presetData = localStorage.getItem(presetName);
            if (presetData) {
                var parsedData = JSON.parse(presetData);
                this.settingsService.settings = parsedData.settings;
                this.navigateToPage();
            }
        };
        PresetPage.prototype.showTab = function (tabId) {
            console.log("Is Your Presets Active?", this.isYourPresetsActive);
            this.activeTab = tabId;
        };
        Object.defineProperty(PresetPage.prototype, "isPresetsActive", {
            get: function () {
                return this.activeTab === 'presets';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PresetPage.prototype, "isYourPresetsActive", {
            get: function () {
                return this.activeTab === 'your-presets';
            },
            enumerable: false,
            configurable: true
        });
        PresetPage.prototype.get = function () {
            return this.activeTab === 'load-file';
        };
        PresetPage.prototype.navigateToPage = function () {
            this.router.navigate('home');
        };
        PresetPage.prototype.deletePreset = function (presetName) {
            localStorage.removeItem(presetName);
            this.presets = this.presets.filter(function (p) { return p.name !== presetName; });
        };
        PresetPage.prototype.handleFileUpload = function (event) {
            var _this = this;
            var file = event.target.files[0];
            if (!file) {
                console.error("No file chosen");
                return;
            }
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                try {
                    var parsedData = JSON.parse(loadEvent.target.result);
                    if (parsedData && parsedData.player && parsedData.player.tint === undefined) {
                        parsedData.player.tint = "#FFFFFF";
                    }
                    if (parsedData) {
                        _this.settingsService.settings = parsedData;
                        _this.navigateToConfigurationBuilder();
                    }
                    else {
                        console.error("Invalid file format");
                    }
                }
                catch (error) {
                    console.error("Error parsing the file", error);
                }
            };
            reader.readAsText(file);
        };
        PresetPage.prototype.navigateToConfigurationBuilder = function () {
            this.router.navigate('home');
        };
        PresetPage = __decorate([
            (0, aurelia_framework_1.autoinject)(),
            __metadata("design:paramtypes", [aurelia_router_1.Router, Setting_Service_1.SettingsService])
        ], PresetPage);
        return PresetPage;
    }());
    exports.PresetPage = PresetPage;
});
;
define('text!pages/PresetPage/PresetPage.css',[],function(){return "\nh1 {\n    text-align: center;\n}\n\nbody {\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n    background-color: #f7f7f7;\n    color: #181818;\n    margin: 0;\n    padding: 0;\n}\n\n/* Style for table rows on hover */\n.container table tr:hover {\n    background-color: #f5f5f5; /* Change this to any color you prefer */\n    cursor: pointer;\n}\n\n\n\n.container {\n    text-align: center;\n    background-color: #ffffff;\n    padding: 50px;\n    border-radius: 10px;\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\n    position: relative;\n    /*//width: 80%; !* This is the current width setting, which is responsive *!*/\n    max-width: 800px; /* This is the maximum width it can grow to */\n    min-width: 600px; /* This is the minimum width it can shrink to */\n}\n\ntable {\n    width: 100%;\n    border-collapse: collapse;\n    margin-top: 20px;\n}\n\nth, td {\n    padding: 10px;\n    border-bottom: 1px solid #f1f1f1;\n}\n\nth {\n    background-color: #f7f7f7;\n    color: #333;\n}\n\n/* Tab Styles */\n.tabs {\n    display: flex;\n    border-bottom: 1px solid #e0e0e0; /* Optional: Adds a line under the tabs */\n    overflow: hidden; /* Ensures the content inside the tabs doesn't overflow */\n}\n\n.tab-button {\n    flex: 1; /* Makes each tab button take equal width */\n    padding: 10px 20px;\n    margin: 0;\n    cursor: pointer;\n    background-color: #f7f7f7;\n    border: none;\n    transition: background-color 0.3s ease;\n    border-bottom: 2px solid transparent; /* Optional: Adds a bottom border to indicate active tab */\n}\n\n.tab-button:hover {\n    background-color: #e0e0e0;\n}\n\n.tab-button.active {\n    background-color: #007BFF;\n    color: #ffffff;\n    border-bottom: 2px solid #0056b3; /* Optional: Changes the bottom border color for active tab */\n}\n\n/* This style will target the <tr> elements within your table */\ntable tr:hover th {\n    background-color: #e0e0e0;\n    cursor: pointer;\n}\n\n\n.delete-btn {\n    background-color: grey;\n    color: white;\n    border: none;\n    border-radius: 50%; /* Makes the button circular */\n    width: 20px;\n    height: 20px;\n    font-size: 14px;\n    line-height: 20px;\n    text-align: center;\n    cursor: pointer;\n}\n\n.delete-btn:hover {\n    background-color: darkgrey;\n}\n";});;
define('text!pages/PresetPage/PresetPage.html',[],function(){return "<template>\n    <require from=\"resources/value-converters/json-value-converter\"></require>\n    <require from=\"resources/value-converters/integer-value-converter\"></require>\n    <require from=\"resources/value-converters/number-value-converter\"></require>\n    <require from=\"resources/value-converters/integer-array-value-converter\"></require>\n    <require from=\"resources/value-converters/flag-value-converter\"></require>\n    <require from=\"./PresetPage.css\"></require>\n    <require from=\"../LandingPage/LandingPage.css\"></require>\n\n\n        <div class=\"landing-page\">\n            <div>\n                <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\" class=\"welcome-image\">\n                <h1>Cyberball Presets</h1>\n                <div class=\"tabs\">\n\n                    <button class=\"tab-button ${isPresetsActive ? 'active' : ''}\" click.delegate=\"showTab('presets')\">Presets</button>\n                    <button class=\"tab-button ${isYourPresetsActive ? 'active' : ''}\" click.delegate=\"showTab('your-presets')\">Your Games</button>\n                    <button class=\"tab-button ${isLoadFromFile ? 'active' : ''}\" click.delegate=\"showTab('load-file')\">Load File</button>\n                </div>\n                <div class=\"container\" id=\"presets\" css.bind=\"isPresetsActive ? 'display: block;' : 'display: none;'\">\n                <table>\n                        <tr>\n                            <th>Name</th>\n                            <th>Description</th>\n                            <th>Gif</th>\n                        </tr>\n                        <tr click.trigger=\"navigateToPage()\">\n\n                            <th> Ostracized Game</th>\n                            <th> player will never get the ball</th>\n                            <th>\n                                <video width=\"320\" height=\"240\" loop autoplay muted>\n                                    <source src=\"../../../assets/ostracizedMp4.mp4\" type=\"video/mp4\">\n                                    Your browser does not support the video tag.\n                                </video>\n                            </th>\n\n                        </tr>\n\n                    </table>\n                </div>\n                <div class=\"container\" id=\"your-presets\" css.bind=\"isYourPresetsActive ? 'display: block;' : 'display: none;'\">\n                    <table>\n                        <tr>\n                            <th>Name</th>\n                            <th>Description</th>\n                            <th></th>\n                        </tr>\n\n                        <tr repeat.for=\"preset of presets\" click.trigger=\"loadPresetAndNavigate(preset.name)\">\n                            <td>${preset.name}</td>\n                            <td>${preset.description}</td>\n                            <td>\n                                <button class=\"delete-btn\" click.trigger=\"deletePreset(preset.name)\">X</button>\n                            </td>\n                        </tr>\n                    </table>\n                </div>\n\n                <div class=\"container\" id=\"load-file\" css.bind=\"isLoadFromFile ? 'display: block;' : 'display: none;'\">\n                    <div>\n                        <input type=\"file\" id=\"fileUpload\" change.delegate=\"handleFileUpload($event)\">\n                    </div>\n                </div>\n            </div>\n        </div>\n</template>\n\n\n\n";});;
define('pages/Setting-Service',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SettingsService = void 0;
    var SettingsService = (function () {
        function SettingsService() {
        }
        return SettingsService;
    }());
    exports.SettingsService = SettingsService;
});
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('pages/message-test',["require", "exports", "aurelia-templating-resources", "aurelia-framework"], function (require, exports, aurelia_templating_resources_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageTestViewModel = void 0;
    var MessageTestViewModel = (function () {
        function MessageTestViewModel(signaler) {
            this.signaler = signaler;
            this.messages = [];
        }
        MessageTestViewModel.prototype.bind = function () {
            var _this = this;
            window.addEventListener('message', function (e) {
                console.log('message', e.data);
                _this.messages.push(e.data);
                _this.signaler.signal('message');
            });
        };
        MessageTestViewModel = __decorate([
            (0, aurelia_framework_1.autoinject)(),
            __metadata("design:paramtypes", [aurelia_templating_resources_1.BindingSignaler])
        ], MessageTestViewModel);
        return MessageTestViewModel;
    }());
    exports.MessageTestViewModel = MessageTestViewModel;
});
;
define('text!pages/message-test.html',[],function(){return "<template>\n    <require from=\"resources/value-converters/json-value-converter\"></require>\n\n    <iframe src=\"/#game\" width=\"800\" height=\"600\"></iframe>\n    <div style=\"border: 1px solid black; width: 800px; height: 200px; overflow-y: auto;\">\n        <div repeat.for=\"message of messages\">${message | json & signal: 'message'}</div>\n    </div>\n</template>\n";});;
define('resources/index',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./phaser-game/phaser-game'));
    }
    exports.configure = configure;
});
;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('resources/phaser-game/phaser-game',["require", "exports", "aurelia-framework", "phaser"], function (require, exports, aurelia_framework_1, phaser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PhaserGameCustomElement = void 0;
    phaser_1 = __importDefault(phaser_1);
    var PhaserGameCustomElement = (function () {
        function PhaserGameCustomElement(element) {
            this.element = element;
        }
        PhaserGameCustomElement.prototype.bind = function () {
            this.config.parent = this.element;
            this.game = new phaser_1.default.Game(this.config);
        };
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", Object)
        ], PhaserGameCustomElement.prototype, "config", void 0);
        __decorate([
            aurelia_framework_1.bindable,
            __metadata("design:type", phaser_1.default.Game)
        ], PhaserGameCustomElement.prototype, "game", void 0);
        PhaserGameCustomElement = __decorate([
            (0, aurelia_framework_1.customElement)('phaser-game'),
            (0, aurelia_framework_1.autoinject)(),
            (0, aurelia_framework_1.inlineView)('<template></template>'),
            __metadata("design:paramtypes", [Element])
        ], PhaserGameCustomElement);
        return PhaserGameCustomElement;
    }());
    exports.PhaserGameCustomElement = PhaserGameCustomElement;
});
;
define('resources/value-converters/flag-value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FlagValueConverter = void 0;
    var FlagValueConverter = (function () {
        function FlagValueConverter() {
        }
        FlagValueConverter.prototype.fromView = function (value, source, flag) {
            return value ? source | flag : source & ~flag;
        };
        FlagValueConverter.prototype.toView = function (_value, source, flag) {
            return (source & flag) === flag;
        };
        return FlagValueConverter;
    }());
    exports.FlagValueConverter = FlagValueConverter;
});
;
define('resources/value-converters/integer-array-value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegerArrayValueConverter = void 0;
    var IntegerArrayValueConverter = (function () {
        function IntegerArrayValueConverter() {
        }
        IntegerArrayValueConverter.prototype.fromView = function (value) {
            value = value.replace(/[^0-9,]/g, '');
            if (value[value.length - 1] == ',')
                value = value.substr(0, value.length - 1);
            return JSON.parse("[".concat(value, "]"));
        };
        IntegerArrayValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value).substr(1, value.length * 2 - 1);
        };
        return IntegerArrayValueConverter;
    }());
    exports.IntegerArrayValueConverter = IntegerArrayValueConverter;
});
;
define('resources/value-converters/integer-value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegerValueConverter = void 0;
    var IntegerValueConverter = (function () {
        function IntegerValueConverter() {
        }
        IntegerValueConverter.prototype.fromView = function (value) {
            return parseInt(value !== null && value !== void 0 ? value : '0');
        };
        return IntegerValueConverter;
    }());
    exports.IntegerValueConverter = IntegerValueConverter;
});
;
define('resources/value-converters/json-value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonValueConverter = void 0;
    var JsonValueConverter = (function () {
        function JsonValueConverter() {
        }
        JsonValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value, null, 2);
        };
        return JsonValueConverter;
    }());
    exports.JsonValueConverter = JsonValueConverter;
});
;
define('resources/value-converters/number-value-converter',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NumberValueConverter = void 0;
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.fromView = function (value) {
            return parseFloat(value !== null && value !== void 0 ? value : '0');
        };
        return NumberValueConverter;
    }());
    exports.NumberValueConverter = NumberValueConverter;
});
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define('scenes/cyberball',["require", "exports", "enums/leave-trigger", "phaser"], function (require, exports, leave_trigger_1, phaser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CyberballScene = void 0;
    phaser_1 = __importDefault(phaser_1);
    var textStyle = { fontFamily: 'Arial', color: '#000000' };
    var CyberballScene = (function (_super) {
        __extends(CyberballScene, _super);
        function CyberballScene(settings) {
            var _this = _super.call(this, {}) || this;
            _this.cpuSprites = [];
            _this.playerHasBall = true;
            _this.ballHeld = true;
            _this.absentPlayers = [];
            _this.showPlayerLeave = false;
            _this.gameEnded = false;
            _this.throwCount = 0;
            _this.scheduleIndex = 0;
            _this.settings = settings;
            return _this;
        }
        CyberballScene.prototype.validateInputValue = function (value, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                return parsedValue;
            }
            else {
                return defaultValue;
            }
        };
        CyberballScene.prototype.preload = function () {
            var _this = this;
            this.load.crossOrigin = 'anonymous';
            this.load.image('ball', "".concat(this.settings.baseUrl, "/").concat(this.settings.ballSprite));
            this.load.multiatlas('player', "".concat(this.settings.baseUrl, "/player.json"), 'assets');
            if (this.settings.player.portrait)
                this.load.image('playerPortrait', 'https://cors-anywhere.herokuapp.com/' + this.settings.player.portrait);
            this.settings.computerPlayers.forEach(function (cpu, i) {
                if (cpu.portrait)
                    _this.load.image('cpuPortrait' + i, 'https://cors-anywhere.herokuapp.com/' + cpu.portrait);
            });
        };
        CyberballScene.prototype.create = function () {
            var _this = this;
            this.cameras.main.setBackgroundColor('#ffffff');
            this.anims.create({
                key: 'active',
                frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'active/', suffix: '.png' })
            });
            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'idle/', suffix: '.png' })
            });
            this.anims.create({
                key: 'throw',
                frameRate: 12,
                frames: this.anims.generateFrameNames('player', { start: 1, end: 3, prefix: 'throw/', suffix: '.png' })
            });
            this.anims.create({
                key: 'catch',
                frames: this.anims.generateFrameNames('player', { start: 1, end: 1, prefix: 'catch/', suffix: '.png' })
            });
            var playerPosition = this.getPlayerPosition();
            this.playerGroup = this.physics.add.group({ immovable: true, allowGravity: false });
            this.playerSprite = this.playerGroup.create(playerPosition.x, playerPosition.y, 'player', 'active/1.png');
            this.playerSprite.setData('settings', this.settings.player);
            if (this.settings.player.tint)
                this.playerSprite.setTint(parseInt(this.settings.player.tint.substr(1), 16));
            this.playerSprite.setData('name-object', this.add.text(playerPosition.x, playerPosition.y + this.playerSprite.height / 2 + 10, this.settings.player.name, textStyle).setOrigin(0.5));
            if (this.settings.player.portrait) {
                var portraitPosition = this.getPlayerPortraitPosition(this.playerSprite);
                var image = this.add.image(portraitPosition.x, portraitPosition.y, 'playerPortrait');
                image.setScale(this.settings.portraitHeight / image.height);
            }
            if ((this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.Time) === leave_trigger_1.LeaveTrigger.Time) {
                this.playerSprite.setData('leaveTime', Date.now() + this.getVariantValue(this.settings.player.leaveTime, this.settings.player.leaveTimeVariance) * 1000);
            }
            if ((this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored) {
                this.playerSprite.setData('leaveTimeIgnored', Date.now() + this.getVariantValue(this.settings.player.leaveTimeIgnored, this.settings.player.leaveTimeIgnoredVariance) * 1000);
            }
            var _loop_1 = function (i) {
                var cpuPosition = this_1.getCPUPosition(i);
                var cpuSprite = this_1.playerGroup.create(cpuPosition.x, cpuPosition.y, 'player', 'idle/1.png');
                cpuSprite.setData('name-object', this_1.add.text(cpuPosition.x, cpuPosition.y + cpuSprite.height / 2 + 10, this_1.settings.computerPlayers[i].name, textStyle).setOrigin(0.5));
                if (this_1.settings.computerPlayers[i].portrait) {
                    portraitPosition = this_1.getCPUPortraitPosition(i, cpuSprite);
                    image = this_1.add.image(portraitPosition.x, portraitPosition.y, 'cpuPortrait' + i);
                    image.setScale(this_1.settings.portraitHeight / image.height);
                }
                cpuSprite.flipX = cpuPosition.x > this_1.playerSprite.x;
                cpuSprite.setData('settings', this_1.settings.computerPlayers[i]);
                if (this_1.settings.computerPlayers[i].tint)
                    cpuSprite.setTint(parseInt(this_1.settings.computerPlayers[i].tint.substr(1), 16));
                cpuSprite.setInteractive();
                cpuSprite.on('pointerdown', function (e) {
                    if (_this.playerHasBall) {
                        _this.playerSprite.flipX = _this.input.x < _this.playerSprite.x;
                        var ballPosition_1 = _this.getActiveBallPosition(_this.playerSprite);
                        _this.ballSprite.x = ballPosition_1.x;
                        _this.ballSprite.y = ballPosition_1.y;
                        _this.throwBall(_this.playerSprite, cpuSprite);
                    }
                });
                if ((this_1.settings.computerPlayers[i].leaveTrigger & leave_trigger_1.LeaveTrigger.Time) === leave_trigger_1.LeaveTrigger.Time) {
                    cpuSprite.setData('leaveTime', Date.now() + this_1.getVariantValue(this_1.settings.computerPlayers[i].leaveTime, this_1.settings.computerPlayers[i].leaveTimeVariance) * 1000);
                }
                if ((this_1.settings.computerPlayers[i].leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored) {
                    cpuSprite.setData('leaveTimeIgnored', Date.now() + this_1.getVariantValue(this_1.settings.computerPlayers[i].leaveTimeIgnored, this_1.settings.computerPlayers[i].leaveTimeIgnoredVariance) * 1000);
                }
                this_1.cpuSprites.push(cpuSprite);
            };
            var this_1 = this, portraitPosition, image;
            for (var i = 0; i < this.settings.computerPlayers.length; i++) {
                _loop_1(i);
            }
            var ballPosition = this.getActiveBallPosition(this.playerSprite);
            this.ballSprite = this.physics.add.sprite(ballPosition.x, ballPosition.y, 'ball');
            if (this.settings.ballTint)
                this.ballSprite.setTint(parseInt(this.settings.ballTint.substr(1), 16));
            this.physics.add.overlap(this.ballSprite, this.playerGroup, function (_b, receiver) {
                if (!_this.ballHeld && receiver === _this.throwTarget)
                    _this.catchBall(receiver);
            });
            this.startTime = Date.now();
            this.lastTime = this.startTime;
            if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit) {
                this.timeLimitText = this.add.text(this.sys.canvas.width - 10, 10, this.getTimeString(), textStyle);
                this.timeLimitText.setOrigin(1, 0);
            }
        };
        CyberballScene.prototype.update = function () {
            var _this = this;
            if (this.gameEnded)
                return;
            if (this.playerHasBall) {
                this.playerSprite.play('active');
                this.playerSprite.flipX = this.input.x < this.playerSprite.x;
                var ballPosition = this.getActiveBallPosition(this.playerSprite);
                this.ballSprite.x = ballPosition.x;
                this.ballSprite.y = ballPosition.y;
            }
            else if (!this.ballHeld) {
                this.playerGroup.getChildren().forEach(function (c) {
                    var sprite = c;
                    if (sprite.frame.name.includes('idle'))
                        sprite.flipX = _this.ballSprite.x < sprite.x;
                });
            }
            if (!this.showPlayerLeave && (this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.Time) === leave_trigger_1.LeaveTrigger.Time &&
                Date.now() > this.playerSprite.getData('leaveTime')) {
                this.showPlayerLeave = true;
                this.postEvent('player-may-leave', {
                    reason: 'time elapsed'
                });
            }
            else if (!this.playerHasBall && !this.showPlayerLeave && (this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored &&
                Date.now() > this.playerSprite.getData('leaveTimeIgnored')) {
                this.showPlayerLeave = true;
                this.postEvent('player-may-leave', {
                    reason: 'time ignored'
                });
            }
            this.cpuSprites.forEach(function (cpu) {
                if (cpu == _this.throwTarget || cpu.getData('absent'))
                    return;
                var settings = cpu.getData('settings');
                if ((settings.leaveTrigger & leave_trigger_1.LeaveTrigger.Time) === leave_trigger_1.LeaveTrigger.Time &&
                    Date.now() > cpu.getData('leaveTime')) {
                    _this.leaveGame(cpu, 'time elapsed');
                }
                else if ((settings.leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored &&
                    Date.now() > cpu.getData('leaveTimeIgnored')) {
                    _this.leaveGame(cpu, 'time ignored');
                }
            });
            if (this.settings.timeLimit > 0 && this.settings.displayTimeLimit)
                this.timeLimitText.setText(this.getTimeString());
            if (this.settings.timeLimit > 0 && Date.now() - this.startTime > this.settings.timeLimit) {
                this.postEvent('global-time-limit');
                this.gameOver();
            }
        };
        CyberballScene.prototype.gameOver = function () {
            if (this.gameEnded)
                return;
            this.gameEnded = true;
            this.postEvent('game-end');
            clearTimeout(this.activeTimeout);
            this.playerGroup.children.each(function (child) { return child.removeAllListeners(); });
            this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.sys.canvas.width, this.sys.canvas.height, 0xdddddd, this.settings.gameOverOpacity);
            this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, this.settings.gameOverText, textStyle).setOrigin(0.5);
        };
        CyberballScene.prototype.throwBall = function (thrower, receiver) {
            this.postEvent('throw', {
                thrower: thrower.getData('settings').name,
                receiver: receiver.getData('settings').name,
                wait: Date.now() - this.lastTime
            });
            this.lastTime = Date.now();
            var throwerSettings = thrower.getData('settings');
            if ((throwerSettings.leaveTrigger & leave_trigger_1.LeaveTrigger.TimeIgnored) === leave_trigger_1.LeaveTrigger.TimeIgnored) {
                receiver.setData('leaveTimeIgnored', Date.now() + this.getVariantValue(throwerSettings.leaveTimeIgnored, throwerSettings.leaveTimeIgnoredVariance) * 1000);
            }
            this.playerHasBall = this.ballHeld = false;
            this.throwTarget = receiver;
            this.throwCount++;
            thrower.play('throw');
            thrower.playAfterRepeat('idle');
            var ballTargetPosition = this.getCaughtBallPosition(receiver);
            this.physics.moveTo(this.ballSprite, ballTargetPosition.x, ballTargetPosition.y, this.settings.ballSpeed);
        };
        CyberballScene.prototype.catchBall = function (receiver) {
            var _this = this;
            var _a;
            this.ballHeld = true;
            receiver.setData('throwsIgnored', 0);
            receiver.play('catch');
            var ballPosition = this.getCaughtBallPosition(receiver);
            this.ballSprite.body.reset(ballPosition.x, ballPosition.y);
            if (!this.showPlayerLeave && (this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.Turn) === leave_trigger_1.LeaveTrigger.Turn) {
                var leaveThrows = this.getVariantValue(this.settings.player.leaveTurn, this.settings.player.leaveTurnVariance);
                if (this.throwCount >= leaveThrows) {
                    this.showPlayerLeave = true;
                    this.postEvent('player-may-leave', {
                        reason: 'throws elapsed'
                    });
                }
            }
            else if (!this.showPlayerLeave && (this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.Ignored) === leave_trigger_1.LeaveTrigger.Ignored) {
                var leaveThrows = this.getVariantValue(this.settings.player.leaveIgnored, this.settings.player.leaveIgnoredVariance);
                var playerThrowsIgnored = (_a = this.playerSprite.getData('throwsIgnored')) !== null && _a !== void 0 ? _a : 0;
                if (this.playerSprite != receiver)
                    this.playerSprite.setData('throwsIgnored', ++playerThrowsIgnored);
                if (playerThrowsIgnored >= leaveThrows) {
                    this.showPlayerLeave = true;
                    this.postEvent('player-may-leave', {
                        reason: 'throws ignored'
                    });
                }
            }
            this.cpuSprites.forEach(function (cpu) {
                var _a;
                if (cpu == receiver || cpu.getData('absent'))
                    return;
                var settings = cpu.getData('settings');
                var throwsIgnored = ((_a = cpu.getData('throwsIgnored')) !== null && _a !== void 0 ? _a : 0) + 1;
                cpu.setData('throwsIgnored', throwsIgnored);
                if ((settings.leaveTrigger & leave_trigger_1.LeaveTrigger.Turn) === leave_trigger_1.LeaveTrigger.Turn) {
                    var leaveThrows = _this.getVariantValue(settings.leaveTurn, settings.leaveTurnVariance);
                    if (_this.throwCount >= leaveThrows && _this.checkChance(settings.leaveTurnChance))
                        _this.leaveGame(cpu, 'throws elapsed');
                }
                else if ((settings.leaveTrigger & leave_trigger_1.LeaveTrigger.Ignored) === leave_trigger_1.LeaveTrigger.Ignored) {
                    var leaveThrows = _this.getVariantValue(settings.leaveIgnored, settings.leaveIgnoredVariance);
                    if (throwsIgnored >= leaveThrows && _this.checkChance(settings.leaveIgnoredChance))
                        _this.leaveGame(cpu, 'throws ignored');
                }
            });
            if ((this.settings.useSchedule && this.scheduleIndex === this.settings.schedule.length) ||
                (this.settings.useSchedule && this.settings.scheduleHonorsThrowCount && this.throwCount >= this.settings.throwCount) ||
                (!this.settings.useSchedule && this.throwCount >= this.settings.throwCount)) {
                this.postEvent('throw-count-met');
                this.gameOver();
                return;
            }
            if (receiver === this.playerSprite) {
                this.playerHasBall = true;
            }
            else {
                var settings_1 = receiver.getData('settings');
                this.activeTimeout = setTimeout(function () {
                    receiver.play('active');
                    ballPosition = _this.getActiveBallPosition(receiver);
                    _this.ballSprite.x = ballPosition.x;
                    _this.ballSprite.y = ballPosition.y;
                    _this.activeTimeout = setTimeout(function () {
                        if (_this.settings.useSchedule) {
                            while (_this.settings.schedule[_this.scheduleIndex] === _this.playerGroup.getChildren().indexOf(receiver) &&
                                !_this.absentPlayers.includes(_this.settings.schedule[_this.scheduleIndex]))
                                _this.scheduleIndex++;
                            _this.throwBall(receiver, _this.playerGroup.getChildren()[_this.settings.schedule[_this.scheduleIndex]]);
                            _this.scheduleIndex++;
                        }
                        else {
                            var random = Math.random() * 100;
                            for (var i = 0; i < settings_1.targetPreference.length; i++) {
                                random -= settings_1.targetPreference[i];
                                if (random <= 0) {
                                    if (i >= _this.playerGroup.getChildren().indexOf(receiver))
                                        i++;
                                    _this.throwBall(receiver, _this.playerGroup.getChildren()[i]);
                                    break;
                                }
                            }
                        }
                    }, _this.getVariantValue(settings_1.throwDelay, settings_1.throwDelayVariance));
                }, this.getVariantValue(settings_1.catchDelay, settings_1.catchDelayVariance));
            }
        };
        CyberballScene.prototype.leaveGame = function (player, reason) {
            var _this = this;
            if (reason === void 0) { reason = ''; }
            var nameObject = player.getData('name-object');
            var playerIndex = this.playerGroup.getChildren().indexOf(player);
            this.absentPlayers.push(playerIndex);
            player.setData('absent', true);
            nameObject.setText([nameObject.text, 'has left the game.']);
            player.removeAllListeners();
            player.setVisible(false);
            this.postEvent('leave', {
                leaver: player.getData('settings').name,
                reason: reason
            });
            console.log('pindex', playerIndex);
            this.settings.computerPlayers.forEach(function (cpu, i) {
                if (_this.absentPlayers.includes(i + 1))
                    return;
                console.log('distribute before', i, cpu.targetPreference);
                var targetIndex = playerIndex > (i + 1) ? playerIndex - 1 : playerIndex;
                var targetWeight = cpu.targetPreference[targetIndex];
                cpu.targetPreference[targetIndex] = 0;
                var total = cpu.targetPreference.reduce(function (acc, cur) { return acc + cur; });
                for (var k = 0; k < cpu.targetPreference.length; k++) {
                    if (cpu.targetPreference[k] == 0)
                        continue;
                    cpu.targetPreference[k] += cpu.targetPreference[k] / total * targetWeight;
                }
                console.log('distribute after', i, cpu.targetPreference);
            });
            if (this.absentPlayers.length >= this.settings.computerPlayers.length) {
                this.gameOver();
                return;
            }
            if (!this.showPlayerLeave && (this.settings.player.leaveTrigger & leave_trigger_1.LeaveTrigger.OtherLeaver) === leave_trigger_1.LeaveTrigger.OtherLeaver) {
                console.log(this.absentPlayers.length, this.settings.player.leaveOtherLeaver);
                if (this.absentPlayers.length >= this.settings.player.leaveOtherLeaver) {
                    this.showPlayerLeave = true;
                    this.postEvent('player-may-leave', {
                        reason: 'other leavers'
                    });
                }
            }
            this.cpuSprites.forEach(function (cpu) {
                var settings = cpu.getData('settings');
                if (cpu == _this.throwTarget || cpu.getData('absent'))
                    return;
                if ((settings.leaveTrigger & leave_trigger_1.LeaveTrigger.OtherLeaver) === leave_trigger_1.LeaveTrigger.OtherLeaver) {
                    if (_this.absentPlayers.length >= settings.leaveOtherLeaver && _this.checkChance(settings.leaveOtherLeaverChance))
                        _this.leaveGame(cpu, 'other leavers');
                }
            });
        };
        CyberballScene.prototype.getCPUPosition = function (i) {
            var padding = 75;
            var extraPadding = this.settings.hasPortraits ? this.settings.portraitHeight + this.settings.portraitPadding * 2 : 0;
            if (this.settings.computerPlayers.length === 1) {
                return new phaser_1.default.Geom.Point(this.sys.canvas.width / 2, padding + extraPadding);
            }
            return new phaser_1.default.Geom.Point(((this.sys.canvas.width - (padding * 2)) / (this.settings.computerPlayers.length - 1)) * i + padding, i === 0 || i === this.settings.computerPlayers.length - 1
                ? (this.sys.canvas.height / 2)
                : padding + extraPadding);
        };
        CyberballScene.prototype.getCPUPortraitPosition = function (i, sprite) {
            var position = this.getCPUPosition(i);
            return new phaser_1.default.Geom.Point(position.x, position.y - this.settings.portraitHeight + this.settings.portraitPadding * 2 - sprite.height / 2);
        };
        CyberballScene.prototype.getPlayerPosition = function () {
            var padding = 75;
            if (this.settings.hasPortraits)
                padding += this.settings.portraitHeight + this.settings.portraitPadding * 2;
            return new phaser_1.default.Geom.Point(this.sys.canvas.width / 2, this.sys.canvas.height - padding);
        };
        CyberballScene.prototype.getPlayerPortraitPosition = function (sprite) {
            var position = this.getPlayerPosition();
            return new phaser_1.default.Geom.Point(position.x, position.y + this.settings.portraitHeight / 2 + this.settings.portraitPadding * 2 + sprite.height / 2 + 10);
        };
        CyberballScene.prototype.getCaughtBallPosition = function (target) {
            return new phaser_1.default.Geom.Point(target.x + (target.flipX ? -50 : 50), target.y - 15);
        };
        CyberballScene.prototype.getActiveBallPosition = function (target) {
            return new phaser_1.default.Geom.Point(target.x + (target.flipX ? 40 : -40), target.y - 20);
        };
        CyberballScene.prototype.getVariantValue = function (base, variance) {
            return base + (phaser_1.default.Math.RND.between(0, variance) * phaser_1.default.Math.RND.sign());
        };
        CyberballScene.prototype.checkChance = function (chance) {
            return phaser_1.default.Math.RND.between(0, 100) <= chance;
        };
        CyberballScene.prototype.getTimeString = function () {
            var timeRemaining = this.settings.timeLimit - (Date.now() - this.startTime);
            var time = new Date(timeRemaining < 0 ? 0 : timeRemaining);
            return "".concat(this.settings.timeLimitText, " ").concat(time.getUTCMinutes(), ":").concat(time.getUTCSeconds() < 10 ? '0' : '').concat(time.getUTCSeconds());
        };
        CyberballScene.prototype.postEvent = function (type, data) {
            if (data === void 0) { data = {}; }
            console.log('post event: ' + type, data);
            window.parent.postMessage(__assign({ type: type }, data), '*');
        };
        return CyberballScene;
    }(phaser_1.default.Scene));
    exports.CyberballScene = CyberballScene;
});
;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map