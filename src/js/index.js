document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault(); //evita o carregamento do formulário(página)

        const descricao = descricaoInput.value.trim();
        if (!descricao) {
            alert("Por favor, insira uma descrição para gerar o background.");
            return;
        }

        mostrarCarregamento(true);
        
        //Requisição HTTP para a API n8n
        try {
            const resposta = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ descricao})
            }); 
        } catch (error) {
            console.error("Erro ao gerar o background:", error);
        } finally {
            mostrarCarregamento(false);
        }
    });

    function mostrarCarregamento(estaCarregando) {
        const botaoSubmit = formulario.querySelector('.btn-magic');
        let texto = estaCarregando ? 'Carregando background...' : 'Gerar Background Bágico';
        
        botaoSubmit.textContent = texto;
    }

});
