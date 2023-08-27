(() => {
  const imageList = [
    "./image/cocktail1.jpg",
    "./image/cocktail2.jpg",
    "./image/whiskey1.jpg",
    "./image/whiskey2.jpg",
  ];

  const image = document.querySelector("img");

  image.src = imageList[Math.floor(Math.random() * imageList.length)];

  const login = document.querySelector(
    "body > section:last-of-type > button:first-of-type"
  );

  const enter = document.querySelector(
    "body > section:last-of-type > button:last-of-type"
  );

  login.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/view/login.html";
  });

  enter.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/view/review-page.html";
  });
})();
