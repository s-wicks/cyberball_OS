import { RouterConfiguration, Router } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.title = 'Cyberball';

        config.map([
            { route: ['', 'LandingPage'], name: 'LandingPage', moduleId: 'pages/LandingPage/LandingPage' },
            { route: 'home', name: 'home', moduleId: 'pages/Home/home' },
            { route: 'game', name: 'game', moduleId: 'pages/Game/game' },
            { route: 'PresetPage', name: 'PresetPage', moduleId: 'pages/PresetPage/PresetPage' },
            { route: 'message-test', name: 'message-test', moduleId: 'pages/message-test' },
            { route: 'scheduler', name: 'scheduler', moduleId: 'pages/scheduler/scheduler' }
        ]);

    }
}
