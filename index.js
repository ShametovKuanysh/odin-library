const myLibrary = []

function Book(title, author, pages, isRead){
    this.id = myLibrary.length + 1
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "read" : "not read yet"}`
    }
}

Book.prototype.read = function (){
    this.isRead = !this.isRead
    document.getElementById(this.id+"_read").textContent = this.isRead ? "Read" : "Not read"
}

const library = document.getElementById("library")
const dialog = document.querySelector("dialog")
const bb = document.getElementById("subb")
const form = document.getElementById("bookForm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("title").value
    const isRead = document.getElementById("read").checked
    
    addBookToLibrary(title, author, pages, isRead)
    
    form.reset()
    closeModal()
})

function displayBook(book){
    const div = document.createElement("div")
    div.id = book.id

    const header = document.createElement("div")
    const title = document.createElement("h3")
    title.textContent = book.title
    const author = document.createElement("span")
    author.textContent = book.author
    const pages = document.createElement("span")
    pages.textContent = "Pages:" + book.pages
    
    header.appendChild(title)
    header.appendChild(author)
    header.appendChild(document.createElement("br"))
    header.appendChild(pages)
    
    const read = document.createElement("button")
    read.classList.add("read", "btn")
    read.id = book.id+"_read"
    read.textContent = book.isRead ? "Read" : "Not read"
    read.addEventListener("click", (e) => {book.read()})

    const del = document.createElement("button")
    del.classList.add("btn")
    del.textContent = "Delete"
    del.addEventListener("click", (e) => {deleteBook(book)})

    const buttons = document.createElement("div")
    buttons.appendChild(read)
    buttons.appendChild(del)
    buttons.classList.add("buttons")

    
    div.appendChild(header)
    div.appendChild(buttons)
    div.classList.add("card")

    library.appendChild(div)
}

function deleteBook(book){
    library.removeChild(document.getElementById(book.id))
    myLibrary.splice(myLibrary.indexOf(book), 1)
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead))
    displayBook(myLibrary[myLibrary.length - 1])
}

function openModal(){
    dialog.showModal()
}

function closeModal(){
    dialog.close()
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)