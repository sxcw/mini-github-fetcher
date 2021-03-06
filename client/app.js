$( document ).ready(function() {
    $('.repo-fetcher').submit(function(event){
    	event.preventDefault();
    	var $username = $('input').val();
    	requestJSON($username);

    })

    function requestJSON($username) {
       $.ajax({
       	 type:'GET',
         url: `https://api.github.com/users/${$username}/repos`,
         dataType : "jsonp",
         'content-type':'appliation/json',
         complete: function(resp) {
         	console.log('in requestJSON~~~~~~~~~~~~1', resp.responseJSON.data)
         	passDataToExpress(resp.responseJSON.data);
         }
       });
     }

     function passDataToExpress(userData){
     	userData = userData.map(function(item){
     		console.log(item.id);
     		return {
     			id: item.id,
     			name: item.name,
     			username: item.owner.login,
     			stargazers: item.stargazers_count
     		}
     	})
     	$.ajax({
     	  type:'POST',
     	  url: '/repos/import',
     	  data: JSON.stringify(userData),
     	  dataType : "json",
     	  contentType:'application/json',
     	  success: function(resp) {
     	  	console.log(resp);
     	  },
     	  error: function(err) {
     	  	console.error(err);
     	  }
     	});
     }

     function getTop25(){
     	$.ajax({
 		  type:'GET',
       	  url: '/repos',
       	  complete: function(resp) {
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
