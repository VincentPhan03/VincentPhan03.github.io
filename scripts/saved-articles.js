document.addEventListener('DOMContentLoaded', function() {
    loadSavedArticles();
});

function loadSavedArticles() {
    // Fetch the saved articles from local storage
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    const container = document.getElementById('article-container');
    container.innerHTML = '';

    // Check if there are any saved articles
    if(savedArticles.length === 0) {
        container.innerHTML = '<p>No saved articles.</p>';
        return;
    }

    // Generate HTML for each saved article
    savedArticles.forEach(article => {
        let articleHTML = getArticleHTML(article);
        container.insertAdjacentHTML('beforeend', articleHTML);
    });
}

function getArticleHTML(article) {
    return `<div class="col">
        <div class="card h-100">
            <img src="${article.image}"
                alt="article image" class="img-fluid rounded w-100"
                style="max-width: 300px;">
            <div class="card-body">
                <h5 class="card-title"><a target="_blank" rel="noopener noreferrer"
                        href="${article.url}">${article.title}</a></h5>
                <p class="card-text">${article.description}</p>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">Source: ${article.source.name}</small>
            </div>
        </div>
    </div>`;
}
