import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //NOTE:
  //using publisher subscriber pattern to pagination
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //NOTE: event deligation, closest searching up the tree looking for parents
      //queryselector searching down in the tree for searching children

      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      // console.log(gotoPage);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // const next = 'next';
    // const right = 'right';
    // const left = 'left';

    // _generateMarkupButton(currPage, next, right);
    // Page 1, and there are other pages

    if (currPage === 1 && numPages > 1) {
      // // console.log(numPages, currPage);
      // _generateMarkupButton(currPage);
      return `
        <button data-goto="${
          currPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage}</span>
              </button>
              `;
    }

    //other pages
    if (currPage < numPages) {
      return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }
    //page 1 , no ither pages
    return '';
  }

  /// check this later DIL: BUG:
  _generateMarkupButton(currPage) {
    console.log(currPage);

    // return `
    // <button data-goto="${
    //   currPage + 1
    // }" class="btn--inline pagination__btn--next">
    //   <span>Page ${currPage + 1}</span>
    //   <svg class="search__icon">
    //     <use href="${icons}#icon-arrow-right"></use>
    //   </svg>
    // </button>`;
  }
}

export default new PaginationView();
