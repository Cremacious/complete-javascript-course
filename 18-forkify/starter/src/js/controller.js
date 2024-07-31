// import icons from '../img/icons.svg'; // Parcel 1 1111
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
