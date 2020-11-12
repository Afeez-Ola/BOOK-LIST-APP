"use strict";

var form = document.getElementById('book-form');

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBooks = function (book) {
  var list = document.querySelector('#book-list');
  var row = document.createElement('tr');
  row.innerHTML = "\n    <td>".concat(book.title, "</td>\n    <td>").concat(book.author, "</td>\n    <td>").concat(book.isbn, "</td>\n    <td><a href='#' class='delete'>X</a></td>\n    ");
  list.appendChild(row);
};

UI.prototype.clearField = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function (message, className) {
  var div = document.createElement('div');
  div.className = "alert ".concat(className);
  div.appendChild(document.createTextNode(message));
  var container = document.querySelector('.container');
  var form = document.querySelector('form');
  container.insertBefore(div, form);
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

UI.prototype.delBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

document.getElementById('book-form').addEventListener('submit', function (e) {
  var title = document.getElementById('title').value;
  var author = document.getElementById('author').value;
  var isbn = document.getElementById('isbn').value;
  var book = new Book(title, author, isbn);
  var ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please inset the right informations', 'error');
  } else {
    ui.showAlert('Book Successfuly added', 'success');
    ui.addBooks(book);
    ui.clearField();
  } // console.log(book);


  e.preventDefault();
});
document.getElementById('book-list').addEventListener('click', function (e) {
  var ui = new UI();
  ui.delBook(e.target);
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});