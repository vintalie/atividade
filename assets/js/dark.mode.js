// Ao clicar no botão, alterna o modo e salva a preferência
document.getElementById('toggle-dark').onclick = function () {
    document.body.classList.toggle('dark-mode');
    // Salva a preferência no localStorage
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'on');
    } else {
        localStorage.setItem('dark-mode', 'off');
    }
}

// Ao carregar a página, aplica o modo salvo
window.onload = function() {
    if(localStorage.getItem('dark-mode') === 'on') {
        document.body.classList.add('dark-mode');
    }
}