
document.addEventListener('DOMContentLoaded', function() {

const showButton = document.querySelector('#newBookBtn')
const newBookForm = document.querySelector('#newBookForm')
const cardContainer = document.querySelector('.card-container')
const titleInput = document.querySelector('#bookTitle')
const authorInput = document.querySelector('#bookAuthor')
const pagesInput = document.querySelector('#bookPages')
const readInput = document.querySelector('#bookRead')
const submitBtn = document.querySelector('#submitBook')


let bookId = 1

let myLibrary = [
    new Book('Hobbit','Tolkien',230,true,1),new Book('Narnia','Pepe',230,true,2)
]
console.log(myLibrary)

function Book(title,author,pages,read){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    this.bookId=bookId
    bookId++
}

function addBookToLibrary(titleInput,authorInput,pagesInput,readInput){
    let userReadIt = true;
    if(!readInput){
        userReadIt = false;
    }

    let book = new Book(titleInput,authorInput,pagesInput,userReadIt)
    console.log(book)
    myLibrary.push(book)
}

function submitBtnListener(){
    submitBtn.addEventListener('click',(event)=>{
        event.preventDefault();
        let titleInputValue = titleInput.value
        let authorInputValue = authorInput.value
        let pagesInputValue = pagesInput.value
        let readInputValue = readInput.checked
        addBookToLibrary(titleInputValue, authorInputValue, pagesInputValue, readInputValue)
        displayCards();
        titleInput.value = ''
        authorInput.value = ''
        pagesInput.value = ''
        readInput.checked = false
        newBookForm.style.display = 'none';
    })
}
submitBtnListener();


function displayCards(){
    cardContainer.innerHTML=''
    myLibrary.forEach(book => {
        if(!book.disabled){
            let title = `<h2>${book.title}</h2>`
            let author = `<p>${book.author}</p>`
            let pages = `<p>${book.pages}</p>`
            let btnRead = `<button class='read readBtn' id='${book.bookId}'>Read</button>`
            if(!book.read){
                btnRead = `<button class='not-read readBtn' id='${book.bookId}'>Not Read</button>`
            }

            let btnDelete = `<button class='deleteBtn' id='${book.bookId}'>Delete</button>`

            let card = document.createElement('div')
            card.innerHTML = title + author + pages+btnRead + btnDelete;
            cardContainer.appendChild(card)
            card.classList.add('card')
        }
    });
changeReadListener();
deleteBookListener();


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


// ---------------- READ BUTTON ---------------------//
function changeReadListener(){
    const readBtns = document.querySelectorAll('.readBtn')

    readBtns.forEach((readBtn)=>{
        readBtn.addEventListener('click', (e)=>{
            console.log(e.target)
            changeReadInObject(readBtn.id);
            displayCards();
            console.log(myLibrary)
        })
    })
   
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}

function changeReadInObject(id){
    console.log(id)
    myLibrary.forEach(book => {

        if(id==book.bookId){
            book.toggleReadStatus();
        }
        
    });
}

// ---------------- DELETE BUTTON ---------------------//
function deleteBookListener(){
    const deleteBtns = document.querySelectorAll('.deleteBtn')

    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.addEventListener('click', (e)=>{
            console.log(e.target)
            deleteBook(deleteBtn.id);
        })
    })
}
deleteBookListener();

function deleteBook(id){
    myLibrary.forEach(book=>{
        if(id==book.bookId){
            book.disabled = true;
            console.log(book)
        }
    })
    displayCards();

}






});