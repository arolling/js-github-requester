var apiKey = require("./../.env").apiKey;
var moment = require("moment");

exports.getRepos = function(userName){
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response){
    console.log(response);

    $("#userInfo").empty();
    $("#userName").html("User: <a href='" + response.html_url + "' target='_blank'>" + response.login + "</a><br>");
    $("#userName").append(response.name);
    if(response.blog !== null) {
      $("#userInfo").append("<a href='" + response.blog + "' target='_blank'>Blog</a>");
    }
    if(response.location !== null){
      $("#userInfo").append("<p>" + response.location + "</p>");
    }

    $(".hideme").show();

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

  $.get('https://api.github.com/users/' + userName + '/repos?per_page=100&sort=updated&access_token=' + apiKey ).then(function(response){
    console.log(response);
    $('#userRepos').empty();
    response.forEach(function(repo){
      var created = moment(repo.created_at);
      var updated = moment(repo.updated_at);
      $('#userRepos').append('<a href="' + repo.html_url + '" class="list-group-item"  target="_blank"><h4 class="list-group-item-heading">' + repo.name + '</h4><p class="list-group-item-text">' + repo.description + '</p><p class="list-group-item-text">Created: ' + created.calendar() + '</p><p class="list-group-item-text">Updated: ' + updated.calendar() + '</p></a>');
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
