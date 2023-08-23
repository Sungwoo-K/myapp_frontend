let page = 0;
let page_size = 4;

function createAlcObject(no, img) {
  const div = document.createElement("div");

  div.dataset.no = no;
  div.innerHTML = /*html*/ `
	<img src=${img} />
	<button>Detail</button>
	`;

  return div;
}

async function getPageList(page) {
  const response = await fetch(
    `http://127.0.0.1:8080/reviews/paging?page=${page}&size=${page_size}`
  );
  const result = await response.json();

  const listSection = document.querySelector(
    "main > section > article:nth-of-type(1) > section"
  );
  listSection.innerHTML = "";

  for (let item of result.content) {
    listSection.append(createAlcObject(item.no, item.img));
  }
}

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    getPageList(0);
  });
})();
// 모달 창
(() => {
  const list = document.querySelector(
    "main > section > article:nth-of-type(1) > section"
  );
  list.addEventListener("click", async (e) => {
    if (e.target.tagName === "BUTTON") {
      const no = e.target.closest("div").dataset.no;
      const response = await fetch(`http://127.0.0.1:8080/reviews?no=${no}`);
      const result = await response.json();
      const modal = document.createElement("div");
      // 실제 데이터로 교체
      modal.innerHTML = /*html*/ `
			<section data-no="${result.no}">
				<article>
					<img src=${result.img} />
					<button><a href="./view/edit-review-page.html?no=${no}">수정하기</a></button>
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

      removeBtn.addEventListener("click", () => {
        removeBtn.closest("div").remove();
      });
    }
  });
})();
