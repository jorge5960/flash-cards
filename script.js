
/**
 * 
 *      Data section 
 * 
 */
let data = {
    title: 'titulo principal',
    categories: [
        {
            name: 'categoria A',
            id: 'CAT_A',
            cards: [
                {
                    id: 'CAT_A_1',
                    tmstamp: '',
                    question: 'Where has you been?',
                    answer: 'Chicago'
                },
                {
                    id: 'CAT_A_2',
                    tmstamp: '',
                    question: 'HOLA?',
                    answer: 'HELLO'
                },
                {
                    id: 'CAT_A_3',
                    tmstamp: '',
                    question: 'ASDFSADFASDF?',
                    answer: 'DSFDSF'
                },
                {
                    id: 'CAT_A_4',
                    tmstamp: '',
                    question: 'ASDFSADFASDF?',
                    answer: 'DSFDSF'
                }
            ]
        },
        {
            name: 'categoria B',
            id: 'CAT_B',
            cards: [
                {
                    id: 'CAT_B_1',
                    tmstamp: '',
                    question: 'Where has you been?',
                    answer: 'Chicago'
                },
                {
                    id: 'CAT_B_2',
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
const titleElement = document.getElementById("title");

// Store card data
const categoriesData = getCategoriesData();

const categoriesElements = [];
/**
 *  TITLE
 */

function createTitle(){
    titleElement.innerHTML = data.title;
}
createTitle();

/**
 *  CATEGORIES
 */
function activateCategory(id){
    cardsContainer.innerHTML = '';
    Array.from(categoriesContainer.children).forEach((element)=>{
        if(element.id == id){
            element.classList.add('active');
        }else{
            element.classList.remove('active');
        }
    });
    createCards(id);
}

function createCategories() {
    categoriesData.forEach((data, index) => createCategory(data, index));
}

function getCategoriesData() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    return categories === null ? data.categories : categories;
}

// Create a single card in DOM
function createCategory(data, index) {

    const category = document.createElement("span");
    category.id= data.id;
    category.innerHTML = `${data.name}`;
    if (index === 0) {
        category.classList.add("active");
    }
    category.addEventListener("click", () => activateCategory(data.id));
    categoriesContainer.appendChild(category);
}

createCategories();

/***
 *  CARDS
 */

function createCards(idCategory) {
    categoriesData.filter((category)=> category.id == idCategory)[0].cards.forEach((data, index) => createCard(data));
}

// Create a single card in DOM
function createCard(data) {
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

createCards(categoriesData[0].id);
