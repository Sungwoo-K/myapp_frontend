(() => {
  window.addEventListener("DOMContentLoaded", async () => {
    const nameInput = document.querySelector(
      "form > section > article:nth-of-type(1) > input"
    );
    const scoreInput = document.querySelector(
      "form > section > article:nth-of-type(4) > section:nth-of-type(1) > input"
    );
    const volInput = document.querySelector(
      "form > section > article:nth-of-type(4) > section:nth-of-type(2) > input"
    );
    const aromaInput = document.querySelector(
      "form > section > article:nth-of-type(5) > input"
    );
    const tasteInput = document.querySelector(
      "form > section > article:nth-of-type(6) > input"
    );
    const finishInput = document.querySelector(
      "form > section > article:nth-of-type(7) > input"
    );

    const query = window.location.search;
    const response = await fetch(`http://127.0.0.1:8080/reviews${query}`);
    const result = await response.json();
    nameInput.value = result.name;
    scoreInput.value = result.score;
    volInput.value = result.vol;
    aromaInput.value = result.aroma;
    tasteInput.value = result.taste;
    finishInput.value = result.finish;
  });
})();

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

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const selectSpiritValue =
      selectSpirit.options[selectSpirit.selectedIndex].value;
    const selectOptionValue =
      selectOption.options[selectOption.selectedIndex].value;
    if (name.value === "") {
      alert("이름을 입력해주세요.");
      name.focus();
      return;
    }

    if (img.value === "") {
      alert("사진을 선택해주세요.");
      return;
    }
    if (selectSpiritValue === "") {
      alert("종류를 선택해주세요.");
      return;
    }

    if (selectOptionValue === "none") {
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

    const modifyImg = await modifyFile(img.files[0]);

    let combineSpiritAndOption = "";

    if (selectOption.options[selectOption.selectedIndex].value === "notUse") {
      combineSpiritAndOption = `${
        selectSpirit.options[selectSpirit.selectedIndex].text
      }`;
    } else {
      combineSpiritAndOption = `${
        selectOption.options[selectOption.selectedIndex].text
      } ${selectSpirit.options[selectSpirit.selectedIndex].text}`;
    }
    console.log(window.location.search);
    // 검증이 완료 되었으므로 이 값들을 백엔드 서버쪽으로 fetch를 통해 post로 데이터 입력
    const query = window.location.search;
    const response = await fetch(`http://127.0.0.1:8080/reviews${query}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        img: modifyImg,
        spirit: combineSpiritAndOption,
        score: score.value,
        vol: vol.value,
        aroma: aroma.value,
        taste: taste.value,
        finish: finish.value,
      }),
    });

    const result = await response.json();

    const { message } = result;

    alert(message);

    return (window.location.href = "http://127.0.0.1:5500");
  });
})();
