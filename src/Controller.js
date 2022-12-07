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
    console.log(this.bridgeGame.bridge);
  }
}

module.exports = Controller;
