document.addEventListener('DOMContentLoaded', function() {
    // 1. Lógica de detecção e persistência do GCLID (Google Ads)
    const urlParams = new URLSearchParams(window.location.search);
    const gclid = urlParams.get('gclid');

    if (gclid) {
        try {
            localStorage.setItem('tp_gclid', gclid);
            sessionStorage.setItem('tp_gclid', gclid);
        } catch (e) {
            console.error('Erro ao salvar GCLID:', e);
        }
    }

    // Recupera o GCLID salvo, se houver
    const savedGclid = gclid || localStorage.getItem('tp_gclid') || sessionStorage.getItem('tp_gclid');

    // 2. Injeção dinâmica da URL do Tally preservando o GCLID
    const tallyLinks = document.querySelectorAll('.tally-link');
    
    tallyLinks.forEach(link => {
        let originalHref = link.getAttribute('href');
        
        // Garante que só processaremos links externos válidos do Tally
        if (originalHref && originalHref.includes('tally.so')) {
            try {
                let urlObj = new URL(originalHref, window.location.origin);
                
                // Se o GCLID existir, adiciona como parâmetro na URL do Tally
                if (savedGclid) {
                    urlObj.searchParams.set('gclid', savedGclid);
                }
                
                link.setAttribute('href', urlObj.toString());
            } catch (err) {
                console.error('Erro ao atualizar o link do Tally:', err);
            }
        }
    });
});
