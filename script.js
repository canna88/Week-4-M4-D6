// Identificazione elementi nel DOM e l'API
const searchResultDiv = document.querySelector(".search-results");
const usersLink = "https://jsonplaceholder.typicode.com/users";
const searchInput = document.getElementById("search-input");
const filterInput = document.querySelector(".custom-select")

// Pulisco gli elemnti che mi interessano nel DOM

// VARIABILI E ARRAYS
let totalUsers = [];
let visibleUsers = [];


//  FUNZIONI: DICHIARAZIONE

// Funzione per filtrare e visualizzare i libri in base alla ricerca dell'utente
function filterUsers() {
  const filterOption = filterInput.value.toLowerCase();
  const searchText = searchInput.value.toLowerCase(); 

  console.log(filterOption)
  visibleUsers = totalUsers.filter((user) =>
    user[filterOption].toLowerCase().includes(searchText)
  );
  searchResultDiv.innerHTML = ""; // Svuota la visualizzazione attuale dei libri
  loadUsers(visibleUsers); // Carica i libri filtrat
}


function loadUsers(usersList) {
  searchResultDiv.innerHTML = "";


  usersList.forEach(element => {
    const {name : personName, username, email, company:{name : companyName}} = element;
    searchResultDiv.innerHTML += /*html*/ `
    <div class="user-div">
      <div class="card">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Name: <span>${personName}</span></li>
            <li class="list-group-item">User Name: <span>${username}</span></li>
            <li class="list-group-item">Email address: <span>${email}</span></li>
            <li class="list-group-item">Company name: <span>${companyName}</span></li>
          </ul>
        </div>
      </div>
    </div>
    `

  });

}

// Funzione per ottenere i libri dalla API iniziale
async function getUsers(link) {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// FUNZIONI: ESECUZIONE
window.onload = () => {
  searchResultDiv.innerHTML = 
  /*html*/
  ` 
  <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  `
  getUsers(usersLink)
  .then((data) => {
    totalUsers = data;
    loadUsers(data);
    console.log(data);
  })
}

searchInput.addEventListener("input", filterUsers); // Aggiungiamo un ascoltatore di eventi all'input di ricerca per filtrare i libri in tempo reale
filterInput.addEventListener("change", filterUsers)


