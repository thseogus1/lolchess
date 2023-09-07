var test = JSON.parse(localStorage.getItem("test"));
var apiKey = "RGAPI-a7f606b2-f254-4c58-b68a-92b3a211cf8f";
var element = document.getElementById("profile-icon");
var matchCount = 1;
element.innerHTML = "<img src='http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/" + test.profileIconId + ".png'>";
element = document.getElementById("player-name");
element.innerHTML = test.name + "<span>KR</span>";
$.ajax({
    url: "https://kr.api.riotgames.com/tft/league/v1/entries/by-summoner/" + test.id + "?api_key=" + apiKey,
    method: "GET",
    success: function (tierData) {
        element = document.getElementById("profile-tier-info");
        var lower = (tierData[0].tier);
        // tier 티어
        // rank 세부티어 
        // leaguePoints 점수
        // wins 승리 수
        // losses 패배 수
        element.innerHTML = "<img src='https://cdn.lolchess.gg/images/lol/tier/2022/" + lower.toLowerCase() + ".png'>";
        element.innerHTML += "<div class='profile-summary-div'><div>티어</div><span class='profile-summary-tier " + (tierData[0].tier) + "'>" +
            (tierData[0].tier) + " " + (tierData[0].rank) + "</span><span class='profile-summary-lp'>" + (tierData[0].leaguePoints) + "LP</span></div>";
        element = document.getElementById("profile-odds");
        element.innerHTML = "<div class='profile-wins-summary'><span class='profile-wins'>승리</span><span class='profile-wins-value'>" + (tierData[0].wins) + "</span></div>";
        element.innerHTML += "<div class='profile-loss-summary'><span class='profile-loss'></span>패배<span class='profile-loss-value'>" + (tierData[0].losses) + "</span></div>";
        console.log({ tierData: tierData });
    }
});
$.ajax({
    url: "https://asia.api.riotgames.com/tft/match/v1/matches/by-puuid/" + test.puuid + "/ids?start=0&count=" + matchCount + "&api_key=" + apiKey,
    method: "GET",
    success: function (puuidData) {
        for (var i = 0; i < matchCount; i++){
            $.ajax({
                url: "https://asia.api.riotgames.com/tft/match/v1/matches/" + puuidData[i] + "?api_key=" + apiKey,
                method: "GET",
                success: function (matchData) {
                    console.log(matchData[i]);
                    for(var l = 0 ; l< 8; l++){
                        
                        $.ajax({
                            url: "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/" + matchData.info.participants[l].puuid + "?&api_key=" + apiKey,
                            method: "GET",
                            success: function (username){
                                element = document.getElementById("profile-match-username");
                                element.innerHTML += "<div><img src='http://ddragon.leagueoflegends.com/cdn/13.16.1/img/profileicon/" + username.profileIconId + ".png'>" + username.name + "</div>"; 
                                //console.log(username);
                            }
                        });
                    }
                    for (var j = 0; j < 8; j++) {
                        if (matchData.info.participants[j].puuid == test.puuid) {
                            element = document.getElementById("profile-match-history-rank");
                            element.innerHTML += "#" + matchData.info.participants[j].placement;

                            element = document.getElementById("profile-match-history-img");
                            for (var k = 0; k < 15; k++) {
                                var rarity = matchData.info.participants[j].units[k].rarity;

                                var champion = matchData.info.participants[j].units[k].character_id;
                                var str = champion.substring(5);
                                str = str.toLowerCase();
                                str = str.charAt(0).toUpperCase() + str.slice(1);

                                var itemname;
                                var item;
                                var count1=0;

                                champ = "<div><div class='unit-star'><img src = 'https://cdn.lolchess.gg/images/tft/stars/cost" + 
                                (rarity > 3 ? (rarity < 5 ? 
                                    rarity : rarity - 1): 
                                    rarity + 1 ) 
                                + "_stars" + matchData.info.participants[j].units[k].tier + 
                                ".png'><div class='unit-image'><img src = 'https://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/" + str + 
                                ".png'></div>";
                       

                                
                                var items="";
                                for(var m=0; m<3; m++){
                                    itemname = [matchData.info.participants[j].units[k].itemNames[m]];
                                    item = itemname.join();
                                    item = item.substring(9);

                                    // if(item.length < 1 ){
                                        
                                    // }

                                    if(item.length > 0){
                                        items += "<div class='item-img'><img src='https://ap.tft.tools/img/items/" 
                                        + item + ".jpg?w=13'></div>";
                                    }
                                }

                                element.innerHTML += champ + items + "</div></div>";
                            }
                        }
                    }
                }
            });
        }
    }
});
