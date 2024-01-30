const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "792b6880efmsh80358c12cfc0dcep1e0ceajsn34f1a902dffd",
    "X-RapidAPI-Host": "twitter-api45.p.rapidapi.com",
  },
};

export default class API {
  static async getUser(username) {
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`,
      options
    );

    const data = await res.json();

    return data;
  }

  static async getData(endpoint) {
    const res = await fetch(
      `https://twitter-api45.p.rapidapi.com${endpoint}`,
      options
    );

    return await res.json();
  }
}
