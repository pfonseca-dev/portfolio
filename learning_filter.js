document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.tab');
    const items = document.querySelectorAll('.learning-item');

    function showCategory(category) {
        items.forEach(item => {
            if(item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Inicialmente mostra a categoria da aba ativa
    const activeTab = document.querySelector('.tab.active');
    if(activeTab) {
        showCategory(activeTab.dataset.category);
    }

    // Adiciona clique nas abas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showCategory(tab.dataset.category);
        });
    });
});
