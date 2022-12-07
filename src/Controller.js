const { readBridgeSize, readGameCommand, readMoving } = require("./InputView");
const { printMap, printResult } = require("./OutputView");
const { makeBridge } = require("./BridgeMaker");
const { generate } = require("./BridgeRandomNumberGenerator");
const BridgeGame = require("./BridgeGame");

class Controller {
  constructor() {
    this.bridgeGame = new BridgeGame();
  }

  start() {
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
    this.#checkGameOver();
  }

  #checkGameOver() {
    if (!this.bridgeGame.gameOver) {
      readMoving(this.#moveOneBlock.bind(this));
      this.#printBridge(this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge);
    }
    if (this.bridgeGame.gameOver) {
      this.#printBridge(this.bridgeGame.upperBridge, this.bridgeGame.lowerBridge);
      this.bridgeGame.retry();
    }
  }

  #printBridge(upperBridge, lowerBridge) {
    printMap(upperBridge, lowerBridge);
  }

  #printResult() {}
}

module.exports = Controller;
