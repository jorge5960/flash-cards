
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
                },
                {
                    id: 'CAT_1_2',
                    tmstamp: '',
                    question: 'HOLA?',
                    answer: 'HELLO'
                },
                {
                    id: 'CAT_1_2',
                    tmstamp: '',
                    question: 'ASDFSADFASDF?',
                    answer: 'DSFDSF'
                },
                {
                    id: 'CAT_1_2',
                    tmstamp: '',
                    question: 'ASDFSADFASDF?',
                    answer: 'DSFDSF'
                }
            ]
        },
        {
            name: 'categoria 2',
            id: 'CAT_1',
            cards: [
                {
                    id: 'CAT_1_1',
                    tmstamp: '',
                    question: 'Where has you been?',
                    answer: 'Chicago'
                },
                {
                    id: 'CAT_1_2',
                    tmstamp: '',
                    question: 'dasdsWhere has you been?',
                    answer: 'Chicadsadgo'
                }
            ]
        }
    ]
}
/***
 *  DOM
 */
const cardsContainer = document.getElementById("cards-container");
const categoriesContainer = document.getElementById("categories-container");
// const prevBtn = document.getElementById("prev");
// const nextBtn = document.getElementById("next");
// const currentEl = document.getElementById("current");
// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];


// Store DOM categories
const categoriesEl = [];

// Store card data
const categoriesData = getCategoriesData();
const cardsData = getCardsData();
/**
 *  CATEGORIES
 */

function createCategories() {
    categoriesData.forEach((data, index) => createCategory(data, index));
}

function getCategoriesData() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    return categories === null ? data.categories : categories;
}

// Create a single card in DOM
function createCategory(data, index) {
    return;
    const category = document.createElement("div");
    category.classList.add("col");
    category.classList.add("card");

    if (index === 0) {
        category.classList.add("active");
    }

    category.innerHTML = `
      <div class="card-body">
      <img src="https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/PU-H-light.svg">
            <div class="card-title">
              <p>${data.name}</p>
            </div>
            <div class="card-text">
            <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
          </div>
        </div>
    `;

    category.addEventListener("click", () => category.classList.toggle("show-answer"));

    // Add to DOM cards
    categoriesEl.push(category);

    categoriesContainer.appendChild(category);

}

createCategories();

/***
 *  CARDS
 */

function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement("div");
    card.classList.add("card-container");
    card.classList.add("col-card");
    card.innerHTML = `
        <div class="card">
            <div class="front">
                <div class="cover">
                   <img src="https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/PU-H-light.svg">
                </div>
                <div class="content">
                    <div class="main">
                        <h3 class="name">${data.question}</h3>
                    </div>
                    <div class="footer">
                    </div>
                </div>
            </div> 
            <div class="back">
                <div class="header">
                    <img src="https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/PU-H-light.svg">
                </div>
                <div class="content">
                    <div class="main">
                         <h4 class="text-center">${data.answer}</h4>
                    </div>
                    <div class="footer">
                        <button class="btn" id="green"><i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
                        <button class="btn" id="red"><i class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
    cardsContainer.appendChild(card);
}


// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem("cards"));
    return cards === null ? data.categories[0].cards : cards;
}

// Add card to local storage
function setCardsData(cards) {
    localStorage.setItem("cards", JSON.stringify(cards));
    window.location.reload();
}

createCards();
