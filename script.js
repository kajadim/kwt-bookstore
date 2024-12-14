// centar div
let center_div_elem = document.getElementById("center-div")
let center_div_naslov_elem = document.getElementById("center-div-naslov")
let center_div_books_elem = document.getElementById("center-div-books")
// levi div
let input_search_elem = document.getElementById("inp-search")

let div_sve = document.getElementById("div-sve")

let div_autobiografija = document.getElementById("div-autobio")

let div_domaci = document.getElementById("div-domaca")

let div_ekran = document.getElementById("div-ekran")

let div_horor = document.getElementById("div-horor")

let div_ljubavni = document.getElementById("div-ljubavni")

let div_naucfant = document.getElementById("div-naucnafan")

let div_putopisi = document.getElementById("div-putopisi")
//desni div
let right_div_elem = document.getElementById("right-div")
let naslov_korpa_elem = document.getElementById("naslov_korpa");
let tabela_korpa_elem = document.getElementById("tabela_korpa");
let ukupna_cena_korpa_elem = document.getElementById("ukupna_cena_korpa");
let div_za_dugme_elem=document.getElementById("div_za_dugme");



let books=[];
let racun=0;
let brojac=0
function ucitaj_index() {
    let xmlobject = new XMLHttpRequest();
    xmlobject.onload = function() {
        let xmldokument = xmlobject.responseXML;

        for(let book of xmldokument.getElementsByTagName("book")){
            let obj = {
                    title : book.getElementsByTagName("title")[0].textContent,
                    author: book.getElementsByTagName("author")[0].textContent,
                    isbn: book.getElementsByTagName("isbn")[0].textContent,
                    release_date: book.getElementsByTagName("release_date")[0].textContent,
                    price: Number(book.getElementsByTagName("price")[0].textContent),
                    content: book.getElementsByTagName("content")[0].textContent,
                    preview: book.getElementsByTagName("preview")[0].textContent,
                    cover: book.getElementsByTagName("cover")[0].textContent,
                    category: book.getElementsByTagName("category")[0].textContent,
                    isSelected:false
                }
            books.push(obj)
        }
    }
    xmlobject.open("GET", "data.xml", true);
    xmlobject.send();
}

function ucitaj() {
    let xmlobject = new XMLHttpRequest();
    xmlobject.onload = function() {
        let xmldokument = xmlobject.responseXML;

        for(let book of xmldokument.getElementsByTagName("book")){
            let obj = {
                    title : book.getElementsByTagName("title")[0].textContent,
                    author: book.getElementsByTagName("author")[0].textContent,
                    isbn: book.getElementsByTagName("isbn")[0].textContent,
                    release_date: book.getElementsByTagName("release_date")[0].textContent,
                    price: Number(book.getElementsByTagName("price")[0].textContent),
                    content: book.getElementsByTagName("content")[0].innerHTML, //promenjeno
                    preview: book.getElementsByTagName("preview")[0].textContent,
                    cover: book.getElementsByTagName("cover")[0].textContent,
                    category: book.getElementsByTagName("category")[0].textContent,
                    isSelected:false,
                    brojPrimeraka:0
                }
            books.push(obj)
        }

        filterBooks("Sve")
    }
    xmlobject.open("GET", "data.xml", true);
    xmlobject.send();
}


function ukloniKlasu(){
    div_sve.classList.remove('category_div_selected');
    div_autobiografija.classList.remove('category_div_selected');
    div_domaci.classList.remove('category_div_selected');
    div_ekran.classList.remove('category_div_selected');
    div_horor.classList.remove('category_div_selected');
    div_ljubavni.classList.remove('category_div_selected');
    div_naucfant.classList.remove('category_div_selected');
    div_putopisi.classList.remove('category_div_selected');

}

function filterBooks(kategorija) {
    
    center_div_books_elem.innerHTML="";
    center_div_naslov_elem.innerHTML="";

    let izbor_kategorije_naslov=document.createElement("h1");
    izbor_kategorije_naslov.className="naslov_center"
    center_div_naslov_elem.appendChild(izbor_kategorije_naslov);


    switch(kategorija){
        case "Sve" :
            izbor_kategorije_naslov.innerText="Sve kategorije"
            // center_div_naslov_elem.innerHTML+=`<h1>Sve kategorije</h1>`
            ukloniKlasu()
            div_sve.classList.add('category_div_selected');
            break;
        case "Autobiografija" :
            // center_div_naslov_elem.innerHTML+=`<h1>Autobiografija</h1>`
            izbor_kategorije_naslov.innerText="Autobiografija"
            ukloniKlasu()
            div_autobiografija.classList.add('category_div_selected');
            break;
        case "Domaca" :
            //center_div_naslov_elem.innerHTML+=`<h1>Domaca literatura</h1>`
            izbor_kategorije_naslov.innerText="Domaća literatura"
            ukloniKlasu()
            div_domaci.classList.add('category_div_selected');
            break;
        case "Ekranizovane" :
            //center_div_naslov_elem.innerHTML+=`<h1>Ekranizovane knjige</h1>`
            izbor_kategorije_naslov.innerText="Ekranizovane knjige"
            ukloniKlasu()
            div_ekran.classList.add('category_div_selected');
            break;
        case "Horor" :
            // center_div_naslov_elem.innerHTML+=`<h1>Horor</h1>`
            izbor_kategorije_naslov.innerText="Horor"
            ukloniKlasu()
            div_horor.classList.add('category_div_selected');
            break;
        case "Ljubavni" :
            //center_div_naslov_elem.innerHTML+=`<h1>Ljubani</h1>`
            izbor_kategorije_naslov.innerText="Ljubavni"
            ukloniKlasu()
            div_ljubavni.classList.add('category_div_selected');
            break;
        case "Naucna_fantastika" :
            //center_div_naslov_elem.innerHTML+=`<h1>Naucna fantastika</h1>`
            izbor_kategorije_naslov.innerText="Naučna fantastika"
            ukloniKlasu()
            div_naucfant.classList.add('category_div_selected');
            break;
        case "Putopisi" :
            //center_div_naslov_elem.innerHTML+=`<h1>Putopisi</h1>`
            izbor_kategorije_naslov.innerText="Putopisi"
            ukloniKlasu()
            div_putopisi.classList.add('category_div_selected');
            break;
    }

    for(let book of books) {
        if(!provera_kategorije(book, kategorija)) continue
        // center_div_books_elem.innerHTML+=`<p>${book.title}</p>`
        let moj_div = document.createElement("div")
        moj_div.className="one_book_div"

        let front_page = document.createElement("a")
        front_page.href="details.html";
        front_page.innerHTML=`<img src=${book.cover}>`
        front_page.target = "_blank";
        front_page.className="front_page"
        front_page.onclick = handleFrontPageClick(book);

        let book_title = document.createElement("a");
        book_title.href="details.html";
        book_title.target = "_blank";
        book_title.innerText=book.title;
        book_title.className="book_title"

        let book_author = document.createElement("p");
        book_author.innerText=book.author;
        book_author.className="book_author"

        let book_price=document.createElement("p");
        book_price.innerText=book.price+",00 RSD"
        book_price.className="book_price"

        let button_kupi = document.createElement("button");
        button_kupi.className="button_kupi"
        button_kupi.innerText = "Stavi u korpu"
        button_kupi.onclick=function() {
            book.isSelected=true;
            racun+=book.price;
            book.brojPrimeraka=book.brojPrimeraka+1;
            updateKorpa();
        }
        moj_div.appendChild(front_page);
        moj_div.appendChild(book_title);
        moj_div.appendChild(book_author);
        moj_div.appendChild(book_price)
        moj_div.appendChild(button_kupi);

        center_div_books_elem.appendChild(moj_div)
    }

}

function provera_kategorije(book, kategorija) {
    return book.category == kategorija || kategorija=="Sve"
}


function updateKorpa() {
    tabela_korpa_elem.innerHTML=""
    div_za_dugme_elem.innerHTML=""
    let flag=0;
    brojac=0;
    for(let book of books){
        if(book.isSelected==true) {
            flag=1
            let novi_red=document.createElement("tr");
            brojac=brojac+1;
            novi_red.id=brojac;
            novi_red.className="red_korpa"

            let polje_za_naslov = document.createElement('td');
            polje_za_naslov.innerText = book.title;

            let polje_za_broj_primeraka=document.createElement('td');
            polje_za_broj_primeraka.innerText=book.brojPrimeraka;

            let polje_za_dugme = document.createElement('td')

            let kanta_dugme = document.createElement("button")
            kanta_dugme.innerText="Ukloni"
            kanta_dugme.onclick = function() {
                if(book.brojPrimeraka==1){
                    book.isSelected=false;
                    racun=racun-book.price
                    book.brojPrimeraka=book.brojPrimeraka-1
                }
                if(book.brojPrimeraka>1){
                    racun=racun-book.price
                    book.brojPrimeraka=book.brojPrimeraka-1
                }
                updateKorpa();
            }
            polje_za_dugme.appendChild(kanta_dugme)

            novi_red.appendChild(polje_za_naslov)
            novi_red.appendChild(polje_za_broj_primeraka)
            novi_red.appendChild(polje_za_dugme)

            tabela_korpa_elem.appendChild(novi_red)
        }
    }
    if(flag==1) {
        let dugme_korpa=document.createElement("button")
        dugme_korpa.className="button_korpa"
        dugme_korpa.innerText="Kupi"
        dugme_korpa.onclick=function(){
            racun=0;
            tabela_korpa_elem.innerHTML=""
            div_za_dugme_elem.innerHTML=""
            ukupna_cena_korpa_elem.innerText="Izaberite knjigu"
            for(let book of books){
                book.isSelected=false
            }
        }
        div_za_dugme_elem.appendChild(dugme_korpa)
        right_div_elem.appendChild(div_za_dugme_elem)
        ukupna_cena_korpa_elem.innerText="Racun: " + racun +",00 RSD"
    }
    if(flag==0){
        tabela_korpa_elem.innerHTML=""
        div_za_dugme_elem.innerHTML=""
        ukupna_cena_korpa_elem.innerText="Izaberite knjigu"
    }
   
}

function handleFrontPageClick(book){
    return function(event) {
        event.preventDefault();
        localStorage.setItem("selectedBook", JSON.stringify(book))
        window.open("details.html", "_blank");
    }
}


function searchBooks() {
    ukloniKlasu();
    div_sve.classList.add('category_div_selected');

    center_div_books_elem.innerHTML="";
    center_div_naslov_elem.innerHTML="";

    center_div_naslov_elem.innerHTML+=`Pretraga`

   

    for(let book of books){
        if(!provera_naziva(book)) continue
        let moj_div = document.createElement("div")
        moj_div.className="one_book_div"

        let front_page = document.createElement("a")
        front_page.href="details.html";
        front_page.innerHTML=`<img src=${book.cover}>`
        front_page.target = "_blank";
        front_page.className="front_page"
        front_page.onclick = handleFrontPageClick(book);

        let book_title = document.createElement("a");
        book_title.href="details.html";
        book_title.target = "_blank";
        book_title.innerText=book.title;
        book_title.className="book_title"

        let book_author = document.createElement("p");
        book_author.innerText=book.author;
        book_author.className="book_author"

        let book_price=document.createElement("p");
        book_price.innerText=book.price+",00 RSD"
        book_price.className="book_price"

        let button_kupi = document.createElement("button");
        button_kupi.className="button_kupi"
        button_kupi.innerText = "Stavi u korpu"
        button_kupi.onclick=function() {
            book.isSelected=true;
            racun+=book.price;
            book.brojPrimeraka=book.brojPrimeraka+1;
            updateKorpa();
        }
        moj_div.appendChild(front_page);
        moj_div.appendChild(book_title);
        moj_div.appendChild(book_author);
        moj_div.appendChild(book_price)
        moj_div.appendChild(button_kupi);

        center_div_books_elem.appendChild(moj_div)
    }

    if(input_search_elem.value=="") filterBooks("Sve")
}

function provera_naziva(book){
    let input_value = input_search_elem.value;
    let inputRegex = new RegExp(input_value, "i");
    return input_value=="" || inputRegex.test(book.title) || inputRegex.test(book.author)
}

function poziv1(index) {
    const book = books[index];
    if (book) {
        console.log(book.title);
        localStorage.setItem("selectedBook", JSON.stringify(book));
        window.open("details.html", "_blank");
    } else {
        console.error("Knjiga sa indeksom", index, "ne postoji.");
    }
 
}

function prebroj(){
    let brojac=0
    for(let book of books){
        if(book.title=="1984"){
            console.log(brojac)
        }
        brojac=brojac+1
    }
}

var counter = 1;
        setInterval(function () {
        var radioBtn = document.getElementById("radio" + counter);
        if (radioBtn) {
            radioBtn.checked = true;
        }
        counter++;
          if (counter > 5) {
            counter = 1;
          }
        }, 5000);