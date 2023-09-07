//검색버튼 : 전적검색 상세로 이동
localStorage.setItem("apiKey", JSON.stringify("RGAPI-43bd65b5-9a40-4742-95be-db41cb75792d"));
var apiKey = "RGAPI-a7f606b2-f254-4c58-b68a-92b3a211cf8f"   // riot api키. 만료되면 바꿔줘야 됨
function onBtnSearch(){
   var username = $('#apply-name').val();

   var test;

   var name = $.ajax({  
      url: "https://kr.api.riotgames.com/tft/summoner/v1/summoners/by-name/" + username+"?api_key=" + apiKey ,
      method: "GET" ,
      success: function(data){
         console.log({ data });
         // name : 인게임 닉네임 
         // summonerLevel : 레벨
         // profileIconId : 아이콘 ID명
         // id : 암호화된 ID
         // puuid : 매치 정보를 갖고오기 위한 ID
         test =   {
          "name" : data.name ,
          "summonerLevel" : data.summonerLevel ,
          "profileIconId" : data.profileIconId ,
          "id" : data.id ,
          "puuid" : data.puuid 
         }

         localStorage.setItem("test", JSON.stringify(test));
      }
  });

}