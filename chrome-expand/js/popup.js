$(function () {

	// 加载设置
	var defaultConfig = { color: 'white' }; // 默认配置
	chrome.storage.sync.get(defaultConfig, function (items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		console.log(tabs[0].id);
		chrome.tabs.sendMessage(tabs[0].id, { max: 'MAX' }, (response) => {
			console.log(response);
			let data = JSON.parse(response)
			document.getElementById('Max').innerText = data.MAX
			document.getElementById('Min').innerText = data.MIN

		})
	})
});

// 演示2种方式操作DOM

// 修改背景色
$('#update_bg_color').click(() => {
	executeScriptToCurrentTab('document.body.style.backgroundColor="red";')
});

// 修改字体大小
$('#update_font_size').click(() => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		console.log(tabs[0].id);
		chrome.tabs.sendMessage(tabs[0].id, { max: 'MAX' }, (response) => {
			console.log(response);
			let data = JSON.parse(response)
			document.getElementById('Max').innerText = data.MAX
			document.getElementById('Min').innerText = data.MIN

		})
	})
});