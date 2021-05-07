/**
 * Name: William Wang
 * Date: 4/22/2021
 * Section: CSE 154 AO
 *
 * This index.html sets every element of the timer, including minute/second container, title,
 * and controlbar.
 */
"use strict";

(function () {
  const URL = "https://www.cheapshark.com/api/1.0/";

  window.addEventListener("load", init);

  /**
   * CHANGE: Describe what your init function does here.
   */
  function init() {
    id("searchBtn").addEventListener("click", makeRequest);
  }

  function makeRequest() {
    let title = id("searchBar").value;
    let url = `${URL}games?title=${title}`;
    fetch(url)
      .then(statusCheck)
      .then((res) => res.json())
      .then(processData)
      .catch(error);
  }

  function processData(res) {
    console.log(res);
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
      deal.textContent = `Cheapest deal: ${obj.cheapest}USD`;
      btn.textContent = "Check Deal";
      btn.onclick = `window.open("https://www.cheapshark.com/redirect?dealID=${dealID}", "_blank")`;

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
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
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
