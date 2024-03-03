import CallbackList from "./callback-list";

class CyberballGameModel {
    playerHoldingBall?: string; // can be CPU or human
    throwTarget?: string; // can be CPU or human
    humanPlayer: string
    remainingCpuPlayers: Set<string>;
    humanPlayerMayLeave = false;
    gameHasEnded = false;
}

export default class CyberballGameController {
    model: CyberballGameModel;

    public CPULeaveCallbacks: CallbackList<[string]> = new CallbackList();
    public throwBallCallbacks: CallbackList<[string /* thrower */, string /* receiver */]> = new CallbackList();
    public catchBallCallbacks: CallbackList<[string]> = new CallbackList();
    public humanPlayerMayLeaveCallbacks: CallbackList<[string]> = new CallbackList();
    public gameEndCallbacks: CallbackList<[string]> = new CallbackList();

    constructor(model: CyberballGameModel) {
        this.model = model;
    }

    public removeCPUfromGame(name: string) {
        let isThrowing = this.model.playerHoldingBall == name;
        let isCatching = this.model.throwTarget == name;
        let alreadyLeft = !this.model.remainingCpuPlayers.has(name);
        if (isThrowing || isCatching || alreadyLeft) {
            return;
        }
        this.model.remainingCpuPlayers.delete(name);
        this.CPULeaveCallbacks.runCallbacks(name);
    }

    public throwBall(target: string) {
        if (!this.model.playerHoldingBall) {
            console.warn("Attempting to throw ball when nobody is holding it?");
            return;
        }
        let playerHoldingBall = this.model.playerHoldingBall;
        this.model.playerHoldingBall = null;
        this.model.throwTarget = target;
        this.throwBallCallbacks.runCallbacks(playerHoldingBall, target);
    }

    public completeCatch() {
        this.model.playerHoldingBall = this.model.throwTarget;
        this.model.throwTarget = null;
        this.catchBallCallbacks.runCallbacks(this.model.playerHoldingBall);
    }

    public allowPlayerToLeave(reason: string) {
        if (this.model.humanPlayerMayLeave) {
            return;
        }
        this.model.humanPlayerMayLeave = true;
        this.humanPlayerMayLeaveCallbacks.runCallbacks(reason);
    }

    public endGame(reason: string) {
        if (this.model.gameHasEnded) {
            return;
        }
        this.model.gameHasEnded = true;
        this.gameEndCallbacks.runCallbacks(reason);
    }
}