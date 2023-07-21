//크롤링: 캐릭터 정보 갖고오기 및 유니온 증가
function onBtnApplyClick(): void{
    console.log("크롤링");

    const axios = require("axios");
    const cheerio = require("cheerio");
    const log = console.log;

    const getHtml = async () => {
        try {
            // 닉네임 받아오기 
            return await axios.get("https://maple.gg/u/%EC%A7%84%EB%AC%BC%ED%8F%AD%ED%83%84");
        } catch (error) {
            console.error(error);
        }
      };
    console.log(getHtml);

}
// div.app
// div.user-profile
// ul > user-summary-item li