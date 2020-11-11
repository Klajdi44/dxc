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
  if (form.checkValidity()) {
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
  const companySpan = document.querySelector('.company');
  const jobSpan = document.querySelector('.job');
  const countrySpan = document.querySelector('.country');
  const consentSpan = document.querySelector('.consent');
  const nameIsValid = form.elements.full_name.checkValidity();
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
    emailSpan.textContent = 'Enter a valid email'
    emailSpan.classList.add('not-valid');

  } else {
    emailSpan.classList.remove('not-valid');
    emailSpan.textContent = '  e.g. johndoe@company.com';
  }

  if (!companyIsValid) {
    form.elements.company.focus();
    companySpan.textContent = 'Enter a valid company'
    companySpan.classList.add('not-valid');

  } else {
    companySpan.classList.remove('not-valid');
    companySpan.textContent = 'e.g. Project Manager'
      ;
  }
  if (!jobTitleIsValid) {
    form.elements.job_title.focus();
    jobSpan.textContent = 'Enter your job title'
    jobSpan.classList.add('not-valid');

  } else {
    jobSpan.classList.remove('not-valid');
    jobSpan.textContent = 'e.g. Project Manager';
  }
  if (!countryIsValid) {
    form.elements.country.focus();
    countrySpan.textContent = 'Select a country to proceed'
    countrySpan.classList.add('not-valid');

  } else {
    countrySpan.classList.remove('not-valid');
    countrySpan.textContent = 'What is your country of residence?';
  }
  if (!consentIsValid) {
    form.elements.consent.reportValidity();
    consentSpan.classList.add('not-valid');

  } else {
    countrySpan.classList.remove('not-valid');
  }
}
