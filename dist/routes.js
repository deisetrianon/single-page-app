page('/', index);
page('/:recipes', recipes);
page('/:recipes/*', recipeId);
page('*', notFound);
page();

$(document).ready(function() {
  index();
  getLocalStorage();
});

function index() {
  getCategories();
  $('main').html('');
}

function getLocalStorage() {
  $('.recipes-counter').html(localStorage.getItem('Recipes Counter'));
  $('.dropdown-menu').html(`${JSON.parse(localStorage.getItem('Recipes')).join(`<br>`)}`);
}

function recipes() {
  const categoryName = window.location.pathname.match(/([A-Z])\w+/g).join('');
  getCategoryRecipes(categoryName);
}

function recipeId() {
  const recipeId = window.location.pathname.match(/[0-9]/g).join('');
  getRecipe(recipeId);
}

function notFound(error) {
  $('main').html = 'Not found!';
  console.log(error);
}

function redirectCategoryList(id) {
  page.redirect(`/${id}`);
  getCategoryRecipes(id);
}

function redirectRecipePage(id) {
  const categoryName = window.location.pathname.match(/([A-Z])\w+/g).join('');
  page.redirect(`/${categoryName}/${id}`);
  getRecipe(id);
}




