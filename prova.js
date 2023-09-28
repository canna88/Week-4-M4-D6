
const usersLink = "https://jsonplaceholder.typicode.com/users";
let totalUsers = [];

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

  getUsers(usersLink)
  .then((data) => {
    totalUsers = data;
    console.log(data)
  })

