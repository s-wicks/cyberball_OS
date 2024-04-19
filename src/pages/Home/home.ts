import {BindingSignaler} from 'aurelia-templating-resources';
import {autoinject, bindable, computedFrom} from 'aurelia-framework';
import {SettingsModel, defaultSettings} from "models/settings-model";
import {CpuSettingsModel} from 'models/cpu-settings-model';
import ClipboardJS from 'clipboard';


import {SettingsService} from "../Setting-Service";


@autoinject()
export class HomeViewModel {
     activeTab = 'player';
     activeCPUTab = 0;
    settings: SettingsModel = defaultSettings();
    clipboard: ClipboardJS;
    sidebar: HTMLElement;
    sidebarContent: HTMLElement;
    currentSetting: string = '';
    presetName: string = '';
    presetDescription: string = '';
    fileName: string = '';           // Stores the filename entered by the user

    @bindable sliderValue = this.settings.gameOverOpacity;

    updateOpacity() {
        this.settings.gameOverOpacity = this.sliderValue / 100;
   }


    constructor(private signaler: BindingSignaler, private settingsService: SettingsService) {

    }

    getNumberOrZero(value) {
        return value === null || isNaN(value) ? 0 : Number(value);
    }

    refreshIframe() {
        this.convertStringsToNumbers(this.settings);
        const iframe = document.getElementById('gamePreview') as HTMLIFrameElement | null;
        iframe.src = this.url;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.location.reload();
        }
    }

    bind() {
        this.clipboard = new ClipboardJS('#copy');
    }

    unbind() {
        this.clipboard.destroy();
    }

    addCPU() {
        this.settings.computerPlayers.push(new CpuSettingsModel({
            name: `Player ${this.settings.computerPlayers.length + 2}`,
        }));

        this.settings.computerPlayers.forEach(cpu => {
            while (cpu.targetPreference.length != this.settings.computerPlayers.length)
                cpu.targetPreference.push(0);
        });

        this.activeCPUTab = this.settings.computerPlayers.length - 1;
    }

    removeCPU() {
        if (this.settings.computerPlayers.length > 1) {
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
         this.convertStringsToNumbers(this.settings);

        window.open(this.url);
    }

    copyURL(event) {
        navigator.clipboard.writeText(this.url);
        let popup = event.target.nextElementSibling;
        if(popup != null){
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
            }, 1000);
        }
    }

 convertStringsToNumbers(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'string' && !isNaN(obj[key]) && obj[key].trim() !== '') {
                    obj[key] = Number(obj[key]);
                } else if (obj[key] instanceof Object) {
                    this.convertStringsToNumbers(obj[key]);
                }
            }
        }
    }

    get clipboardText() {
        return JSON.stringify(this.settings, null, 2);
    }


    copyIframeToClipboard(): void {
        const iframeString = `<iframe id="cyberball" width="100%" height="580" src="${this.url}"></iframe>`;
        navigator.clipboard.writeText(iframeString);
    }

    checkEmptyNumber(e: FocusEvent): void {
        let inputElement = (e.target as HTMLInputElement);
        if (inputElement.value.length === 0 && inputElement.type === 'number') {
            inputElement.value = "0";
        }
    }

    updateUrl(): void {
        const iframe = document.getElementById('gamePreview') as HTMLIFrameElement;
        iframe.src = this.url;
    }

    fileSelected(e:any) {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);
        this.fileName = file.name;
        reader.onload = () => {
            console.log(reader.result);
            this.settings.player.portraitBuff = reader.result as ArrayBuffer;
            this.updateUrl();
        };
    }
    cpuFileSelected(cpu:CpuSettingsModel, e:any) {
        console.log(cpu);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.readAsDataURL(file);
        this.fileName = file.name;
        reader.onload = () => {
            console.log(reader.result);
            cpu.portraitBuff = reader.result as ArrayBuffer;
            this.updateUrl();
        };
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
        if (this.settingsService.settings) {
            this.settings = this.settingsService.settings;
        }
        this.previewGame();
    }

    convertToMap(str: string): Map<number, number[]> {
        const lines = str.split('\n');
        const map = new Map<number, number[]>();

        for (const line of lines) {
          const [key, ...values] = line.split(',').map(Number);
          map.set(key, values);
        }

        return map;
      }

    nextTab() {
        if (this.activeTab === 'player') {
            this.activeTab = 'cpus';
            this.settings.computerPlayers.forEach(cpu => {
                cpu.portrait = "";
            });
        } else if (this.activeTab === 'cpus') {
            this.activeTab = 'gameplay';
        } else if (this.activeTab === 'gameplay') {

            this.activeTab = 'buttons';
        }
    }

    previousTab() {
        if (this.activeTab === 'buttons') {
            this.activeTab = 'gameplay';
        } else if (this.activeTab === 'gameplay') {
            this.activeTab = 'cpus';
            this.settings.computerPlayers.forEach(cpu => {
                cpu.portrait = "";
            });
        } else if (this.activeTab === 'cpus') {
            this.activeTab = 'player';
        }
    }

    @computedFrom('settings', 'settings.player', 'settings.computerPlayers', 'settings.someOtherProperty', 'settings.anotherProperty')
    get settingsForPreview() {
        return this.settings; // Include all relevant settings properties here
    }


    // Add these methods to your HomeViewModel class
    cancelPresetSave() {
        (<HTMLDialogElement>document.getElementById("preset_modal")).close(); // Hide the modal when "Cancel" is clicked
        this.presetName = ''; // Clear the preset name
        this.presetDescription = ''; // Clear the preset description
    }

    confirmPresetSave() {

        if (this.presetName.trim() === '') {
            alert('Please enter a preset name.');
            return;
        }
        this.convertStringsToNumbers(this.settings);

        // Save to local storage
        const presetData = {
            description: this.presetDescription,
            settings: this.settings
        };
        localStorage.setItem(this.presetName, JSON.stringify(presetData));

        (<HTMLDialogElement>document.getElementById("preset_modal")).close(); // Hide the modal after saving
        this.presetName = ''; // Clear the preset name
        this.presetDescription = ''; // Clear the preset description
    }

    cancelFileSave() {
        (<HTMLDialogElement>document.getElementById("file_modal")).close();   // Hide the file modal when "Cancel" is clicked
        this.fileName = '';           // Clear the filename
    }

    // public saveSettingsToFile(): void {
    //     const settingsString = JSON.stringify(this.settings, null, 2); // Pretty print the JSON
    //     const blob = new Blob([settingsString], { type: 'text/plain;charset=utf-8' });
    //
    //     const a = document.createElement('a');
    //     const url = window.URL.createObjectURL(blob);
    //     a.href = url;
    //     a.download = 'settings.txt';
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     document.body.removeChild(a);
    // }

    confirmFileSave() {
        if (this.fileName.trim() === '') {
            alert('Please enter a file name.');
            return;
        }

        this.convertStringsToNumbers(this.settings);
        const settingsString = JSON.stringify(this.settings, null, 2);
        const blob = new Blob([settingsString], {type: 'text/plain;charset=utf-8'});

        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // Add .txt extension if not provided
        a.download = this.fileName.endsWith('.txt') ? this.fileName : `${this.fileName}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // After saving, reset the values and close the modal
        (<HTMLDialogElement>document.getElementById("file_modal")).close();
        this.fileName = '';
    }


    openModal(event) {
        event.target.parentElement.nextElementSibling.showModal();
    }



// Example usage:
// Call this function when a button is clicked or any other event is triggered
    // sendEmailWithVariable('This is the variable value');


}
