//select에 따른 반응형 options
(() => {
  const selectSpirit = document.querySelector("select:first-of-type");
  const selectOption = document.querySelector("select:last-of-type");

  selectSpirit.addEventListener("change", () => {
    let selectSpiritValue =
      selectSpirit.options[selectSpirit.selectedIndex].value;

    if (selectSpiritValue === "") {
      selectOption.innerHTML = /*html*/ `
    <option value="">--Please select a spirit first--</option>`;
      return;
    }
    if (
      selectSpiritValue === "vodka" ||
      selectSpiritValue === "tequilla" ||
      selectSpiritValue === "liqueur" ||
      selectSpiritValue === "gin"
    ) {
      selectOption.innerHTML = /*html*/ `
    <option>--------------------------------------</option>`;
      return;
    }

    if (selectSpiritValue === "scotchWhisky") {
      selectOption.innerHTML = /*html*/ `
    <option value="none">--Please choose an option--</option>
    <option>블렌디드</option>
    <option>싱글몰트</option>
    <option>블렌디드몰트</option>
    <option>싱글그레인</option>
    <option>블렌디드그레인</option>`;
      return;
    }

    if (selectSpiritValue === "americanWhiskey") {
      selectOption.innerHTML = /*html*/ `
    <option value="none">--Please choose an option--</option>
    <option>버번</option>
    <option>테네시</option>
    <option>라이</option>`;
      return;
    }

    if (selectSpiritValue === "brandy") {
      selectOption.innerHTML = /*html*/ `
    <option value="none">--Please choose an option--</option>
    <option>꼬냑</option>
    <option>아르마냑</option>`;
      return;
    }

    if (selectSpiritValue === "rum") {
      selectOption.innerHTML = /*html*/ `
    <option value="none">--Please choose an option--</option>
    <option>화이트</option>
    <option>골드</option>
    <option>다크</option>`;
      return;
    }
  });
})();
