document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("button").addEventListener(
		"click",
		() => {
			chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, "goodbye", receiver);
			});
		},
		false
	);
	function receiver(res) {
		const title = res.title;
		$.get("");
	}
});
