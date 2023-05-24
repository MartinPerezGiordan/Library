
document.addEventListener('DOMContentLoaded', function() {

const showButton = document.querySelector('#newBookBtn')
const newBookForm = document.querySelector('#newBookForm')
const cardContainer = document.querySelector('.card-container')
const titleInput = document.querySelector('#bookTitle')
const authorInput = document.querySelector('#bookAuthor')
const pagesInput = document.querySelector('#bookPages')
const submitBtn = document.querySelector('#submitBook')



let myLibrary = [
    {title:'Hobbit',author:'Tolkien',pages:230},{title:'Narnia',author:'Pepe',pages:230}
]
console.log(myLibrary)

function Book(title,author,pages){
    this.title=title
    this.author=author
    this.pages=pages
}

function addBookToLibrary(titleInput,authorInput,pagesInput){
    let book = new Book(titleInput,authorInput,pagesInput)
    myLibrary.push(book)
}

function submitBtnListener(){
    submitBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        let titleInputValue = titleInput.value
        let authorInputValue = authorInput.value
        let pagesInputValue = pagesInput.value
        addBookToLibrary(titleInputValue, authorInputValue, pagesInputValue)
        displayCards();
        titleInput.value = ''
        authorInput.value = ''
        pagesInput.value = ''
        newBookForm.style.display = 'none';
    })
}
submitBtnListener();


function displayCards(){
    cardContainer.innerHTML=''
    myLibrary.forEach(book => {
        let title = `<h2>${book.title}</h2>`
        let author = `<p>${book.author}</p>`
        let pages = `<p>${book.pages}</p>`
        let card = document.createElement('div')
        card.innerHTML = title + author + pages
        cardContainer.appendChild(card)
        card.classList.add('card')
    });
}
displayCards();



function showFormForNewBook(){

    showButton.addEventListener('click', ()=>{
        newBookForm.style.display = 'block';
    })
}
showFormForNewBook();

function hideFormForNewBook(){
    document.addEventListener('click', (e)=>{
        if(!newBookForm.contains(e.target) && e.target !== showButton){
            newBookForm.style.display = 'none';
        }
    })
}
hideFormForNewBook();









});