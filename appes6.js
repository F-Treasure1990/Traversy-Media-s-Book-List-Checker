class Book {
  constructor(title, author, isbn) {
    this.title = title,
    this.author = author, 
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list')
    //create tr element
    const row = document.createElement('tr')
    //insert cols
    row.innerHTML =
      `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a></td>
    `
  
    list.appendChild(row)
  }

  showAlert(message, className) {
    //create div
  const div = document.createElement('div')
  //add class
  div.className = `alert ${className}`
  // add text
  div.appendChild(document.createTextNode(message))
  // get parent 
  const container = document.querySelector('.container')
  //get form
  const form = document.querySelector('#book-form')
  //insert alert
  container.insertBefore(div, form)
  // setTimeout
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove()
  }

  clearFields() {
    title.value = ''
    author.value = ''
    isbn.value = ''
  }
}
//load to LS
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }


  static displayBooks() {
    const books = Store.getBooks();
    
    books.forEach((book)=> {
      const ui = new UI;

      //add book to UI
      ui.addBookToList(book)
    })
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book)
    localStorage.setItem('books',JSON.stringify(books))
  }

  static removeBook(isbn){
    const books = Store.getBooks();
   
    books.forEach((book, index) => {
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', (e) => {

  //get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  //instantiate Book
  const book = new Book(title, author, isbn)

  //instantiate UI
  const ui = new UI()

  //validate 
  if (title === '' || author === '' || isbn==='') {
    //Error Alert
    ui.showAlert('please fill in all feilds', 'error')

  } else {
    //add Book to List
    ui.addBookToList(book)

    //add to LS
    Store.addBook(book)

    //alert added book
    ui.showAlert('Book Added!', 'success')

    //UI clear 
    ui.clearFields()
  }



  e.preventDefault()
})

// Event Listener for delete 

document.getElementById('book-list').addEventListener('click', (e) => {
  const ui = new UI;
  
  if(e.target.className === 'delete') {
      ui.deleteBook(e.target)

  ui.showAlert('Book Removed', 'success')
  }

  //remove from local storage 
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

 
  e.preventDefault()
})