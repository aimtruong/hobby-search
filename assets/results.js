var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown')

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})

// function to put search into each api functions
var getHobby = function() {
  var queryString = document.location.search;
    var hobby = queryString.split("=")[1];
    if (hobby) {
        getYoutubeResults(hobby);
        //getRedditResults(hobby);
        getWikiResults(hobby);
        saveHobby(hobby);
    } else {
        document.location.replace("./index.html");
    }
}

// YOUTUBE SECTION
   //get API
var getYoutubeResults = function(hobby) {
  var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + hobby + "-tutorial" + "&type=video&maxResults=30&key=AIzaSyCIdf8UZgAIhrjvw1jNT-u3Wk9bAAOqdxU"
  
  fetch(apiUrl)
  .then(function(response) {
    response.json().then(function(data) {
      console.log("youtube");
      console.log(data);
      displayYTresults(data);
    })
  });
};

// variables for displayYTresults
var ytContainer = document.querySelector(".yt-container");

var ytCard = [];
var ytTitle = [];

// displays YT videos on site
var displayYTresults = function(data){
  for(var i = 0; i <= 5 /*data.items.length*/; i++){
    ytCard[i] = document.createElement("a");
      ytCard[i].classList = "yt-card col s2 card";
        var newImage = data.items[i].snippet.thumbnails.medium.url;
        ytCard[i].style.backgroundImage = "url(" + newImage + ")";

    ytTitle[i] = document.createElement("p");
      ytTitle[i].textContent = data.items[i].snippet.title;
      ytTitle[i].classList.add("crdtitle");

      ytCard[i].href ="https://www.youtube.com/watch?v=" + data.items[i].id.videoId;
      ytCard[i].setAttribute("target", "_blank");
      
      ytCard[i].addEventListener("click", function(){
    });
      
      ytContainer.appendChild(ytCard[i]);
      ytCard[i].appendChild(ytTitle[i]);
  }

};

/*
// REDDIT
  // get Reddit API
var getRedditResults = function(hobby) {
  var apiUrl = "https://www.reddit.com/search.json?q=" + hobby;

  fetch(apiUrl)
    .then(function(response) {
      response.json().then(function(data) {
        console.log("reddit");
        console.log(data);
      })
    })
};
*/

// WIKIPEDIA
  // get Wiki API
var getWikiResults = function(hobby) {
  var url = "https://en.wikipedia.org/w/api.php"; 
  
  var params = {
      action: "query",
      list: "search",
      srsearch: hobby,
      srlimit: "10",
      format: "json"
  };
  
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
  
  fetch(url)
      .then(function(response) {
        response.json().then(function(data) {
          console.log("wiki");
          console.log(data);
          displayWikiresults(data);
        })
      })
};

// variables for displayWikiresults
var wikiContainer = document.querySelector(".wiki-container");

var wikiCard = [];
var wikiTitle = [];
var wikiSnippet = [];

// displays WikiPedia pages on site
var displayWikiresults = function(data){
  for(var i = 0; i <= 5 /*data.query.search.length*/; i++){
    wikiCard[i] = document.createElement("a");
    wikiCard[i].classList = "wiki-card col s2 card";

    wikiTitle[i] = document.createElement("p");
      wikiTitle[i].textContent = data.query.search[i].title;
      wikiTitle[i].classList.add("crdtitle", "wikititle");

    wikiSnippet[i] = document.createElement("p");
      wikiSnippet[i].innerHTML = data.query.search[i].snippet + "...";
      wikiSnippet[i].classList.add("wikiSnippet");

    wikiCard[i].href = "https://en.wikipedia.org/wiki/" + data.query.search[i].title;
    wikiCard[i].setAttribute("target", "_blank");

    wikiCard[i].addEventListener("click", function(){
    });
      
    wikiContainer.appendChild(wikiCard[i]);
    wikiCard[i].appendChild(wikiTitle[i]);
    wikiCard[i].appendChild(wikiSnippet[i]);
  }

};

// variables for previous searches
var savedHobbies = document.querySelector(".dropdown-options");
var Hobby = [];

// save to local storage
//var saveHobby = function(hobby){
 // var hobbyName = hobby;

  //  localStorage.setItem("Hobby", JSON.stringify(hobbyName));
  //  JSON.parse(localStorage.getItem(Hobby));
    
  //  Hobby = document.createElement("li");
  //  Hobby.textContent = hobbyName;

  //  savedHobbies.appendChild(Hobby);
//};


getHobby();