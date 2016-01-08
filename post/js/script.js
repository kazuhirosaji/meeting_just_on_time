var loop = 0;
var MAX_LOOP = 15;

// jQuery snippet for changing HTML from into JSON
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$('#submit').click(function(e) {
    // prevent default submiting form
    e.preventDefault();
    sendToSpreadSheet();
});

var sendToSpreadSheet = function() {    
    // serialize data to JSON
    if (loop == 15) {
        return;
    }
	var data = $('#row' + loop).serializeFormJSON();
    if (data.title == "" || data.agenda == "" || data.name == "") {
        console.log(data);
        loop += 1;
        sendToSpreadSheet(); 
        return false;
    }
    console.log(data);
    console.log(loop);

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
            loop += 1;
            sendToSpreadSheet();
        },
        
        // handling error response
        error: function(data) {
        	console.log(data);
        }
    });

    return false;
};