
/**
 * 
 *      Data section 
 * 
 */
let data = {
    categories: [
        {
            name: 'categoria 1',
            id: 'CAT_1',
            cards: [
                {
                    id: 'CAT_1_1',
                    tmstamp: '',
                    question: 'Where has you been?',
                    answer: 'Chicago'
                }
            ]
        }
    ]
}
/***
 *  DOM
 */
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];


// Store card data
const cardsData = getCardsData();
/**
 *  CATEGORIES
 */

function createSection() {


}


/***
 *  CARDS
 */

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    if (index === 0) {
        card.classList.add("active");
    }

    card.innerHTML = `
      <div class="inner-card">
            <div class="inner-card-front">
              <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
              <p>${data.answer}</p>
            </div>
          </div>
        </div>
    `;

    card.addEventListener("click", () => card.classList.toggle("show-answer"));

    // Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}


// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? data.categories[0].cards: cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    window.location.reload();
}

createCards();


/**
 *  Event listeners
 */

// Next button
nextBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card left";

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = "card active";

    updateCurrentText();
});

// Previous button
prevBtn.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = "card right";

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = "card active";

    updateCurrentText();
});