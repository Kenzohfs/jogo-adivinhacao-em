function jogar() {
    let nome = document.querySelector("#nome").value;

    fetch("/criar_jogador",
        {
            method: "POST",
            body: JSON.stringify({ nome }),
            headers: { "Content-Type": "application/json" }
        },
    )
        .then(res => { });
    window.location.href = "/jogo";
}