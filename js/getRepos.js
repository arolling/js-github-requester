var apiKey = require("./../.env").apiKey;

exports.getRepos = function(){
  $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response){
    console.log(response);
    $("#userName").text(response.name);
    $("#userInfo").html("<a href='" + response.blog + "' target='_blank'>Blog</a>");
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
