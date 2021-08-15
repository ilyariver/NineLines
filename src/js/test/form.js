/**
 * Фокус формы
 * */
const formContainer = document.querySelector('.js-form');
const inputValue = document.querySelectorAll('[type="text"]');
const getEventListener = event => {
	formContainer.addEventListener(event, e => {
		const target = e.target;
		const allInputs = target.closest('.js-all-inputs');
		const currentLabel = allInputs.querySelector('.js-input-label');

		if (event === 'focus' && !target.value)  {
			currentLabel.classList.add('is-active');
		}
		if (event === 'blur' && !target.value) {
			currentLabel.classList.remove('is-active');
		}

	}, true);
};

getEventListener('focus');
getEventListener('blur');

document.addEventListener("DOMContentLoaded", () => {
	inputValue.forEach(inputLabel => {
		if (inputLabel.value) {
			inputLabel.parentElement.querySelector('.js-input-label').classList.add('is-active');
		}
	});
});
