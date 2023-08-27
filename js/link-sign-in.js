(() => {
  const linkSignIn = document.querySelector(
    "header > section:last-of-type > article"
  );

  linkSignIn.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/view/sign-in.html";
  });
})();
