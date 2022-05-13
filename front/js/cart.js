// je récupère les donné du localstorage
let cart = JSON.parse(localStorage.getItem("cart"));
// je créer la constante pour indiqué le lieu d'insertion des produits
const items = document.getElementById("cart__items");
let kanap
// création de la boucle
for ( kanap of cart) {
    items.innerHTML += 
    `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
    <div class="cart__item__img">
    <img src="${kanap.img}" alt="${kanap.alt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${kanap.name}</h2>
        <p>${kanap.color}</p>
        <p>${kanap.price}€</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
    </div>
</article>`
calcultateTotal()
}
const products = document.querySelectorAll(".cart__item");
const deleteItem = document.querySelectorAll(".deleteItem");
const quantity = document.querySelectorAll(".itemQuantity");
// je créer la boucle pour modifier la quantiter
for (let i = 0; i < products.length; i++) {
  const qty = quantity[i];
  const cartProducts = cart[i];
  qty.addEventListener("change", (event) => {
    //j'enregistre la nouvelle quantiter
    cartProducts.quantity = parseInt(event.target.value);
    // // je mes à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    calcultateTotal();
    });
}
//suprimer du panier un produit
for (let i = 0; i < products.length; i++) {
  const del = deleteItem[i];
  let colorId = cart[i].color;
  let dataId = cart[i].id;
  del.addEventListener("click", () => {
    // je supprime de notre panier l'élément de la boucle selectionné via splice()
    let filtre = cart.filter(function (article) {
      return article.id != dataId || article.color != colorId;
    });
    cart = filtre;
    // je supprime le code HTML
    document.querySelector(
        `[data-id='${dataId}']` && `[data-color='${colorId}']`
        )
      .remove();
    // je mes à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    calcultateTotal();
  });
}
// le nombre d'article et le prix total
function calcultateTotal() {
  let panier = JSON.parse(localStorage.getItem("cart"));
  // je déclare les variables en tant que nombre
  let totalArticle = 0;
  let totalPrix = 0;
  // je créer la boucle pour récupéré les quantités et calculer le prix total
  for (let article of panier) {
    totalArticle += parseInt(article.quantity);
    totalPrix += parseInt(article.quantity) * parseInt(article.price);
  }
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrix;
}
// le formulaire
// je créer la constante pour indiqué le lieu du formulaire
const form = document.querySelector(".cart__order__form");
// je créer les constantes des regex
const nameRegex = new RegExp ("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const addressRegex = new RegExp ("[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const cityRegex = new RegExp ("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const emailRegex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$");
// Ecoute les modification
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});
form.lastName.addEventListener('change', function() {
  validLastName(this);
});
form.address.addEventListener('change', function() {
  validAddress(this);
});
form.city.addEventListener('change', function() {
  validCity(this);
});
form.email.addEventListener('change', function() {
  validEmail(this);
});
// partie validation
const validFirstName = function(inputFirstName) {
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  if (nameRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
  } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
  }
};
const validLastName = function(inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;

  if (nameRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
  } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
  }
};
const validAddress = function(inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling;

  if (addressRegex.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
  } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
  }
};
const validCity = function(inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;

  if (cityRegex.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
  } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
  }
};
const validEmail = function(inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling;

  if (emailRegex.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
  } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
  }
};