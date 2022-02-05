var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown')

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})

var getHobby = function() {
  var queryString = document.location.search;
    var hobby = queryString.split("=")[1];
    if (hobby) {
        getYoutubeResults(hobby);
    } else {
        document.location.replace("./index.html");
    }
}

var getYoutubeResults = function(hobby) {
  var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + hobby + "&type=video&maxResults=10&key=AIzaSyCIdf8UZgAIhrjvw1jNT-u3Wk9bAAOqdxU"

  fetch(apiUrl)
    .then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      })
    });
};

getHobby();