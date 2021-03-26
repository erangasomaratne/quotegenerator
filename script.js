const quoteContainer = document.getElementById('quote-container');
const textQuote = document.getElementById('quote');
const author = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote = [];

function runLoder(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function showQuote(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote(apiQuote){
    runLoder();
    const value = Math.floor(Math.random() * apiQuote.length);
    textQuote.textContent = apiQuote[value].text;
    author.textContent = !apiQuote[value].author ? 'Unknown' : apiQuote[value].author ;
    if(textQuote.textContent.length > 50){
        textQuote.classList.add('long-quote');
    }else {
        textQuote.classList.remove('long-quote');
    }
    showQuote();
}

async function getQuotes(){
    runLoder();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote(apiQuote);
        
    } catch (err) {
        console.log(err.message);
    }
}

runLoder();
getQuotes();

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${textQuote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click',tweetQuote);
newQuoteButton.addEventListener('click', getQuotes);