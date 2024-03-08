document.addEventListener('DOMContentLoaded', () => {
	const toggle = document.getElementById('toggle')

	chrome.storage.sync.get('enabled', data => {
		toggle.checked = data.enabled
	})

	toggle.addEventListener('change', () => {
		const enabled = toggle.checked

		chrome.storage.sync.set({ enabled }, () => {
			console.log("setting saved");
		})
	})
})
