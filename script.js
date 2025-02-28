let form = document.querySelector("#form");
let bookContainers = document.querySelector(".books");
let books = [];

books.push(
  new Book(
    "Robert Greene",
    "The 48 Laws Of Power",
    452,
    "Completed",
    "https://m.media-amazon.com/images/I/611X8GI7hpL.jpg"
  )
);
books.push(
  new Book(
    "James Clear",
    "Atomic Habits",
    320,
    "In Progress",
    "https://m.media-amazon.com/images/I/81F90H7hnML._SL1500_.jpg"
  )
);
books.push(
  new Book(
    "Mark Manson",
    "The Subtle Art of Not Giving a F*ck",
    224,
    "In Progress",
    "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SL1500_.jpg"
  )
);
// books.push(
//   new Book(
//     "author",
//     "Title",
//     48,
//     "In Progress",
//     "https://m.media-amazon.com/images/I/611X8GI7hpL.jpg"
//   )
// );
// books.push(
//   new Book(
//     "author",
//     "Title",
//     48,
//     "In Progress",
//     "https://m.media-amazon.com/images/I/611X8GI7hpL.jpg"
//   )
// );

// books.push(new Book("author", "Title", 48, "Completed"));
// books.push(new Book("author", "Title", 48, "Completed"));

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
    svg.alt = "delete icon";
    svg.className = "delete";

    const delSvg = document.createElement("img")
    delSvg.src = "images/delete-empty.svg"
    delSvg.alt = "delete icon"
    delSvg.className ="delete-after"
    
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
    authorItem.textContent = capitalize(book["author"]);
    authorItem.className = "author";

    let titleItem = document.createElement("p");
    titleItem.textContent = `${capitalize(book["title"])}`;
    titleItem.className = "title";

    let pagesItem = document.createElement("p");
    pagesItem.textContent = `${book["noPages"]} pages`;
    pagesItem.className = "pages";

    let hasRead = document.createElement("p");
    const status = book["hasRead"];
    hasRead.textContent = `${status}`;
    hasRead.className = "status";


    hasRead.setAttribute('title', 'Click to change status'); // Tooltip

    hasRead.addEventListener("click", () => {
      let currentValue = hasRead.textContent;

      if (currentValue === "Not Started") {
        book["hasRead"] = "In Progress";
        objDiv.style.borderTopColor = "coral";

      } else if (currentValue === "In Progress") {
        book["hasRead"] = "Completed";
        objDiv.style.borderTopColor = "green";
      } else {
        book["hasRead"] = "Not Started";
        objDiv.style.borderTopColor = "grey";
      }
      hasRead.textContent = `${book["hasRead"]}`;
      
    });

    

    switch (book["hasRead"]) {
      case "Not Started":
        objDiv.style.borderTopColor = "grey";
        break;
      case "In Progress":
        objDiv.style.borderTopColor = "coral";
        break;
      case "Completed":
        objDiv.style.borderTopColor = "green";
        break;
    }

    delSvg.addEventListener("click", () => {
      if (confirm(`Want to delete ${titleItem.textContent} by ${authorItem.textContent}?`)) {
        index = books.indexOf(book);
        books.splice(index, 1);
        displayBooks();
       
      }
    });
    objDiv.appendChild(titleItem);
    objDiv.appendChild(authorItem);
    objDiv.appendChild(pagesItem);
    objDiv.appendChild(hasRead);
    svgContainer.appendChild(svg);
    svgContainer.appendChild(delSvg);
    objDiv.appendChild(svgContainer);
    imgDiv.appendChild(bookImage);
    newItem.appendChild(imgDiv);
    newItem.appendChild(objDiv);
    bookContainers.appendChild(newItem);

    
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function checkStatus() {}

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

const closeDialog = document.querySelector(".close-dialog");

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
