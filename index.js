/**
 * Name: William Wang
 * Date: 4/22/2021
 * Section: CSE 154 AO
 *
 * This index.js
 */
"use strict";

(function () {
  const URL = "https://www.cheapshark.com/api/1.0/";

  window.addEventListener("load", init);

  /**
   * Add event listener to search button to let it ask for target data through API
   */
  function init() {
    id("searchBtn").addEventListener("click", makeRequest);
  }

  function makeRequest() {
    let title = id("searchBar").value;
    let url = `${URL}games?title=${title}`;
    let board = id("findings");
    let loading = id("loading")

    loading.classList.toggle
    while (board.hasChildNodes()) {
      board.removeChild(board.lastChild);
    }
    fetch(url)
      .then(statusCheck)
      .then((res) => res.json())
      .then(processData)
      .then(() => (window.location.href = "#findings"))
      .catch(error);
  }

  /**
   * Process the response and put each element on a card, then append the card to front-end
   * @param {object} res the response from the server containing cheap games information
   */
  function processData(res) {
    for (let key in res) {
      // For/In Loop = object version forEach. key is the index of object
      let obj = res[key];
      let card = gen("div");
      let title = gen("h3");
      let image = gen("img");
      let deal = gen("p");
      let btn = gen("button");
      let dealID = obj.cheapestDealID;

      card.classList.add("card");
      title.textContent = obj.external;
      image.src = obj.thumb;
      deal.textContent = `Cheapest deal: ${obj.cheapest} USD`;
      btn.textContent = "Check Deal";
      btn.addEventListener("click", () => {
        window.open(
          `https://www.cheapshark.com/redirect?dealID=${dealID}`,
          "_blank"
        );
      });
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(deal);
      card.appendChild(btn);
      id("findings").appendChild(card);
    }
  }

  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Error handler when fetch fails
   */
  async function error() {
    let alert = gen("h2");
    alert.textContent = "Error:( Something is wrong. Please try again";
    id("findings").appendChild(alert);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
