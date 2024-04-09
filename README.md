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
