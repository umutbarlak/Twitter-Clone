import { getLocal } from "./scripts/helpers.js";
import {
  ele,
  renderUserInfo,
  renderTimeLine,
  renderLoader,
  renderDetailLoader,
  renderDetail,
  renderUser,
} from "./scripts/ui.js";
import API from "./scripts/api.js";

//local storegeden veriyi al

const user = getLocal("user");

//kullanıcının hangi sayfayı gösreceği orta alana bas

const router = () => {
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const query = params.get("q");

  // page değerine göre arayüze karar verme
  switch (page) {
    //tweet datay
    case "status":
      //loadingi ekrana basma
      renderDetailLoader("Gönderi");

      //tweetin detay sayfasını al
      API.getData(`/tweet.php?id=${query}`).then((data) =>
        renderDetail(data, user)
      );
      //ekrana datay sayfasını bas

      break;

    // arama sayfa
    case "search":
      renderDetailLoader(`${query} için sonuçlar`);

      API.getData(`/search.php?query=${query}&search_type=top`).then((data) =>
        renderTimeLine(data, ele.main, "user_info")
      );

      break;

    //kullanıcı detay sayfası
    case "user":
      renderDetailLoader(query);

      API.getUser(query).then((user) => {
        renderUser(user);
        const outlet = document.querySelector(".page-bottom");
        API.getData(`/timeline.php?screenname=${query}`).then((data) =>
          renderTimeLine(data, outlet, "author")
        );
      });
      break;

    //varsayılan alarak anasayfayı bas
    default:
      renderLoader(ele.tweetsArea);

      API.getData(`/timeline.php?screenname=${user.profile}`).then((data) =>
        renderTimeLine(data, ele.tweetsArea, "author")
      );
  }
};

// sayfa yüklendiğinde bilgileri al

document.addEventListener("DOMContentLoaded", () => {
  if (user) {
    //kullanıcı varsa oturum açtıysa
    renderUserInfo(user);
  } else {
    location = "./auth.html";
    // oturum açmadıyda login e yönlendir
  }

  router();

  // 1) kullanıcının twitlerini al

  API.getData(`/timeline.php?screenname=${user.profile}`).then((data) =>
    renderTimeLine(data, ele.tweetsArea)
  );
  //2) ekrana bas
});

//çıkış butonuna tıklanınca oturumu kapat
ele.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");

  location = "/auth.html";
});

ele.main.addEventListener("click", (e) => {
  if (e.target.id === "back-btn") {
    history.back();
  }
});

//arama formunun gönderilmesini izle

ele.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //form verisi
  const query = e.target[0].value;
  console.log(query);

  //sayfayı değiş

  location = `?page=search&q=${query}`;
});
