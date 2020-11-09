'use strict'

const url = 'https://frontend2020-6cfe.restdb.io/rest/dxc-project';
const key = '5f96ac774b77c1637d147e05';

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

document.querySelector('form').addEventListener('submit', (e)=>{
e.preventDefault();

const form = document.querySelector('form').elements;

const data = {
full_name: form.full_name.value,
email: form.email.value,
company: form.company.value,
job_title:form.job_title.value,
country: form.country.value,
consent: form.consent.checked};

post(data);

});

