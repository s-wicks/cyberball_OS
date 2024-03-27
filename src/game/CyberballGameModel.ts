export default class CyberballGameModel {
    playerHoldingBall?: number; // can be CPU or human
    throwTarget?: number; // can be CPU or human
    static readonly humanPlayerId = -1;
    remainingCpuPlayers: Set<number> = new Set();
    humanPlayerMayLeave = false;
    gameHasEnded = false;
    startTime: number = Date.now();
    throwCount: number = 0;
}
