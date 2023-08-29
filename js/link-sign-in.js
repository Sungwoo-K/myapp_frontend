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
  const linkSignIn = document.querySelector(
    "header > section:last-of-type > article"
  );

  if (!getCookie("token")) {
    linkSignIn.innerHTML = /* html */ `
      <i class="fa-solid fa-circle-user"></i>
    `;
    linkSignIn.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/view/sign-in.html";
    });
  }

  if (getCookie("token")) {
    linkSignIn.style.fontSize = "15px";
    linkSignIn.innerHTML = /* html */ `
      <span>로그아웃</span>
    `;
    linkSignIn.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/index.html";
    });
  }
})();
