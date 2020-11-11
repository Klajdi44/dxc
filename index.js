const formLink = document.querySelector('.form-link');
if (localStorage.getItem('form-submitted-before') === 'true') {
  formLink.href = './Asset/asset.html';
}