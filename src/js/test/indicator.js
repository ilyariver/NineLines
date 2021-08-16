/**
 * Индикатор JS скилла
 * */
const indicatorArrow = document.querySelector('.js-indicator-arrow');
const checkboxContent = document.querySelector('.js-checkbox-content');
const checkboxMark = document.querySelectorAll('.js-checkbox-mark');
const indicatedSkills = ['vanillajs','gulp','angular','jquery'];
const oneIndicatorDivision = 180 / indicatedSkills.length;
const numberIndicatorElements = 1000 / indicatedSkills.length;
let startingPoint = 270;
let startKnowledgeCounter = 0;

function easeCounterChanged() {
	const roundingDivision = Math.ceil(numberIndicatorElements);

	$.easing.easeIn = (x, t, b, c, d) => {
		return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	};

	$('.js-knowledge-counter').each(function() {
		$(this).prop('counter', 0 - roundingDivision).animate({
			counter: $(this).text(),
		}, {
			duration: 470,
			easing: 'easeIn',
			step(val) {
				$(this).text(Math.abs(Math.ceil(val)));
			},
		});
	});
}

function addValueToIndicator(action, element) {
	const levelLowerText = element.nextElementSibling.textContent.toLowerCase();
	const knowledgeCounter = document.querySelector('.js-knowledge-counter');

	indicatedSkills.forEach(item => {
		if (levelLowerText === item) {
			const roundingDivision = Math.ceil(numberIndicatorElements);
			const renderKnowledgeCounter = action === 'add' ?
				startKnowledgeCounter += roundingDivision :
				startKnowledgeCounter -= roundingDivision;
			const roundingAsInteger = (Math.round(parseInt(renderKnowledgeCounter, 10) / 10) * 10);

			startingPoint = action === 'add' ? startingPoint += oneIndicatorDivision : startingPoint -= oneIndicatorDivision;
			knowledgeCounter.innerHTML = typeof roundingAsInteger === 'number' ? roundingAsInteger : 0;

			easeCounterChanged();

			indicatorArrow.style.transform = `translateX(-50%) rotate(${startingPoint}deg)`;
		}
	});
}

function listenerChecked(e) {
	const target = e.target;
	const targetChecked = target.classList.contains('js-checkbox-mark');
	const targetInputLabel = target.classList.contains('js-checkbox-label');

	if (!targetChecked && !targetInputLabel) {
		return;
	}

	const currentCheckbox = target.closest('.js-checkbox');
	const currentDataset = currentCheckbox.dataset.skill;

	checkboxMark.forEach(mark => {
		if (currentDataset !== mark.nextElementSibling.textContent.toLowerCase()) {
			return;
		}

		if (mark.classList.contains('is-checked')) {
			addValueToIndicator('remove', mark);
			return mark.classList.remove('is-checked');
		}

		addValueToIndicator('add', mark);
		mark.classList.add('is-checked');
	});
}

checkboxContent.addEventListener('click', listenerChecked);
checkboxContent.addEventListener('keydown', e => {
	if (e.code === 'Space') {
		listenerChecked(e);
	}
});
