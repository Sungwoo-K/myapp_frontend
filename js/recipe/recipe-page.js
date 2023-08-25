let currentPage = 0;
let pageSize = 8;
let isFirstPage;
let isLastPage;
const leftBtn = document.querySelector(
  "main > section > article:nth-of-type(1) > button"
);
const rightBtn = document.querySelector(
  "main > section > article:nth-of-type(3) > button"
);

// Html 객체 생성 기능
function createAlcObject(no, img) {
  const div = document.createElement("div");

  div.dataset.no = no;
  div.innerHTML = /*html*/ `
	<img src=${img} />
	<button>Detail</button>
	`;

  return div;
}

// Recipe span 생성
function createRecipe(num, value) {
  const span = document.createElement("span");

  span.innerHTML = /* html */ `
    ${+num + 1}. ${value}
  `;

  return span;
}

// Paging 시 버튼 유무상태
function activePagingBtn(firstPage, lastPage) {
  if (firstPage) {
    leftBtn.style.display = "none";
  } else {
    leftBtn.style.display = "inline-block";
  }

  if (lastPage) {
    rightBtn.style.display = "none";
  } else {
    rightBtn.style.display = "inline-block";
  }
}

// page에 따라 list를 갖고오는 기능
async function getPageList(page) {
  const response = await fetch(
    `http://127.0.0.1:8080/recipes/paging?page=${page}&size=${pageSize}`
  );
  const result = await response.json();

  const listUpstairsSection = document.querySelector(
    "main > section > article:nth-of-type(2) > section:nth-of-type(1)"
  );
  const listDownstairsSection = document.querySelector(
    "main > section > article:nth-of-type(2) > section:nth-of-type(2)"
  );
  listUpstairsSection.innerHTML = "";
  listDownstairsSection.innerHTML = "";

  for (i = 0; i < result.numberOfElements; i++) {
    if (i < pageSize / 2) {
      listUpstairsSection.append(
        createAlcObject(result.content[i].no, result.content[i].img)
      );
    }
    if (pageSize / 2 <= i) {
      listDownstairsSection.append(
        createAlcObject(result.content[i].no, result.content[i].img)
      );
    }
  }

  isFirstPage = result.first ? result.first : false;
  isLastPage = result.last ? result.last : false;
  activePagingBtn(isFirstPage, isLastPage);
}

// 버튼을 누를 때마다 page 넘기기
(() => {
  rightBtn.addEventListener("click", () => {
    const updatePage = currentPage + 1;
    getPageList(updatePage);
    currentPage = updatePage;
  });

  leftBtn.addEventListener("click", () => {
    const updatePage = currentPage - 1;
    getPageList(currentPage - 1);
    currentPage = updatePage;
  });
})();

// 첫 창 list 불러오기
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    getPageList(0);
  });
})();

// 모달 창
(() => {
  const list = document.querySelector("main > section > article > section");
  list.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const no = e.target.closest("div").dataset.no;
      const response = await fetch(`http://127.0.0.1:8080/recipes?no=${no}`);
      const result = await response.json();
      const modal = document.createElement("div");
      // 실제 데이터로 교체
      modal.innerHTML = /*html*/ `
			<section data-no="${result.no}">
        <article>
          <img src=${result.img} />
          <button><a href="./edit-recipe-page.html?no=${no}">수정하기</a></button>
          <button>삭제하기</button>
        </article>
        <article>
          <section>${result.name}</section>
          <section>
            <article>
              <div>Spirit</div>
              <div>${result.spirit}</div>
            </article>
            <article>
              <div>Alc by vol</div>
              <div>${result.vol}%</div>
            </article>
          </section>
          <section>
            <span>재료 : ${result.ingredients}</span>
          </section>
          <section>How to make</section>
          <section>
          </section>
          <button><i class="fa-solid fa-xmark"></i></button>
        </article>
      </section>
			`;

      document.body.prepend(modal);

      const recipeSection = document.querySelector(
        "body > div > section > article:nth-of-type(2) > section:last-of-type"
      );
      for (let prop in result.recipe) {
        recipeSection.append(createRecipe(prop, result.recipe[prop]));
      }
      setTimeout(() => {
        document.querySelector("body > div > section").style.opacity = "1";
      }, 100);
      const removeBtn = document.querySelector(
        "body > div > section > article:nth-of-type(2) > button"
      );
      removeBtn.addEventListener("click", () => {
        removeBtn.closest("div").remove();
      });
    }
  });
})();
