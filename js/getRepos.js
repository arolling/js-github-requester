var apiKey = require("./../.env").apiKey;
var moment = require("moment");

exports.getRepos = function(userName, page){
  if(page === 1) {
    var query = 'https://api.github.com/users/' + userName + '/repos?per_page=30&sort=updated&access_token=' + apiKey + '&callback=?';
  } else {
    var query = page;
  }

  console.log(query);
  $.getJSON(query).then(function(response){
    console.log(response);
    var linkData = response.meta.Link; //array of up to 4
    for (var i = 0 ; i < linkData.length ; i++){
      if(linkData[i][1].rel === "next"){
        var start = linkData[i][0].indexOf("jQuery");
        var junk = linkData[i][0].substr(start, 57);
        var newLink = linkData[i][0].replace(junk, '?&');
        $('#forwardButton').attr("value", newLink);
      } else if (linkData[i][1].rel === "prev"){
        $('#backButton').attr("value", linkData[i][0]);
      }
    }
    // $("#pageLink").text(response.meta.Link[0][0]);
    // console.log(response.meta.Link[0][1].rel);
    // $("#pageRel").text(response.meta.Link[0][1].rel);
    response.data.forEach(function(repo){
      var created = moment(repo.created_at);
      var updated = moment(repo.pushed_at);
      $('#userRepos').append('<a href="' + repo.html_url + '" class="list-group-item"  target="_blank"><h4 class="list-group-item-heading">' + repo.name + '</h4><p class="list-group-item-text">' + repo.description + '</p><p class="list-group-item-text">Language: ' + repo.language + '</p><p class="list-group-item-text">Created: ' + created.calendar() + '</p><p class="list-group-item-text">Last Updated: ' + updated.calendar() + '</p></a>');
    });
  }).fail(function(error){
    console.log(error);
    console.log(error.responseJSON.message);
  });
};
