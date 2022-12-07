const { readBridgeSize, readGameCommand, readMoving } = require("./InputView");
const { printMap, printResult, printGreeting } = require("./OutputView");
const { makeBridge } = require("./BridgeMaker");
const { generate } = require("./BridgeRandomNumberGenerator");
const BridgeGame = require("./BridgeGame");

class Controller {
  constructor() {
    this.bridgeGame = new BridgeGame();
  }

  start() {
    printGreeting();
    this.#initializeBridge();
  }

  #initializeBridge() {
    readBridgeSize(this.#makeBridge.bind(this));
  }

  #makeBridge(size) {
    this.bridgeGame.setBridge(makeBridge(size, generate));
    readMoving(this.#moveOneBlock.bind(this));
  }

  #moveOneBlock(command) {
    this.bridgeGame.move(command);
    printMap(this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge);
    this.#checkGameOver();
  }

  #checkGameOver() {
    const CLEAR_VERIFICATION = (x, y) => x.find((x) => x === "X") || y.find((x) => x === "X");
    const GAME_CLEAR = !CLEAR_VERIFICATION(this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge);
    if (!this.bridgeGame.gameOver) {
      readMoving(this.#moveOneBlock.bind(this));
    }
    if (this.bridgeGame.gameOver && GAME_CLEAR) {
      printResult([this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge], GAME_CLEAR, this.bridgeGame.gameRound);
    } else if (this.bridgeGame.gameOver && !GAME_CLEAR)
      readGameCommand(this.#restartGame.bind(this), this.#endGame.bind(this));
  }

  #restartGame() {
    this.bridgeGame.retry();
    readMoving(this.#moveOneBlock.bind(this));
  }

  #endGame() {
    const CLEAR_VERIFICATION = (x, y) => x.find((x) => x === "X") || y.find((x) => x === "X");
    const GAME_CLEAR = !CLEAR_VERIFICATION(this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge);
    printResult([this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge], GAME_CLEAR, this.bridgeGame.gameRound);
  }
}

module.exports = Controller;
