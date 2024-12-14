let front_page_elem = document.getElementById("front_page_details")
let book_details_elem = document.getElementById("book_details")

let title_elem = document.getElementById("book_title_details");
let author_elem = document.getElementById("book_author_details");
let isbn_elem = document.getElementById("book_isbn_details");
let price_elem = document.getElementById("book_price_details");
let preview_elem = document.getElementById("book_preview_details");
let content_elem = document.getElementById("book_content_details");
let cover_elem = document.getElementById("book_cover_details");


function popuni() {
    let book = JSON.parse(localStorage.getItem('selectedBook'));
    if (book) {
       title_elem.innerText=book.title;
       author_elem.innerText="Autor: " + book.author;
       isbn_elem.innerText="ISBN: " + book.isbn;
       price_elem.innerText="Cena: "+ book.price+",00 RSD";
       preview_elem.innerText="Zaviri u knjigu"
       preview_elem.addEventListener('click', function() {
        window.open(book.preview, '_blank');
    });
       content_elem.innerHTML=book.content;
       cover_elem.src=book.cover;
    }
}

// Pozovite funkciju popuni() kada se stranica učita
// document.addEventListener("DOMContentLoaded", popuni);
