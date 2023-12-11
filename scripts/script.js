var articles = [];

// Function to fetch articles
function getArticles(type) {
    if (!type) { return; }

    let url = 'https://gnews.io/api/v4/search?' +
        `q=${type}&` +
        'lang=en&' +
        'sortBy=popularity&' +
        'max=10&' +
        'apikey=e5df2b3dc3dd4d2432e1f98dfb18bd90';

    let articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', url, true);
    articleRequest.onload = function () {
        if (this.status === 200) {
            let articles = JSON.parse(this.responseText);
            updateCard(articles.articles);
        }
    }
    articleRequest.send();
}

// Function to update cards with new articles
function updateCard(articles) {
    const container = document.getElementById("article-container").parentNode;
    container.innerHTML = '';
    articles.forEach((article, index) => {
        let articleId = 'article-' + index;
        let newCard = getCard(article.image, article.url, article.title, article.description, article.source.name, articleId);
        container.insertAdjacentHTML('afterend', newCard);
    });
}

// Function to generate card HTML
function getCard(imgsrc, articlelink, cardtitle, cardtext, source, articleId) {
    let article = {
        title: cardtitle,
        url: articlelink,
        image: imgsrc,
        description: cardtext,
        source: source.name 
    };
    articles[articleId] = article;

    return `<div class="col">
        <div class="card h-100">
            <img src="${imgsrc}"
                alt="article image" class="img-fluid rounded w-100"
                style="max-width: 300px;">
            <div class="card-body">
                <h5 class="card-title"><a target="_blank" rel="noopener noreferrer"
                        href="${articlelink}">${cardtitle}</a></h5>
                <p class="card-text">${cardtext}</p>
                <!-- Save button -->
                <button onclick="saveArticle('${articleId}')" class="btn btn-primary">Save Article</button>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">Source: ${source}</small>
            </div>
        </div>
    </div>`;
}

// Function to save articles to local storage
function saveArticle(articleId) {
    let article = articles[articleId]

    // Check if the article already exists (based on URL or another unique property)
    if (!localStorage.getItem(articleId)) {
        localStorage.setItem(articleId, JSON.stringify(article));

        alert("Article Saved");
    } else {
        alert("Article Already Saved");
    }
}
