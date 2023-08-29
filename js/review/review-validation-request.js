// input 값 검증
(() => {
  const form = document.querySelector("form");
  const button = form.querySelector("button");
  const name = form.querySelector("input");
  const img = form.querySelector("article:nth-of-type(2) input");
  const selectSpirit = document.querySelector("select:first-of-type");
  const selectOption = document.querySelector("select:last-of-type");
  const score = form.querySelector(
    "article:nth-of-type(4) section:nth-of-type(1) input"
  );
  const vol = form.querySelector(
    "article:nth-of-type(4) section:nth-of-type(2) input"
  );
  const aroma = form.querySelector("article:nth-of-type(5) input");
  const taste = form.querySelector("article:nth-of-type(6) input");
  const finish = form.querySelector("article:nth-of-type(7) input");

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
  async function requestFetch(query, image, spirit) {
    return new Promise(async (resolve) => {
      const requestMethod = query ? "PUT" : "POST";
      const response = await fetch(`http://127.0.0.1:8080/reviews${query}`, {
        method: `${requestMethod}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify({
          name: name.value,
          img: image,
          spirit: spirit,
          score: score.value,
          vol: vol.value,
          aroma: aroma.value,
          taste: taste.value,
          finish: finish.value,
        }),
      });

      if (response.status === 401) {
        resolve(response.status);
      }
      if (response.status === 201 || response.status === 200) {
        const result = await response.json();

        resolve(result.message);
      }
    });
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const selectSpiritValue =
      selectSpirit.options[selectSpirit.selectedIndex].value;
    const selectOptionValue =
      selectOption.options[selectOption.selectedIndex].value;
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

    if (urlQuery === "" && selectSpiritValue === "") {
      alert("종류를 선택해주세요.");
      return;
    }

    if (
      (urlQuery === "" || selectSpiritValue !== "") &&
      selectOptionValue === ""
    ) {
      alert("옵션을 선택해주세요.");
      return;
    }

    if (score.value === "") {
      alert("점수를 입력해주세요.");
      score.focus();
      return;
    }
    if (vol.value === "") {
      alert("도수를 입력해주세요.");
      vol.focus();
      return;
    }
    if (aroma.value === "") {
      alert("Aroma를 입력해주세요.");
      aroma.focus();
      return;
    }
    if (taste.value === "") {
      alert("taste를 입력해주세요.");
      taste.focus();
      return;
    }
    if (finish.value === "") {
      alert("Finish를 입력해주세요.");
      finish.focus();
      return;
    }

    if (!score.validity.valid || !vol.validity.valid) {
      alert("숫자를 다시 입력해주세요.");
      return;
    }

    const modifyImg = img.value ? await modifyFile(img.files[0]) : "";

    let combineSpiritAndOption = "";

    if (selectSpiritValue !== "") {
      if (selectOption.options[selectOption.selectedIndex].value === "notUse") {
        combineSpiritAndOption = `${
          selectSpirit.options[selectSpirit.selectedIndex].text
        }`;
      } else {
        combineSpiritAndOption = `${
          selectOption.options[selectOption.selectedIndex].text
        } ${selectSpirit.options[selectSpirit.selectedIndex].text}`;
      }
    }

    // 검증이 완료 되었으므로 이 값들을 백엔드 서버쪽으로 fetch를 통해 post로 데이터 입력

    const message = await requestFetch(
      urlQuery,
      modifyImg,
      combineSpiritAndOption
    );

    if (message === 401) {
      alert("수정할 권한이 없습니다.");
      return;
    }

    alert(message);

    form.submit();
  });
})();
