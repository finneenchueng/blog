var moment = require('moment');
module.exports = {
	getCurrentDateTimeString(dateTimeString) {
		var d = new Date().getTime();
		if (dateTimeString != undefined && typeof dateTimeString === 'string') {
			d = new Date(dateTimeString).getTime();
		}
		return moment(d).format("YYYY-MM-DD HH:mm:ss").toString();
	},
	getCurrentDate: function() {
		var d = new Date();
		var arr = [];
		arr.push(d.getFullYear());
		arr.push(d.getMonth() + 1);
		arr.push(d.getDate());
		arr.push(d.getHours());
		arr.push(d.getMinutes());
		arr.push(d.getSeconds());
		arr.push(d.getMilliseconds());
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if (item < 10) {
				arr[i] = '0' + item;
			}
		}
		var d_str = arr.join("");
		return {
			key:arr[6],
			dateContent:d_str
		};
	}

}