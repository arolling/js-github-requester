var apiKey = require("./../.env").apiKey;

exports.getUser = function(userName) {
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response){
      console.log(response);
      $("#userName").html("User: <a href='" + response.html_url + "' target='_blank'>" + response.login + "</a><br>");
      $("#userName").append(response.name);
      $("#userInfo").append("<p>" + response.public_repos + " public repositories created</p>");
      if(response.blog !== null) {
        $("#userInfo").append("<a href='" + response.blog + "' target='_blank'>Blog</a>");
      }
      if(response.location !== null){
        $("#userInfo").append("<p>" + response.location + "</p>");
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
};

//jQuery22207870147797814768_1458336342444&_=1458336342445
