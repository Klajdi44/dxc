'use strict'

window.addEventListener('load', start);

function start(){
  const btn = document.querySelector('button').textContent = 'Download'

if(localStorage.getItem('form-submitted-before') === 'true'){
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
    .then(res => res.json())
    .then(data => console.log(data));
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const form = document.querySelector('form');

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
    post(data);

    setTimeout(() => {
      location.assign('/Asset/asset.html');
    }, 2000);

    localStorageFn()
  }
});


function localStorageFn() {
  localStorage.setItem('form-submitted-before', true);
  const btn = document.querySelector('button').textContent = 'Success'
}

