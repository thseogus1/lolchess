//검색버튼 : 전적검색 상세로 이동
var apiKey = "RGAPI-f32d289f-c663-4288-8804-f37d34f1dd30"; // riot api키. 만료되면 바꿔줘야 됨
function onBtnSearch() {
    
    var username = $('#apply-name').val();
    var test;
    var name = $.ajax({
        url: "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + username + "?api_key=" + apiKey,
        method: "GET",
        success: function (data) {
            sessionStorage.setItem("test", JSON.stringify(test));
            console.log({ data: data });
            // name : 인게임 닉네임 
            // summonerLevel : 레벨
            // profileIconId : 아이콘 ID명
            // id : 암호화된 ID
            // puuid : 매치 정보를 갖고오기 위한 ID
            test = {
                "name": data.name,
                "summonerLevel": data.summonerLevel,
                "profileIconId": data.profileIconId,
                "id": data.id,
                "puuid": data.puuid
            };
            sessionStorage.setItem("test", JSON.stringify(test));
            location.href = 'search.html';

        }
    });
}