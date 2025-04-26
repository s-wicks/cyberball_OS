import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class LandingPage {
    router: Router;
    constructor(router) {
        this.router = router;
    }

    loadCreateNew() {
        // Navigate to the home route
        console.log(this.router);
        this.router.navigateToRoute('home');
    }

    loadPreset() {
        // Logic to load a preset
        console.log(this.router);
        this.router.navigateToRoute('PresetPage');
    }

    loadHelp() {
        // Navigate to help
        console.log(this.router);
        this.router.navigateToRoute('HelpPage');
    }
}


