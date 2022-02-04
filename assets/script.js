var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown')

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})
