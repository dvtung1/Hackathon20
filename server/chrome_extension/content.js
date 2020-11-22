chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const title = document.querySelector("title").innerHTML;
	sendResponse({ title });
});
