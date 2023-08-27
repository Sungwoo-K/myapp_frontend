(() => {
  const signUpBtn = document.querySelector("form section:last-of-type button");

  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/view/sign-up.html";
  });
})();
