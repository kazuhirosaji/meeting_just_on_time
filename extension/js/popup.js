$(function() {
	$.getJSON("https://sheetsu.com/apis/04fbd25d" , function(data) {
		var title = $("#title");
		var agenda = $("#agenda");
		var member = $("#member");
		var start_time = '00:00';

		var len = data["result"].length;

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				title.append($("<li>").attr("class",data["result"][i].id).text("[" + data["result"][i].date +"]"+ data["result"][i].title));
			}
		}
		setInterval( function(){

			var timestmp = parseInt( (new Date().getTime() - (new Date()).getTimezoneOffset()*60*1000)/ 1000);
			var end_time = parseInt( (new Date( data["result"][0].date +"/"+ data["result"][0].end +":00")).getTime()/ 1000);

			//var end_date = new Date();
			//何故か6時間くらいずれる
			$("#time").text(new Date((end_time - timestmp)*1000).toLocaleTimeString());

		}, 1000);

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				var result_id = data["result"][i].id;
				start_time = data["result"][i].start;
				start_times = start_time.split(":");
			}
			if (data["result"][i].type == 2 && data["result"][i].agenda != null) {
				agenda.append($("<li>").attr({"class":result_id}).text(data["result"][i].agenda));
			}
		}

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 1) {
				var result_id = data["result"][i].id;
			}
		}

		var attender_ids = [];
		var attend_indexes = {};

		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 4) {
				id = data["result"][i].name_id;
				attender_ids.push(id);
				attend_indexes[id] = i;
			}
		}
		for(var i = 0; i < len; i++) {
			if (data["result"][i].type == 3) {
				member.append($("<li>").attr({"class":result_id}).attr({"id":"name" + i}).text(data["result"][i].name));
				if ($.inArray("name" + i, attender_ids) >= 0) {
					$("#name" + i).append('<span style="margin-left:20px;">'+ data["result"][attend_indexes["name" + i]].attend + ' 参加</span>');
				} else {
					msg = checkDelay(start_times);
					$("#name" + i).append('<span style="margin-left:20px;">' + msg + '</span>');

					$("#name" + i).on("click", function(e){
						sendToSpreadSheet($(this));
					    messages = $(this).context.innerText.split(" ");

						var date = new Date();
						now_hour = date.getHours();
						now_min = date.getMinutes();
						if (now_min < 10) {
							now_min = '0' + now_min;
						}
						$(this).context.innerText = messages[0] + " " + now_hour + ":" + now_min + " 参加";
					});;
				}
			}
		}

	});

});

var checkDelay = function(start_times) {
	var date = new Date();
	now_hour = date.getHours();
	now_min = date.getMinutes();


	start_time = Number(start_times[0]) * 60 + Number(start_times[1]);
	now = Number(now_hour) * 60 + Number(now_min);

	console.log(start_times);
	console.log(start_time);
	console.log(now);

	delay = now - start_time;
	if (delay > 0) {
		return " " + delay + '分の遅れです';	
	} else {
		return 'まだ参加していません';
	}
}

var sendToSpreadSheet = function(li) {
	var date = new Date();
	attend_hour = date.getHours();
	attend_min = date.getMinutes();
	nowtime = attend_hour + ":" + attend_min;

	data = {type: "4", name: li.text(), attend: nowtime, name_id: li.attr('id')};
	console.log(data);

    $.ajax({
        url: 'https://sheetsu.com/apis/04fbd25d',
        data: data,
        dataType: 'json',
        type: 'POST',

        // place for handling successful response
        // showing (redirecting to) something like /thanks.html
        //page could be a good idea
        success: function(data) {
            console.log(data);
        },

        // handling error response
        error: function(data) {
            console.log(data);
        }
    });

    return false;
};
