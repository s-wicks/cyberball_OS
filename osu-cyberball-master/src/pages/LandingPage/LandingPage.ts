import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class LandingPage {
    router: Router;
    constructor(router) {
        this.router = router;
    }

    startFromScratch() {
        // Navigate to the home route
        this.router.navigateToRoute('home');
    }

    loadPreset() {
        // Logic to load a preset
        console.log("Loading preset...");
    }

    openManual() {
        // Logic to open the manual
        console.log("Opening manual...");
    }
}


