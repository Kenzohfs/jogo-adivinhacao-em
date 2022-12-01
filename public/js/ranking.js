function buscarRanking() {
    fetch("/get-ranking",
        {
            method: "GET"
        }).then(res => {
            res.json().then((data) => {
                console.log(data);
                data.forEach(e => {
                    let tr = document.createElement("tr");
                    let id = document.createElement("td");
                    let nome = document.createElement("td");
                    let pontos = document.createElement("td");

                    id.innerText = e.id;
                    nome.innerText = e.nome;
                    pontos.innerText = e.pontos;

                    tr.appendChild(id);
                    tr.appendChild(nome);
                    tr.appendChild(pontos);
                    document.querySelector("#tabela").appendChild(tr);
                });
            })
        });
}

function voltar() {
    window.location.href = "/";
}

buscarRanking();