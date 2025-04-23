# `cyberball`

OSU SP24/25 Capstone Project

An updated easy-implemented, open-source ball-toss game to study group dynamics.

[Cyberball](https://cyberball.osu.edu/) uses [Aurelia](https://aurelia.io/home) as the UI framework and [Phaser](https://phaser.io/) to implement the game.

## Installation

You need [nodejs](https://nodejs.org) installed to run this project.

After you install nodejs and download the repository. Run `npm i` to install dependencies.

Run `npm start` to run the website locally.

Run `npm run build` to build a static webpage for a web server. You only need to copy the `scripts` and `assets` folder and all of the files in the root directory to a web server.

## Usage in Qualtrics

When setting up a Qualtrics survey, use the `copy embed code` option to get the HTML to use inside Qualtrics.

The following JavaScript is used to setup the page for collecting data.

```
Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
});

new JavaScript being tested
```

Additionally, you need to setup the embedded data fields inside Qualtrics.

Here is a list of fields that Cyberball creates:

- **game_log:** contains all of the collected information about the game, a full description can be found in the documentation.
- **throws_formatted:** a two dimensional array in the form "[[0, 0, 0],[0, 0, 0],[0, 0, 0]]" where each sub-array shows how many times they threw to each player. EX. throws_formatted[0][1] shows how many times Player 1 threw to Player 2. This always includes all CPUs unlike the Player_X_to_Player_Y family of fields.
- **total_throws:** total number of throws in the game.
- **player_may_leave_reason:** reason why the player was allowed to leave (blank if the player was never allowed).
- **player_may_leave_time:** how long the player was in the game before they left in ms (0 if the game ended for a different reason).
- **total_time:** total game length in ms.
- **Player_X_to_Player_Y:** a group of fields where X and Y are between 1 and 4. EX. Player_1_to_Player_2 shows how many times Player 1 threw to Player 2
