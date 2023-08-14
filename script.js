import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js';

const appSettings = {
    databaseURL : "https://firstmobileapp-5f993-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database,"shoppingList");

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButton.addEventListener("click", function(){
    let inputValue = inputField.value;

    push(shoppingListInDB,inputValue);

    clearInputField(inputField);
});


onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let list = Object.entries(snapshot.val());

        clearShoppingListEl();

        for(let i = 0; i < list.length; i++){
            let currentItem = list[i];
            addHtmlData(currentItem);
        }
    } else{
        shoppingListEl.innerHTML = "No items here... yet";
    }
})

function clearInputField(field) {
    field.value = "";
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}

function addHtmlData(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newEl = document.createElement("li");

    newEl.textContent = itemValue;

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    })

    shoppingListEl.append(newEl);
}