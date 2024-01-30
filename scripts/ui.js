export const ele = {
  user_name: document.querySelector("#user-name"),
  user_tag: document.querySelector("#user-tag"),
  pics: document.querySelectorAll("#profile-pic"),
  tweetsArea: document.querySelector(".tweet-area"),
  logoutBtn: document.querySelector("#logout-btn"),
  main: document.querySelector("main"),
  searchForm: document.querySelector("aside form"),
};

// kullanıcının bilgilerini ekrana basar

export const renderUserInfo = (user) => {
  //kullanıcı resimlerilerini ekrana bas
  ele.pics.forEach((img) => (img.src = user.avatar));

  ele.user_name.innerText = user.name;
  ele.user_tag.innerText = "@" + user.profile;
};

//tweet media içeriği

const getMedia = (media) => {
  if (!media) return "";
  if (media.photo) {
    return `<img src="${media.photo[0].media_url_https}" />`;
  }

  if (media.video) {
    return `<video controls src="${media.video[0].variants[0].url}"/>`;
  }
};

//data = tweetler al
//tweetler hangi elementin içine gidecek

export const renderTimeLine = (data, outlet, user) => {
  outlet.innerHTML = data.timeline
    .map(
      (tweet) => `
      
  <div class="tweet">
          <img id="user-img" src="${
            tweet[user] ? tweet[user].avatar : "images/defaultt.png"
          }" />

          <div class="body">
            <div class="user">

            ${
              tweet[user]
                ? `
              <a href="?page=user&q=${tweet[user].screen_name}">
              <img id="mobile-img" src="${
                tweet[user] ? tweet[user].avatar : "/images.defaultt.png"
              }" />

              <b>${tweet[user]?.name}</b>
              <p>@${tweet[user]?.screen_name}</p>
              <p>${moment(tweet.created_at).fromNow()}</p>
            </a>`
                : `
                
                <a href="#">
                <img id="mobile-img" src="images/defaultt.png" alt="" />

                <p>Gönderiyi yeniden yayınladı</p>
              </a>
                 `
            }
              
              <i class="bi bi-three-dots"></i>
            </div>
            <a href="?page=status&q=${tweet.tweet_id}" class="content">
              <p>
                ${tweet.text}
              </p>
              ${getMedia(tweet.media)}
            </a>
            <div class="buttons">
              <button>
                <i class="bi bi-chat"></i>
                <span>${tweet.replies}</span>
              </button>
              <button>
                <i class="bi bi-recycle"></i>
                <span>${tweet.retweets}</span>
              </button>
              <button>
                <i class="bi bi-heart"></i>
                <span>${tweet.favorites}</span>
              </button>
              <button>
                <i class="bi bi-bookmark"></i>
                <span>${tweet.bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
  `
    )
    .join(" ");
};

export const renderLoader = (outlet) => {
  outlet.innerHTML = `
  <div id="loader-wrapper"><div aria-live="assertive" role="alert" class="loader"></div></div>
`;
};

//detay sayfası loading i

export const renderDetailLoader = (text) => {
  ele.main.innerHTML = `
  <div class="nav">
    <i id="back-btn" class="bi bi-arrow-left"></i>
    <h4>${text}</h4>
  </div>

  <div id="loader-wrapper"><div aria-live="assertive" role="alert" class="loader"></div></div>
  `;
};

// ekrana tweet detayı basar

export const renderDetail = (tweet, user) => {
  console.log(tweet);
  const tweetDate = tweet.created_at.split("+0000").join(" ");
  ele.main.innerHTML = `
      <div class="nav">
        <i id="back-btn" class="bi bi-arrow-left"></i>
        <h4>Gönderi</h4>
      </div>

      <div class="tweet detail-tweet">
        <img id="user-img" src="${tweet.author.image}" alt="" />

        <div class="body">
          <div class="user">
            <a href="?page=user&q=${tweet[user.screen_name]}">
              <img id="mobile-img" src="${tweet.author.image}" alt="" />
              <b>${tweet.author.name}</b>
              <p>@${tweet.author.screen_name}</p>
            </a>
            <button>Takip Et</button>
          </div>
          <div class="content">
            <p>${tweet.text}</p>
            ${getMedia(tweet.media)}
          </div>

          <div class="info">
            <p>${tweetDate}</p>
            <p><span>${tweet.views}</span><span>Görüntülenme</span></p>
          </div>

          <div class="buttons">
            <button>
              <i class="bi bi-chat"></i>
              <span>${tweet.replies}</span>
            </button>
            <button>
              <i class="bi bi-recycle"></i>
              <span>${tweet.retweets}</span>
            </button>
            <button>
              <i class="bi bi-heart"></i>
              <span>${tweet.likes}</span>
            </button>
            <button>
              <i class="bi bi-bookmark"></i>
              <span>${tweet.bookmarks}</span>
            </button>
          </div>
        </div>
      </div>

      <form id="comment-form">
        <img
          src="${user.avatar}"
          alt=""
        />
        <input placeholder="Yanıtını Gönder.." type="text" />
        <button>Yanıtla</button>
      </form>
  `;
};

export const renderUser = (user) => {
  ele.main.innerHTML = `<div class="user-page">
  <div class="page-top">
    <div id="nav">
      <i id="back-btn" class="bi bi-arrow-left"></i>
      <div>
        <h3>${user.name}</h3>
        <p>
          <span>${Math.round(Math.random() * 3000)}</span>
          <span>Gönderi</span>
        </p>
      </div>
    </div>

    <div class="banner">
      <img
        src="${user.header_image}"
        alt=""
      />
      <img
        id="user-pp"
        src="${user.avatar}"
        alt=""
      />
    </div>

    <div class="buttons">
      <div class="icon">
        <i class="bi bi-three-dots"></i>
      </div>
      <div class="icon">
        <i class="bi bi-envelope"></i>
      </div>
      <div>
        <button>Takip Et</button>
      </div>
    </div>

    <div class="info">
      <h4>
        <span>${user.name}</span>
        ${user.blue_verified && '<i class="bi bi-patch-check-fill"></i>'}
        
      </h4>
      <p class="profile">${user.profile}</p>

      <p class="description">
        ${user.desc}
      </p>

      <div>
        <a href="#">
          <span>${user.friends}</span>
          <span>Takip Edilen</span>
        </a>
        <a href="#">
          <span>${user.sub_count}</span>
          <span>Takipçi</span>
        </a>
      </div>
    </div>

    <div class="radio-input">
      <label>
        <input
          value="value-1"
          name="value-radio"
          id="value-1"
          type="radio"
          checked=""
        />
        <span>Gönderiler</span>
      </label>
      <label>
        <input
          value="value-2"
          name="value-radio"
          id="value-2"
          type="radio"
        />
        <span>Yanıtlar</span>
      </label>
      <label>
        <input
          value="value-3"
          name="value-radio"
          id="value-3"
          type="radio"
        />
        <span>Medya</span>
      </label>
      <label>
        <input
          value="value-3"
          name="value-radio"
          id="value-3"
          type="radio"
        />
        <span>Beğeni</span>
      </label>
      <span class="selection"></span>
    </div>
  </div>

  <div class="page-bottom">
    <div id="loader-wrapper">
      <div aria-live="assertive" role="alert" class="loader"></div>
    </div>
  </div>
</div>`;
};
