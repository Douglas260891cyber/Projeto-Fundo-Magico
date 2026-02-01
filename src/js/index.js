document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    // Variável para controlar o intervalo de animação de carregamento
    let intervaloCarregamento = null;

    // Quando o formulário for enviado, executa a função assíncrona
    formulario.addEventListener("submit", async function (evento) {
        // Impede o envio padrão (recarregar a página)
        evento.preventDefault();

        const descricao = descricaoInput.value.trim();
        if (!descricao) {
            alert("Por favor, insira uma descrição para gerar o background.");
            return;
        }

        mostrarCarregamento(true);

        // Envia a descrição ao webhook/n8n via POST
        // Atenção: problemas de CORS ou 404 devem ser resolvidos no servidor remoto
        try {
            const resposta = await fetch("https://douglas889711cyber.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: {
                    // Informa que o corpo da requisição está em JSON
                    "Content-Type": "application/json"
                },
                // Corpo com a descrição fornecida
                body: JSON.stringify({ descricao })
            });

            const dados = await resposta.json();

            codigoHtml.textContent = dados.html || "";
            codigoCss.textContent = dados.css || "";

            secaoPreview.style.display = "block"; //Mostra  preview que está oculto
            secaoPreview.innerHTML = dados.html || "";

            let tagEstilo = document.getElementById("estilo-dinamico");

            if (tagEstilo) {
                // Remove a tag antiga corretamente (invocando a função)
                tagEstilo.remove();
            }
            //Se retornou CSS, cria a tag <style> e adiciona ao <head> do documento
            if (dados.css) {
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }

        } catch (error) {
            console.error("Erro ao gerar o background:", error);
            codigoHtml.textContent = "Erro ao gerar o código HTML do background, tente novamente.";
            codigoCss.textContent = "Erro ao gerar o código CSS do background, tente novamente.";
            secaoPreview.innerHTML = "";

        } finally {
            // Restaura o estado do botão independentemente do resultado
            mostrarCarregamento(false);
        }
    });

    function mostrarCarregamento(estaCarregando) {
        const botaoSubmit = formulario.querySelector('.btn-magic');

        if (estaCarregando) {
            // Inicia animação com pontos progressivos
            let contador = 0;
            botaoSubmit.textContent = 'Carregando background.';

            intervaloCarregamento = setInterval(() => {
                contador = (contador + 1) % 4; // Alterna entre 0, 1, 2, 3
                let pontos = '.'.repeat(contador); // Gera 0, 1, 2, ou 3 pontos
                botaoSubmit.textContent = 'Carregando background' + pontos;
            }, 500); // Atualiza a cada 500ms
        } else {
            // Para a animação e mostra o texto final
            if (intervaloCarregamento) {
                clearInterval(intervaloCarregamento);
                intervaloCarregamento = null;
            }
            botaoSubmit.textContent = 'Gerar Background Mágico';
        }
    }

});
