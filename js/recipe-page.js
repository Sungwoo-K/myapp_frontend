// 모달 창
(() => {
  const list = document.querySelector("main > section > article > section");
  list.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const modal = document.createElement("div");
      // 실제 데이터로 교체
      modal.innerHTML = /*html*/ `
			<section data-no="0">
        <article>
          <img src="../test.jpg" />
          <button>수정하기</button>
          <button>삭제하기</button>
        </article>
        <article>
          <section>이름</section>
          <section>
            <article>
              <div>Spirit</div>
              <div>보드카</div>
            </article>
            <article>
              <div>Alc by vol</div>
              <div>13%</div>
            </article>
          </section>
          <section>
            <span>재료 : 사과, 보드카, 사과쥬스, 시나몬가루</span>
          </section>
          <section>How to make</section>
          <section>
            <span>1. 컵에 얼음을 넣는다.</span>
            <span>2. 보드카 1.5oz를 넣는다.</span>
            <span>3. 사과주스를 가득 넣는다.</span>
            <span>4. 잘 저어준 뒤 시나몬 가루를 1티스푼 뿌린다.</span>
            <span>5. 사과를 반달모양으로 자른뒤 위에 장식해준다.</span>
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
