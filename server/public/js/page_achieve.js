var achieve = {

	resizeHeader:function(){
		var _nav_bar=$("#header").find(".navbar-collapse:eq(0)"), _wid=_nav_bar.outerWidth(),_box=$("#header").find(".title-box"),_len=_box.length,_cell_wid=_box.eq(0).outerWidth(true);
		if(_wid>768){
			var cell_pad=parseInt((_wid-_len*_cell_wid)/2);
			_nav_bar.css({"padding":"0 0 0 "+cell_pad+"px"});
		}
	}
}
$(function() {
	$(window).resize(function(){
		achieve.resizeHeader();
	});
	achieve.resizeHeader();
});