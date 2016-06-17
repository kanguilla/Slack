function main(){
  //test
  var request = UrlFetchApp.fetch("http://magiccards.info/query?q=malakir+soothsayer&v=card&s=cname");
  request = request.toString();
  var sub = request.substring(request.toString().indexOf("http://magiccards.info/scans/en"));
  sub = sub.substring(0, sub.indexOf("\""));
  Logger.log(sub);
}


function doPost(e) {
  
  if(typeof e !== 'undefined'){
    
    var proto = e.parameter.text;
    var spl = proto.split(" ");
    proto = spl.join("+");
    proto = proto.replace("’", "\%27");
    
    
    var request = UrlFetchApp.fetch("http://magiccards.info/query?q="+proto+"&v=card&s=cname");
    request = request.toString();
    var sub = request.substring(request.toString().indexOf("http://magiccards.info/scans/en"));
    sub = sub.substring(0, sub.indexOf("\""));
    Logger.log(sub);
  
    var prop =  PropertiesService.getScriptProperties().getProperties();
  
    var payload = {
    
      "username" : "Card Fetcher",
      "icon_emoji": ":game_die:",
      "attachments": JSON.stringify([
      
        {
            "text": "Type */mtg <cardname>* to summon me!",
			"image_url" : sub,
            "mrkdwn_in": ["text"]
        }
      ])
    };
    var slackApp = SlackApp.create(prop.slackToken);
    slackApp.postMessage(e.parameter.channel_id, "", payload);
  }
  return(ContentService.createTextOutput(""));
}