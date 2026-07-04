async function testarIPC() {

    const resposta = await window.photoController.ping();

    console.log(resposta);

}

testarIPC();