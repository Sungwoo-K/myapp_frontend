(() => {
  window.addEventListener("load", async () => {
    const form = document.querySelector("form");
    const name = form.querySelector(
      "section:nth-of-type(1) > article:nth-of-type(1) > input"
    );
    const vol = form.querySelector(
      "section:nth-of-type(1) > article:nth-of-type(4) > input"
    );
    const ingredients = form.querySelector(
      "section:nth-of-type(1) > article:nth-of-type(5) > input"
    );
    const howToMakeList = document.querySelector(
      "body > main > form > section:nth-of-type(2) > article:nth-of-type(1)"
    );

    const stepList = {
      2: "Second-step",
      3: "Third-step",
      4: "Fourth-step",
      5: "Fifth-step",
      6: "Sixth-step",
      7: "Seventh-step",
    };

    const query = window.location.search;
    const response = await fetch(
      `http://58.233.39.211:8001/recipes/edit${query}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );

    if (response.status === 401) {
      alert("게시물을 수정할 권한이 없습니다.");
      history.back();
      return;
    }

    const result = await response.json();

    // recipe 순서 갯수에 따라 input 입력 증가
    for (i = 2; i <= result.recipe.length; i++) {
      const section = document.createElement("section");
      section.innerHTML = /*html*/ `
      <input type="text" placeholder=${stepList[i]} maxlength="35" />
      <div></div>
      `;
      howToMakeList.append(section);
    }

    const recipes = form.querySelectorAll(
      "section:nth-of-type(2) > article:nth-of-type(1) input"
    );

    for (i = 0; i < result.recipe.length; i++) {
      recipes[i].value = result.recipe[i];
    }
    name.value = result.name;
    vol.value = result.vol;
    ingredients.value = result.ingredients;
  });
})();
