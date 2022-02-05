var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown');
var searchFormEl = document.getElementById('search-form');
var searchInputEl = document.getElementById('hobby-input');

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})

var submitFormHandler = function() {
  event.preventDefault();
  var hobby = searchInputEl.value.trim();
  console.log(hobby);
  window.location.replace("./results.html?hobby=" + hobby);
}

searchFormEl.addEventListener('submit', submitFormHandler);