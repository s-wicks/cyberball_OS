# `cyberball`

OSU Spring 2024 Capstone Project

An updated easy-implemented, open-source ball-toss game to study group dynamics

This project uses [Aurelia](https://aurelia.io/home) as the UI framework and [Phaser](https://phaser.io/) to implement the game

## Installation

You need [nodejs](https://nodejs.org) installed to run this project.

After you install nodejs and download the repository. Run `npm i` to install dependencies.

Run `npm start` to run the website locally.

Run `npm run build` to build a static webpage for a web server. You only need to copy the `scripts` and `assets` folder and all of the files in the root directory to a web server.

## Usage in Qualtrics

When setting up a Qualtrics survey, using the `copy embed code` option to get the html code to use inside Qualtrics.

The following javascript code can be used to setup the page for collecting data.

```
Qualtrics.SurveyEngine.addOnload(function() {
    this.hideNextButton();
});
 
Qualtrics.SurveyEngine.addOnReady(function() {
    window.addEventListener('message', (msg) => {
        setTimeout(() => this.clickNextButton(), 3000);
        
        //populate qualtrics fields
        for (const [key, value] of Object.entries(msg.data)){    
            
            //player throw list is itself an object - have to iterate
            if(key === "player_throws_list"){
                for(const [throwPath, numThrows] of Object.entries(value)){
                    Qualtrics.SurveyEngine.setEmbeddedData(throwPath, numThrows);
                }
            } else {
                Qualtrics.SurveyEngine.setEmbeddedData(key, JSON.stringify(value));
            }
        }
    });
});
```

Additionally you need to setup the embedded data fields inside Qualtrics.

Here is a list of fields that cyberball create:

- game_log - This contains all of the collected information about the game. A full description can be found in the documentation.
- throws_formatted - A two dimensional array in the form "[[0, 0, 0],[0, 0, 0],[0, 0, 0]]" where each sub-array shows how many times they threw to each player. E.g throws_formatted[0][1] shows how many times player 1 threw to player 2. This will always include all CPUs unlike the Player_X_to_Player_Y family of fields.
- total_throws - This is the total number of throws in the game
- player_may_leave_reason - The reason why the player was allowed to leave (blank if the player was never allowed)
- player_may_leave_time - How long the player was in the game before they left in ms (0 if the game ended for a different reason)
- total_time - The total game length in ms
- Player_X_to_Player_Y - This is a group of fields where X and Y are between 1 and 4. E.g Player_1_to_Player_2 shows how many times player 1 threw to player 2