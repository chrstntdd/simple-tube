const YT_ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search'
const YT_API_KEY = 'AIzaSyCiL0nIACEDMO-eTMmpd1oaSOva4IubSUg'

$(function () {
  getUserSearch();
});

var resultCardTemplate = (
  '<li>' +
    '<article class="result">' +
      '<a id="thumbnail-link" href="" target="_blank">' +
        '<img src="" alt="">' +
      '</a>' +
      '<h2 class="video-title"></h2>' +
      '<a id="channel-title" href="" target="_blank">' +
        '<h4><h4>'+
      '</a>' +
    '</article>' +
  '</li>'
)

var state = {
  pageCount: 0,
  params : {
    part: 'snippet',
    key: YT_API_KEY,
    q: '',
    type: 'video',
    pageToken: ''
  }
}

 

function getUserSearch() {
  $('#js-search-form').submit(function (e) {
    e.preventDefault();
    state.params.q = $('#js-search-query').val()
    this.reset();
    $('#js-results').html(''); //clear old results
    state.pageCount = 0; //reset state
    $('#results').removeClass('hidden');
    getDataFromAPI();
  })
}

function getDataFromAPI() {
  $.getJSON(YT_ENDPOINT_URL, state.params, function (apiResponse) {
    renderResults(apiResponse);
    handleNextButton(apiResponse);
    handleBackButton(apiResponse);
  });
}

function getVideoData(results) {
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

function renderResults(apiResponse) {
  $.each(apiResponse.items, function (index, value) {
    renderVideoCard(getVideoData(value), resultCardTemplate);
  });
  renderPaginationButtons();
}

function renderPaginationButtons(){
  //Displays appropriate pagination buttons depending on page count.
  state.pageCount <= 0 ? $('#back-btn').hide() : $('#next-btn, #back-btn').show();
}

function renderVideoCard(videoData, videoTemplate) {
  //trim long titles to prevent layout inconsistencies.
  if (videoData.title.length >= 30){
    videoData.title = videoData.title.substr(0,30) + '...';
  }
  //bind data to HTML template then add to DOM
  var result = $(videoTemplate);
  result.find('h2').text(videoData.title);
  result.find('#channel-title').attr('href', videoData.channelURL);
  result.find('#channel-title h4').text(videoData.channelName);
  result.find('img').attr('src', videoData.thumbnail);
  result.find('#thumbnail-link').attr('href', videoData.url);
  $('#js-results').append(result);
}

function handleNextButton(apiResponse) {
  $('#next-btn').off().click(function (e) { //http://stackoverflow.com/questions/14969960/jquery-click-events-firing-multiple-times
    $('#js-results').html(''); //clear old results
    state.params.pageToken = apiResponse.nextPageToken;
    state.pageCount++;
    getDataFromAPI();
  });
}

function handleBackButton(apiResponse) {
  $('#back-btn').off().click(function (e) {
    $('#js-results').html(''); //clear old results
    state.params.pageToken = apiResponse.prevPageToken
    state.pageCount--;
    getDataFromAPI();
  });
}