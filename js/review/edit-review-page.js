(() => {
  window.addEventListener("load", async () => {
    const form = document.querySelector("form");
    const name = form.querySelector("input");
    const score = form.querySelector(
      "article:nth-of-type(4) section:nth-of-type(1) input"
    );
    const vol = form.querySelector(
      "article:nth-of-type(4) section:nth-of-type(2) input"
    );
    const aroma = form.querySelector("article:nth-of-type(5) input");
    const taste = form.querySelector("article:nth-of-type(6) input");
    const finish = form.querySelector("article:nth-of-type(7) input");
    const query = window.location.search;
    const response = await fetch(
      `https://www.woohyo.store/api/reviews/edit${query}`,
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

    name.value = result.name;
    score.value = result.score;
    vol.value = result.vol;
    aroma.value = result.aroma;
    taste.value = result.taste;
    finish.value = result.finish;
  });
})();
