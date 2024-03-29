import CyberballGameController from "./CyberballGameController";

export function addLogging(controller: CyberballGameController) {
    let gameLog = [];

    // TODO Nate - note - while wait and waitTime have been added to the callback in CyberballGameController they are not implemented
    controller.throwBallCallbacks.addCallback("log throw", (thrower, reciever, waitTime) => {
        gameLog.push({ "type": "throw", "thrower": thrower, "reciever": reciever, "wait": waitTime });
    });

    controller.CPULeaveCallbacks.addCallback("log leave", (id, reason) => {
        gameLog.push({ "type": "CPU leave", "leaver": id, "reason": reason, "time": controller.reportTimeSinceStart() });
    });

    controller.humanPlayerMayLeaveCallbacks.addCallback("log player may leave", reason => {
        gameLog.push({ "type": "player may leave", "reason": reason, "time": controller.reportTimeSinceStart() });
    });

    controller.gameEndCallbacks.addCallback("log and postgame end", reason => {
        gameLog.push({ "type": "game end", "reason": reason, "time": controller.reportTimeSinceStart() });

        processAndReportGameLog(gameLog);
    });
}

function processAndReportGameLog(gameLog) {
    // TODO Nate - do postprocessing and format to be one big message

    window.parent.postMessage(null /* TODO Nate */);
}