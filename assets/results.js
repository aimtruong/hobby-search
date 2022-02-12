var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown')
var savedHobbiesUlEl = document.getElementById('saved-hobbies');
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('hobby-input');
hobbiesArr = [];

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})

savedHobbiesUlEl.addEventListener('click', function() {
  var pastHobby = event.target.textContent
  window.location.replace("./results.html?hobby=" + pastHobby);
});

var submitFormHandler = function(event) {
  event.preventDefault();
  var hobby = searchInputEl.value.trim();
  pushHobby(hobby);
  saveHobby();
  window.location.replace("./results.html?hobby=" + hobby);
}

searchFormEl.addEventListener('submit', submitFormHandler);

// function to put search into each api functions
var getHobby = function() {
  var queryString = document.location.search;
    var hobby = queryString.split("=")[1];
    if (hobby) {
        getYoutubeResults(hobby);
        //getRedditResults(hobby);
        getWikiResults(hobby);
    } else {
        document.location.replace("./index.html");
    }
}

// YOUTUBE SECTION
  // get API
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
        // saveHobbyRed(hobby, data);
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
          // saveHobbyWiki(hobby, data);
        })
      })
};
 
// variables for displayWikiresults
var wikiContainer = document.querySelector(".wiki-container");

var wikiCard = [];
var wikiTitle = [];
var wikiSnippet = [];

// displays YT videos on site
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

var loadPastHobbies = function(){
  hobbies = JSON.parse(localStorage.getItem('hobby'));

  if(hobbies == null) {
    return
  } else {
    for (var i = 0; i < hobbies.length; i++) {
      hobbiesArr.push(hobbies[i]);
      createDropdownEl(hobbies[i]);
    }
  }
}

var pushHobby = function(hobby) {
  hobbiesArr.push(hobby);
}

var saveHobby = function() {
  localStorage.setItem('hobby', JSON.stringify(hobbiesArr));
}

var createDropdownEl = function(hobby) {
  var hobbyLi = document.createElement('li');
  hobbyLi.textContent = hobby;
  savedHobbiesUlEl.appendChild(hobbyLi);
}

getHobby();
loadPastHobbies()