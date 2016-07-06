$( document ).ready(function() {
	var accessToken = '53613d38ece31b0802994eae2a2096690206a5c3';
    $('.repo-fetcher').submit(function(event){
    	event.preventDefault();
    	var $username = $('input').val();
    	requestJSON($username);

    })

    function requestJSON($username) {
       $.ajax({
       	 type:'GET',
         //url: "https://api.github.com/users/" + $username +'/repos',
         url: `https://api.github.com/users/${$username}/repos?access_token=53613d38ece31b0802994eae2a2096690206a5c3`,
         dataType : "jsonp",
         'content-type':'appliation/json',
         complete: function(resp) {
         	console.log('in requestJSON~~~~~~~~~~~~1', resp.responseJSON.data)
         	passDataToExpress(resp.responseJSON.data);
         }
       });
     }

     function passDataToExpress(userData){
     	console.log('in A~~~~~~~userData', userData)
     	userData = userData.map(function(item){
     		console.log(item.id);
     		return {

     			id: item.id,
     			name: item.name,
     			username: item.owner.login,
     			stargazers: item.stargazers_count
     		}
     	})
     	console.log('my userData~~~~~~~~2', userData);
     	$.ajax({
     	  type:'POST',
     	  url: '/repos/import',
     	  data: JSON.stringify(userData),
     	  dataType : "json",
     	  contentType:'application/json',
     	  success: function(resp) {
     	  	console.log('in passDataToExpress~~~~~~~~~~~~3', resp);
     	  },
     	  error: function(err) {
     	  	console.error('error in passDataToExpress~~~~~~~~~4', err);
     	  }
     	});
     }

     function getTop25(){
     	$.ajax({
 		  type:'GET',
       	  url: '/repos',
       	  //data: JSON.stringify(userData),
       	  //dataType : "json",
       	  //contentType:'application/json',
       	  complete: function(resp) {
       	  	console.log('in getTop25~~~~~~~~~~~~5', resp);
       	  	showTop25(resp.responseJSON);
       	  }
     })
 	}

 	function showTop25(arr){

 		arr.forEach(function(repo){
 			var $entry = $('<tr></tr>')
 			var $entryUsername = $('<td></td>').addClass('highlight').text(repo.username).appendTo($entry);
 			var $link = $(`<a href=http://www.github.com/${repo.username}/${repo.name} target= _blank /></a>`).append('<span class="play"></span>').text(repo.name);
 			var $entryRepoName = $('<td></td>').append($link)

 			$entryRepoName.appendTo($entry);
 			var $entryStargazers = $('<td></td>').text(repo.stargazers).appendTo($entry);

 			$entry.appendTo('tbody');
 		})
 	}
 	
     getTop25();

});