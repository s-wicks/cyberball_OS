import {BindingSignaler} from 'aurelia-templating-resources';
import {autoinject,computedFrom} from 'aurelia-framework';
import { SettingsModel, defaultSettings } from "models/settings-model";
import { CpuSettingsModel } from 'models/cpu-settings-model';
import ClipboardJS from 'clipboard';

@autoinject()
export class HomeViewModel {
    activeTab = 'player';
    activeCPUTab = 0;
    settings: SettingsModel = defaultSettings;
    clipboard: ClipboardJS;

    constructor(private signaler: BindingSignaler) {}

    bind() {
        this.clipboard = new ClipboardJS('#copy');

        setTimeout(() => {
            this.previewGame();
        }, 0);
    }

    unbind() {
        this.clipboard.destroy();
    }


    addCPU() {
        this.settings.computerPlayers.push(new CpuSettingsModel({
            name: `Player ${this.settings.computerPlayers.length + 2}`
        }));

        this.settings.computerPlayers.forEach(cpu => {
            while(cpu.targetPreference.length != this.settings.computerPlayers.length)
                cpu.targetPreference.push(0);
        });

        this.activeCPUTab = this.settings.computerPlayers.length - 1;

    }

    removeCPU() {
        if(this.settings.computerPlayers.length > 1) {
            this.settings.computerPlayers.pop();

            this.settings.computerPlayers.forEach(cpu => {
                cpu.targetPreference.pop();
            });
            if (this.activeCPUTab >= this.settings.computerPlayers.length) {
                this.activeCPUTab = this.settings.computerPlayers.length - 1;
            }
        }

    }

    saveSettings() {
        this.signaler.signal('save-settings');
    }




    get url() {
        let url = document.location.origin + document.location.pathname;

        url += '#game?settings=';
        url += btoa(JSON.stringify(this.settings));

        return url;
    }

    testGame() {
        window.open(this.url);
    }
    get clipboardText() {
        return JSON.stringify(this.settings, null, 2);
    }





    previewGame() {
        // Get the URL for the game preview
        const gamePreviewUrl = this.url;

        // Get the iframe element
        const iframe = document.getElementById('gamePreview') as HTMLIFrameElement;

        // Set the iframe's source to the game preview URL
        iframe.src = 'about:blank'; // Clear the iframe source
        iframe.src = gamePreviewUrl; // Set the new URL
    }

    attached() {
        this.updatePreviewOnInputChange();
    }

    // ... rest of your class methods ...

    updatePreviewOnInputChange() {
        // Get all the input elements inside the input divs
        const inputElements = document.querySelectorAll('.input input');

        // Attach the previewGame function to the input change event of each input element
        inputElements.forEach(input => {
            input.addEventListener('input', () => {
                this.previewGame();
            });
        });
    }



    @computedFrom('settings', 'settings.player', 'settings.computerPlayers', 'settings.someOtherProperty', 'settings.anotherProperty')
    get settingsForPreview() {
        return this.settings; // Include all relevant settings properties here
    }




}
