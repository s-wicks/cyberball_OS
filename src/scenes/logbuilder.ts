class Logger {
    numPlayers = 0;
    gameLog = [];

    addThrow(thrower: number, reciever: number, waitTime: number) {
        this.gameLog.push({ "type": "throw", "thrower": thrower, "reciever": reciever, "wait": waitTime });

        this.numPlayers = Math.max(this.numPlayers, thrower + 2, reciever + 2);
    }

    addCPULeave(cpuID: number, reason: string, time: number) {
        this.gameLog.push({ "type": "CPU leave", "leaver": cpuID, "reason": reason, "time": time });
    }

    addPlayerMayLeave(reason: string, time: number) {
        this.gameLog.push({ "type": "player may leave", "reason": reason, "time": time });
    }

    addGameEnd(reason: string, time: number) {
        this.gameLog.push({ "type": "game end", "reason": reason, "time": time });

        this.processAndReportGameLog();
    }

    private processAndReportGameLog() {
        // Postprocessing

        let throwStats = Array(this.numPlayers).fill(Array(this.numPlayers).fill(0));
        let totalThrows = 0;

        for (let entry of this.gameLog) {
            if (entry.type === "throw") {
                //account for numbering - user -1 is now index 0, etc
                throwStats[entry.thrower + 1][entry.reciever + 1]++;
                totalThrows++;
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

    private buildListOfPlayerThrows(throwStats) {
        let msg = {
            Player_1_to_Player_2: 0,
            Player_1_to_Player_3: 0,
            Player_1_to_Player_4: 0,
            Player_2_to_Player_1: 0,
            Player_2_to_Player_3: 0,
            Player_2_to_Player_4: 0,
            Player_3_to_Player_1: 0,
            Player_3_to_Player_2: 0,
            Player_3_to_Player_4: 0,
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