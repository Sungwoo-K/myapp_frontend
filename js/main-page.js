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
