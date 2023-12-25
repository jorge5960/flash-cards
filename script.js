
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
const hiddenCountElement = document.getElementById("count");
let currentCategory;

// Store card data
let categoriesData = getCategoriesData();
/**
 *  TITLE
 */

function createTitle() {
    titleElement.innerHTML = data.title;
}
createTitle();

/**
 *  CATEGORIES
 */
function activateCategory(idCategory) {

    cardsContainer.innerHTML = '';
    Array.from(categoriesContainer.children).forEach((element) => {
        if (element.id == idCategory) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
    createCards(idCategory);
}

function createCategories() {
    categoriesData.forEach((data, index) => createCategory(data, index));
}

function getCategoriesData() {
    return data.categories;
}

// Create a single card in DOM
function createCategory(data, index) {

    const category = document.createElement("span");
    category.id = data.id;
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
function showAll(){
    categoriesData.filter((category) => category.id == currentCategory)[0].cards.forEach((data) => showCard(data,currentCategory));
}

function createCards(idCategory) {
    currentCategory = idCategory;
    let category = categoriesData.filter((category) => category.id == idCategory)[0];
    hiddenCountElement.innerHTML = category.hiddenCount? category.hiddenCount:0;
    category.cards.forEach((card) => {
        createCard(card,idCategory)       
    });
}

function findCard(idCard) {
    let finded = undefined;
    categoriesData.forEach((category) => {
        category.cards.forEach((card) => {
            if (card.id == idCard) {
                finded = card;
            }
        })
    })
    return finded;
}

function tagCard(idCard) {
    let card = findCard(idCard);
    element = document.getElementById(idCard);
    let elementsCard = element.getElementsByClassName('front');
    Array.from(elementsCard).forEach((backFrontElement) => {
        if (card.tagged) {
            backFrontElement.classList.remove('tag');
        } else {
            backFrontElement.classList.add('tag');
        }
    });
    elementsCard = element.getElementsByClassName('back');
    Array.from(elementsCard).forEach((backFrontElement) => {
        if (card.tagged) {
            backFrontElement.classList.remove('tag');
        } else {
            backFrontElement.classList.add('tag');
        }
    });
    card.tagged = !card.tagged;

}

function toggleHiden(idCard, idCategory){

    let card = findCard(idCard);
    element = document.getElementById(idCard);
    if (card.hidden) {
        element.classList.remove('hideCard');
    } else {
        element.classList.add('hideCard');
    }
    card.hidden = !card.hidden;
    let category = categoriesData.filter((category) => category.id == idCategory)[0];
    if(category.hiddenCount){
        category.hiddenCount++;
    }else{
        category.hiddenCount = 1;
    }
    hiddenCountElement.innerHTML = category.hiddenCount;

}

function showCard(card, idCategory){

    element = document.getElementById(card.id);
    element.classList.remove('hideCard');
    card.hidden = false;
    let category = categoriesData.filter((category) => category.id == idCategory)[0];
    category.hiddenCount = 0;
    hiddenCountElement.innerHTML = category.hiddenCount;

}

// Create a single card in DOM
function createCard(card, idCategory) {
    let _tagClass = card.tagged? 'tag':'';
    const cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add("card-container");
    cardElement.classList.add("col-card");
    if(card.hidden){
        cardElement.classList.add("hideCard");
    }
    cardElement.innerHTML = `
        <div class="card">
            <div class="front ${_tagClass}">
                <div class="cover">
                   <img src="https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/PU-H-light.svg">
                </div>
                <div class="content">
                    <div class="main">
                        <h3 class="name">${card.question}</h3>
                    </div>
                </div>
            </div> 
            <div class="back  ${_tagClass}">
                <div class="header">
                    <img src="https://www.purdue.edu/home/wp-content/themes/purdue-home-theme/imgs/PU-H-light.svg">
                </div>
                <div class="content">
                    <div class="main">
                         <h4 class="text-center">${card.answer}</h4>
                    </div>
                    <div class="footer">
                        <button class="btn" onclick="toggleHiden('${card.id}', '${idCategory}')"><i class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
                        <button class="btn" onclick="tagCard('${card.id}')"><i class="fa fa-tag fa-lg" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
    cardsContainer.appendChild(cardElement);
}

createCards(categoriesData[0].id);

/**
 * SAVE / RESTORE
 */
function save(){
    let _data = data;
    let objJsonStr = JSON.stringify(_data);
    let objJsonB64 = btoa(objJsonStr);
    let _type = 'text/plain';
    let _filename = 'prueba';
    let file = new Blob([objJsonB64], {type: _type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, _filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = _filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function openFile() {
    document.getElementById('inp').click();
  }
  function readFile(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      data = JSON.parse(atob(e.target.result));
      categoriesData = getCategoriesData();
      activateCategory(categoriesData[0].id);
      document.getElementById('inp').value = '';
    }
    reader.readAsText(file)
  }