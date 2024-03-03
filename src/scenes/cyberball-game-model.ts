export default class CyberballGameModel {
    playerHoldingBall?: string; // can be CPU or human
    throwTarget?: string; // can be CPU or human
    humanPlayer: string;
    remainingCpuPlayers: Set<string> = new Set();
    humanPlayerMayLeave = false;
    gameHasEnded = false;
}
