$(function () {
	// 加载设置
	var defaultConfig = { color: 'white' }; // 默认配置
	chrome.storage.sync.get(defaultConfig, function (items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));

	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, { max: 'MAX' }, (response) => {
			let {Max,Min} = JSON.parse(response)
			document.getElementById('MaxPrice').innerText = Max.price
			document.getElementById('MinPrice').innerText = Min.price
			document.querySelector('.MaxImage').src = Max.image
			document.querySelector('.MinImage').src = Min.image
			document.querySelector('.MaxProductName').innerText = Max.title
			document.querySelector('.MinProductName').innerText = Min.title
		})
	})
});
