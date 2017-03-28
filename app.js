const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

var resultCardTemplate = (
  '<li>' +
    '<article class="results">' +
      '<img src="" alt="">' +
      '<h4></h4>' +
    '</article>' +
  '</li>'
)

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
    q: searchTerm,
    type: 'video'
  };
  $.getJSON(YT_ENDPOINT_URL, params, function (searchTerm) {
    renderResults(searchTerm);
  });
}

function renderResults(results) {
  $.each(results.items, function(index, value){
    renderThumbnail(value);
    renderTitle(value);
    renderURL(value);
  });
}

function renderThumbnail(results){
  var thumb = results.snippet.thumbnails.medium.url
  // console.log(thumb);
}

function renderTitle (results){
  var videoTitle = results.snippet.title;
  // console.log(videoTitle);
}

function renderURL (results){
  const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v='
  var videoId = results.id.videoId;
  // console.log(YOUTUBE_BASE_URL + videoId);
}