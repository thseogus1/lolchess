//검색버튼 : 전적검색 상세로 이동
var apiKey = "RGAPI-a7f606b2-f254-4c58-b68a-92b3a211cf8f"; // riot api키. 만료되면 바꿔줘야 됨
function onBtnSearch() {
    var username = $('#apply-name').val();
    var matchCount = 20;
    var test;
    var name = $.ajax({
        url: "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + username + "?api_key=" + apiKey,
        method: "GET",
        success: function (data) {
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
            localStorage.setItem("test", JSON.stringify(test));
            $.ajax({
                url: "https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/" + data.id + "?api_key=" + apiKey,
                method: "GET",
                success: function (tierData) {
                    console.log({ tierData: tierData });
                    // tier 티어
                    // rank 세부티어 
                    // leaguePoints 점수
                    // wins 승리 수
                    // losses 패배 수
                }
            });
            $.ajax({
                url: "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/" + data.puuid + "/ids?start=0&count=" + matchCount + "&api_key=" + apiKey,
                method: "GET",
                success: function (puuidData) {
                    console.log({ puuidData: puuidData });
                    for (var i = 0; i < matchCount; i++)
                        $.ajax({
                            url: "https://asia.api.riotgames.com/tft/match/v1/matches/" + puuidData[i] + "?api_key=" + apiKey,
                            method: "GET",
                            success: function (matchData) {
                                console.log({ matchData: matchData });
                            }
                        });
                }
            });
        }
    });
    console.log(localStorage.getItem("test"));
}