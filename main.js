(function(){
	const mainInputWrapper = document.querySelector('#main-input');
	


	mainInputWrapper.querySelector('input').addEventListener('keyup',inputHandler);


	function inputHandler(event){
		const inputValue = event.target.value;

		if(event.keyCode === 13){
			pipe(
				goToWebPage,
				parseURL
				)(inputValue)

		}
	}



	function pipe(){
		const args = [].slice.call(arguments).reverse();
		return function(data){
			args.reduce((acc,item)=>{
			return item(acc);
			},data);
		}
	}


	function parseURL(inputString){
		const protocolRegex = /^(http:\/\/|https:\/\/)/;
		const domainRegex = /.+[.]\w+$/;
		let finalString = inputString;

		if(!domainRegex.test(inputString)){
			return "https://www.google.com/search?q="+finalString;
		}

		if(!protocolRegex.test(inputString)){
			finalString = "http://"+finalString;
		}

		return finalString;

	}

	function goToWebPage(url){
		if(url){
			window.location.href = url;
		}
	}


})()