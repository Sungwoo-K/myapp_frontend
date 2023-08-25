//input 값 검증
(() => {
  const form = document.querySelector("form");
  const button = form.querySelector(
    "section:nth-of-type(2) > article:nth-of-type(2) > button"
  );
  const name = form.querySelector(
    "section:nth-of-type(1) > article:nth-of-type(1) > input"
  );
  const img = form.querySelector(
    "section:nth-of-type(1) > article:nth-of-type(2) > input"
  );
  const selectSpirit = document.querySelector("select");
  const vol = form.querySelector(
    "section:nth-of-type(1) > article:nth-of-type(4) > input"
  );
  const ingredients = form.querySelector(
    "section:nth-of-type(1) > article:nth-of-type(5) > input"
  );

  //imagefile base64로 인코딩
  async function modifyFile(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        resolve(e.target.result);
      });

      reader.addEventListener("error", (e) => {
        reject("이미지파일 인코딩 에러가 발생하였습니다.");
      });

      reader.readAsDataURL(image);
    });
  }

  //query에 따라서 fetch요청을 달리하는 기능
  async function requestFetch(query, image, recipes) {
    return new Promise(async (resolve) => {
      const requestMethod = query ? "PUT" : "POST";
      const response = await fetch(`http://127.0.0.1:8080/recipes${query}`, {
        method: `${requestMethod}`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          img: image,
          spirit: selectSpirit.options[selectSpirit.selectedIndex].text,
          vol: vol.value,
          ingredients: ingredients.value,
          recipe: recipes,
        }),
      });

      const result = await response.json();

      resolve(result.message);
    });
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const selectSpiritValue =
      selectSpirit.options[selectSpirit.selectedIndex].value;
    const recipeValues = form.querySelectorAll(
      "section:nth-of-type(2) > article:nth-of-type(1) input"
    );
    const urlQuery = window.location.search;

    if (name.value === "") {
      alert("이름을 입력해주세요.");
      name.focus();
      return;
    }

    if (urlQuery === "" && img.value === "") {
      alert("사진을 선택해주세요.");
      return;
    }

    if (selectSpiritValue === "") {
      alert("종류를 선택해주세요.");
      return;
    }

    if (vol.value === "") {
      alert("도수를 입력해주세요.");
      vol.focus();
      return;
    }
    if (ingredients.value === "") {
      alert("재료를 입력해주세요.");
      ingredients.focus();
      return;
    }
    for (let item of recipeValues) {
      if (item.value === "") {
        alert("Recipe를 입력해주세요.");
        item.focus();
        return;
      }
    }

    if (!vol.validity.valid) {
      alert("숫자를 다시 입력해주세요.");
      return;
    }
    const modifyImg = img.value ? await modifyFile(img.files[0]) : "";
    const recipeValuesArray = Array.from(recipeValues).map(
      (input) => input.value
    );

    const message = await requestFetch(urlQuery, modifyImg, recipeValuesArray);

    alert(message);

    return (window.location.href =
      "http://127.0.0.1:5500/view/recipe-page.html");
  });
})();
