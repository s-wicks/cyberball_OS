export class Logger {
    numPlayers = 0;
    gameLog = [];

    /**
     * 
     * @param throwerID the id for the thrower (do not adjust - ex: player 1 is id 0)
     * @param recieverID the id for the reciever (do not adjust - ex: player 1 is id 0)
     * @param waitTime the time between a catch and a throw
     */
    addThrow(throwerID: number, recieverID: number, waitTime: number) {
        this.gameLog.push({ "type": "throw", "thrower": throwerID, "reciever": recieverID, "wait": waitTime });

        this.numPlayers = Math.max(this.numPlayers, throwerID + 2, recieverID + 2);
    }

    /**
     * 
     * @param cpuID the id for the leaver (do not adjust - ex: player 1 is id 0)
     * @param reason name/description of cpu leave trigger 
     * @param time time since start of game
     */
    addCPULeave(cpuID: number, reason: string, time: number) {
        this.gameLog.push({ "type": "CPU leave", "leaver": cpuID, "reason": reason, "time": time });
    }

    /**
     * 
     * @param reason name/description of player leave trigger
     * @param time time since start of game
     */
    addPlayerMayLeave(reason: string, time: number) {
        this.gameLog.push({ "type": "player may leave", "reason": reason, "time": time });
    }

    /**
     * 
     * @param reason description of what condition caused game to end
     * @param time time since start of game
     * @param totalThrows total number of throws in the game
     */
    addGameEnd(reason: string, time: number, totalThrows: number) {
        this.gameLog.push({ "type": "game end", "reason": reason, "time": time });

        this.processAndReportGameLog(totalThrows);
    }

    /**
     * formats and posts message for qualtrics
     * @param totalThrows 
     */
    private processAndReportGameLog(totalThrows) {
        // Postprocessing

        let throwStats = Array(this.numPlayers).fill(Array(this.numPlayers).fill(0));

        for (let entry of this.gameLog) {
            if (entry.type === "throw") {
                //account for numbering - user -1 is now index 0, etc
                throwStats[entry.thrower + 1][entry.reciever + 1]++;
            }
        }

        window.parent.postMessage(
            {
                "game_log": this.gameLog,
                "throws_formatted": throwStats,
                "total_throws": totalThrows,
                "player_throws_list": this.buildListOfPlayerThrows(throwStats)
            }
        );
    }

    /**
     * formats list of player throws for `processAndReportGameLog()` message
     * @param throwStats formatted throws 2d array
     * @returns player_throws_list
     */
    private buildListOfPlayerThrows(throwStats) {
        let msg = {
            "Player_1_to_Player_2": 0,
            "Player_1_to_Player_3": 0,
            "Player_1_to_Player_4": 0,
            "Player_2_to_Player_1": 0,
            "Player_2_to_Player_3": 0,
            "Player_2_to_Player_4": 0,
            "Player_3_to_Player_1": 0,
            "Player_3_to_Player_2": 0,
            "Player_3_to_Player_4": 0,
        };

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (i < this.numPlayers && j < this.numPlayers) {
                    msg['Player_' + (i + 1) + '_to_Player_' + (j + 1)] = throwStats[i][j];
                }
            }
        }

        return msg;
    }
}