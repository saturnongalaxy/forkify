import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Recipe not found for your query.';
  _message = '';

  _generateMarkup() {
    // console.log(this._data) ;
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
