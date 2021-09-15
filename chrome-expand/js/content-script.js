// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.max == 'MAX') {
		let doc = document.getElementsByClassName("collection-list__product-tile")
			let moneyList = [...doc].map((item, index) => {
			let price = $(item).find(".product-tile__price--sale").text()
			let title = $(item).find(".product-tile__product-title").text()
			let sort = +price.replace(/[$USD]/g,"")
			let image = $(item).find("img.product-tile__image--primary")[0]? $(item).find("img.product-tile__image--primary")[0]['currentSrc']:""
				return {price,title,sort,image}
			})
		moneyList.sort((a,b)=>a.sort-b.sort)
		sendResponse(JSON.stringify({Min:moneyList[0],Max:moneyList[moneyList.length-1]}))
	}
	else {
		sendResponse('我收到你的消息了：' + JSON.stringify(request));
	}
});

