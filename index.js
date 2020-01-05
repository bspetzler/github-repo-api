'use strict';

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();

  responseJson.forEach(response =>
    $("#results-list").append(
      `<li><a href='${response.url}'>${response.name}</a></li>`)
  );

  $('#results').removeClass('hidden');
};

function getRepos(username) {
  const url = searchURL + username + '/repos';

  console.log(url);

  const options = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);