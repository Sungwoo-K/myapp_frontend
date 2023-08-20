// 모달 창
(() => {
  const list = document.querySelector(
    "main > section > article:nth-of-type(1) > section"
  );
  list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const modal = document.createElement("div");
      // 실제 데이터로 교체
      modal.innerHTML = /*html*/ `
			<section data-no="0">
				<article>
					<img src="./test.jpg" />
					<button>수정하기</button>
					<button>삭제하기</button>
				</article>
				<article>
					<section>이름</section>
					<section>
						<div>주종</div>
						<div>싱글몰트 위스키</div>
					</section>
					<section>
						<article>
							<div>Score</div>
							<div>4/5</div>
						</article>
						<article>
							<div>Alc by vol</div>
							<div>40%</div>
						</article>
					</section>
					<section>Tasting Notes</section>
					<section>
						<div>
							<span>Aroma</span>
							<span>-</span>
							<span>바닐라, 당밀, 토피, 스위트 발사믹</span>
						</div>
						<div>
							<span>Taste</span>
							<span>-</span>
							<span>초콜릿, 트러플, 오렌지 껍질, 건포도</span>
						</div>
						<div>
							<span>Finish</span>
							<span>-</span>
							<span>다크 초콜릿, 메이플 시럽, 데메라라 설탕</span>
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
