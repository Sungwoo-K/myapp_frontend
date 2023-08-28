(() => {
  const button = document.querySelector("button");

  button.addEventListener("click", async (e) => {
    const email = document.querySelector(
      "form > section > article:nth-of-type(2) > input"
    );
    const password = document.querySelector(
      "form > section > article:nth-of-type(3) > input"
    );
    const confirmPassword = document.querySelector(
      "form > section > article:nth-of-type(4) > input"
    );
    const nickname = document.querySelector(
      "form > section > article:nth-of-type(5) > input"
    );
    e.preventDefault();
    if (!email.validity.valid) {
      alert("이메일을 제대로 입력해주세요.");
      email.focus();
      return;
    }

    if (email.value === "") {
      alert("이메일을 입력해주세요.");
      email.focus();
      return;
    }
    if (password.value === "" || confirmPassword.value === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (nickname.value === "") {
      alert("별명을 입력해주세요.");
      email.focus();
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const responce = await fetch("http://127.0.0.1:8080/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      }),
    });

    const result = await responce.json();

    if (responce.status === 409) {
      alert(result.message);
      return;
    }

    alert(result.message);

    window.location.href = "http://127.0.0.1:5500/view/sign-in.html";
  });
})();
