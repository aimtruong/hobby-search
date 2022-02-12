var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown');
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('hobby-input');
var savedHobbiesUlEl = document.getElementById('saved-hobbies');
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

var createDropdownEl = function(hobby) {
  var hobbyLi = document.createElement('li');
  hobbyLi.textContent = hobby;
  savedHobbiesUlEl.appendChild(hobbyLi);
}

var pushHobby = function(hobby) {
  hobbieHist = JSON.parse(localStorage.getItem('hobby'))
  if (hobbieHist === null) {

  } else {
    for (var i = 0; i < hobbieHist.length; i++) {
      hobbiesArr.push(hobbieHist[i]);
    }
  }

  if (hobbiesArr.includes(hobby)) {
    return
  } else {
    hobbiesArr.push(hobby);
  }
}

var saveHobby = function() {
  localStorage.setItem('hobby', JSON.stringify(hobbiesArr));
}

var loadPastHobbies = function() {
  hobbieHist = JSON.parse(localStorage.getItem('hobby'))
  if (hobbieHist === null) {

  } else {
    for (var i = 0; i < hobbieHist.length; i++) {
      createDropdownEl(hobbieHist[i]);
    }
  }
}

loadPastHobbies();