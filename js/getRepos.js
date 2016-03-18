var apiKey = require("./../.env").apiKey;

exports.getRepos = function(){
  $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response){
    console.log(response);
    $("#userName").text(response.name);
    $("#userInfo").append("<a href='" + response.html_url + "' target='_blank'>" + response.login + "</a><br>");
    $("#userInfo").append("<a href='" + response.blog + "' target='_blank'>Blog</a>");
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

  $.get('https://api.github.com/users/daneden/repos?access_token=' + apiKey ).then(function(response){
    console.log(response);
    response.forEach(function(repo){
      $('#userRepos').append('<a href="' + repo.html_url + '" class="list-group-item"  target="_blank">' + repo.name + ' - ' + repo.description + '</a>');
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
