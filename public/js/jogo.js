document.body.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        document.getElementById("btn-chutar").click();
    }
});

let dificuldadeEscolhida, numeroSecreto, tentativas, pontuacao;
const idJogador = localStorage.getItem("jogador");
const inputChute = document.getElementById("input-numero");

const setDificuldade = (dificuldade) => {
    dificuldadeEscolhida = dificuldade;
    tentativas = dificuldade;

    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    console.log("numero secreto: ", numeroSecreto)
}

const chutar = () => {
    if (numeroSecreto == null) {
        alert("Escolha uma dificuldade antes de chutar!");
        return;
    }

    tentativas--;

    let chute = inputChute.value;
    chute = parseInt(chute);

    if (chute < 1 || chute > 100) {
        alert("O número deve estar entre 1 e 100!");
        return;
    }

    if (chute == numeroSecreto) {
        alert("Parabéns! Você acertou!");
        chuteCerto();
        return;
    } else {
        let text = "Errou! O número secreto é " + (chute > numeroSecreto ? "menor" : "maior") + " que " + chute + ". Tentativas restantes: " + tentativas;
        alert(text)
    }

    if (tentativas == 0) {
        alert("Você perdeu!");
        return;
    }
}

const chuteCerto = () => {
    pontuacao = Math.floor(1000 / (dificuldadeEscolhida + (dificuldadeEscolhida - tentativas)));
    const pts = pontuacao;
    fetch(`/get_jogador_by_id/${idJogador}`, {
        method: "GET",
    }).then((res) => {
        res.json().then((data) => {
            let jogador = data;
            fetch("/salvar_pontuacao", {
                method: "PUT",
                body: JSON.stringify({ ...jogador, pontos: (jogador.pontos + pts) }),
                headers: { "Content-Type": "application/json" }
            }).then(res => {
                res.json().then((data) => {
                    console.log(data);
                    alert("Pontuação de " + jogador.nome + " foi: " + pts);
                })
            });
        })
    });

    numeroSecreto = null;
    dificuldadeEscolhida = null;
    inputChute.value = "";
    pontuacao = 0;
}

const voltar = () => {
    window.location.href = "/";
}