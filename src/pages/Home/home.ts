import {BindingSignaler} from 'aurelia-templating-resources';
import {autoinject, bindable, computedFrom, observable} from 'aurelia-framework';
import {SettingsModel, defaultSettings} from "models/settings-model";
import {CpuSettingsModel} from 'models/cpu-settings-model';
import ClipboardJS from 'clipboard';


import {SettingsService} from "../Setting-Service";

function b64EncodeUnicode(str: string): string {
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, 
          (match, p1) => String.fromCharCode(parseInt(p1, 16))
        )
    );
}

function b64DecodeUnicode(str: string): string {
    let decoded = decodeURIComponent(
        atob(str)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
    );
    return decoded.replace(/[\x00-\x1F\x7F]/g, "");
}

function convertGoogleDriveUrl(url: string): string {
    // get ID
    const match = url.match(/\/d\/([^\/]+)\//);
    if (match && match[1]) {
        console.log("convertGoogleDriveUrl called with: ", url);
        // return url
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url; 
  }

@autoinject()
export class HomeViewModel {
    activeTab = 'player';
    settings: SettingsModel = defaultSettings();
    @observable activeCPUTab = 0;
    clipboard: ClipboardJS;
    sidebar: HTMLElement;
    sidebarContent: HTMLElement;
    currentSetting: string = '';
    presetName: string = '';
    presetDescription: string = '';
    fileName: string = '';           // Stores the filename entered by the user
    shouldWarnTargetPref: boolean = false;

    playerPortraitUrl: string = "";
    currentCpuForDefault: CpuSettingsModel = null;

    copiedEmbed = false;
    copiedURL = false;

    @bindable sliderValue = this.settings.gameOverOpacity;

    updateOpacity() {
        this.settings.gameOverOpacity = this.sliderValue / 100;
    }

    activeCPUTabChanged(index: number) {
        this.checkTargetPrefTotal(this.settings.computerPlayers[index]);
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

        console.log("Default Portraits:", this.settings.defaultPortraits);
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

    getPlayerNumber(index: number, parent_index: number) {
        if(index === 0) return "Human"
        else if (index > parent_index) return "CPU Player " + (index + 2);
        else return "CPU Player " + (index + 1);
    }

    checkTargetPrefTotal(cpu: CpuSettingsModel) {
        let sum = cpu.targetPreference.reduce((sum, value) => sum + value);
        this.shouldWarnTargetPref = sum < 99.9 || sum > 100.1; 
    }

    saveSettings() {
        this.signaler.signal('save-settings');
    }


    get url() {
        let url = document.location.origin + document.location.pathname;
        url += '#game?settings=';

        let settingsString = JSON.stringify(this.settings, (key, value) => {
            if (typeof value === "string") {
                return value.replace(/[\x00-\x1F\x7F]/g, "");
            }
            return value;
        });

        let base64String = b64EncodeUnicode(settingsString);
        url += b64EncodeUnicode(settingsString);
        return url;
    }

     testGame() {
         this.convertStringsToNumbers(this.settings);

        window.open(this.url);
    }

    copyURL() {
        navigator.clipboard.writeText(this.url);

        this.copiedURL = true;
        setTimeout(() => this.copiedURL = false, 1500);
    }

    setPlayerPortraitUrl(url: string) {
        let finalUrl = (url || '').trim();
        if (finalUrl.includes('drive.google.com')) {
            finalUrl = convertGoogleDriveUrl(finalUrl);

            // finalUrl = "https://thingproxy.freeboard.io/fetch/" + finalUrl;
        }
        this.settings.player.portraitBuff = finalUrl;
    
        console.log("Set player portrait to:", finalUrl);
        this.updateUrl();
    }

    setCpuPortraitUrl(cpu: CpuSettingsModel, url: string): void {
        let finalUrl = (url || '').trim();
        if (finalUrl.includes('drive.google.com')) {
          finalUrl = convertGoogleDriveUrl(finalUrl);
          
          // finalUrl = "https://thingproxy.freeboard.io/fetch/" + finalUrl;
        }
        cpu.portraitBuff = finalUrl;
        console.log("Set CPU portrait for", cpu.name, "to:", finalUrl);
        this.updateUrl();
      }

    convertStringsToNumbers(obj) {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'string' && !isNaN(Number(obj[key])) && obj[key].trim() !== '') {
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

        this.copiedEmbed = true;
        setTimeout(() => this.copiedEmbed = false, 1500);
    }

    checkEmptyNumber(e: FocusEvent): void {
        let inputElement = (e.target as HTMLInputElement);
        if (inputElement.value.length === 0 && inputElement.type === 'number') {
            inputElement.value = "0";
        }
    }

    updateUrl(): void {
        const iframe = document.getElementById('gamePreview') as HTMLIFrameElement | null;
        iframe.src = this.url;
        console.log(this.settings);
    }

    fileSelected(e:any) {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.size > 1000000) {
            alert('Portraits greater than 1MB are not allowed as they can cause lag!');
            this.clearPlayerPortrait();
            return;
        }
        reader.readAsDataURL(file);
        this.fileName = file.name;
        reader.onload = () => {
            console.log("Player Portrait Uploaded:", reader.result);
            if (typeof reader.result === "string") {  // 确保是字符串
                this.settings.player.portraitBuff = reader.result;
            } else {
                console.error("Unexpected portrait data format:", reader.result);
                this.settings.player.portraitBuff = "";
        }
        this.updateUrl();
        };
    }
    cpuFileSelected(cpu:CpuSettingsModel, e:any) {
        console.log(cpu);
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.size > 1000000) {
            alert('Portraits greater than 1MB are not allowed as they can cause lag!');
            this.clearCPUPortrait(cpu);
            return;
        }
        reader.readAsDataURL(file);
        this.fileName = file.name;
        reader.onload = () => {
            console.log("CPU Portrait Uploaded:", reader.result);
            if (typeof reader.result === "string") {
                cpu.portraitBuff = reader.result;
            } else {
                console.error("Unexpected CPU portrait data format:", reader.result);
                cpu.portraitBuff = "";
        }
        this.updateUrl();
        };
    }
    clearPlayerPortrait() {
        this.settings.player.portrait = null;
        this.settings.player.portraitBuff = null;
    }
    clearCPUPortrait(cpu:CpuSettingsModel) {
        cpu.portrait = null;
        cpu.portraitBuff = null;
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
          if (!this.settings.defaultPortraits || this.settings.defaultPortraits.length === 0) {
            
            this.settings.defaultPortraits = defaultSettings().defaultPortraits;
          }
        }
        this.previewGame();
      
        console.log("Default Portraits:", this.settings.defaultPortraits);

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


    openDefaultPortraitModal(event: MouseEvent) {
        const dialog = document.getElementById("default_portraits_modal") as HTMLDialogElement;
        if (dialog) {
          dialog.showModal();
        }
    }
      
    chooseDefaultPortraitAndClose(url: string) {
        this.chooseDefaultPortrait(url); //  portraitBuff
        // close
        const dialog = document.getElementById("default_portraits_modal") as HTMLDialogElement;
        if (dialog) {
          dialog.close();
        }
    }
    
    chooseDefaultPortrait(url: string) {
        let finalUrl = (url || '').trim();
        if (finalUrl.includes('drive.google.com')) {
            finalUrl = convertGoogleDriveUrl(finalUrl);

            // finalUrl = "https://api.allorigins.win/raw?url=" + finalUrl;
        }

        this.settings.player.portraitBuff = finalUrl;
        console.log("Default portrait chosen:", finalUrl);
            
        this.updateUrl();
    }

    openDefaultCpuPortraitModal(cpu: CpuSettingsModel, event: MouseEvent) {
        this.currentCpuForDefault = cpu;
        const dialog = document.getElementById("default_cpu_portraits_modal") as HTMLDialogElement;
        if (dialog) {
          dialog.showModal();
        }
      }
      
      chooseDefaultCpuPortraitAndClose(url: string): void {
        if (this.currentCpuForDefault) {
            this.setCpuPortraitUrl(this.currentCpuForDefault, url);
          } else {
            console.error("No CPU selected for default portrait");
          }
          const dialog = document.getElementById("default_cpu_portraits_modal") as HTMLDialogElement;
          if (dialog) {
            dialog.close();
          }
        }
      
      chooseCpuPortraitUrl(cpu: CpuSettingsModel, url: string): void {
        let finalUrl = (url || '').trim();
        if (finalUrl.includes('drive.google.com')) {
          finalUrl = convertGoogleDriveUrl(finalUrl);
          
          // finalUrl = "https://thingproxy.freeboard.io/fetch/" + finalUrl;
        }
        cpu.portraitBuff = finalUrl;
        console.log("Set CPU portrait for", cpu.name, "to:", finalUrl);
        this.updateUrl();
      }
      

     // Example usage:
    // Call this function when a button is clicked or any other event is triggered
    // sendEmailWithVariable('This is the variable value');


}
