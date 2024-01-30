import API from "./api.js";
import { setLocal } from "./helpers.js";

const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameWarn: document.querySelector(".name-warning"),
  passWarn: document.querySelector(".pass-warning"),
};

const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$";

const checkValues = (name, pass) => {
  let isPassError = false;
  let isNameError = false;

  if (!name.trim()) {
    isNameError = true;
    authEle.nameWarn.style.visibility = "visible";
    authEle.nameWarn.innerHTML = "<p>Lütfen isim giriniz</p>";
  } else {
    isNameError = false;
    authEle.nameWarn.style.visibility = "hidden";
  }

  if (!pass.trim()) {
    isPassError = true;
    authEle.passWarn.style.visibility = "visible";
    authEle.passWarn.innerHTML = "<p>Lütfen şifre giriniz</p>";
  } else if (pass.length < 8) {
    isPassError = "true";
    authEle.passWarn.style.visibility = "visible";
    authEle.passWarn.innerHTML = "<p>Şifre en az 8 haneli olmalı</p>";
  } else if (!pass.match(regex)) {
    isPassError = "true";
    authEle.passWarn.style.visibility = "visible";
    authEle.passWarn.innerHTML = "<p>Şifreniz yeterince güçlü değil</p>";
  } else {
    isNameError = false;
    authEle.passWarn.style.visibility = "hidden";
  }

  if (isNameError || isPassError) {
    return false;
  } else {
    return true;
  }
};

authEle.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  if (checkValues(name, pass)) {
    API.getUser(name)
      .then((data) => {
        if (data.status === "error") {
          authEle.nameWarn.style.visibility = "visible";
          authEle.nameWarn.innerHTML = "<p>Kullanıcı bulunamadı</p>";
        } else {
          setLocal("user", data);
          location = "/";
        }
      })
      .catch((err) => console.log(err));
  }
});
