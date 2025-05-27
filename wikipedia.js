window.addEventListener("load", function () {
  const searchInputElement = document.getElementById("searchInput");
  const searchResultsElement = document.getElementById("searchResults");
  const spinnerElement = document.getElementById("spinner");

  function createAndAppend(result) {
    const { title, link, description } = result;

    const resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");

    const resultTitleElement = document.createElement("a");
    resultTitleElement.classList.add("result-title");
    resultTitleElement.textContent = title;
    resultTitleElement.href = link;
    resultTitleElement.target = "_blank";
    resultItemElement.appendChild(resultTitleElement);

    resultItemElement.appendChild(document.createElement("br"));

    const urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemElement.appendChild(urlElement);

    resultItemElement.appendChild(document.createElement("br"));

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    resultItemElement.appendChild(descriptionElement);

    searchResultsElement.appendChild(resultItemElement);
  }

  function displayResults(searchResults) {
    spinnerElement.classList.toggle("d-none");
    for (let result of searchResults) {
      createAndAppend(result);
    }
  }

  function searchWikipedia(event) {
    if (event.key === "Enter") {
      searchResultsElement.textContent = "";
      spinnerElement.classList.toggle("d-none");

      const searchInput = searchInputElement.value;
      const url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchInput);

      fetch(url)
        .then((response) => response.json())
        .then((jsonData) => {
          const { search_results } = jsonData;
          displayResults(search_results);
        });
    }
  }

  searchInputElement.addEventListener("keydown", searchWikipedia);
});
