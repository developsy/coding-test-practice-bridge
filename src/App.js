const Controller = require("./Controller");

class App {
  play() {
    const GAME_CONTROLLER = new Controller();
    GAME_CONTROLLER.start();
  }
}

const aa = new App();
aa.play();
module.exports = App;
