const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
if (!form) {
	// nothing to do if form not present
	console.warn('feedback form not found');
} else {
	// populate from storage if present
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const parsed = JSON.parse(saved);
			formData = {
				email: parsed.email || '',
				message: parsed.message || ''
			};
			form.elements.email.value = formData.email;
			form.elements.message.value = formData.message;
		}
	} catch (err) {
		console.error('Error reading storage', err);
	}

	form.addEventListener('input', onInput);
	form.addEventListener('submit', onSubmit);
}

function onInput(evt) {
	const target = evt.target;
	if (!target.name) return;
	// store trimmed values (no leading/trailing spaces)
	formData[target.name] = String(target.value).trim();
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
	} catch (err) {
		console.error('Saving error', err);
	}
}

function onSubmit(evt) {
	evt.preventDefault();
	const email = String(formData.email || '').trim();
	const message = String(formData.message || '').trim();
	if (!email || !message) {
		alert('Fill please all fields');
		return;
	}

	console.log({ email, message });

	localStorage.removeItem(STORAGE_KEY);
	form.reset();
	formData = { email: '', message: '' };
}

