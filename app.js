// Book Constructor

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor

function UI() {}


// add book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list')

  // create new element
  const row = document.createElement('tr')

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `
  list.appendChild(row)
}

UI.prototype.showAlert = function(message,className) {
  // create new element
  const div = document.createElement('div')

  // add className
  div.className = `alert ${className}`

  // create textNode and append
  div.appendChild(document.createTextNode(message))

  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')

  container.insertBefore(div, form)

  setTimeout(function() {
    document.querySelector('.alert').remove()
  },3000)
}

UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove()
    }
}
// clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
  
}
// add eventListener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // instantiating book
  const book = new Book(title,author,isbn)
  
  // instantiating ui
  const ui = new UI()

  // validate
  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill the empty field!', 'error')
  } else {
    // add to book list
    ui.addBookToList(book)

    // clear fields
    ui.clearFields()

    // show success
    ui.showAlert('Book Added', 'success')
  }

  e.preventDefault()
})

// event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // instantiating ui
  const ui = new UI()
  ui.deleteBook(e.target)

  // show message
  ui.showAlert('Book Removed', 'success')
  e.preventDefault()
}) 