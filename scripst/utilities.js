/* Cargar los libros utilizando document.createElement */
function loadBooks2_0({ author, imageLink, pages, title, year }, list) {
    const li = document.createElement('li');
    li.classList.add('book_item');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = imageLink;
    img.alt = title;
    figure.appendChild(img);

    const div_details = document.createElement('div');
    div_details.classList.add('card_details');
    const h2_title = document.createElement('h2');
    h2_title.textContent = title;

    const div_container = document.createElement('div');
    const span_pages = document.createElement('span');
    span_pages.textContent = pages;
    const span_year = document.createElement('span');
    span_year.textContent = year;
    div_container.append(span_pages, span_year)
    const h2_author = document.createElement('h2');

    h2_author.textContent = author;

    div_details.append(h2_title, div_container, h2_author)
    li.append(figure, div_details)

    list.appendChild(li)

}

/* Cargar los libros utilizando innerHTML */
function loadBooks({ author, imageLink, pages, title, year }, list) {
    const li_template = `
            <li class="book_item" >
                <figure>
                    <img src="${imageLink}" alt="${title}">
                </figure>
                <div class="card_details">
                    <h2>${title}</h2>
                    <div><span>Pages: ${pages}</span><span> Year: ${year}</span></div>
                    <h2>${author}</h2>
                </div>
            </li>
    `
    list.innerHTML += li_template;

}

function cutData(array, num = 1, max = 10) {

    let end = num * max

    const data = array.slice(end - max, end);

    return data;
}

/* Interar los array de libros ya sea filtrados o array original */
export function iterateBooks(array, list, num) {
    list.innerHTML = '';
    let data = cutData(array, num);
    data.forEach(book => {
        loadBooks2_0(book, list)
    });

}

/* Cargar historial del busquedas recientes */
export function loadBusquedasRecientes(busquedas_recientes, recientes) {
    busquedas_recientes.innerHTML = ''
    recientes.forEach(el => {
        const li = `<li>${el}</li>`

        busquedas_recientes.innerHTML += li;
    })
}
/* Realizar un filtro de los libro basado en una búsqueda por titulo del libro */
export function filterBooks(array, list, searchvalue) {

    const filterData = array.filter(book => book.title.toLowerCase().includes(searchvalue.toLowerCase()))

    iterateBooks(filterData, list)
}