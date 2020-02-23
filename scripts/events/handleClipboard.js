const copyButtons = [...document.querySelectorAll('.copy')];

const handleClipboard = async () => {

	copyButtons.forEach(button => {

		button.addEventListener('click', async ({ target }) => {

			const data = target.previousElementSibling.textContent;

			const success = () => {
				button.textContent = 'Copied!'
				button.classList.add('copy--success');
			};

			const error = () => {
				setTimeout(() => {
					button.textContent = 'Error';
					button.classList.add('copy--error');
				}, 500);
			};

			try {

				if (navigator.clipboard) {
					navigator.clipboard.writeText(data).then(success, error);

				} else {

					const selection = window.getSelection();
					const range = document.createRange();

					range.selectNodeContents(target.previousElementSibling);
					selection.removeAllRanges();
					selection.addRange(range);

					document.execCommand("copy");
					selection.removeAllRanges();

				}

			} catch (e) {
				error();
			}

			setTimeout(() => {
				button.classList.remove('copy--success', 'copy--error');
				button.textContent = 'Copy';
				button.blur();
			}, 2000);

		})
	});
}

export default handleClipboard;