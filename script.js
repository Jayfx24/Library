let form = document.querySelector("#form");
let bookContainers = document.querySelector(".books");
let books = [];
// const deleteSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'

// books.push(new Book('author','title',48,true))
// bookContainers.appendChild(books)
books.push(new Book("author", "Title", 48, "Not Started"));
books.push(
  new Book(
    "author",
    "Title",
    48,
    "Done",
    "https://m.media-amazon.com/images/I/611X8GI7hpL.jpg"
  )
);
books.push(new Book("author", "Title", 48, "In progress"));
books.push(new Book("author", "Title", 48, "ongoing",'https://m.media-amazon.com/images/I/611X8GI7hpL.jpg'));
books.push(new Book("author", "Title", 48, "ongoing",'https://m.media-amazon.com/images/I/611X8GI7hpL.jpg'));
books.push(new Book("author", "Title", 48, "ongoing",'https://m.media-amazon.com/images/I/611X8GI7hpL.jpg'));
books.push(new Book("author", "Title", 48, "ongoing",'https://m.media-amazon.com/images/I/611X8GI7hpL.jpg'));

books.push(new Book("author", "Title", 48, true));
books.push(new Book("author", "Title", 48, true));

// creATE SVG

function Book(author, title, noPages, hasRead, image) {
  this.author = author;
  this.title = title;
  this.noPages = noPages;
  this.hasRead = hasRead;
  this.image = image;

  Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.noPages} pages, ${hasRead}`;
  };
}

function displayBooks() {
  bookContainers.innerHTML = "";

  for (let book of books) {
    let newItem = document.createElement("div");
    newItem.className = "book-item";

    const svg = document.createElement("img");
    svg.src = "images/delete.svg";
    svg.alt = "SVG Image";
    svg.className = "delete-svg";
    const svgContainer = document.createElement("div");
    svgContainer.id = "svg-container";
    let imgDiv = document.createElement("div");
    imgDiv.className = "img-div";

    let bookImage = document.createElement("img");
    bookImage.className = "book-image";
    bookImage.src = book["image"];
    bookImage.onerror = function () {
      bookImage.src = "images/image-not-available.jpg";
    };

    let objDiv = document.createElement("div");
    objDiv.className = "obj-div";

    let authorItem = document.createElement("p");
    authorItem.textContent = `by ${capitalize(book["author"])}`;
    authorItem.className = "author";

    let titleItem = document.createElement("p");
    titleItem.textContent = `${capitalize(book["title"])}`;
    titleItem.className = "title";

    let pagesItem = document.createElement("p");
    pagesItem.textContent = `${book["noPages"]} pages`;
    pagesItem.className = "pages";

    let hasRead = document.createElement("p");
    const status = book["hasRead"]
    hasRead.textContent = `Status : ${status}`;
    hasRead.className = "status";

    switch(status) {
      case 'Not Started':
        objDiv.style.borderTopColor =  'grey';
        break;  
      case 'In progress':
        objDiv.style.borderTopColor = '#1976D2';
        break;  
      case 'Done':
        objDiv.style.borderTopColor =  'green';
        break;  
    }




    

    svg.addEventListener("click", () => {
      if (confirm("Want to delete?")) {
        index = books.indexOf(book);
        books.splice(index, 1);
        displayBooks();
        // alert(`${book["title"]} deleted successfully! `);
      }
    });

    objDiv.appendChild(titleItem);
    objDiv.appendChild(authorItem);
    objDiv.appendChild(pagesItem);
    objDiv.appendChild(hasRead);
    svgContainer.appendChild(svg);
    imgDiv.appendChild(svgContainer);
    imgDiv.appendChild(bookImage);
    newItem.appendChild(imgDiv);
    newItem.appendChild(objDiv);
    bookContainers.appendChild(newItem);
  }
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function checkStatus(){

}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let author = document.getElementById("author").value;
  let title = document.getElementById("title").value;
  let pages = document.getElementById("pages").value;
  let hasRead = document.getElementById("read").checked;
  let bookImage = document.getElementById("image_url");

  let newBook = new Book(author, title, pages, hasRead, bookImage);
  books.push(newBook);
  console.log(books);

  displayBooks();
  dialog.close();
  form.reset();
});

displayBooks();

const showDialog = document.querySelector(".show-add");
const dialog = document.querySelector("dialog");
showDialog.addEventListener("click", () => {
  dialog.showModal();
});

const closeDialog = document.querySelector(".close-add");

closeDialog.addEventListener("click", () => {
  dialog.close();
  // form.reset()
});

dialog.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.close();
  }
});

// }
