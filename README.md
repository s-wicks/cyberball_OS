# `cyberball`

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

For more information, go to https://aurelia.io/docs/cli/cli-bundler

## Run dev app

Run `au run`, then open `http://localhost:9000`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 8888`.

## Usage in Qualtrics

HTML View:

```
<iframe id="cyberball" width="100%" height="580" src="https://cuddlebunny.github.io/osu-cyberball/#game"></iframe>
```

JavaScript:

```
Qualtrics.SurveyEngine.addOnload(function() {
    /* Place your JavaScript here to run when the page loads */
    this.hideNextButton();
});
 
Qualtrics.SurveyEngine.addOnReady(function() {
    /* Place your JavaScript here to run when the page is fully displayed */
    window.addEventListener('message', (msg) => {
		//check that this is the end of game message
        if(msg.data.flag === "game_over"){
			//end game - 3.1 sec timer
			setTimeout(()=>{this.clickNextButton();}, 3100);
			
			//populate qualtrics fields
			for (const [key, value] of Object.entries(msg.data)){	
				
				//player throw list is itself an object - have to iterate
				if(key === "player_throws_list"){
					for(const [throwPath, numThrows] of value){
						Qualtrics.SurveyEngine.setEmbeddedData(throwPath, numThrows);
					}
					
				} else {
					Qualtrics.SurveyEngine.setEmbeddedData(key, JSON.stringify(value));
				}
			}
		} //can add elif for error case
    });
});

Qualtrics.SurveyEngine.addOnPageSubmit(function() {
	// Code to run when the page is submitted can be added here
});

//TODO research if this processes on page closed?
Qualtrics.SurveyEngine.addOnUnload(function() {
	//Code here runs when page is unloaded
});
```
