/*切换布局*/
// 按钮切换事件
function change() {
	var content = document.getElementById('content'),
		content2 = document.getElementById('content2');
	if(content.style.display === 'none') {
		content.style.display = 'block';
		content2.style.display = 'none';
	} else {
		content2.style.display = 'block';
		content.style.display = 'none';
	}
}