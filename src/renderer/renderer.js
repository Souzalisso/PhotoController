const App = require("./app/App");

const app = new App();

document.body.innerHTML = app.render();

app.init();