(function () {
	const mainInputWrapper = document.querySelector('#main-input');



	mainInputWrapper.querySelector('input').addEventListener('keyup', inputHandler);


	function inputHandler(event) {
		const inputValue = event.target.value;

		if (event.keyCode === 13) {
			pipe(
				goToWebPage,
				addToVisited,
				parseURL
			)(inputValue)
		} else {
			const suggestions = pipe(
				getSuggestions,
			)(inputValue);

			pipe(
				addToSuggestionList,
				clearSuggestionList
			)(suggestions);

		}


	}



	function pipe() {
		const args = [].slice.call(arguments).reverse();
		return function (data) {
			return args.reduce((acc, item) => {
				return item(acc);
			}, data);
		}
	}


	function parseURL(inputString) {
		const protocolRegex = /^(http:\/\/|https:\/\/)/;
		const domainRegex = /.+[.]\w+/;
		let finalString = inputString;

		if (!domainRegex.test(inputString)) {
			return "https://www.google.com/search?q=" + finalString;
		}

		if (!protocolRegex.test(inputString)) {
			finalString = "http://" + finalString;
		}

		return finalString;

	}

	function goToWebPage(url) {
		if (url) {
			window.location.href = url;
		}
	}

	function addToVisited(url) {
		const storage = getStorage();

		const exists = storage.find(item => item === url);

		if (exists) {
			return url;
		} else {
			const updatedStorage = storage.concat(url);
			setStorage(updatedStorage);
		}
		return url;
	}


	function getSuggestions(searchTerm) {
		const storage = getStorage();
		const suggestions = storage.filter(item => item.includes(searchTerm));
		return suggestions;
	}

	function addToSuggestionList(suggestionItems) {
		const autocompleteListElem = getSuggestionList();

		suggestionItems.forEach(function (suggestionItem) {
			const listItem = document.createElement('li');
			listItem.innerHTML = suggestionItem;
			autocompleteListElem.appendChild(listItem);
		});

		return suggestionItems;
	}

	function getStorageKey() {
		return 'visitedSites'
	}

	function getStorage() {
		const storageKey = getStorageKey();
		return JSON.parse(window.localStorage.getItem(storageKey)) || [];
	}

	function setStorage(data) {
		const storageKey = getStorageKey();
		return window.localStorage.setItem(storageKey, JSON.stringify(data));
	}

	function getSuggestionList() {
		const autocompleteElem = document.querySelector('#autocomplete');
		const autocompleteListElem = autocompleteElem.querySelector('ul');
		return autocompleteListElem;
	}

	function clearSuggestionList(data) {
		const autocompleteListElem = getSuggestionList();
		autocompleteListElem.innerHTML = '';
		return data;
	}

})()
