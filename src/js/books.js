const booksContainer = document.getElementById('books')

const inputTitle = document.querySelector(".addBook__title")
const inputAuthor = document.querySelector(".addBook__author")
const inputGenre = document.querySelector(".addBook__genre")

const inputSubmit = document.querySelector(".addBook__submit")
inputSubmit.addEventListener('click', () => {
    if (inputTitle.value && inputAuthor.value && inputGenre.value) {
        Library.addBook(inputTitle.value, inputAuthor.value, inputGenre.value)
        inputTitle.value = ''
        inputAuthor.value = ''
        inputGenre.value = ''
    }
})

const generateID = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const Library = {
    books: [],
    addBook(title, author, genre) {
        const newBook = new Book(title, author, genre)
        this.books.push(newBook)
        this.renderBooks()
    },
    deleteBook(id) {
        this.books.splice(this.books.indexOf(this.books.find(book => book.id === id)), 1)
        this.renderBooks()
    },
    editBook(id) {

    },
    renderBooks() {
        booksContainer.innerHTML = ''
        this.books.map((book) => {
            booksContainer.appendChild(book.generateElement())
        })
    }
}

class Book {
    constructor(title, author, genre) {
        this.id = generateID()
        this.title = title
        this.author = author
        this.genre = genre
    }
    generateElement() {
        const newBook = document.createElement('div')
        newBook.className = 'books__item'
        newBook.innerHTML = `
            <div class="books__item__info">
            <h3 class="book__title">
                ${this.title}
            </h3>
            <span class="book__author">
                Author: ${this.author}
            </span>
            <span class="book__genre">
                Genre: ${this.genre}
            </span>
            </div>
        `

        const bookButtons = document.createElement('div')
        bookButtons.className = "book__buttons"
        newBook.appendChild(bookButtons)

        const editButton = document.createElement('button')
        editButton.className = "book_editing button"
        editButton.innerText = "Edit Book"
        editButton.addEventListener('click', () => alert("В разработке!"))
        bookButtons.appendChild(editButton)

        const removeButton = document.createElement('button')
        removeButton.className = "book_removing button"
        removeButton.innerText = "Remove Book"
        removeButton.addEventListener('click', () => Library.deleteBook(this.id))
        bookButtons.appendChild(removeButton)

        return newBook
    }
}

for (let i = 1; i < 5; i++) {
    Library.addBook(`Title ${i}`,i,i)
}
