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
  const imageList = [
    "./image/cocktail1.jpg",
    "./image/cocktail2.jpg",
    "./image/whiskey1.jpg",
    "./image/whiskey2.jpg",
  ];

  const image = document.querySelector("img");

  image.src = imageList[Math.floor(Math.random() * imageList.length)];
})();

(() => {
  const btnSection = document.querySelector("body section:last-of-type");
  if (!getCookie("token")) {
    btnSection.innerHTML = /* html */ `
    <a href="/view/sign-in.html">SIGN IN</a>
    <a href="/view/review-page.html">ENTER</a>
    `;
  }

  if (getCookie("token")) {
    btnSection.innerHTML = /* html */ `
    <a href="/view/review-page.html">ENTER</a>
    `;
  }
})();
