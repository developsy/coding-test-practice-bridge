/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #upperBridge = [];
  #lowerBridge = [];
  #gamePlayCount = 0;
  #gameRound = 0;
  #isGameOver = false;

  setBridge(bridge) {
    this.#bridge = bridge;
    console.log(this.#bridge);
  }

  get upperBridge() {
    return this.#upperBridge;
  }

  get lowerBridge() {
    return this.#lowerBridge;
  }

  get gameOver() {
    return this.#isGameOver;
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(userInput) {
    if (userInput === this.#bridge[this.#gamePlayCount]) this.#buildBridgeWithCorrectMoves(userInput);
    if (userInput !== this.#bridge[this.#gamePlayCount]) this.#buildBridgeWithWrongMoves(userInput);
    this.#gamePlayCount += 1;
    if (this.#gamePlayCount === this.#bridge.length) this.#isGameOver = true;
  }

  #buildBridgeWithCorrectMoves(command) {
    if (command === "U") {
      this.#correctUpperBridge();
    }
    if (command === "D") {
      this.#correctLowerBridge();
    }
  }
  #correctUpperBridge() {
    this.#upperBridge.push("O");
    this.#lowerBridge.push(" ");
  }
  #correctLowerBridge() {
    this.#upperBridge.push(" ");
    this.#lowerBridge.push("O");
  }

  #buildBridgeWithWrongMoves(command) {
    if (command === "U") {
      this.#wrongUpperBridge();
    }
    if (command === "D") {
      this.#wrongLowerBridge();
    }
    this.#isGameOver = true;
  }
  #wrongUpperBridge() {
    this.#upperBridge.push("X");
    this.#lowerBridge.push(" ");
  }
  #wrongLowerBridge() {
    this.#upperBridge.push(" ");
    this.#lowerBridge.push("X");
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#isGameOver = false;
    this.#gamePlayCount = 0;
  }
}

module.exports = BridgeGame;
