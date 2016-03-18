var getRepos = require("./../js/getRepos.js").getRepos;

$(document).ready(function(){
  $('#enterName').submit(function(e) {
    e.preventDefault();
    var userName = $('#gitName').val();
    $('#gitName').val('');
    $("#userInfo").empty();
    $('#userRepos').empty();
    getRepos(userName);
    $(".hideme").show();
  });


});
