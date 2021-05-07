/**
 * Name: William Wang
 * Date: 5/6/2021
 * Section: CSE 154 AO
 *
 * This index.js takes the game name that user inputed, requests the server for game information,
 * then processes it to present those information on my steam-like designed webpage
 */
"use strict";

(function() {
  const URL = "https://www.cheapshark.com/api/1.0/";

  window.addEventListener("load", init);

  /**
   * Add event listener to search button to let it ask for target data through API
   */
  function init() {
    id("search-btn").addEventListener("click", makeRequest);
  }

  /**
   * Request and fetch what the user input and process the response
   * Toggle the loading page when fetching and processing
   * Clear the page when new request
   */
  function makeRequest() {
    let title = id("search-bar").value;
    let url = `${URL}games?title=${title}`;
    let board = id("findings");
    let loading = id("loading");

    loading.classList.remove("disappear");
    while (board.hasChildNodes()) {
      board.removeChild(board.lastChild);
    }
    fetch(url)
      .then(statusCheck)
      .then((res) => res.json())
      .then(processData)
      .then(() => {
        window.location.href = "#findings";
        loading.classList.add("disappear");
      })
      .catch(error);
  }

  /**
   * Process the response and put each element on a card, then append the card to front-end
   * @param {JSON} res the response from the server containing cheap games information
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

  /**
   * Throws an error if the response is not correct, returns the valid response
   * @param {JSON} res reponse from the server
   * @returns {JSON} the response
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Error handler when fetch fails
   */
  function error() {
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
