const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

var resultCardTemplate = (
  '<li>' +
    '<article class="result">' +
      '<img src="" alt="">' +
      '<h4></h4>' +
    '</article>' +
  '</li>'
)

function getUserSearch() {
  $('#js-search-form').submit(function (e) {
    e.preventDefault();
    var searchTerm = $('#js-search-query').val()
    this.reset();
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
    renderVideoCard(getVideoData(value), resultCardTemplate);
  });
}

function getVideoData(results){
  const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch?v='
  var videoData = Object.create(null);
  videoData.thumbnail = results.snippet.thumbnails.medium.url;
  videoData.title = results.snippet.title;
  videoData.url = YOUTUBE_BASE_URL + results.id.videoId;
  // console.log(videoData);
  return videoData;
}

function renderVideoCard (videoData, videoTemplate){
  var result = $(videoTemplate);
  result.find('h4').text(videoData.title);
  result.find('img').attr('src', videoData.thumbnail);
  // console.log(result);
  $('#js-results').append(result);
}