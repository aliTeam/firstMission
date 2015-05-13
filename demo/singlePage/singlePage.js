$(function() {
	//滚动条滚动
	$(window).scroll(function() {
		var top = $(document).scrollTop();
		var menu = $('#menu');
		// *+2 这样的效率要比$('#content .item')要高，查找id的速度要比class的要高很多
		var items = $('#content').find('.item');
		//当前楼层的id
		var currentId = '';
		items.each(function() {
			var t = $(this);
			var itemTop = t.offset().top;
			// *+5 为了用户体验itemTop-200
			if (top > itemTop-200 ) {
				currentId='#' + t.attr('id');
			} else {
			// *+3 不满足条件跳出循环，避免多余的循环，提升效率
				return false;
			}	
		});
		var currentLink = $('#menu').find('.current');
		// *+4 若当前链接id为正确的，不必做if里面的操作
		if (currentLink && currentLink.attr('href') != currentId) {
			currentLink.removeClass('current');
			menu.find('[href='+currentId+']').addClass('current');
		}
	});
})