var apiKey = require("./../.env").apiKey;

exports.getRepos = function(userName){
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response){
    console.log(response);

    $("#userInfo").empty();
    $("#userName").html("User Name: <a href='" + response.html_url + "' target='_blank'>" + response.login + "</a><br>");
    $("#userName").append(response.name);
    if(response.blog !== null) {
      $("#userInfo").append("<a href='" + response.blog + "' target='_blank'>Blog</a>");
    }
    $(".hideme").show();

  }).fail(function(error){
    console.log(error.responseJSON.message);
  });

  $.get('https://api.github.com/users/' + userName + '/repos?access_token=' + apiKey ).then(function(response){
    console.log(response);
    $('#userRepos').empty();
    response.forEach(function(repo){
      $('#userRepos').append('<a href="' + repo.html_url + '" class="list-group-item"  target="_blank"><h4 class="list-group-item-heading">' + repo.name + '</h4><p class="list-group-item-text">' + repo.description + '</p></a>');
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
