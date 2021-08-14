;(function() {
	/**
	 * Индикатор JS скилла
	 * */
	const indicatorArrow = document.querySelector('.js-indicator-arrow');
	const checkboxContent = document.querySelector('.js-checkbox-content');
	const checkbox = document.querySelectorAll('.js-checkbox');
	const checkboxMark = document.querySelector('.js-checkbox-mark');
	const oneIndicatorDivision = 60;
	let startingPoint = 270;

	checkboxContent.addEventListener('click', e => {
		const target = e.target;
		const targetChecked = target.classList.contains('js-checkbox-mark');
		const targetInputLabel = target.classList.contains('js-checkbox-label');


		if (!targetChecked && !targetInputLabel) {
			return;
		}
		const currentCheckbox = target.closest('.js-checkbox');
		const currentDataset = currentCheckbox.dataset.skill;
		const currentCheckboxMark = currentCheckbox.querySelector('.js-checkbox-mark');

		currentCheckboxMark.classList.toggle('is-checked');

		const datum = {
			currentDataset() {
				return currentDataset === 'vanillajs' ?
					startingPoint += oneIndicatorDivision : startingPoint -= oneIndicatorDivision;
			},
		}
		console.log(datum.currentDataset())
		// startingPoint += oneIndicatorDivision;
		// indicatorArrow.style.transform = `translateX(-50%) rotate(${startingPoint}deg)`;

	});
})();
