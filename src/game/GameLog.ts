import CyberballGameController from "./CyberballGameController";
let gameLog = [];


export function addLogging(controller: CyberballGameController) {

    controller.throwBallCallbacks.addCallback("log throw", (thrower, reciever, waitTime) => {
        LogThrow(thrower, reciever, waitTime)
    });
    controller.CPULeaveCallbacks.addCallback("log leave", id => {

    });
    controller.humanPlayerMayLeaveCallbacks.addCallback("log player may leave", reason => {

    });
    controller.gameEndCallbacks.addCallback("log game end", reason => {

    });
}
function LogThrow(thrower, reciever, waitTime) {
    gameLog.push({ "type": "throw", "thrower": thrower, "reciever": reciever, "wait": waitTime });
}