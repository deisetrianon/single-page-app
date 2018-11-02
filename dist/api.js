function getCategories() {
  $.ajax({
    type: 'GET',
    url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    success: categoriesButtons,
    error: (error) => error,
  })
}

function getCategoryRecipes(id) {
  $.ajax({
    type: 'GET',
    url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`,
    success: recipesList,
    error: (error) => error,
  })
}

function getRecipe(id) {
  $.ajax({
    type: 'GET',
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    success: recipePageContent,
    error: (error) => error,
  }) 
}