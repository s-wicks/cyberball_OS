import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject()
export class PresetPage {
    constructor(private router: Router) { }
    // ... the rest of your class


public activeTab: string = 'presets';

    public showTab(tabId: string): void {
        this.activeTab = tabId;
    }

    public get isPresetsActive(): boolean {
        return this.activeTab === 'presets';
    }

    public get isYourPresetsActive(): boolean {
        return this.activeTab === 'your-presets';
    }

    // Other component code here

    navigateToPage() {
        this.router.navigate('home');
    }



}
