const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

var resultCardTemplate = (
  '<li>' +
    '<article class="result">' +
      '<a id="thumbnail-link"href="" target="_blank">' +
        '<img src="" alt="">' +
      '</a>' +
      '<h2 class="video-title"></h2>' +
      '<a id="channel-title" href="" target="_blank">' +
        '<h4><h4>'+
      '</a>' +
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
    getMoreResults(params, searchTerm);
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
    console.log(value);
    renderVideoCard(getVideoData(value), resultCardTemplate);
  });
  renderNextButton();
}

function renderNextButton(){
  var buttonHTML = '<button id="next-btn">Next <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>'
  $('#js-results').after(buttonHTML);
  $('#next-btn').click(function(e){
    alert('PRESSED');
    //AJAX CALL FOR MORE DATA;
  });
}

function getVideoData(results){
  //Gets relevant data from API call
  var videoData = {
    thumbnail: results.snippet.thumbnails.medium.url,
    title: results.snippet.title,
    url: 'https://www.youtube.com/watch?v=' + results.id.videoId,
    channelURL: 'https://www.youtube.com/channel/' + results.snippet.channelId,
    channelName: results.snippet.channelTitle
  }
  return videoData;
}

function renderVideoCard (videoData, videoTemplate){
  //bind data to HTML template then add to DOM
  var result = $(videoTemplate);
  result.find('h2').text(videoData.title);
  result.find('#channel-title').attr('href', videoData.channelURL);
  result.find('#channel-title h4').text(videoData.channelName);
  result.find('img').attr('src', videoData.thumbnail);
  result.find('#thumbnail-link').attr('href', videoData.url);
  $('#js-results').append(result);
}