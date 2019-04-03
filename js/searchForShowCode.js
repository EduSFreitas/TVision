//Jordan Skosnick
//API KEY = ||||||||||||

//Creates an on submit listener for the search bar on the index page.
$(document).ready(function() {
  $('#searchForm').on('submit', function(e) {
    var keyword = $('#searchText').val();
    getMultipleShowInfo(keyword);
    e.preventDefault();
  });

  $('#watched').click(function(m) {
    console.log("TEST");
  });
});

function getMultipleShowInfo(keyword) {
	axios.get('http://www.omdbapi.com?s='+keyword+'&type=series&apikey=9999999') //Calls the API with the api key
	.then( function(res) {
		var showArr = res.data.Search;
		var output = '';
		for(i = 0; i < showArr.length; i++) { //loops through the results and puts the show names in an array.
			output += `
          <div class="col-4">
            <div class="well text-center">
              <img src="${showArr[i].Poster}" alt="Image not found" onerror="this.src='image-not-found.gif';" height="450" width="350">
              <h5>${showArr[i].Title}</h5>
              <a onclick="setShowID('${showArr[i].imdbID}')" class="btn btn-primary" href="showdetails.html">Show Details</a>`;
    if(sessionStorage.getItem('username')) {
      output +=`<a id="watched" class="btn btn-primary" href="#">👁</a>
            </div>
          </div>`;
    }
    else {
      output += ` </div>
          </div>`;
    }
		}
        $('#shows').html(output);
	})
}
//onclick="watchedShow('${showArr[i].imdbID}','${showArr[i].Title}')"

function setShowID(id){
	sessionStorage.setItem('SHOW ID', id);
}

function watchedShow(id, showName){
  var username = sessionStorage.getItem('username'); // change later so you have to be logged in
  if(callDB.setWatchedShow(id, showName, username)){
    alert("You watched this show.");
  }
  else {
    alert("You have already watched this show.");
  }
}
