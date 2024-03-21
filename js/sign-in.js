function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

(() => {
  const signUpBtn = document.querySelector("form section:last-of-type button");

  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/view/sign-up.html";
  });
})();

(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("err")) {
    history.replaceState(null, null, "/view/sign-in.html");
    alert("인증정보가 잘못되었습니다.");
  }
})();
