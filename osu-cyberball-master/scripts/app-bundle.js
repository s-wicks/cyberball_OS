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
define('text!app.html',[],function(){return "<template>\r\n    <router-view></router-view>\r\n</template>\r\n";});;
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
    })(LeaveTrigger = exports.LeaveTrigger || (exports.LeaveTrigger = {}));
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
            this.changeColor = false;
            this.scheduleHonorsThrowCount = false;
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
define('text!pages/Game/game.css',[],function(){return "canvas {\r\n    max-width: 100%;\r\n}\r\n\r\n.chat-log {\r\n    border: 1px solid black;\r\n    border-bottom: 0;\r\n    height: 100px;\r\n    overflow-y: auto;\r\n}\r\n\r\n.chat-input {\r\n    display: flex;\r\n}\r\n\r\n.chat-input input {\r\n    flex: 1;\r\n}\r\n";});;
define('text!pages/Game/game.html',[],function(){return "<template>\r\n    <require from=\"./game.css\"></require>\r\n\r\n    <phaser-game config.bind=\"gameConfig\"></phaser-game>\r\n\r\n    <div if.bind=\"settings.chatEnabled\" class=\"chat\" css=\"width: ${gameWidth}px\">\r\n        <div class=\"chat-log\">\r\n            <div repeat.for=\"message of chatMessages\">\r\n                <strong>${message.sender}</strong>: <span>${message.text}</span>\r\n            </div>\r\n        </div>\r\n\r\n        <form class=\"chat-input\" submit.delegate=\"sendMessage()\">\r\n            <input value.bind=\"chatMessage\" />\r\n            <button type=\"submit\">Send</button>\r\n        </form>\r\n    </div>\r\n</template>\r\n";});;
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
        HomeViewModel.prototype.getNumberOrZero = function (value) {
            return value === null || isNaN(value) ? 0 : Number(value);
        };
        HomeViewModel.prototype.refreshIframe = function () {
            this.convertStringsToNumbers(this.settings);
            var iframe = document.getElementById('gamePreview');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.location.reload();
            }
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
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit the color of the participant’s player by clicking on the box next to “Tint Color” to bring up a color palette.<br><br>';
                    break;
                case 'playerHeader':
                    newContent = '<span class="description-header">Brief Description:</span><br>This is the player the participant in your study will control.<br><br>';
                    break;
                case 'portrait':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can insert an image that will be placed below the participant’s player. Be sure to include your image with (format dimensions).<br><br>';
                    break;
                case 'leaveTrigger':
                    newContent = '<span class="description-header">Brief Description:</span><br>By editing the “Leave Triggers” settings, you are indicating when the participant is presented with a button they can click to leave the game.<br><br>';
                    break;
                case 'throwsElapsed':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set the number of throws between all players before the participant is given the option to leave the game.<br><br>';
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
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how long the participant is ignored by the computer-controlled players before they are given the option to leave the game.<br><br>';
                    break;
                case 'otherPlayersLeaving':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can set how many computer-controlled players leave the game before the participant is given the option to leave.<br><br>';
                    break;
                case 'cpus':
                    newContent = '<span class="description-header">Brief Description:</span><br>This is the computer-controlled player that your participant will play a virtual game of catch-and-toss with. You can also add additional computer-controlled players<br><br>';
                    break;
                case 'throwDelay':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands in a “throw-ready” stance before they actually throw the ball<br><br>';
                    break;
                case 'catchDelay':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands with the ball after catching it before they prepare to throw the ball.<br><br>';
                    break;
                case 'targetPreference':
                    newContent = '<span class="description-header">Brief Description:</span><br>You can edit how often the computer-controlled player throws to the participant’s player and additional CPU players you add.<br><br>';
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
                name: "Player ".concat(this.settings.computerPlayers.length + 2),
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
            this.convertStringsToNumbers(this.settings);
            window.open(this.url);
        };
        HomeViewModel.prototype.convertStringsToNumbers = function (obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'string' && !isNaN(obj[key]) && obj[key].trim() !== '') {
                        obj[key] = Number(obj[key]);
                    }
                    else if (obj[key] instanceof Object) {
                        this.convertStringsToNumbers(obj[key]);
                    }
                }
            }
        };
        Object.defineProperty(HomeViewModel.prototype, "clipboardText", {
            get: function () {
                return JSON.stringify(this.settings, null, 2);
            },
            enumerable: false,
            configurable: true
        });
        HomeViewModel.prototype.copyIframeToClipboard = function () {
            var iframeString = "<iframe id=\"cyberball\" width=\"100%\" height=\"580\" src=\"".concat(this.url, "\"></iframe>");
            navigator.clipboard.writeText(iframeString);
        };
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
        HomeViewModel.prototype.updateUrl = function () {
            var iframe = document.getElementById('gamePreview');
            iframe.src = this.url;
        };
        HomeViewModel.prototype.fileSelected = function (e) {
            var _this = this;
            var reader = new FileReader();
            var file = e.target.files[0];
            reader.readAsDataURL(file);
            this.fileName = file.name;
            reader.onload = function () {
                console.log(reader.result);
                _this.settings.player.portraitBuff = reader.result;
                _this.updateUrl();
            };
        };
        HomeViewModel.prototype.cpuFileSelected = function (cpu, e) {
            var _this = this;
            console.log(cpu);
            var reader = new FileReader();
            var file = e.target.files[0];
            reader.readAsDataURL(file);
            this.fileName = file.name;
            reader.onload = function () {
                console.log(reader.result);
                cpu.portraitBuff = reader.result;
                _this.updateUrl();
            };
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
        HomeViewModel.prototype.convertToMap = function (str) {
            var lines = str.split('\n');
            var map = new Map();
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                var _a = line.split(',').map(Number), key = _a[0], values = _a.slice(1);
                map.set(key, values);
            }
            return map;
        };
        HomeViewModel.prototype.nextTab = function () {
            if (this.activeTab === 'player') {
                this.activeTab = 'cpus';
                this.settings.computerPlayers.forEach(function (cpu) {
                    cpu.portrait = "";
                });
            }
            else if (this.activeTab === 'cpus') {
                this.activeTab = 'gameplay';
            }
            else if (this.activeTab === 'gameplay') {
                this.activeTab = 'buttons';
            }
            this.closeSidebar();
        };
        HomeViewModel.prototype.previousTab = function () {
            if (this.activeTab === 'buttons') {
                this.activeTab = 'gameplay';
            }
            else if (this.activeTab === 'gameplay') {
                this.activeTab = 'cpus';
                this.settings.computerPlayers.forEach(function (cpu) {
                    cpu.portrait = "";
                });
            }
            else if (this.activeTab === 'cpus') {
                this.activeTab = 'player';
            }
            this.closeSidebar();
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
define('text!pages/Home/home.css',[],function(){return "\r\n\r\n\r\nbody {\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    background-color: #f7f7f7;\r\n    color: #181818;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\niframe {\r\n    transform: scale(3) translate(-50px, -50px);\r\n    transform-origin: 100px 100px;\r\n}\r\n\r\n.container {\r\n    text-align: center;\r\n    background-color: #ffffff;\r\n    padding: 50px;\r\n    border-radius: 10px;\r\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\r\n    position: relative;\r\n    /*//width: 80%; !* This is the current width setting, which is responsive *!*/\r\n    max-width: 400px; /* This is the maximum width it can grow to */\r\n    min-width: 400px; /* This is the minimum width it can shrink to */\r\n}\r\n\r\na {\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    padding: 8px 16px;\r\n}\r\n\r\na:hover {\r\n    background-color: #9d9d9d;\r\n    color: black;\r\n}\r\n\r\n.previous {\r\n    background-color: #ddd;\r\n    color: black;\r\n    position: absolute;\r\n    top: 50%;  /* This will center the button vertically */\r\n    left: 0;  /* This will make the button hug the left wall */\r\n    transform: translateY(-50%); /* This will ensure the button is truly vertically centered */\r\n    left: 6px;\r\n}\r\n\r\n.next {\r\n\r\n    background-color: #ddd;\r\n    color: black;\r\n    position: absolute;\r\n    top: 50%;  /* This will center the button vertically */\r\n    right: 0;  /* This will make the button hug the right wall */\r\n    transform: translateY(-50%); /* This will ensure the button is truly vertically centered */\r\n    right: 6px;\r\n}\r\n\r\n.round {\r\n    border-radius: 50%;\r\n}\r\n\r\n\r\n.landing-page {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100vh;\r\n    background-color: #f7f7f7;\r\n}\r\n\r\n.container {\r\n    text-align: center;\r\n    background-color: #ffffff;\r\n    padding: 50px;\r\n    border-radius: 10px;\r\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\r\n    position: relative;\r\n    width: 80%;\r\n    max-width: 1200px;\r\n}\r\n\r\n.input {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n\r\n\r\n.input label {\r\n    flex: 1; /* Allow label to grow as needed */\r\n    text-align: left; /* Left-align the label text */\r\n    margin-right: 10px; /* Space between the label and the input */\r\n    margin-top: 5px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.input input[type=\"number\"] {\r\n    flex: 1; /* Allow input to take up the remaining space */\r\n    max-width: 200px; /* Remove max-width to allow it to grow */\r\n\r\n}\r\n\r\n.input input[type=\"text\"] {\r\n    flex: 1; /* Allow input to take up the remaining space */\r\n    max-width: 200px; /* Remove max-width to allow it to grow */\r\n\r\n}\r\n\r\n.input input[type=\"checkbox\"] {\r\n   margin-right: 185px;\r\n\r\n}\r\n\r\n.input input[type=\"color\"] {\r\n    margin-right: 150px;\r\n    margin-top: 5px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n.input input[type=\"range\"] {\r\n    margin-right: 30px;\r\n\r\n}\r\n\r\n.range-container {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.range-value {\r\n    margin-left: 2px; /* Add some spacing between the range input and the value */\r\n}\r\n\r\n.button-container {\r\n    display: flex;\r\n    flex-direction: column; /* Stack items vertically */\r\n    align-items: center; /* Center items horizontally */\r\n}\r\n\r\n.button-container button {\r\n    display: block;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n\r\n.tooltip-icon {\r\n    margin-right: 1px;\r\n}\r\n\r\n.input-label{\r\n    margin-bottom: 1px;\r\n}\r\n\r\n.h2-tooltip {\r\n    font-size: 1rem;\r\n    vertical-align: middle;\r\n}\r\n\r\n.input label + * {\r\n    box-sizing: border-box;\r\n    max-width: 300px;\r\n}\r\n\r\n.description-header {\r\n    font-weight: bold;\r\n    text-decoration: underline;\r\n    margin-bottom: 8px; /* Add space below the headers */\r\n    display: block; /* Ensure each header is on a new line */\r\n}\r\n\r\n.input input[type=text], .input input[type=number], textarea {\r\n    flex: 1 1 100%;\r\n    min-width: 0;\r\n    width: auto;\r\n}\r\n\r\n.column {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.target-preference-inputs {\r\n    display: flex;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.bottom-buttons {\r\n    background-color: #007BFF;\r\n    color: #FFFFFF;\r\n    padding: 10px 20px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    font-size: 16px;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s ease;\r\n}\r\n\r\n.refresh-button {\r\n    position: absolute;      /* Positioning relative to the container */\r\n    bottom: 10px;            /* Distance from the bottom */\r\n    left: 10px;              /* Distance from the left */\r\n    background-color: #007BFF;\r\n    color: #FFFFFF;\r\n    padding: 5px 10px;       /* Smaller padding */\r\n    border: none;\r\n    border-radius: 5px;\r\n    font-size: 14px;         /* Smaller font size */\r\n    cursor: pointer;\r\n    transition: background-color 0.3s ease;\r\n}\r\n\r\n.bottom-buttons:hover {\r\n    background-color: #0056b3;\r\n}\r\n\r\n.bottom-buttons:active {\r\n    background-color: #003d80;\r\n}\r\n\r\n.bottom-buttons:focus {\r\n    outline: none;\r\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);\r\n}\r\n.tabs {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    display: flex;\r\n    /* This will ensure the tabs are displayed horizontally and new tabs are added to the left */\r\n    padding: 0;\r\n    margin: 0;\r\n    align-items: flex-start; /* This ensures the tabs hug the top of the container */\r\n}\r\n\r\n\r\n.tablinks:first-child {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n}\r\n\r\n.tablinks {\r\n    padding: 10px 15px;\r\n    margin-bottom: -2px;\r\n    border: 1px solid #ccc;\r\n    border-bottom: none;\r\n    cursor: pointer;\r\n    background-color: #e0e0e0;\r\n    transition: background-color 0.3s;\r\n}\r\n\r\n.tablinks:not(:last-child) {\r\n    margin-right: 5px;\r\n}\r\n\r\n.tablinks:hover {\r\n    background-color: #d0d0d0;\r\n}\r\n\r\n.tablinks.active {\r\n    background-color: #007BFF;\r\n    font-weight: bold;\r\n    border-color: #007BFF;\r\n    color: white;\r\n}\r\n\r\n.bottom-buttons.disabled {\r\n    background-color: #a5a5a5;\r\n    cursor: not-allowed;\r\n    pointer-events: none;\r\n    color: #777777;\r\n}\r\n\r\n.tablinks:focus {\r\n    outline: none;\r\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);\r\n}\r\n\r\niframe {\r\n    pointer-events: auto;\r\n}\r\n\r\n.tooltip-icon {\r\n    display: inline-block;\r\n    width: 20px;\r\n    height: 20px;\r\n    background-color: #007BFF;\r\n    color: #FFFFFF;\r\n    border-radius: 50%;\r\n    text-align: center;\r\n    line-height: 20px;\r\n    cursor: pointer;\r\n\r\n}\r\n\r\n.cpuButtons{\r\n    margin-bottom: 10px;\r\n}\r\n.configHeader{\r\n    text-align: center;\r\n}\r\n\r\n.sidebar {\r\n    position: fixed;\r\n    top: 0;\r\n    right: -340px;\r\n    width: 300px;\r\n    height: 100%;\r\n    background-color: #FFFFFF;\r\n    padding: 20px;\r\n    transition: right 0.3s;\r\n    z-index: 1000;\r\n    color: #050505;\r\n}\r\n\r\n.close-btn {\r\n    position: absolute;\r\n    top: 10px;\r\n    right: 10px;\r\n    background-color: #FF0000;\r\n    color: #FFFFFF;\r\n    border: none;\r\n    border-radius: 50%;\r\n    width: 25px;\r\n    height: 25px;\r\n    text-align: center;\r\n    line-height: 25px;\r\n    cursor: pointer;\r\n}\r\n\r\n.sidebar-open {\r\n    right: 0;\r\n}\r\n\r\n.modal {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    z-index: 2000;\r\n}\r\n\r\n.modal-content {\r\n    background-color: #fff;\r\n    padding: 20px;\r\n    border-radius: 10px;\r\n    width: 80%;\r\n    max-width: 400px;\r\n}\r\n\r\n.modal-buttons {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    margin-top: 20px;\r\n}\r\n";});;
define('text!pages/Home/home.html',[],function(){return "<template>\r\n    <require from=\"resources/value-converters/json-value-converter\"></require>\r\n    <require from=\"resources/value-converters/integer-value-converter\"></require>\r\n    <require from=\"resources/value-converters/number-value-converter\"></require>\r\n    <require from=\"resources/value-converters/integer-array-value-converter\"></require>\r\n    <require from=\"resources/value-converters/flag-value-converter\"></require>\r\n    <require from=\"./home.css\"></require>\r\n    <require from=\"../LandingPage/LandingPage.css\"></require>\r\n\r\n    <div class=\"landing-page\">\r\n\r\n        <div>\r\n            <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\" class=\"welcome-image\">\r\n            <h1 class=\"configHeader\">Cyberball Configuration Builder</h1>\r\n            <div class=\"flex-container\">\r\n                <div class=\"iframe-wrapper\">\r\n                <iframe id=\"gamePreview\"></iframe>\r\n            </div>\r\n            <div class=\"container\">\r\n\r\n                <!-- Player Tab -->\r\n                <div if.bind=\"activeTab === 'player'\" class=\"tabcontent\">\r\n\r\n                    <h2>Human <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('playerHeader')\">?</span>\r\n                    </h2>\r\n                    <div style=\"position: relative; z-index: 1;\">\r\n\r\n                    <div class=\"input\">\r\n                        <label>Name</label>\r\n                        <input type=\"text\" value.bind=\"settings.player.name\" change.delegate=\"updateUrl()\"/>\r\n\r\n                    </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Portrait <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('portrait')\">?</span></label>\r\n                            <input type=\"file\" value.bind=\"settings.player.portrait\" input.delegate=\"updateUrl()\" change.delegate=\"fileSelected($event)\">\r\n                        </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Tint Color <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('color')\">?</span></label>\r\n                        <input type=\"color\" value.bind=\"settings.player.tint\" input.delegate=\"updateUrl()\"\r\n                               change.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <h2>Leave Triggers <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('leaveTrigger')\">?</span></h2>\r\n                    <div class=\"column\">\r\n                        <label>\r\n                            <input type=\"checkbox\"\r\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:1\" input.delegate=\"updateUrl()\"/>\r\n                            Throws Elapsed <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsElapsed')\">?</span>\r\n                        </label>\r\n                        <label>\r\n                            <input type=\"checkbox\"\r\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:2\" input.delegate=\"updateUrl()\"/>\r\n                            Time\r\n                            Elapsed\r\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeElapsed')\">?</span>\r\n                        </label>\r\n                        <label>\r\n                            <input type=\"checkbox\"\r\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:4\" input.delegate=\"updateUrl()\"/>\r\n                            Throws Ignored\r\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsIgnored')\">?</span>\r\n                        </label>\r\n                        <label>\r\n                            <input type=\"checkbox\"\r\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:16\" input.delegate=\"updateUrl()\"/>\r\n                            Time\r\n                            Ignored\r\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeIgnored')\">?</span>\r\n                        </label>\r\n                        <label>\r\n                            <input type=\"checkbox\"\r\n                                   checked.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:8\" input.delegate=\"updateUrl()\"/>\r\n                            Other\r\n                            Players Leaving\r\n                            <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('otherPlayersLeaving')\">?</span>\r\n                        </label>\r\n                    </div>\r\n\r\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:1\">\r\n                        <label>Throws Elapsed Leave Threshold/Variance</label>\r\n\r\n                        <div>\r\n                            <input type= \"number\" value.bind=\"settings.player.leaveTurn\" input.delegate=\"updateUrl()\"/>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveTurnVariance\"  input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:2\">\r\n                        <label>Time Elapsed Leave (s) Threshold/Variance (s)</label>\r\n\r\n                        <div>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveTime\" input.delegate=\"updateUrl()\"/>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeVariance\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:4\">\r\n                        <label>Ignored Throws Leave Threshold/Variance</label>\r\n\r\n                        <div>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveIgnored\" input.delegate=\"updateUrl()\"/>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveIgnoredVariance\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:16\">\r\n                        <label>Ignored Time Leave (ms) Threshold/Variance (ms)</label>\r\n\r\n                        <div>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeIgnored\" input.delegate=\"updateUrl()\"/>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveTimeIgnoredVariance\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"column\" if.bind=\"settings.player.leaveTrigger | flag:settings.player.leaveTrigger:8\">\r\n                        <label>Others Left Leave Threshold</label>\r\n\r\n                        <div>\r\n                            <input type=\"number\" value.bind=\"settings.player.leaveOtherLeaver\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                    <button class=\"refresh-button\" click.delegate=\"refreshIframe()\">Refresh Iframe</button>\r\n</div>\r\n                <!-- CPUs Tab -->\r\n                <div if.bind=\"activeTab === 'cpus'\" class=\"tabcontent\">\r\n                    <div class=\"tab\">\r\n                        <button repeat.for=\"cpu of settings.computerPlayers\"\r\n                                class=\"tablinks ${$index === activeCPUTab ? 'active' : ''}\"\r\n                                click.delegate=\"activeCPUTab = $index\">\r\n                            Player ${$index + 2}\r\n                        </button>\r\n                    </div>\r\n                    <h2>\r\n                        CPUs <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('cpus')\">?</span>\r\n                    </h2>\r\n                    <div class=\"cpuButtons\">\r\n                        <button class=\"bottom-buttons\" click.delegate=\"addCPU()\">+ Add CPU</button>\r\n                        <button class=\"bottom-buttons ${settings.computerPlayers.length == 1 ? 'disabled' : ''}\"\r\n                                click.delegate=\"removeCPU()\">- Remove CPU\r\n                        </button>\r\n                    </div>\r\n\r\n                    <!-- Sub-tabs for each CPU -->\r\n\r\n\r\n                    <!-- Details for each CPU -->\r\n                    <div repeat.for=\"cpu of settings.computerPlayers\" if.bind=\"$index === activeCPUTab\">\r\n                        <div class=\"input\">\r\n                            <label>Name</label>\r\n                            <input type=\"text\" value.bind=\"cpu.name\" input.delegate=\"previewGame()\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Tint Color <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('color')\">?</span> </label>\r\n                            <input type=\"color\" value.bind=\"cpu.tint\" input.delegate=\"updateUrl()\"\r\n                                   change.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Portrait <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('portrait')\">?</span></label>\r\n                            <input type=\"file\" value.bind=\"cpu.portrait\" input.delegate=\"updateUrl()\" change.delegate=\"cpuFileSelected(cpu,$event)\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Throw Delay (ms) <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwDelay')\">?</span></label>\r\n                            <input type=\"number\" value.bind=\"cpu.throwDelay\" placeholder=\"Enter delay in milliseconds\" class=\"ms-input\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Throw Delay Variance (ms)</label>\r\n                            <input type=\"number\" value.bind=\"cpu.throwDelayVariance\" placeholder=\"Enter delay in milliseconds\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Catch Delay (ms) <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('catchDelay')\">?</span></label>\r\n                            <input type=\"number\" value.bind=\"cpu.catchDelay\" placeholder=\"Enter delay in milliseconds\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n                        <div class=\"input\">\r\n                            <label>Catch Delay Variance (ms) </label>\r\n                            <input type=\"number\" value.bind=\"cpu.catchDelayVariance\" placeholder=\"Enter delay in milliseconds\" input.delegate=\"updateUrl()\"/>\r\n                        </div>\r\n\r\n\r\n                        <div class=\"input\">\r\n                            <label>Target Preference <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('targetPreference')\">?</span></label>\r\n\r\n                            <div>\r\n                                <input repeat.for=\"target of cpu.targetPreference\" type=\"number\"\r\n                                       value.bind=\"cpu.targetPreference[$index]\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <h2>Leave Triggers <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('leaveTrigger')\">?</span></h2>\r\n                        <div class=\"column\">\r\n                            <label>\r\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:1\" input.delegate=\"updateUrl()\"/>\r\n                                Throws\r\n                                Elapsed\r\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsElapsed')\">?</span>\r\n                            </label>\r\n                            <label>\r\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:2\" input.delegate=\"updateUrl()\"/> Time\r\n                                Elapsed\r\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeElapsed')\">?</span>\r\n                            </label>\r\n                            <label>\r\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:4\" input.delegate=\"updateUrl()\"/>\r\n                                Throws\r\n                                Ignored\r\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('throwsIgnored')\">?</span>\r\n                            </label>\r\n                            <label>\r\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:16\" input.delegate=\"updateUrl()\"/> Time\r\n                                Ignored\r\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('timeIgnored')\">?</span>\r\n                            </label>\r\n                            <label>\r\n                                <input type=\"checkbox\" checked.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:8\" input.delegate=\"updateUrl()\"/> Other\r\n                                Players Leaving\r\n                                <span class=\"tooltip-icon h2-tooltip\" click.delegate=\"showInfo('otherPlayersLeaving')\">?</span>\r\n                            </label>\r\n                        </div>\r\n\r\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:1\">\r\n                            <label>Throws Elapsed Leave Threshold/Variance/Chance</label>\r\n\r\n                            <div>\r\n                                <input type='number' value.bind=\"cpu.leaveTurn\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTurnVariance\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTurnChance\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:2\">\r\n                            <label>Time Elapsed Leave (s) Threshold/Variance/Chance (s)</label>\r\n\r\n                            <div>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTime\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeVariance\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeChance\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:4\">\r\n                            <label>Ignored Throws Leave Threshold/Variance/Chance</label>\r\n\r\n                            <div>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnored\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnoredVariance\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveIgnoredChance\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:16\">\r\n                            <label>Ignored Time Leave (ms) Threshold/Variance/Chance (ms)</label>\r\n\r\n                            <div>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnored\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnoredVariance\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveTimeIgnoredChance\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n                        <div class=\"column\" if.bind=\"cpu.leaveTrigger | flag:cpu.leaveTrigger:8\">\r\n                            <label>Others Left Leave Threshold/Chance</label>\r\n\r\n                            <div>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveOtherLeaver\" input.delegate=\"updateUrl()\"/>\r\n                                <input type=\"number\" value.bind=\"cpu.leaveOtherLeaverChance\" input.delegate=\"updateUrl()\"/>\r\n                            </div>\r\n                        </div>\r\n\r\n\r\n                    </div>\r\n                    <button class=\"refresh-button\" click.delegate=\"refreshIframe()\">Refresh Iframe</button>\r\n                </div>\r\n\r\n                <!-- Gameplay Tab -->\r\n                <div if.bind=\"activeTab === 'gameplay'\" class=\"tabcontent\">\r\n                    <h2>Gameplay</h2>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Throw Count</label>\r\n                        <input type=\"number\" value.bind=\"settings.throwCount\" />\r\n                    </div>\r\n\r\n\r\n                    <div class=\"input\">\r\n                        <label>Time Limit (ms) </label>\r\n                        <input type=\"number\" value.bind=\"settings.timeLimit\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Display Time Limit</label>\r\n                        <input type=\"checkbox\" checked.bind=\"settings.displayTimeLimit\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Time Limit Label</label>\r\n                        <input type=\"text\" value.bind=\"settings.timeLimitText\"  input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Ball Speed</label>\r\n                        <input type=\"number\" value.bind=\"settings.ballSpeed\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Ball Tint Color</label>\r\n                        <input type=\"color\" value.bind=\"settings.ballTint\"  input.delegate=\"updateUrl()\"\r\n                               change.delegate=\"updateUrl()\"/>\r\n\r\n\r\n\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Portrait Height (px)</label>\r\n                        <input type=\"number\" value.bind=\"settings.portraitHeight\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Use Schedule</label>\r\n                        <input type=\"checkbox\" checked.bind=\"settings.useSchedule\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\" if.bind=\"settings.useSchedule\">\r\n                        <label>Schedule</label>\r\n                        <!-- <textarea value.bind=\"settings.schedule | integerArray & updateTrigger:'blur'\"></textarea> -->\r\n                        <textarea value.bind=\"settings.scheduleText  & updateTrigger:'blur'\"></textarea>\r\n                    </div>\r\n\r\n                    <div class=\"input\" >\r\n                        <label>Change Color</label>\r\n                        <!-- <textarea value.bind=\"settings.schedule | integerArray & updateTrigger:'blur'\"></textarea> -->\r\n                        <input type=\"checkbox\" checked.bind=\"settings.changeColor\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Schedule Honors Throw Count</label>\r\n                        <input type=\"checkbox\" checked.bind=\"settings.scheduleHonorsThrowCount\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Game Over Text</label>\r\n                        <input type=\"text\" value.bind=\"settings.gameOverText\" input.delegate=\"updateUrl()\"/>\r\n                    </div>\r\n\r\n                    <div class=\"input\">\r\n                        <label>Game Over Opacity (%)</label>\r\n                        <div class=\"range-container\">\r\n                            <input\r\n                                type=\"range\"\r\n                                min=\"0\"\r\n                                max=\"100\"\r\n                                step=\"1\"\r\n                                value.bind=\"sliderValue\"\r\n                                change.delegate=\"updateOpacity()\"\r\n                            />\r\n                            <span class=\"range-value\">${sliderValue}%</span>\r\n                        </div>\r\n                        <button class=\"refresh-button\" click.delegate=\"refreshIframe()\">Refresh Iframe</button>\r\n                    </div>\r\n\r\n                </div>\r\n                <div if.bind=\"activeTab === 'buttons'\" class=\"tabcontent\">\r\n\r\n                        <div class=\"button-container\">\r\n                            <button class=\"bottom-buttons\" click.delegate=\"testGame()\">&#129514; Run Game</button>\r\n                            <button class=\"bottom-buttons\" click.delegate=\"saveSettingsToLocalStorage()\">&#128190; Save To Preset</button>\r\n                            <button class=\"bottom-buttons\" click.delegate=\"saveSettingsToFile()\">&#128190; Save To File</button>\r\n                            <button class=\"bottom-buttons\" click.delegate=\"copyIframeToClipboard()\">&#10697; Copy Link</button>\r\n                        </div>\r\n\r\n\r\n                    <button class=\"refresh-button\" click.delegate=\"refreshIframe()\">Refresh Iframe</button>\r\n                </div>\r\n                <div class=\"navigation-buttons\">\r\n                    <a href=\"#\" if.bind=\"activeTab !== 'player'\" class=\"previous round\" click.delegate=\"previousTab()\">\r\n                        &#8249;\r\n                    </a>\r\n\r\n                    <!-- Next Button: Only show if on 'player', 'cpus', or 'gameplay' -->\r\n                    <a href=\"#\" if.bind=\"activeTab !== 'buttons'\" class=\"next round\" click.delegate=\"nextTab()\">\r\n                        &#8250;\r\n                    </a>\r\n                </div>\r\n\r\n            </div>\r\n</div>\r\n\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"modal\" if.bind=\"showFileModal\">\r\n        <div class=\"modal-content\">\r\n            <h2>Save to File</h2>\r\n            <div class=\"input\">\r\n                <label>File Name:</label>\r\n                <input type=\"text\" value.bind=\"fileName\" placeholder=\"Enter filename\">\r\n            </div>\r\n            <div class=\"modal-buttons\">\r\n                <button click.delegate=\"cancelFileSave()\">Cancel</button>\r\n                <button click.delegate=\"confirmFileSave()\">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"modal\" if.bind=\"showModal\">\r\n        <div class=\"modal-content\">\r\n            <h2>Save as Preset</h2>\r\n            <div class=\"input\">\r\n                <label>Preset Name:</label>\r\n                <input type=\"text\" value.bind=\"presetName\">\r\n            </div>\r\n            <div class=\"input\">\r\n                <label>Description:</label>\r\n                <textarea value.bind=\"presetDescription\"></textarea>\r\n            </div>\r\n            <div class=\"modal-buttons\">\r\n                <button click.delegate=\"cancelSave()\">Cancel</button>\r\n                <button click.delegate=\"confirmSave()\">Save</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"sidebar\" ref=\"sidebar\">\r\n        <button class=\"close-btn\" click.delegate=\"closeSidebar()\">X</button>\r\n        <h2>Information</h2>\r\n        <p ref=\"sidebarContent\">Here's some information about your settings...</p>\r\n    </div>\r\n\r\n\r\n\r\n</template>\r\n\r\n\r\n\r\n";});;
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
define('text!pages/LandingPage/LandingPage.css',[],function(){return ".landing-page {\r\n    font-family: Arial, sans-serif;\r\n    height: 100vh;\r\n    margin: 0;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background-color: #f7f7f7;\r\n    position: relative; /* Added for positioning */\r\n}\r\n\r\n.flex-container {\r\n    display: flex;\r\n    align-items: start; /* Align items to the top */\r\n    justify-content: center;\r\n    border: none;\r\n}\r\n\r\n#gamePreview:focus {\r\n    outline: none;\r\n}\r\n\r\n#gamePreview, .iframe-wrapper {\r\n    box-shadow: none;\r\n}\r\n\r\n\r\n#gamePreview, .iframe-wrapper {\r\n    background-color: transparent;\r\n}\r\n\r\n\r\n\r\n.landing-page .container {\r\n    /*text-align: center;*/\r\n    /*background-color: #ffffff;*/\r\n    /*padding: 50px;*/\r\n    /*border-radius: 10px;*/\r\n    /*box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);*/\r\n    /*position: relative; !* Added for positioning *!*/\r\n    position: relative;\r\n    text-align: center;\r\n    background-color: #ffffff;\r\n    padding: 50px;\r\n    border-radius: 10px;\r\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.iframe-wrapper {\r\n    border: none;\r\n    position: absolute;\r\n    left: 450px;\r\n    top: 700px;\r\n    height: 50%; /* Half the height of the container */\r\n    width: 300px/* Your desired width */;\r\n}\r\n\r\n#gamePreview {\r\n    border: none;\r\n    height: 50%; /* Make iframe take full height of its parent */\r\n    width: 50%; /* Make iframe take full width of its parent */\r\n}\r\n\r\n.landing-page .welcome-image {\r\n    width: 100%;\r\n    max-width: 300px;\r\n    margin-bottom: 20px;\r\n    position: relative; /* Position the image relative to its parent (.landing-page) */\r\n    display: block; /* Ensure the image takes its own block-level space */\r\n    margin: 0 auto; /* Center the image horizontally within .landing-page */\r\n}\r\n\r\n\r\n.landing-page h1 {\r\n    margin-bottom: 30px;\r\n    color: #333;\r\n}\r\n\r\n.landing-page .btn {\r\n    display: inline-block;\r\n    padding: 10px 20px;\r\n    margin: 5px;\r\n    border: none;\r\n    border-radius: 5px;\r\n    background-color: #007BFF;\r\n    color: #ffffff;\r\n    cursor: pointer;\r\n    transition: background-color 0.3s ease;\r\n    text-decoration: none;\r\n}\r\n\r\n.landing-page .btn:hover {\r\n    background-color: #0056b3;\r\n}\r\n\r\n";});;
define('text!pages/LandingPage/LandingPage.html',[],function(){return "<template>\r\n    <require from=\"./LandingPage.css\"></require>\r\n\r\n    <div class=\"landing-page\">\r\n        <head>\r\n            <meta charset=\"UTF-8\">\r\n\r\n            <title>Welcome to Cyberball</title>\r\n        </head>\r\n        <body>\r\n        <div>\r\n        <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\">\r\n        <div class=\"container\">\r\n            <h1>Welcome to Cyberball</h1>\r\n\r\n            <!-- Replace '#' in href with the actual path to your pages -->\r\n            <a click.delegate=\"startFromScratch()\" class=\"btn\">Start From Scratch</a>\r\n            <a click.delegate=\"loadPreset()\" class=\"btn\">Load Preset</a>\r\n            <a href=\"#\" class=\"btn\">Manual</a>\r\n        </div>\r\n        </div>\r\n        </body>\r\n    </div>\r\n</template>\r\n";});;
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
define('text!pages/PresetPage/PresetPage.css',[],function(){return "\r\nh1 {\r\n    text-align: center;\r\n}\r\n\r\nbody {\r\n    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n    background-color: #f7f7f7;\r\n    color: #181818;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n/* Style for table rows on hover */\r\n.container table tr:hover {\r\n    background-color: #f5f5f5; /* Change this to any color you prefer */\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n\r\n.container {\r\n    text-align: center;\r\n    background-color: #ffffff;\r\n    padding: 50px;\r\n    border-radius: 10px;\r\n    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);\r\n    position: relative;\r\n    /*//width: 80%; !* This is the current width setting, which is responsive *!*/\r\n    max-width: 800px; /* This is the maximum width it can grow to */\r\n    min-width: 600px; /* This is the minimum width it can shrink to */\r\n}\r\n\r\ntable {\r\n    width: 100%;\r\n    border-collapse: collapse;\r\n    margin-top: 20px;\r\n}\r\n\r\nth, td {\r\n    padding: 10px;\r\n    border-bottom: 1px solid #f1f1f1;\r\n}\r\n\r\nth {\r\n    background-color: #f7f7f7;\r\n    color: #333;\r\n}\r\n\r\n/* Tab Styles */\r\n.tabs {\r\n    display: flex;\r\n    border-bottom: 1px solid #e0e0e0; /* Optional: Adds a line under the tabs */\r\n    overflow: hidden; /* Ensures the content inside the tabs doesn't overflow */\r\n}\r\n\r\n.tab-button {\r\n    flex: 1; /* Makes each tab button take equal width */\r\n    padding: 10px 20px;\r\n    margin: 0;\r\n    cursor: pointer;\r\n    background-color: #f7f7f7;\r\n    border: none;\r\n    transition: background-color 0.3s ease;\r\n    border-bottom: 2px solid transparent; /* Optional: Adds a bottom border to indicate active tab */\r\n}\r\n\r\n.tab-button:hover {\r\n    background-color: #e0e0e0;\r\n}\r\n\r\n.tab-button.active {\r\n    background-color: #007BFF;\r\n    color: #ffffff;\r\n    border-bottom: 2px solid #0056b3; /* Optional: Changes the bottom border color for active tab */\r\n}\r\n\r\n/* This style will target the <tr> elements within your table */\r\ntable tr:hover th {\r\n    background-color: #e0e0e0;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n.delete-btn {\r\n    background-color: grey;\r\n    color: white;\r\n    border: none;\r\n    border-radius: 50%; /* Makes the button circular */\r\n    width: 20px;\r\n    height: 20px;\r\n    font-size: 14px;\r\n    line-height: 20px;\r\n    text-align: center;\r\n    cursor: pointer;\r\n}\r\n\r\n.delete-btn:hover {\r\n    background-color: darkgrey;\r\n}\r\n";});;
define('text!pages/PresetPage/PresetPage.html',[],function(){return "<template>\r\n    <require from=\"resources/value-converters/json-value-converter\"></require>\r\n    <require from=\"resources/value-converters/integer-value-converter\"></require>\r\n    <require from=\"resources/value-converters/number-value-converter\"></require>\r\n    <require from=\"resources/value-converters/integer-array-value-converter\"></require>\r\n    <require from=\"resources/value-converters/flag-value-converter\"></require>\r\n    <require from=\"./PresetPage.css\"></require>\r\n    <require from=\"../LandingPage/LandingPage.css\"></require>\r\n\r\n\r\n        <div class=\"landing-page\">\r\n            <div>\r\n                <img src=\"../../../assets/player.png\" alt=\"Cyberball Sprite\" class=\"welcome-image\">\r\n                <h1>Cyberball Presets</h1>\r\n                <div class=\"tabs\">\r\n\r\n                    <button class=\"tab-button ${isPresetsActive ? 'active' : ''}\" click.delegate=\"showTab('presets')\">Presets</button>\r\n                    <button class=\"tab-button ${isYourPresetsActive ? 'active' : ''}\" click.delegate=\"showTab('your-presets')\">Your Games</button>\r\n                    <button class=\"tab-button ${isLoadFromFile ? 'active' : ''}\" click.delegate=\"showTab('load-file')\">Load File</button>\r\n                </div>\r\n                <div class=\"container\" id=\"presets\" css.bind=\"isPresetsActive ? 'display: block;' : 'display: none;'\">\r\n                <table>\r\n                        <tr>\r\n                            <th>Name</th>\r\n                            <th>Description</th>\r\n                            <th>Gif</th>\r\n                        </tr>\r\n                        <tr click.trigger=\"navigateToPage()\">\r\n\r\n                            <th> Ostracized Game</th>\r\n                            <th> player will never get the ball</th>\r\n                            <th>\r\n                                <video width=\"320\" height=\"240\" loop autoplay muted>\r\n                                    <source src=\"../../../assets/ostracizedMp4.mp4\" type=\"video/mp4\">\r\n                                    Your browser does not support the video tag.\r\n                                </video>\r\n                            </th>\r\n\r\n                        </tr>\r\n\r\n                    </table>\r\n                </div>\r\n                <div class=\"container\" id=\"your-presets\" css.bind=\"isYourPresetsActive ? 'display: block;' : 'display: none;'\">\r\n                    <table>\r\n                        <tr>\r\n                            <th>Name</th>\r\n                            <th>Description</th>\r\n                            <th></th>\r\n                        </tr>\r\n\r\n                        <tr repeat.for=\"preset of presets\" click.trigger=\"loadPresetAndNavigate(preset.name)\">\r\n                            <td>${preset.name}</td>\r\n                            <td>${preset.description}</td>\r\n                            <td>\r\n                                <button class=\"delete-btn\" click.trigger=\"deletePreset(preset.name)\">X</button>\r\n                            </td>\r\n                        </tr>\r\n                    </table>\r\n                </div>\r\n\r\n                <div class=\"container\" id=\"load-file\" css.bind=\"isLoadFromFile ? 'display: block;' : 'display: none;'\">\r\n                    <div>\r\n                        <input type=\"file\" id=\"fileUpload\" change.delegate=\"handleFileUpload($event)\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</template>\r\n\r\n\r\n\r\n";});;
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
define('text!pages/message-test.html',[],function(){return "<template>\r\n    <require from=\"resources/value-converters/json-value-converter\"></require>\r\n\r\n    <iframe src=\"/#game\" width=\"800\" height=\"600\"></iframe>\r\n    <div style=\"border: 1px solid black; width: 800px; height: 200px; overflow-y: auto;\">\r\n        <div repeat.for=\"message of messages\">${message | json & signal: 'message'}</div>\r\n    </div>\r\n</template>\r\n";});;
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
            _this.settings = settings;
            if (_this.settings.useSchedule) {
                _this.settings.schedule = _this.convertToMap(_this.settings.scheduleText);
                _this.settings.schedule.forEach(function (value, key) {
                    _this.settings.schedule.set(key, _this.addRandomizationToScheduleNumbers(value));
                });
                console.log(_this.settings.schedule);
            }
            return _this;
        }
        CyberballScene.prototype.addRandomizationToScheduleNumbers = function (input) {
            var newSchedule = [];
            input.forEach(function (number) {
                var _a;
                if (number > 9) {
                    var digits = number.toString().split('');
                    for (var i = digits.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        _a = [digits[j], digits[i]], digits[i] = _a[0], digits[j] = _a[1];
                    }
                    digits.forEach(function (digit) { return newSchedule.push(parseInt(digit)); });
                }
                else {
                    newSchedule.push(number);
                }
            });
            return newSchedule;
        };
        CyberballScene.prototype.convertToMap = function (str) {
            var lines = str.split('\n');
            var map = new Map();
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                var _a = line.split(',').map(Number), key = _a[0], values = _a.slice(1);
                map.set(key, values);
            }
            return map;
        };
        CyberballScene.prototype.preload = function () {
            var _this = this;
            this.load.crossOrigin = 'anonymous';
            this.load.image('ball', "".concat(this.settings.baseUrl, "/").concat(this.settings.ballSprite));
            this.load.multiatlas('player', "".concat(this.settings.baseUrl, "/player.json"), 'assets');
            if (this.settings.player.portraitBuff) {
                var data = new Image();
                this.textures.addBase64('playerPortrait', this.settings.player.portraitBuff);
            }
            this.settings.computerPlayers.forEach(function (cpu, i) {
                if (cpu.portraitBuff) {
                    _this.textures.addBase64('cpuPortrait' + i, cpu.portraitBuff);
                }
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
            if (this.settings.useSchedule) {
                if (this.settings.changeColor) {
                    this.cpuSprites.forEach(function (cpu) {
                        cpu.tint = 0xff0000;
                    });
                    this.playerSprite.tint = 0xff0000;
                    if (this.playerHasBall) {
                        this.playerSprite.tint = 0x00ff00;
                    }
                    var playerId = 1;
                    var scheduleQueue = this.settings.schedule.get(playerId);
                    var nextRand = 0;
                    if (scheduleQueue && scheduleQueue.length > 0) {
                        nextRand = scheduleQueue[0];
                    }
                    else {
                    }
                    var joinedPlayers = playerId + String(nextRand);
                    var digits = Array.from(String(joinedPlayers), Number);
                    digits.forEach(function (id) {
                        var sprite = _this.playerGroup.getChildren()[id - 1];
                        sprite.tint = 0x00ff00;
                    });
                }
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
        CyberballScene.prototype.getRandomDigit = function (number) {
            var digits = Array.from(String(number), Number);
            var randomIndex = Math.floor(Math.random() * digits.length);
            return digits[randomIndex] - 1;
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
            if ((this.settings.useSchedule && this.settings.scheduleHonorsThrowCount && this.throwCount >= this.settings.throwCount) ||
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
                    var id = _this.playerGroup.getChildren().indexOf(receiver);
                    _this.activeTimeout = setTimeout(function () {
                        if (_this.settings.useSchedule) {
                            var scheduleQueue = _this.settings.schedule.get(id + 1);
                            var nextRand = 0;
                            if (scheduleQueue && scheduleQueue.length > 0) {
                                nextRand = scheduleQueue[0];
                            }
                            else {
                                _this.postEvent('throw-count-met');
                                _this.gameOver();
                                return;
                            }
                            if (_this.settings.changeColor) {
                                _this.cpuSprites.forEach(function (cpu) {
                                    cpu.tint = 0xff0000;
                                });
                                _this.playerSprite.tint = 0xff0000;
                                var joinedPlayers = id + String(nextRand);
                                var digits = Array.from(String(joinedPlayers), Number);
                                console.log('joinedPlayers', digits);
                                digits.forEach(function (id) {
                                    var sprite = _this.playerGroup.getChildren()[id - 1];
                                    sprite.tint = 0x00ff00;
                                });
                            }
                            var next = _this.getRandomDigit(nextRand);
                            if (next == 0) {
                                console.log("next is the player....");
                            }
                            while (next === _this.playerGroup.getChildren().indexOf(receiver) &&
                                !_this.absentPlayers.includes(next)) {
                                if (scheduleQueue.length > 0) {
                                    var tmpRand = scheduleQueue.shift();
                                    if (tmpRand) {
                                        next = _this.getRandomDigit(tmpRand);
                                    }
                                    else {
                                        next = 0;
                                        break;
                                    }
                                }
                                else {
                                    next = 0;
                                    break;
                                }
                            }
                            _this.throwBall(receiver, _this.playerGroup.getChildren()[next]);
                            scheduleQueue.shift();
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