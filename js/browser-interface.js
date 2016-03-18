var getRepos = require("./../js/getRepos.js").getRepos;
var getUser = require("./../js/getUser.js").getUser;


$(document).ready(function(){
  var userName;

  $('#enterName').submit(function(e) {
    e.preventDefault();
    userName = $('#gitName').val();
    $('#gitName').val('');
    $("#userInfo").empty();
    $('#userRepos').empty();
    getUser(userName);
    getRepos(userName, 1);
    $(".hideme").show();
  });

  $('.paging').click(function(event){
    event.preventDefault();
    var value = $(this).attr("value");
    console.log(value);
    $(this).attr("value", "");
    $('#userRepos').empty();
    getRepos(userName, value);
  });

});
