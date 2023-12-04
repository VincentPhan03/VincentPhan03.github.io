
/*
// Function to handle the Enter keydown event
document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        var article = this.value;
        getArticles(article);
    }
});
*/


// Function to fetch articles
function getArticles(type) {
    var url = 'https://newsapi.org/v2/everything?' +
        `q=${type}&` +
        'language=en&' +
        'sortBy=popularity&' +
        'pageSize=20&' +
        'apiKey=df5ff277e9b74ae7a772458c9df7ac7c';

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
        let newCard = getCard(article.urlToImage, article.url, article.title, article.description, article.author);
        container.insertAdjacentHTML('afterend', newCard);
    });
}

// Function to generate card HTML
function getCard(imgsrc, articlelink, cardtitle, cardtext, articleauthor) {
    if (articleauthor == null) {
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
                        <small class="text-body-secondary">By: Unknown</small>
                    </div>
                </div>
            </div>`;
    }

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
                <small class="text-body-secondary">By: ${articleauthor}</small>
            </div>
        </div>
    </div>`;
}

