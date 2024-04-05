import CallbackList from "./callback-list";
import CyberballGameModel from "./CyberballGameModel";

export default class CyberballGameController {
    readonly model: CyberballGameModel;

    public CPULeaveCallbacks: CallbackList<[number /** id */, string /** reason */]> = new CallbackList();
    public throwBallCallbacks: CallbackList<[number /* thrower */, number /* receiver */]> = new CallbackList();
    public catchBallCallbacks: CallbackList<[number]> = new CallbackList();
    public humanPlayerMayLeaveCallbacks: CallbackList<[string]> = new CallbackList();
    public gameEndCallbacks: CallbackList<[string]> = new CallbackList();
    private getNextCpuTarget: (thrower: number) => number = s => s;

    constructor(playerStartingWithBall: number, numberOfCpuPlayers: number) {
        this.model = new CyberballGameModel();
        this.model.playerHoldingBallId = playerStartingWithBall;
        for (let i = 0; i < numberOfCpuPlayers; i++) {
            this.model.remainingCpuPlayerIds.add(i);
        }
    }

    public setCpuTargeting(getNextCpuTarget: (thrower: number) => number) {
        this.getNextCpuTarget = getNextCpuTarget;
    }

    public removeCPUfromGame(id: number, reason: string) {
        if (this.model.gameHasEnded) {
            return;
        }
        let isHolding = this.model.playerHoldingBallId === id;
        let isCatching = this.model.throwTargetId === id;
        let alreadyLeft = !this.model.remainingCpuPlayerIds.has(id);
        if (isHolding || isCatching || alreadyLeft) {
            return;
        }
        this.model.remainingCpuPlayerIds.delete(id);
        this.CPULeaveCallbacks.runCallbacks(id, reason);
    }

    public throwBall(target: number) {
        if (this.model.gameHasEnded) {
            return;
        }
        if (this.model.playerHoldingBallId === null) {
            console.warn("Attempting to throw ball when nobody is holding it?");
            return;
        }
        if (this.model.playerHoldingBallId === target) {
            console.warn("Player throwing ball to themselves?");
            return;
        }
        let playerHoldingBall = this.model.playerHoldingBallId;
        this.model.playerHoldingBallId = null;
        this.model.throwTargetId = target;
        this.throwBallCallbacks.runCallbacks(playerHoldingBall, target);
    }

    public cpuThrowBall() {
        if (this.model.gameHasEnded) {
            return;
        }
        if (this.model.playerHoldingBallId === null || CyberballGameModel.humanPlayerId === this.model.playerHoldingBallId) {
            console.warn("Attempting CPU throw ball when CPU not holding it?");
        }
        this.throwBall(this.getNextCpuTarget(this.model.playerHoldingBallId))
    }

    public completeCatch() {
        if (this.model.gameHasEnded) {
            return;
        }
        if (this.model.throwTargetId === null) {
            console.warn("Attempting to catch ball without target?");
            return;
        }
        this.model.playerHoldingBallId = this.model.throwTargetId;
        this.model.throwTargetId = null;
        this.model.throwCount += 1;
        this.catchBallCallbacks.runCallbacks(this.model.playerHoldingBallId);
    }

    public allowPlayerToLeave(reason: string) {
        if (this.model.humanPlayerMayLeave || this.model.gameHasEnded) {
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

    public reportTimeSinceStart() {
        return Date.now() - this.model.startTime
    }
}