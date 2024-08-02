// import icons from '../img/icons.svg'; // Parcel 1 1111
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Loading Recipe
    await model.loadRecipe(id);

    // Rendering Recipe
    if (Object.keys(model.state.recipe).length !== 0)
      recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    // resultsView.render(model.state.search.results); without pagination
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    alert(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerFunction(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
