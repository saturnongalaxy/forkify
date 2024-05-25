import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

//comes from parcel
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(resultsView);

    if (!id) return;
    recipeView.renderSpiner();
    //0) update results view to mark selected search resualt
    resultsView.update(model.getSearchResultPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

///search
const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    //3)NOTE: render resaults
    // console.log(model.state.search.results);
    //TIP: passing nothing means set to 1
    resultsView.render(model.getSearchResultPage());

    //4)Render nitial paganition but
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  //1) render new resaults
  resultsView.render(model.getSearchResultPage(gotoPage));

  //2)Render new paginition but
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  //update the recipe servings(in state)
  model.updateServings(newServings);
  // console.log(model.state.recipe);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  // NOTE: we want to render just servng part not all the DOM
  // so not using prev render method,change to update
  recipeView.update(model.state.recipe);
};

//add and remove bookmark
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  //3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//publisher subscriber pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHnadlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
