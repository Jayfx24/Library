let form = document.querySelector('#form')
let bookContainers = document.querySelector('.books')
let books = []


// books.push(new Book('author','title',48,true))
// bookContainers.appendChild(books)
books.push(new Book('author','Title',48,'ongoing'))
books.push(new Book('author','Title',48,true))
books.push(new Book('author','Title',48,true))
books.push(new Book('author','Title',48,true))



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
        newItem.className = "book-item";
        // newItem.style.border = "1px solid black";

        imgDiv = document.createElement("div")
        imgDiv.className = 'img-div'
        objDiv = document.createElement("div")
        objDiv.className = 'obj-div'
        authorItem = document.createElement('p')
        authorItem.textContent = `Author: ${book['author']}`
        authorItem.className ='author'
        titleItem = document.createElement('p')
        titleItem.textContent = `${book['title']}`
        titleItem.className = 'title'
        pagesItem = document.createElement('p')
        pagesItem.textContent = `Pages : ${book['noPages']}`
        pagesItem.className = 'pages'
        hasRead = document.createElement('p');

        hasRead.textContent = `Status : ${book['hasRead']}`;
        hasRead.className = 'status'
        
        objDiv.appendChild(authorItem)
        objDiv.appendChild(titleItem)
        objDiv.appendChild(pagesItem)
        objDiv.appendChild(hasRead)
        newItem.appendChild(imgDiv)
        newItem.appendChild(objDiv)
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
    dialog.close()
    form.reset()

    
   }
);

displayBooks()

const showDialog = document.querySelector(".show-add")
const dialog = document.querySelector("dialog");
showDialog.addEventListener("click", () => {
    dialog.showModal();
})

const closeDialog = document.querySelector(".close-add")

closeDialog.addEventListener("click", () => {
    dialog.close();
    // form.reset()
    
})


dialog.addEventListener("click",(event) => {
    if (event.target == dialog ){
        dialog.close()
    }
})


// }