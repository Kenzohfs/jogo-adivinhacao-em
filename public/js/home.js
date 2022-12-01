function jogar() {
    let nome = document.querySelector("#nome").value;

    fetch("/criar_jogador",
        {
            method: "POST",
            body: JSON.stringify({ nome }),
            headers: { "Content-Type": "application/json" }
        },
    )
        .then(res => {
            res.json().then((data) => {
                localStorage.setItem("jogador", data.toString());
                window.location.href = "/jogo";
            })
        });
}

function verRanking() {
    window.location.href = "/ranking";
}