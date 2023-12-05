
// Function to handle the Enter keydown event
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        var article = this.value;
        getArticles(article);
    }
});



// Function to fetch articles
function getArticles(type) {
    var url = 'https://gnews.io/api/v4/search?' +
        `q=${type}&` +
        'lang=en&' +
        'sortBy=popularity&' +
        'max=10&' +
        'apikey=e5df2b3dc3dd4d2432e1f98dfb18bd90';

    var articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', url, true);
    articleRequest.onload = function () {
        if (this.status === 200) {
            var articles = JSON.parse(this.responseText);
            updateCard(articles.articles);
        }
    }
    articleRequest.send();
}

// Function to update cards with new articles
function updateCard(articles) {
    const container = document.getElementById("article-container").parentNode;
    articles.forEach(article => {
        let newCard = getCard(article.image, article.url, article.title, article.description, article.source.name);
        container.insertAdjacentHTML('afterend', newCard);
    });
}

// Function to generate card HTML
function getCard(imgsrc, articlelink, cardtitle, cardtext, source) {
    return `<div class="col">
        <div class="card h-100">
            <img src="${imgsrc}"
                alt="article image" class="img-fluid rounded w-100"
                style="max-width: 300px;">
            <div class="card-body">
                <h5 class="card-title"><a target="_blank" rel="noopener noreferrer"
                        href="${articlelink}">${cardtitle}</a></h5>
                <p class="card-text">${cardtext}</p>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">Source: ${source}</small>
            </div>
        </div>
    </div>`;
}