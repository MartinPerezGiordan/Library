
document.addEventListener('DOMContentLoaded', function() {

const showButton = document.querySelector('#newBookBtn')
const newBookForm = document.querySelector('#newBookForm')
const overlay = document.querySelector('#overlay')

const cardContainer = document.querySelector('.card-container')
const titleInput = document.querySelector('#bookTitle')
const authorInput = document.querySelector('#bookAuthor')
const pagesInput = document.querySelector('#bookPages')
const readInput = document.querySelector('#bookRead')
const submitBtn = document.querySelector('#submitBook')
const errorMsg = document.querySelector('.error')

class Book{
    constructor(title,author,pages,read){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    this.bookId=bookId
    bookId++
    }
}

let bookId = 1

let myLibrary = [
    new Book('Hobbit','Tolkien',230,true,1),new Book('Narnia','Pepe',230,true,2)
]
console.log(myLibrary)


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
        if(titleInputValue==='' ||authorInputValue==='' ||pagesInputValue===''){
            errorMsg.innerHTML = 'Please fill all the fields'
        }
        else{
            addBookToLibrary(titleInputValue, authorInputValue, pagesInputValue, readInputValue)
            displayCards();
            titleInput.value = ''
            authorInput.value = ''
            pagesInput.value = ''
            readInput.checked = false
            newBookForm.style.display = 'none';
            overlay.style.display = 'none';

            errorMsg.innerHTML = ''

        }
    })
}
submitBtnListener();


function displayCards(){
    cardContainer.innerHTML=''
    myLibrary.forEach(book => {
        if(!book.disabled){
            let title = `<h2>"${book.title}"</h2>`
            let author = `<p>By ${book.author}</p>`
            let pages = `<p>${book.pages} pages</p>`
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
        overlay.style.display = 'block';
    })
}
showFormForNewBook();

function hideFormForNewBook(){
    document.addEventListener('click', (e)=>{
        if(!newBookForm.contains(e.target) && e.target !== showButton){
            newBookForm.style.display = 'none';
            overlay.style.display = 'none';

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


// --------------------- Sign In Form -----------------------------

const signInButton = document.querySelector('.sign-in-btn')
const signInForm = document.querySelector('.sign-in-form')
const email = document.querySelector("#mail");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

const emailError = document.querySelector("#mail + span.error");
const countryError = document.querySelector("#country + span.error");
const zipcodeError = document.querySelector("#zipcode + span.error");
const passwordError = document.querySelector("#password + span.error");
const confirmPasswordError = document.querySelector("#confirmPassword + span.error");

const overlay2 = document.querySelector('#overlay2')


function showSignInForm(){
    signInButton.addEventListener('click', ()=>{
        signInForm.style.display = 'block';
        overlay2.style.display = 'block';
    })
}
showSignInForm();
function hideSignInForm(){
    document.addEventListener('click', (e)=>{
        if(!signInForm.contains(e.target) && e.target !== signInButton){
            signInForm.style.display = 'none';
            overlay2.style.display = 'none';

        }
    })
}
hideSignInForm();

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showError(email, emailError);
    }
});

country.addEventListener("input", (event) => {
    if (country.validity.valid) {
        countryError.textContent = "";
        countryError.className = "error";
    } else {
        showError(country, countryError);
    }
});

zipcode.addEventListener("input", (event) => {
    if (zipcode.validity.valid) {
        zipcodeError.textContent = "";
        zipcodeError.className = "error";
    } else {
        showError(zipcode, zipcodeError);
    }
});

password.addEventListener("input", (event) => {
    if (password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error";
    } else {
        showError(password, passwordError);
    }
});

confirmPassword.addEventListener("input", (event) => {
    if (confirmPassword.validity.valid) {
        confirmPasswordError.textContent = "";
        confirmPasswordError.className = "error";
    } else {
        showError(confirmPassword, confirmPasswordError);
    }
});

signInForm.addEventListener("submit", (event) => {
    if (!email.validity.valid || !country.validity.valid || !zipcode.validity.valid || !password.validity.valid || !confirmPassword.validity.valid) {
        showError(email, emailError);
        showError(country, countryError);
        showError(zipcode, zipcodeError);
        showError(password, passwordError);
        showError(confirmPassword, confirmPasswordError);
        event.preventDefault();
    }
});

function showError(field, errorElement) {
    if (field.validity.valueMissing) {
        errorElement.textContent = "You need to enter a value.";
    } else if (field.validity.typeMismatch) {
        errorElement.textContent = "Entered value is invalid.";
    } else if (field.validity.tooShort) {
        errorElement.textContent = `Value should be at least ${field.minLength} characters; you entered ${field.value.length}.`;
    }
    errorElement.className = "error active";
}
});