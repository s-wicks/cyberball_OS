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
    settings: SettingsModel = defaultSettings;
    clipboard: ClipboardJS;
    sidebar: HTMLElement;
    sidebarContent: HTMLElement;
    currentSetting: string = '';
    showModal: boolean = false;
    presetName: string = '';
    presetDescription: string = '';
    showFileModal: boolean = false;  // Used to show/hide the modal
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

    showInfo(setting: string) {
        const sidebar = this.sidebar;
        const content = this.sidebarContent;

        // Determine the content for the setting
        let newContent = '';
        switch (setting) {
            case 'color':
                newContent = '<span class="description-header">Brief Description:</span><br>You can edit the color of the participant’s player by clicking on the box next to “Tint Color” to bring up a color palette.<br><br>'
                break;
            case 'playerHeader':
                newContent = '<span class="description-header">Brief Description:</span><br>This is the player the participant in your study will control.<br><br>'
                break;
            case 'portrait':
                newContent = '<span class="description-header">Brief Description:</span><br>You can insert an image that will be placed below the participant’s player. Be sure to include your image with (format dimensions).<br><br>'
                break;
            case 'leaveTrigger':
                newContent = '<span class="description-header">Brief Description:</span><br>By editing the “Leave Triggers” settings, you are indicating when the participant is presented with a button they can click to leave the game.<br><br>'
                break;
            case 'throwsElapsed':
                newContent = '<span class="description-header">Brief Description:</span><br>You can set the number of throws between all players before the participant is given the option to leave the game.<br><br>' + '<span> For example, if you wanted to see how soon the participant would leave after 30 throws, you would set the value under “Throws Elapsed Leave Threshold” to 30. You also have the option to add variability to the number of total throws before the participant is give the option to leave by setting the throws elapsed variance. Let’s use 5-toss variance as an example. By placing a variance of 5 under “Variance” for our 30-toss example, the games will now range from 25 to 35 tosses total before a participant is presented with a button they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.</span>'
                break;
            case 'timeElapsed':
                newContent = '<span class="description-header">Brief Description:</span><br>You can set how much time has to pass before the participant is given the option to leave the game.<br><br>' +
                    'Here, you will set the amount of time that has to pass before the participant is given the opportunity to leave the game. After the set amount of time has passed, a red, “next” button will appear in Qualtrics that the participant will click to leave the game. For example, if you wanted to see how soon the participant would leave after 60 seconds of being in the game, you would set the value under “Time Elapsed Leave Threshold” to 60. You also have the option to add variability to the amount of time that has to pass before the participant is given the option to leave with time elapsed variance. Let’s use a 20-second variance as an example. By placing a variance of 20 under “Variance” for our 60-second example, the games will now range from 40 to 80 seconds total before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.' +
                    '<br><br>' + '<span>For example, if you wanted to see how soon the participant would leave after 60 seconds of being in the game, you would set the value under “Time Elapsed Leave Threshold” to 60. You also have the option to add variability to the amount of time that has to pass before the participant is given the option to leave with time elapsed variance. Let’s use a 20-second variance as an example. By placing a variance of 20 under “Variance” for our 60-second example, the games will now range from 40 to 80 seconds total before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.</span>'
                break;
            case 'throwsIgnored':
                newContent = '<span class="description-header">Brief Description:</span><br>You can set how many times the participant is ignored by the computer-controlled players before they are given the option to leave the game.<br><br>' +
                    'Here, you will set the number of times the participant has to be ignored by the computer-controlled players before the participant is given the opportunity to leave the game. After being ignored for the set number of times has passed, a red, “next” button will appear in Qualtrics that the participant will click to leave the game.\n' +
                    '\n' +
                    'For example, if you wanted to see how soon the participant would leave after being ignored 10 times by the computer-controlled players, you would set the value under “Ignored Throws\n' +
                    '\n' +
                    'Leave Threshold” to 10. You can also use the throws ignored variance to add variability in the amount of throws participants are ignored for before the participant is given the option to leave. Let’s use a 3-throws variance as an example. By placing a variance of 3 under “Variance” for our 10-throws-ignored example, the games will now range from 7-13 throws where the participant is ignored before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.' + '<br><br><span>For example, if you wanted to see how soon the participant would leave after being ignored 10 times by the computer-controlled players, you would set the value under “Ignored Throws\n' +
                    '\n' +
                    'Leave Threshold” to 10. You can also use the throws ignored variance to add variability in the amount of throws participants are ignored for before the participant is given the option to leave. Let’s use a 3-throws variance as an example. By placing a variance of 3 under “Variance” for our 10-throws-ignored example, the games will now range from 7-13 throws where the participant is ignored before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.</span>'
                break;
            case 'timeIgnored':
                newContent = '<span class="description-header">Brief Description:</span><br>You can set how long the participant is ignored by the computer-controlled players before they are given the option to leave the game.<br><br>' + '<span>For example, if you wanted to see how soon the participant would leave after being ignored for 45 seconds by the computer-controlled players, you would set the value under “Ignored Time Leave Threshold” to 45. You also have the option to add variability to the amount of time participants are ignored for before the participant is given the option to leave with time ignored variance. Let’s use a 15-second variance as an example. By placing a variance of 15 under “Variance” for our 45-second example, the games will now range from 30-60 seconds where the participant is ignored before the participant is presented with a button that they can click to leave. This allows you the opportunity to lower participants’ suspicion by not giving participants the option to leave at the same time. Click for more information.</span>'
                break;
            case 'otherPlayersLeaving':
                newContent = '<span class="description-header">Brief Description:</span><br>You can set how many computer-controlled players leave the game before the participant is given the option to leave.<br><br>' + '<span>For example, if you wanted to see how soon the participant would leave after 2 of the computer-controlled players in your study left, you would set the value under “Other Players Leaving” to 2. Click for more information.</span>'
                break;
            case 'cpus':
                newContent = '<span class="description-header">Brief Description:</span><br>This is the computer-controlled player that your participant will play a virtual game of catch-and-toss with. You can also add additional computer-controlled players<br><br>'
                break;
            case 'throwDelay':
                newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands in a “throw-ready” stance before they actually throw the ball<br><br>' + '<span>For example, a value of 500 in the Throw Delay column will result in the computer-controlled player standing in a “throw-ready” stance for 5 seconds before they throw the ball to their next target. You also have the option to add variability to how long the computer-controlled player stays in this stance before they throw the ball. Let’s use a variance of 200 as an example. By placing a variance of 200 for our 500-valued throw delay, the computer-controlled player will now hold the ball for 3-7 seconds before they throw the ball to their next target. This allows you the opportunity to lower participants’ suspicion by not having the computer-controlled player in the “throw-ready” position for the same amount of time each time they get in position before throwing. Each computer-controlled player that you choose to add can be set with a unique throw delay, as well as a unique variance. Click for more information.</span>'
                break;
            case 'catchDelay':
                newContent = '<span class="description-header">Brief Description:</span><br>You can edit how long the computer-controlled player stands with the ball after catching it before they prepare to throw the ball.<br><br>' + '<span>For example, a value of 500 in the Catch Delay column will result in the computer-controlled player standing in a “caught-ball” stance for 5 seconds before they move into a “throw-ready” stance. You also have the option to add variability to how long the computer-controlled player stays in this stance before they move into their “throw-ready” stance. Let’s use a variance of 200 as an example. By placing a variance of 200 for our 500-valued catch delay, the computer-controlled player will now hold the ball for 3-7 seconds before they move into their “throw-ready” stance. This allows you the opportunity to lower participants’ suspicion by not having the computer-controlled player in the “caught-ball” position for the same amount of time each time they get the ball before moving into the “throw-ready” position. Each computer-controlled player that you choose to add can be set with a unique catch delay, as well as a unique variance. Click for more information.</span>'
                break;
            case 'targetPreference':
                newContent = '<span class="description-header">Brief Description:</span><br>You can edit how often the computer-controlled player throws to the participant’s player and additional CPU players you add.<br><br>' + '<span>For example, if you had a study that consisted of the participant’s player, the original computer-controlled player that you have\n' +
                    '\n' +
                    'been editing, and a computer-controlled player that you chose to add, you would enter two values that would constitute how often the computer-controlled player that you have been editing will throw to the other two players. In this example, if you were to place 50 in one box and 50 in the second box, the computer-controlled player that you have been editing will equally throw the ball to the other two players throughout the game (50%/50%). The first box’s value represents the share of throws that the participant’s player will receive from this computer-controlled player, while the second box’s value represents the share of throws that the added CPU will receive.</span>'
                break;

            // Add more cases for other settings
            default:
                newContent = "Here's some information about your settings...";
        }

        // If the sidebar is open and the setting is the same as the current setting, close the sidebar
        if (sidebar.classList.contains('sidebar-open') && this.currentSetting === setting) {
            this.closeSidebar();
            this.currentSetting = ''; // Reset the current setting
            return;
        }

        // Update the content and the current setting
        content.innerHTML = newContent;
        this.currentSetting = setting;

        // Open the sidebar if it's not already open
        if (!sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.add('sidebar-open');
        }
    }


    closeSidebar() {
        this.sidebar.classList.remove('sidebar-open');
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
        this.closeSidebar();
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
        this.closeSidebar();
    }

    @computedFrom('settings', 'settings.player', 'settings.computerPlayers', 'settings.someOtherProperty', 'settings.anotherProperty')
    get settingsForPreview() { 
        return this.settings; // Include all relevant settings properties here
    }


    // Add these methods to your HomeViewModel class

    saveSettingsToLocalStorage() {
        this.convertStringsToNumbers(this.settings);
        this.showModal = true; // Show the modal when "Save to Preset" is clicked
    }

    cancelSave() {
        this.showModal = false; // Hide the modal when "Cancel" is clicked
        this.presetName = ''; // Clear the preset name
        this.presetDescription = ''; // Clear the preset description
    }

    confirmSave() {

        if (this.presetName.trim() === '') {
            alert('Please enter a preset name.');
            return;
        }

        // Save to local storage
        const presetData = {
            description: this.presetDescription,
            settings: this.settings
        };
        localStorage.setItem(this.presetName, JSON.stringify(presetData));

        this.showModal = false; // Hide the modal after saving
        this.presetName = ''; // Clear the preset name
        this.presetDescription = ''; // Clear the preset description
    }

    public saveSettingsToFile(): void {
        this.convertStringsToNumbers(this.settings);
        this.showFileModal = true;  // Show the file modal when "Save to File" is clicked
    }

    cancelFileSave() {
        this.showFileModal = false;   // Hide the file modal when "Cancel" is clicked
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
        this.showFileModal = false;
        this.fileName = '';
    }






// Example usage:
// Call this function when a button is clicked or any other event is triggered
    // sendEmailWithVariable('This is the variable value');


}
