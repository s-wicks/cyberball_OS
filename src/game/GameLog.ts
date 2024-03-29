import CyberballGameController from "./CyberballGameController";

export function addLogging(controller: CyberballGameController) {
    let gameLog = [];

    // can elect to use timer/gameclock module here? have to notify game clock of every throw and it can report the waits
    controller.throwBallCallbacks.addCallback("log throw", (thrower, reciever, waitTime) => {
        gameLog.push({ "type": "throw", "thrower": thrower, "reciever": reciever, "wait": waitTime });
    });

    controller.CPULeaveCallbacks.addCallback("log leave", (id, reason) => {
        gameLog.push({ "type": "CPU leave", "leaver": id, "reason": reason, "time": this.cyberballGameController.reportTimeSinceStart() })
    });

    controller.humanPlayerMayLeaveCallbacks.addCallback("log player may leave", reason => {
        gameLog.push({ "type": "player may leave", "reason": reason, "time": this.cyberballGameController.reportTimeSinceStart() })
    });

    controller.gameEndCallbacks.addCallback("log game end", reason => {
        gameLog.push({ "type": "game end", "reason": reason, "time": this.cyberballGameController.reportTimeSinceStart() })
    });
}