import { iterateBooks, loadBusquedasRecientes, filterBooks } from "./utilities.js";
import { books } from "./services.js";

const book_list = document.querySelector('.book_list');
const search = document.querySelector('#search');
const busquedas_recientes = document.querySelector('#busquedas_recientes');
const recientes = JSON.parse(localStorage.getItem('rc'));
const pagination = document.querySelector('#pagination');
iterateBooks(books, book_list, 1)

if (localStorage.getItem('rc') === null) {
    localStorage.setItem('rc', JSON.stringify([]))
}

/* Evento  para  activar la búsqueda de libro al pulsar enter */
search.addEventListener('keydown', (e) => {

    if (e.keyCode === 13) {
        filterBooks(books, book_list, search.value)

        if (!recientes.includes(search.value)) {
            recientes.unshift(search.value)
            localStorage.setItem('rc', JSON.stringify(recientes));

            recientes.length > 6 && recientes.pop()
        }

    }
    busquedas_recientes.style.display = 'none'
})

/* Abre el historial de busquedas recientes */
search.addEventListener('click', () => {
    loadBusquedasRecientes(busquedas_recientes, recientes);
    busquedas_recientes.style.display = 'block'
})

/* Evento click con delegación de eventos para obtener el texto de búsqueda reciente */
busquedas_recientes.addEventListener('click', (e) => {
    const target = e.target;

    if (target.tagName === 'LI') {
        filterBooks(books, book_list, target.textContent)
        busquedas_recientes.style.display = 'none'
    }
})



function loadPagination(array, max = 10) {
    pagination.innerHTML  = ''
    for (let index = 0; index < array.length /max; index++) {

        pagination.innerHTML += `<li>${index  + 1}</li>`

    }

}

loadPagination(books, 10);