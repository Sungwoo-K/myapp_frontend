let currentPage = 0;
let isFirstPage;
let isLastPage;
let windowState = "";
let pageSize;
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
async function getPageList(page, searchKey, searchValue) {
  if (window.innerWidth < 1120) {
    if (window.innerHeight > 780) {
      pageSize = 4;
    } else {
      pageSize = 2;
    }
  } else if (1120 <= window.innerWidth && window.innerWidth < 1420) {
    if (window.innerHeight > 780) {
      pageSize = 6;
    } else {
      pageSize = 3;
    }
  } else if (window.innerWidth >= 1420) {
    if (window.innerHeight > 780) {
      pageSize = 8;
    } else {
      pageSize = 4;
    }
  }
  if (searchKey && searchValue) {
    url = `http://127.0.0.1:8080/recipes/paging/search?page=${page}&size=${pageSize}&${searchKey}=${searchValue}`;
  } else {
    url = `http://127.0.0.1:8080/recipes/paging?page=${page}&size=${pageSize}`;
  }
  const response = await fetch(url);
  const result = await response.json();

  const listUpstairsSection = document.querySelector(
    "main > section > article:nth-of-type(2) > section:nth-of-type(1)"
  );
  const listDownstairsSection = document.querySelector(
    "main > section > article:nth-of-type(2) > section:nth-of-type(2)"
  );
  listUpstairsSection.innerHTML = "";
  listDownstairsSection.innerHTML = "";

  if (window.innerHeight > 780) {
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
  } else {
    for (let item of result.content) {
      listUpstairsSection.append(createAlcObject(item.no, item.img));
    }
  }
  const contents = document.querySelectorAll(
    "main > section > article:nth-of-type(2) section div"
  );
  setTimeout(() => {
    for (let item of contents) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }
  }, 100);

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

(() => {
  window.addEventListener("resize", () => {
    if (
      window.innerWidth < 1120 &&
      window.innerHeight > 780 &&
      windowState !== "below1120Line2"
    ) {
      currentPage = 0;
      windowState = "below1120Line2";
      getPageList(0);
      return;
    }
    if (
      window.innerWidth < 1120 &&
      window.innerHeight <= 780 &&
      windowState !== "below1120Line1"
    ) {
      currentPage = 0;
      windowState = "below1120Line1";
      getPageList(0);
      return;
    }
    if (
      1120 <= window.innerWidth &&
      window.innerWidth < 1420 &&
      window.innerHeight > 780 &&
      windowState !== "below1420Line2"
    ) {
      currentPage = 0;
      windowState = "below1420Line2";
      getPageList(0);
      return;
    }
    if (
      1120 <= window.innerWidth &&
      window.innerWidth < 1420 &&
      window.innerHeight <= 780 &&
      windowState !== "below1420Line1"
    ) {
      currentPage = 0;
      windowState = "below1420Line1";
      getPageList(0);
      return;
    }
    if (
      window.innerWidth >= 1420 &&
      window.innerHeight > 780 &&
      windowState !== "above1420Line2"
    ) {
      currentPage = 0;
      windowState = "above1420Line2";
      getPageList(0);
      return;
    }
    if (
      window.innerWidth >= 1420 &&
      window.innerHeight <= 780 &&
      windowState !== "above1420Line1"
    ) {
      currentPage = 0;
      windowState = "above1420Line1";
      getPageList(0);
      return;
    }
  });
})();

// 첫 창 list 불러오기
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1120) {
      windowState = "below1120";
      getPageList(0);
      return;
    }
    if (window.innerWidth < 1420) {
      windowState = "below1420";
      getPageList(0);
      return;
    }
    windowState = "above1420";
    getPageList(0);
  });
})();

// Search
(() => {
  const form = document.querySelector("form");
  const input = form.querySelector("input");
  const select = form.querySelector("select");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const option = select.options[select.selectedIndex].value;
    const inputValue = input.value;
    if (option === "vol" && isNaN(+inputValue)) {
      alert("숫자를 입력해주세요.");
      return;
    }
    getPageList(0, option, inputValue);
  });
})();

// 모달 창
(() => {
  const lists = document.querySelectorAll("main > section > article > section");
  lists.forEach((list) =>
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

        const removeDataBtn = document.querySelector(
          "body > div > section > article:nth-of-type(1) > button:nth-of-type(2)"
        );
        removeBtn.addEventListener("click", () => {
          removeBtn.closest("div").remove();
        });

        removeDataBtn.addEventListener("click", async () => {
          const no = removeBtn.closest("section").dataset.no;
          const responce = await fetch(`http://127.0.0.1:8080/recipes/${no}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          });

          if (responce.status === 401) {
            alert("삭제할 권한이 없습니다.");
            return;
          }

          if (responce.status === 404) {
            alert("존재하지 않는 게시물입니다.");
            return;
          }

          alert("게시물을 삭제했습니다.");
          window.location.reload();
        });
      }
    })
  );
})();
