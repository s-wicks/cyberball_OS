import { SettingsModel } from "models/settings-model";
import CyberballGameController from "./CyberballGameController";

let numPlayers = 0;
let gameLog = [];
let timeAtCatch = 0;
let humanLeaveReason = "";

/**
 * NOTE!!!
 * Whenever providing a thrower or reciever ID, please give the value
 * that the game controller uses (user is -1, first cpu is 0, etc...).
 * Reformatting into the numbers used on the Qualtrics side is handled
 * by the logger! (User -1 => Player 1, CPU 0 => Player 2, etc...)
 * @param controller 
*/
export function addGameLogging(controller: CyberballGameController, settings: SettingsModel) {
    controller.catchBallCallbacks.addCallback("grab time at catch", () => {
        timeAtCatch = controller.reportTimeSinceStart();
    })

    controller.throwBallCallbacks.addCallback("log throw", (throwerID, recieverID) => {
        gameLog.push({ "type": "throw", "thrower": throwerID + 2, "reciever": recieverID + 2, "wait": controller.reportTimeSinceStart() - timeAtCatch });
    });

    controller.CPULeaveCallbacks.addCallback("log leave", (cpuID, reason) => {
        gameLog.push({ "type": "CPU leave", "leaver": cpuID + 2, "reason": reason, "time": controller.reportTimeSinceStart() });
    });

    controller.humanPlayerMayLeaveCallbacks.addCallback("log player may leave", reason => {
        gameLog.push({ "type": "player may leave", "reason": reason, "time": controller.reportTimeSinceStart() });

        humanLeaveReason = reason;
    });

    controller.gameEndCallbacks.addCallback("log and post game end", reason => {
        gameLog.push({ "type": "game end", "reason": reason, "time": controller.reportTimeSinceStart() });

        numPlayers = settings.computerPlayers.length + 1;
        processAndReportGameLog(controller.model.throwCount, controller.reportTimeSinceStart());
    });
}

function processAndReportGameLog(throwCount, totalTime) {
    let throwStats = Array(numPlayers).fill([]).map(() => Array(numPlayers).fill(0));

    for (let entry of gameLog) {
        if (entry.type === "throw") {
            //account for numbering of game log
            //in game log as player 1 but we use index 0, 2 => 1, etc...
            throwStats[entry.thrower - 1][entry.reciever - 1]++;
        }
    }

    //note: if debugging, use `window.addEventListener('message', (msg) => console.log(msg.data))` in browser console
    window.parent.postMessage(
        {
            "game_log": gameLog,
            "throws_formatted": throwStats,
            "player_throws_list": buildListOfPlayerThrows(throwStats),
            "total_throws": throwCount,
            "player_may_leave": humanLeaveReason,
            "total_time": totalTime
        }
    );
}

function buildListOfPlayerThrows(throwStats) {
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

    let loopCount = Math.min(numPlayers, 4)
    for (let i = 0; i < loopCount; i++) {
        for (let j = 0; j < loopCount; j++) {
            if (i != j)
                msg['Player_' + (i + 1) + '_to_Player_' + (j + 1)] = throwStats[i][j];
        }
    }

    return msg;
}