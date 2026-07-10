import App from "./app/App.js";

const app = new App();

document.body.innerHTML = app.render();

window.photoController.onHardwareEvent((event) => {

    console.log("Evento vindo do Main:");

    console.log(event);

});