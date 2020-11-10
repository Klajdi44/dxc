'use strict'

window.addEventListener('load', start);

function start() {
  document.querySelector('form').setAttribute('novalidate', true);

  if (localStorage.getItem('form-submitted-before') === 'true') {
    location.assign('/Asset/asset.html');
  }
}

const url = 'https://frontend2020-6cfe.restdb.io/rest/dxc-project';
const key = '5f96ac774b77c1637d147e05';
document.querySelector('form').setAttribute('novalidate', true);


//post new data
function post(data) {
  const postData = JSON.stringify(data);
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then((response) => {
      location.assign('/Asset/asset.html');
      return response.json();
    })
    .then(data => console.log(data));
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = document.querySelector('form');
  validation(form);

  const data = {
    full_name: form.elements.full_name.value,
    email: form.elements.email.value,
    company: form.elements.company.value,
    job_title: form.elements.job_title.value,
    country: form.elements.country.value,
    consent: form.elements.consent.checked
  };

  //if form is valid do this
  if (form.reportValidity()) {

    post(data)
    localStorageFn();

  }

});


function localStorageFn() {
  localStorage.setItem('form-submitted-before', true);
  const btn = document.querySelector('button').innerHTML = ` Success <i class="fas fa-circle-notch fa-spin"></i>
  `
}

function validation(form) {
  const nameSpan = document.querySelector('.name')
  const emailSpan = document.querySelector('.email');
  const nameIsValid = form.elements.full_name.reportValidity();
  const emailIsValid = form.elements.email.checkValidity();
  const companyIsValid = form.elements.company.checkValidity();
  const jobTitleIsValid = form.elements.job_title.checkValidity();
  const countryIsValid = form.elements.country.checkValidity();
  const consentIsValid = form.elements.consent.checkValidity();

  if (!nameIsValid) {
    form.elements.full_name.focus();
    nameSpan.textContent = 'Your name should be at least 2 characters long!';
    nameSpan.classList.add('not-valid');

  } else {
    nameSpan.classList.remove('not-valid');
    nameSpan.textContent = '  Enter your first and last name';
  }

  if (!emailIsValid) {
    form.elements.email.focus();
    emailSpan.textContent = 'Please include at least an "@" sign!'
    emailSpan.classList.add('not-valid');

  } else {
    emailSpan.classList.remove('not-valid');
    emailSpan.textContent = '  e.g. johndoe@company.com';
  }

}
