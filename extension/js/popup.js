$(function() {
	$.getJSON("https://sheetsu.com/apis/04fbd25d" , function(data) {
		var title = $("#title");
		var agenda = $("#agenda");
		var member = $("#member");

		var len = data["result"].length;

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				title.append($("<li>").attr("class",data["result"][i].id).text("[" + data["result"][i].date +"]"+ data["result"][i].title));
			}
		}
		setInterval( function(){
			// 現在日時
			//var date = new Date();
			// 現在時刻
			//var time = new Date( getTime ).toLocaleTimeString();
			//var hour = date.getHours();
			//var min = date.getMinutes();

			var timestmp = parseInt( (new Date().getTime() - (new Date()).getTimezoneOffset()*60*1000)/ 1000);
			var end_time = parseInt( (new Date( data["result"][0].date +"/"+ data["result"][0].end +":00")).getTime()/ 1000);

			//var end_date = new Date();
			//何故か6時間くらいずれる
			$("#time").text(new Date((end_time - timestmp)*1000).toLocaleTimeString());

		}, 1000);

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				var result_id = data["result"][i].id;
			}
			if (data["result"][i].type == 2 && data["result"][i].agenda != null) {
				agenda.append($("<li>").attr({"class":result_id}).text(data["result"][i].agenda));
			}
		}

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				var result_id = data["result"][i].id;
			}
			if (data["result"][i].type == 3) {
				member.append($("<li>").attr({"class":result_id}).text(data["result"][i].name));
			}
		}

	});

});