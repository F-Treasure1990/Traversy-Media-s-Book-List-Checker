//Book Constructor 

function Book(title, author, isbn) {
  this.title = title,
    this.author = author,
    this.isbn = isbn
}

//UI constructor 

function UI() { }

UI.prototype.addBookToList = (book) => {
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

//cleat fields
//show alert
UI.prototype.showAlert = (message, className) => {
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

//delete Book
UI.prototype.deleteBook = (target) => {
    target.parentElement.parentElement.remove()
}

UI.prototype.clearFeilds = () => {
  // document.getElementById('title').value = '';
  // document.getElementById('author').value = '';
  // document.getElementById('isbn').value = '';

  title.value = ''
  author.value = ''
  isbn.value = ''
}


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

    //alert added book
    ui.showAlert('Book Added!', 'success')

    //UI clear 
    ui.clearFeilds()
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

 
  e.preventDefault()
})