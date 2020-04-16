export default (message) => {
  document.body.innerHTML += `<div class="error"> ${message} <a onclick="this.parentElement.remove().remove()" class="close-btn" ><i class="fas fa-times"></i></a></div>
  `;
}