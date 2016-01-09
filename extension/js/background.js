    // var BG=this;

    // // var agenda_time = data["result"][i].time;

    // var callback=function(){
    //     // if (data["result"][i].type == 2) {
    //         //BG.message='この議題はあと３分で終了する予定です';
    //         //BG.pattern = 1;
    //     // } elseif {
    //         // BG.message='この議題を終了する時間です';
    //         // BG.pattern = 2;
    //     // }

    //     var notification = {
    //         type: "basic",
    //         title: "Primary Title",
    //         message: "Primary message to display",
    //         iconUrl: "url_to_small_icon"
    //     }

    //     // notification.show();
    // }

    // setTimeout(callback, 2000);



var opt2 = {
    type: 'basic',
    title: '議題終了！',
    message: '次の議題に進みましょう',
    iconUrl: "images/sample_128.png"
}
chrome.notifications.create("", opt2, function(id){  console.log("Last error:", chrome.runtime.lastError); });


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
    case "start":
        var opt1 = {
            type: 'basic',
            title: 'この議題はあと３分で終了する予定です',
            message: 'この議題はあと３分で終了する予定です',
            iconUrl: "images/sample_128.png"
        }
        chrome.notifications.create("", opt1, function(id){  console.log("Last error:", chrome.runtime.lastError); });
    break;
    default:
      console.log("Error: Unkown request.")
      console.log(request);
    }
  }
);
