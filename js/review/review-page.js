let currentPage = 0;
let isFirstPage;
let isLastPage;
let url = "";
let windowState = "";
const leftBtn = document.querySelector(
  "main > section > article:nth-of-type(1) > section:nth-of-type(1) > button"
);
const rightBtn = document.querySelector(
  "main > section > article:nth-of-type(1) > section:nth-of-type(3) > button"
);

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

//html 객체 생성 기능
function createAlcObject(no, img) {
  const div = document.createElement("div");

  div.dataset.no = no;
  div.innerHTML = /*html*/ `
	<img src=${img} />
	<button>Detail</button>
	`;

  return div;
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
async function getPageList(page, pageSize, searchKey, searchValue) {
  if (searchKey && searchValue) {
    url = `http://127.0.0.1:8080/reviews/paging/search?page=${page}&size=${pageSize}&${searchKey}=${searchValue}`;
  } else {
    url = `http://127.0.0.1:8080/reviews/paging?page=${page}&size=${pageSize}`;
  }
  const response = await fetch(url);
  const result = await response.json();
  const listSection = document.querySelector(
    "main > section > article:nth-of-type(1) > section:nth-of-type(2)"
  );
  listSection.innerHTML = "";

  for (let item of result.content) {
    listSection.append(createAlcObject(item.no, item.img));
  }

  const contents = document.querySelectorAll(
    "main > section > article:first-of-type > section:nth-of-type(2) div"
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

//버튼을 누를 때마다 page 넘기기
(() => {
  rightBtn.addEventListener("click", () => {
    if (window.innerWidth < 1120) {
      const updatePage = currentPage + 1;
      getPageList(updatePage, 2);
      currentPage = updatePage;
      return;
    }
    if (window.innerWidth < 1400) {
      const updatePage = currentPage + 1;
      getPageList(updatePage, 3);
      currentPage = updatePage;
      return;
    }
    const updatePage = currentPage + 1;
    getPageList(updatePage, 4);
    currentPage = updatePage;
  });

  leftBtn.addEventListener("click", () => {
    if (window.innerWidth < 1120) {
      const updatePage = currentPage - 1;
      getPageList(currentPage - 1, 2);
      currentPage = updatePage;
      return;
    }
    if (window.innerWidth < 1400) {
      const updatePage = currentPage - 1;
      getPageList(currentPage - 1, 3);
      currentPage = updatePage;
      return;
    }
    const updatePage = currentPage - 1;
    getPageList(currentPage - 1, 4);
    currentPage = updatePage;
  });
})();

(() => {
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1120 && windowState !== "below1120") {
      currentPage = 0;
      windowState = "below1120";
      getPageList(0, 2);
      return;
    }
    if (
      1120 <= window.innerWidth &&
      window.innerWidth < 1400 &&
      windowState !== "below1400"
    ) {
      currentPage = 0;
      windowState = "below1400";
      getPageList(0, 3);
      return;
    }
    if (window.innerWidth >= 1400 && windowState !== "above1400") {
      currentPage = 0;
      windowState = "above1400";
      getPageList(0, 4);
    }
  });
})();

// 첫 창 list 불러오기
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 1120) {
      getPageList(0, 2);
      return;
    }
    if (window.innerWidth < 1400) {
      getPageList(0, 3);
      return;
    }
    getPageList(0, 4);
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
    if (window.innerWidth < 1400) {
      getPageList(0, 3, option, inputValue);
      return;
    }
    getPageList(0, 4, option, inputValue);
  });
})();

// Detail 모달 창
(() => {
  const list = document.querySelector(
    "main > section > article:nth-of-type(1) > section:nth-of-type(2)"
  );
  list.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const no = e.target.closest("div").dataset.no;
      const response = await fetch(`http://127.0.0.1:8080/reviews?no=${no}`);
      const result = await response.json();
      const modal = document.createElement("div");
      modal.innerHTML = /*html*/ `
			<section data-no="${result.no}">
				<article>
					<img src=${result.img} />
					<button><a href="/view/edit-review-page.html?no=${no}">수정하기</a></button>
					<button>삭제하기</button>
				</article>
				<article>
					<section>${result.name}</section>
					<section>
						<div>주종</div>
						<div>${result.spirit}</div>
					</section>
					<section>
						<article>
							<div>Score</div>
							<div>${result.score}/5</div>
						</article>
						<article>
							<div>Alc by vol</div>
							<div>${result.vol}%</div>
						</article>
					</section>
					<section>Tasting Notes</section>
					<section>
						<div>
							<span>Aroma</span>
							<span>-</span>
							<span>${result.aroma}</span>
						</div>
						<div>
							<span>Taste</span>
							<span>-</span>
							<span>${result.taste}</span>
						</div>
						<div>
							<span>Finish</span>
							<span>-</span>
							<span>${result.finish}</span>
						</div>
					</section>
					<button><i class="fa-solid fa-xmark"></i></button>
				</article>
			</section>
			`;
      document.body.prepend(modal);
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
        const responce = await fetch(`http://127.0.0.1:8080/reviews/${no}`, {
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
  });
})();
