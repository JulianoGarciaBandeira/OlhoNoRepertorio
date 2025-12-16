const searchInput = document.getElementById('busca');

searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value); 

    const items = document.querySelectorAll('.conjuntoCards .card');
    const semResultado = document.getElementById('semResultado');

    let hasResults = false; 

    // Palavras que devem ser ignoradas na busca
    const palavrasIgnoradas = ['autoria:', 'gênero:', 'temas abordados:'];

    items.forEach(card => {
        // Pega o texto do card e normaliza
        let cardText = formatString(card.textContent);

        // Remove palavras que devem ser ignoradas
        palavrasIgnoradas.forEach(palavra => {
            cardText = cardText.replaceAll(palavra, '');
        });

        // Verifica se o valor da busca existe no texto do card
        if (cardText.indexOf(value) !== -1) {
            card.style.display = 'flex';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Mostra ou oculta o texto "sem resultado"
    if (hasResults){
        semResultado.style.display = 'none'; 
    } else {
        semResultado.style.display = 'block'; 
    }
});

// Função para normalizar texto (minúsculas, sem acento e sem espaços extras)
function formatString(value) {
    return value.toLowerCase()
                .trim()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
}

// Seleciona 9 cards aleatórios ao carregar a página - Fisher–Yates Shuffle simplificado 
function mostrarCardsAleatorios() {
    const items = Array.from(document.querySelectorAll('.conjuntoCards .card'));

    // Primeiro esconde todos
    items.forEach(card => card.style.display = 'none');

    // Embaralha o array de cards
    const shuffled = items.sort(() => 0.5 - Math.random());

    // Mostra os primeiros 9
    shuffled.slice(0, 9).forEach(card => card.style.display = 'flex');
}

// Executa ao carregar a página
window.addEventListener('load', mostrarCardsAleatorios);

