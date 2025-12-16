document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os carrosséis
  const carrosseis = document.querySelectorAll('.carrosselWrapper');

  carrosseis.forEach(wrapper => {
    const grid = wrapper.querySelector('.carrosselGrid');
    const paginacao = wrapper.parentElement.querySelector('.carrosselPaginacao');

    if (!wrapper || !grid || !paginacao) return;

    const allCards = Array.from(grid.querySelectorAll('.cardFlip'));
    const cardsPorPagina = 6;

    if (allCards.length === 0) return;

    grid.innerHTML = '';
    const paginas = [];

    for (let i = 0; i < allCards.length; i += cardsPorPagina) {
      const pagina = document.createElement('div');
      pagina.className = 'pagina';
      const grupo = allCards.slice(i, i + cardsPorPagina);
      grupo.forEach(card => pagina.appendChild(card));
      grid.appendChild(pagina);
      paginas.push(pagina);
    }

    // // Flip dos cards
    // grid.querySelectorAll('.cardFlip .cardInner').forEach(cardInner => {
    //   cardInner.removeEventListener('click', cardInner.__flipHandler);
    //   const handler = (e) => {
    //     const tag = e.target.tagName.toLowerCase();
    //     if (tag === 'a' || tag === 'button') return;
    //     cardInner.classList.toggle('virado');
    //   };
    //   cardInner.__flipHandler = handler;
    //   cardInner.addEventListener('click', handler);
      
    // });
    
    // Mude para o container mais externo
grid.querySelectorAll('.cardFlip').forEach(cardFlip => { 
    const cardInner = cardFlip.querySelector('.cardInner');
    
    // Garante que o cardInner existe para evitar erros
    if (!cardInner) return; 

    // Remova listeners do cardInner (onde estava antes)
    cardInner.removeEventListener('click', cardInner.__flipHandler);
    cardInner.removeEventListener('touchend', cardInner.__flipHandler);

    // Vamos anexar o evento no elemento PAI, o cardFlip
    cardFlip.removeEventListener('click', cardFlip.__flipHandler); 
    cardFlip.removeEventListener('touchend', cardFlip.__flipHandler);
    
    const handler = (e) => {
        e.stopPropagation(); 
        
        if (e.type === 'touchend') {
            e.preventDefault(); 
        }

        const tag = e.target.tagName.toLowerCase();
        // A lógica de ignorar links/botões continua
        if (tag === 'a' || tag === 'button') return; 
        
        // Aplica a classe no cardInner (que é quem sofre o flip)
        cardInner.classList.toggle('virado'); 
    };

    cardFlip.__flipHandler = handler;
    
    // Adiciona o evento no elemento PAI (.cardFlip)
    cardFlip.addEventListener('click', handler);
    cardFlip.addEventListener('touchend', handler);
});

    // Paginação
    paginacao.innerHTML = '';
    const totalPaginas = paginas.length;

    for (let i = 0; i < totalPaginas; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', 'Ir para página ' + (i + 1));
      if (i === 0) dot.classList.add('ativo');

      dot.addEventListener('click', () => {
        const larguraPagina = wrapper.clientWidth;
        wrapper.scrollTo({ left: i * larguraPagina, behavior: 'smooth' });
      });

      paginacao.appendChild(dot);
    }

    // Atualizar bolinhas ao rolar
    let ticking = false;
    wrapper.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const larguraPagina = wrapper.clientWidth;
          const paginaAtual = Math.round(wrapper.scrollLeft / larguraPagina);
          const dots = paginacao.querySelectorAll('.dot');
          dots.forEach((d, idx) => d.classList.toggle('ativo', idx === paginaAtual));
          ticking = false;
        });
        ticking = true;
      }
    });

    // Ajustar posição no resize
    window.addEventListener('resize', () => {
      const larguraPagina = wrapper.clientWidth;
      const paginaAtual = Math.round(wrapper.scrollLeft / larguraPagina);
      wrapper.scrollTo({ left: paginaAtual * larguraPagina });
    });

  });
});
