const quoteContainer = document.getElementById('quotecontainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitterBtn');
const newQuoteBtn = document.getElementById('quoteBtn');
const loader = document.getElementById('loader');

//Show loading 

function Loading() {
    loader.hidden =false;
    quoteContainer.hidden = true;
}

// Hide loading 

function Complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from api
async function getQuote() {
    Loading()
    const proxyURL = 'https://afternoon-brushlands-44968.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // If author is blank add unknown
        if (data.quoteAuthor === ''){
            authorText.innerText = "Unknown";
        } else{
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font sixe for long quote

        if (data.quoteText.length > 80){
            quoteText.classList.add('long-text');
        } else{
            quoteText.classList.remove('long-text');
        }
        quoteText.innerText = data.quoteText;  
        // Stop loader and show the code
        Complete();

    } catch (error) {
        getQuote();
        console.log('Whoops!! No quotes',error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText; 

    const twitterURl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURl,'_blank');

}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();
