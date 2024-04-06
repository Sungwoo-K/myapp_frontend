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
      window.location.href = "/view/sign-in.html";
    });
  }

  if (getCookie("token")) {
    linkSignIn.style.fontSize = "15px";
    linkSignIn.innerHTML = /* html */ `
      <span>로그아웃</span>
    `;
    linkSignIn.addEventListener("click", () => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=www.woohyo.store; path=/;";
      window.location.href = "/index.html";
    });
  }
})();
