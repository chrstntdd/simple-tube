const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

function getUserSearch() {
  $('#js-search-form').submit(function (e) {
    e.preventDefault();
    var searchTerm = $('#js-search-query').val()
    getDataFromAPI(searchTerm);
  })
}

function getDataFromAPI(searchTerm) {
  var params = {
    part: 'snippet',
    key: YT_API_KEY,
    q: searchTerm
  };
  $.getJSON(YT_ENDPOINT_URL, params, function (searchTerm) {
    renderResults(searchTerm);
  });
}

function renderResults(results) {
  console.log(results.items);
}