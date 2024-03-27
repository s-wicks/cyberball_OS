export default class CyberballGameModel {
    playerHoldingBallId?: number; // can be CPU or human
    throwTargetId?: number; // can be CPU or human
    static readonly humanPlayerId = -1;
    remainingCpuPlayerIds: Set<number> = new Set();
    humanPlayerMayLeave = false;
    gameHasEnded = false;
    startTime: number = Date.now();
    throwCount: number = 0;
}
