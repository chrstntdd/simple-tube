const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

var resultCardTemplate = (
  '<li>' +
    '<article class="result">' +
      '<a href="">' +
        '<img src="" alt="">' +
      '</a>' +
      '<h2 class="video-title"></h2>' +
    '</article>' +
  '</li>'
)

function getUserSearch() {
  $('#js-search-form').submit(function (e) {
    e.preventDefault();
    var searchTerm = $('#js-search-query').val()
    this.reset();
    $('#results').removeClass('hidden');
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
    //getMoreResults(params, searchTerm);
  });
}

function getMoreResults(params, searchTerm) {
  /*assign pageToken property on params to .nextPageToken 
  before making another request to load more results.*/

  // $(window).scroll(function () {
  //   if ($(window).scrollTop() + $(window).height() == $(document).height()) {
  //     params.pageToken = searchTerm.nextPageToken;
  //     $.getJSON(YT_ENDPOINT_URL, params, function (searchTerm) {
  //       renderResults(searchTerm);
  //       getMoreResults(params, searchTerm);
  //     });
  //   }
  // });
}

function renderResults(results) {
  $.each(results.items, function(index, value){
    renderVideoCard(getVideoData(value), resultCardTemplate);
  });
}

function getVideoData(results){
  var videoData = {
    thumbnail: results.snippet.thumbnails.medium.url,
    title: results.snippet.title,
    url: 'https://www.youtube.com/watch?v=' + results.id.videoId,
  }
  return videoData;
}

function renderVideoCard (videoData, videoTemplate){
  var result = $(videoTemplate);
  result.find('h2').text(videoData.title);
  result.find('img').attr('src', videoData.thumbnail);
  result.find('a').attr('href', videoData.url);
  // console.log(result);
  $('#js-results').append(result);
}