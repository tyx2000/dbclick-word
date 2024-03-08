let shiftPressedCount = 0, lastShiftKeyDownTime = 0;

const createTooltip = () => {
	const exist = document.getElementById('translateSelectionTooltip')
	exist && document.body.removeChild(exist)

	const selection = document.getSelection()
	const text = selection.toString().trim()

	if (text && selection.rangeCount > 0) {
		const range = selection.getRangeAt(0)
		const { x, y, width, height } = range.getBoundingClientRect()

		console.log(width, height, text);

		const el = document.createElement('div')
		el.id = 'translateSelectionTooltip'
		el.style.padding = "10px"
		el.style.position = "fixed"
		el.style.left = x + 'px'
		el.style.top = y + height + 5 + 'px'
		el.style.borderRadius = '10px'
		el.style.background = "#000"
		el.style.color = "#fff"
		el.innerText = text
		// document.body.appendChild(el)


		fetch()
			.then((response) => response.json())
			.then((json) => {
				if (json.length > 0) {
					for (let i = 0; i < json.length; i++) {
						const div = document.createElement('div')
						div.innerText = json[i].value + " " + json[i].label
						el.appendChild(div)
					}
					document.body.appendChild(el)
				}
			});
	}
}

const clickListener = () => {
	const exist = document.getElementById('translateSelectionTooltip');
	exist && document.body.removeChild(exist);
}

const keydownListener = (e) => {
	const exist = document.getElementById('translateSelectionTooltip');
	const keyCode = e.key;
	if (exist && keyCode === "Escape") {
		document.body.removeChild(exist);
	}
	if (keyCode === 'Shift') {
		const currentTime = new Date().getTime();
		if (shiftPressedCount === 1 && currentTime - lastShiftKeyDownTime < 500) {
			shiftPressedCount = 0;
			createTooltip();
		} else {
			shiftPressedCount++
			lastShiftKeyDownTime = currentTime
		}
	} else {
		shiftPressedCount = 0
	}
}

chrome.storage.onChanged.addListener((changes, namespaces) => {
	if (changes.enabled.newValue) {

		document.addEventListener('click', clickListener)

		document.addEventListener('keydown', keydownListener)

		document.addEventListener("dblclick", createTooltip)

	} else {

		document.removeEventListener('click', clickListener)

		document.removeEventListener('keydown', keydownListener)

		document.removeEventListener('dblclick', createTooltip)
	}
})
