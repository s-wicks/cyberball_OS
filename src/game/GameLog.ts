import CyberballGameController from "./CyberballGameController";

let numPlayers = 0;

export function addLogging(controller: CyberballGameController) {
    let gameLog = [];

    // TODO Nate - note - while wait and waitTime have been added to the callback in CyberballGameController they are not implemented
    controller.throwBallCallbacks.addCallback("log throw", (thrower, reciever, waitTime) => {
        gameLog.push({ "type": "throw", "thrower": thrower, "reciever": reciever, "wait": waitTime });

        numPlayers = Math.max(numPlayers, thrower + 2, reciever + 2);
    });

    controller.CPULeaveCallbacks.addCallback("log leave", (id, reason) => {
        gameLog.push({ "type": "CPU leave", "leaver": id, "reason": reason, "time": controller.reportTimeSinceStart() });
    });

    controller.humanPlayerMayLeaveCallbacks.addCallback("log player may leave", reason => {
        gameLog.push({ "type": "player may leave", "reason": reason, "time": controller.reportTimeSinceStart() });
    });

    controller.gameEndCallbacks.addCallback("log and post game end", reason => {
        gameLog.push({ "type": "game end", "reason": reason, "time": controller.reportTimeSinceStart() });

        processAndReportGameLog(gameLog);
    });
}

function processAndReportGameLog(gameLog) {
    // Postprocessing

    let throwStats = Array(numPlayers).fill(Array(numPlayers).fill(0));
    let totalThrows = 0;

    for (let entry of gameLog) {
        if (entry.type === "throw") {
            //account for numbering - user -1 is now index 0, etc
            throwStats[entry.thrower + 1][entry.reciever + 1]++;
            totalThrows++;
        }
    }

    window.parent.postMessage(
        {
            "game_log": gameLog,
            "throws_formatted": throwStats,
            "total_throws": totalThrows,
            "player_throws_list": buildListOfPlayerThrows(throwStats)
        }
    );
}

function buildListOfPlayerThrows(throwStats) {
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
            if (i < numPlayers && j < numPlayers) {
                msg['Player_' + (i + 1) + '_to_Player_' + (j + 1)] = throwStats[i][j];
            }
        }
    }

    return msg;
}