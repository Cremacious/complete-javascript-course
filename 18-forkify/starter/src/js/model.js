import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    //working

    const data = await getJSON(`${API_URL}${id}`);

    if (!data || !data.data || !data.data.recipe) {
      throw new Error('Invalid data format');
    }

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`whoa ${err} 💥💥💥`);
    throw err;
  }
  //   console.log(state.recipe);
};
