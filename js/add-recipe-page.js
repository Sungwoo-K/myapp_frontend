(() => {
  const plusBtn = document.querySelector(
    "body > main > form > section > button:nth-of-type(1)"
  );

  const minusBtn = document.querySelector(
    "body > main > form > section > button:nth-of-type(2)"
  );

  const howToMakeList = document.querySelector(
    "body > main > form > section:nth-of-type(2) > article:nth-of-type(1)"
  );

  const stepList = {
    2: "Second-step",
    3: "Third-step",
    4: "Fourth-step",
    5: "Fifth-step",
    6: "Sixth-step",
    7: "Seventh-step",
  };

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nextStep = howToMakeList.querySelectorAll("section").length + 1;
    if (nextStep === 8) {
      return;
    }
    const section = document.createElement("section");
    section.innerHTML = /*html*/ `
		<input type="text" placeholder=${stepList[nextStep]} />
		<div></div>
		`;
    howToMakeList.append(section);
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (howToMakeList.querySelectorAll("section").length === 1) {
      return;
    }
    howToMakeList
      .querySelectorAll("section")
      [howToMakeList.querySelectorAll("section").length - 1].remove();
  });
})();
