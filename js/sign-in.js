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
  if (getCookie("token")) {
    alert("이미 로그인하셨습니다.");
    history.back();
  }
})();

(() => {
  const signUpBtn = document.querySelector("form section:last-of-type button");

  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/view/sign-up.html";
  });
})();

(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("err")) {
    history.replaceState(null, null, "http://localhost:5500/view/sign-in.html");
    alert("인증정보가 잘못되었습니다.");
  }
})();
