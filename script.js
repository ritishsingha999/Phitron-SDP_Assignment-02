const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const maxDrinks = 7;

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const drinkCard = document.getElementById("drinkCard");
const notFound = document.getElementById("notFound");
const groupList = document.getElementById("groupList");
const drinkCount = document.getElementById("drinkCount");
const modalOverlay = document.getElementById("modalOverlay");
const detailsModal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

let group = [];

fetchDrink("margarita");

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) fetchDrink(query);
});

function fetchDrink(query) {
    fetch(`${API_URL}${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.drinks) {
                const drink = data.drinks[0];
                displayDrinkCard(drink);
            } else {
                drinkCard.style.display = "none";
                notFound.style.display = "block";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function displayDrinkCard(drink) {
    document.getElementById("drinkName").textContent = drink.strDrink;
    drinkCard.querySelector("p:nth-child(2)").textContent = `Category: ${drink.strCategory}`;
    drinkCard.querySelector("p:nth-child(3)").textContent = `Instructions: ${drink.strInstructions.slice(0, 15)}...`;
    drinkCard.style.display = "block";
    notFound.style.display = "none";

    drinkCard.querySelector(".add-btn").onclick = () => addToGroup(drink.strDrink);
    drinkCard.querySelector(".details-btn").onclick = () => showDetails(drink);
}

function addToGroup(drinkName) {
    if (group.length < maxDrinks) {
        group.push(drinkName);
        updateGroupList();
    } else {
        alert("You can't add more than 7 drinks to the group.");
    }
}

function updateGroupList() {
    groupList.innerHTML = group.map(drink => `<li>${drink}</li>`).join("");
    drinkCount.textContent = `Drinks in group: ${group.length}`;
}

function showDetails(drink) {
    const details = [
        `Name: ${drink.strDrink}`,
        `Category: ${drink.strCategory}`,
        `Glass: ${drink.strGlass}`,
        `Alcoholic: ${drink.strAlcoholic}`,
        `Instructions: ${drink.strInstructions}`
    ];
    modalContent.innerHTML = details.map(detail => `<li>${detail}</li>`).join("");
    modalOverlay.style.display = "block";
    detailsModal.style.display = "block";
}

closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    detailsModal.style.display = "none";
});