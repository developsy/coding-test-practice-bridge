const Controller = require("./Controller");

class App {
  play() {
    const GAME_CONTROLLER = new Controller();
    GAME_CONTROLLER.start();
  }
}

const app = new App();
app.play();
module.exports = App;
