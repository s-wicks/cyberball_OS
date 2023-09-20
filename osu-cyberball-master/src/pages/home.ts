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
    sidebar: HTMLElement;
    sidebarContent: HTMLElement;

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

    showInfo(setting: string) {
        const sidebar = this.sidebar;
        const content = this.sidebarContent;

        if (sidebar.classList.contains('sidebar-open')) {
            this.closeSidebar();
            return;
        }

        switch (setting) {
            case 'playerName':
                content.textContent = "Information about player's name...";
                break;
            // Add more cases for other settings
            default:
                content.textContent = "Here's some information about your settings...";
        }

        sidebar.classList.add('sidebar-open');
    }

    closeSidebar() {
        this.sidebar.classList.remove('sidebar-open');
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



    setupButtons() {
        // Get the start preview button and attach the event
        const startPreviewButton = document.getElementById('startPreview');
        startPreviewButton.addEventListener('click', () => {
            this.previewGame();
        });

        // Get the refresh preview button and attach the event
        const refreshPreviewButton = document.getElementById('refreshPreview');
        refreshPreviewButton.addEventListener('click', () => {
            const iframe = document.getElementById('gamePreview') as HTMLIFrameElement;
            iframe.src = 'about:blank'; setTimeout(() => {iframe.src = this.url;}, 100);
        });
    }



    previewGame() {
        // Get the URL for the game preview
        const gamePreviewUrl = "https://www.youtube.com/watch?v=OwQ_VyOUGmY";

        // Get the iframe element
        const iframe = document.getElementById('gamePreview') as HTMLIFrameElement;
        //if (iframe.src === '' || iframe.src === 'about:blank') {
        //iframe.style.display = 'block';
        // Set the iframe's source to the game preview URL
        iframe.src = 'about:blank'; // Clear the iframe source
        iframe.src = gamePreviewUrl; // Set the new URL

    }

    attached() {           // alter ???????????????????????
        this.setupButtons();
        this.updatePreviewOnInputChange();
    }

    // ... rest of your class methods ...

    updatePreviewOnInputChange() {     // alter ???????????????????????
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
