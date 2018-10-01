function categoriesButtons(data) {
  $('.categories-section').html(`
    ${data.categories.map(category => `
      <div>
        <button class="btn btn-outline-light btn-categories m-4 text-uppercase" id="${category.strCategory}" onclick="redirectCategoryList(this.id)">${category.strCategory}</button>
      </div>
    `).join('')}
  `);
}

function recipesList(data) {
  $('main').html(`
    <h2 class="text-center display-5 text-uppercase fw-500 category-title">${window.location.pathname.match(/([A-Z])\w+/g).join('')} RECIPES</h3>
    <section class="d-flex justify-content-center flex-wrap">
      ${data.meals.map(meal => `
      <div class="card m-3" style="width: 20rem;">
        <img class="card-img-top img-effect" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="card-body card-recipe-body text-center">
          <h5 class="card-title card-recipe-title text-uppercase fw-600">${meal.strMeal}</h5>
          <hr class="hr-card">
          <button class="card-button text-white fw-600 m-1 pt-1 pb-1 pr-4 pl-4" id="${meal.idMeal}" onclick="redirectRecipePage(this.id)">READ</button>
          <button class="card-button text-white fw-600 m-1 pt-1 pb-1 pr-4 pl-4" id="${meal.strMeal}" onclick="addToRecipeBook(this)">ADD TO MY BOOK</button>
        </div>
      </div>`).join('')}
    </section>
  `);
}

function getIngredients(data) {
  for (ingredient in data.meals[0]) {
    if (ingredient.match(/(strIngredient).*/g) && data.meals[0][ingredient]) {
      $('#ingredients').append(`<li class="list-group-item bg-transparent"><small>${data.meals[0][ingredient]}</small></li>`);
    }
  }
}

function getMeasures(data) {
  for (measure in data.meals[0]) {
    if (measure.match(/(strMeasure).*/g) && data.meals[0][measure]) {
      $('#measures').append(`<li class="list-group-item bg-transparent"><small>${data.meals[0][measure]}</small></li>`);
    }
  }
}

function recipePageContent(data) {
  let recipe = data.meals[0];
  $('main').html(`
    <div class="jumbotron jumbotron-fluid text-body recipe-section m-auto">
      <div class="container ml-3">
        <div class="d-flex flex-wrap">
          <div class="border border-danger p-1">
            <img src="${recipe.strMealThumb}" class="recipe-banner"/>
          </div>
          <ul class="list-unstyled ml-3">
            <li><h1 class="display-7 fw-600 text-uppercase">${recipe.strMeal}</h1></li>
            ${recipe.strCategory ? `<li>Category: ${recipe.strCategory}</li>` : `<li></li>`}
            ${recipe.strArea ? `<li>Area: ${recipe.strArea}</li>` : `<li></li>`}
            ${recipe.strSource ? `<li><i class="fas fa-external-link-alt mr-2"></i><a href="${recipe.strSource}" class="link" target="_blank">Original Recipe Source</a></li>` : `<li></li>`}
            ${recipe.strYoutube ? `<li><i class="fab fa-youtube mr-2"></i><a href="${recipe.strYoutube}" class="link" target="_blank">Recipe Video</a></li>` : `<li></li>`}
          </ul>
        </div>
      </div>
      <div class="card-deck m-3">
        <div class="card bg-transparent">
          <div class="card-body bg-transparent">
            <h5 class="card-title text-uppercase">Measures</h5>
            <ul id="measures" class="list-group list-group-flush"></ul> 
          </div>
        </div>
        <div class="card bg-transparent">
          <div class="card-body bg-transparent">
            <h5 class="card-title text-uppercase">Ingredients</h5>
            <ul id="ingredients" class="list-group list-group-flush"></ul>
          </div>
        </div>
        <div class="card bg-transparent">
          <div class="card-body bg-transparent">
            <h5 class="card-title text-uppercase">Instructions</h5>
            <p class="card-text"><small>${recipe.strInstructions}</small></p>
          </div>
        </div>
      </div>
    </div>
  `);
  getMeasures(data); 
  getIngredients(data);
}

let recipesBook = [];
function addToRecipeBook(btn) {
  recipesBook.push(btn.id);
  localStorage.setItem('Recipes', JSON.stringify(recipesBook));
  localStorage.setItem('Recipes Counter', JSON.stringify(recipesBook.length));
  $('.recipes-counter').html(recipesBook.length);
  $('.dropdown-menu').html(`${JSON.parse(localStorage.getItem('Recipes')).join(`<br>`)}`);
  $(btn).replaceWith(`<button class="remove-button text-white fw-600 m-1 pt-1 pb-1 pr-4 pl-4" id="${btn.id}" onclick="removeFromRecipeBook(this)">REMOVE</button>`);
}

function removeFromRecipeBook(btn) {
  recipesBook = recipesBook.filter(item => item !== btn.id);
  localStorage.setItem('Recipes', JSON.stringify(recipesBook));
  localStorage.setItem('Recipes Counter', JSON.stringify(recipesBook.length));
  $('.recipes-counter').html(recipesBook.length);
  $('.dropdown-menu').html(`${JSON.parse(localStorage.getItem('Recipes')).join(`<br>`)}`);
  $(btn).replaceWith(`<button class="card-button text-white fw-600 m-1 pt-1 pb-1 pr-4 pl-4" id="${btn.id}" onclick="addToRecipeBook(this)">ADD TO MY BOOK</button>`);
}