import CallbackList from "./callback-list";
import CyberballGameModel from "./CyberballGameModel";

export default class CyberballGameController {
    readonly model: CyberballGameModel;

    public CPULeaveCallbacks: CallbackList<[number]> = new CallbackList();
    public throwBallCallbacks: CallbackList<[number /* thrower */, number /* receiver */]> = new CallbackList();
    public catchBallCallbacks: CallbackList<[number]> = new CallbackList();
    public humanPlayerMayLeaveCallbacks: CallbackList<[string]> = new CallbackList();
    public gameEndCallbacks: CallbackList<[string]> = new CallbackList();
    private getNextCpuTarget: (thrower: number) => number = s => s;

    constructor(playerStartingWithBall: number, numberOfCpuPlayers: number) {
        this.model = new CyberballGameModel();
        this.model.playerHoldingBall = playerStartingWithBall;
        for (let i = 0; i < numberOfCpuPlayers; i++) {
            this.model.remainingCpuPlayers.add(i);
        }
    }
    
    public setCpuTargeting(getNextCpuTarget: (thrower: number) => number) {
        this.getNextCpuTarget = getNextCpuTarget;
    }

    public removeCPUfromGame(index: number, reason: string) {
        if (this.model.gameHasEnded) {
            return;
        }
        let isThrowing = this.model.playerHoldingBall === index;
        let isCatching = this.model.throwTarget === index;
        let alreadyLeft = !this.model.remainingCpuPlayers.has(index);
        if (isThrowing || isCatching || alreadyLeft) {
            return;
        }
        this.model.remainingCpuPlayers.delete(index);
        this.CPULeaveCallbacks.runCallbacks(index);
    }

    public throwBall(target: number) {
        if (this.model.gameHasEnded) {
            return;
        }
        if (this.model.playerHoldingBall === null) {
            console.warn("Attempting to throw ball when nobody is holding it?");
            return;
        }
        let playerHoldingBall = this.model.playerHoldingBall;
        this.model.playerHoldingBall = null;
        this.model.throwTarget = target;
        this.throwBallCallbacks.runCallbacks(playerHoldingBall, target);
    }

    public cpuThrowBall() {
        if (this.model.playerHoldingBall === null || CyberballGameModel.humanPlayerId === this.model.playerHoldingBall) {
            console.warn("Attempting CPU throw ball when CPU not holding it?");
        }
        this.throwBall(this.getNextCpuTarget(this.model.playerHoldingBall))
    }

    public completeCatch() {
        if (this.model.gameHasEnded) {
            return;
        }
        if (this.model.throwTarget === null) {
            console.warn("Attempting to catch ball without target?");
            return;
        }
        this.model.playerHoldingBall = this.model.throwTarget;
        this.model.throwTarget = null;
        this.model.throwCount += 1;
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