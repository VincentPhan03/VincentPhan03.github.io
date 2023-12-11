// Function to display saved articles
function displaySavedArticles() {
    const container = document.getElementById("article-container");
    container.innerHTML = ''; // Clear previous content


    // Check if there are any saved articles
    if(localStorage.length === 0) {
        container.innerHTML = '<p>No saved articles.</p>';
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        try {
            let article = JSON.parse(localStorage.getItem(key));
            // Check if the item is an article
            if (article && article.title && article.url) {
                let newCard = getCard(article.image, article.url, article.title, article.description, article.source, key);
                container.insertAdjacentHTML('beforeend', newCard);
            }
        } catch (e) {
            console.error("Error parsing article from localStorage", e);
        }
    }
}

displaySavedArticles();

function getCard(imgsrc, articlelink, cardtitle, cardtext, source, articleId) {
    return `<div class="col">
        <div class="card h-100">
            <img src="${imgsrc}" alt="article image" class="img-fluid rounded w-100" style="max-width: 300px;">
            <div class="card-body">
                <h5 class="card-title"><a target="_blank" rel="noopener noreferrer" href="${articlelink}">${cardtitle}</a></h5>
                <p class="card-text">${cardtext}</p>
                <!-- Save button -->
                <button onclick="removeSavedArticle('${articleId}')" class="btn btn-primary">Remove Article</button>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">Source: ${source}</small>
            </div>
            </div>
    </div>`;
}

// Function to remove a saved article
function removeSavedArticle(articleId) {
    localStorage.removeItem(articleId);
    displaySavedArticles();
}