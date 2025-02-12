let form = document.querySelector('#form')
let bookContainers = document.querySelector('.books')
let books = []



function Book(author, title, noPages,hasRead){
    this.author = author;
    this.title = title;
    this.noPages = noPages;
    this.hasRead = hasRead;

    Book.prototype.info = function () {
        return `${this.title} by ${this.author}, ${this.noPages} pages, ${hasRead}`;
    }
}

function displayBooks(){
    
    bookContainers.innerHTML = ""
    for(let book of books){
        let newItem = document.createElement('div');
        newItem.className = "book-item"
        // newItem.textContent = book.info()
        // newItem.style.width = "200px"
        newItem.style.border = "1px solid black"

        authorItem = document.createElement('p')
        authorItem.textContent = `Author: ${book['author']}`
        titleItem = document.createElement('p')
        titleItem.textContent = `Title : ${book['title']}`
        pagesItem = document.createElement('p')
        pagesItem.textContent = `Title : ${book['noPages']}`
        

        newItem.appendChild(authorItem)
        newItem.appendChild(titleItem)
        newItem.appendChild(pagesItem)
        bookContainers.appendChild(newItem)

    }
    
}


form.addEventListener("submit", function (event){
    event.preventDefault();

    
    let author = document.getElementById("author").value;
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pages").value;
    let hasRead = document.getElementById("read").checked;

    let newBook = new Book(author, title, pages, hasRead);
    books.push(newBook)
    console.log(books)

    
    displayBooks()
    
   }
);



const showDialog = document.querySelector(".show-add")
const dialog = document.querySelector("dialog");
showDialog.addEventListener("click", () => {
    dialog.showModal();
})

const closeDialog = document.querySelector(".close-add")
closeDialog.addEventListener("click", () => {
    dialog.close();
})