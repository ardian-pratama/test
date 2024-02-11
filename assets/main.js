const form = document.querySelector('form');
const alertElement = document.querySelector('.alert');
const loadingBox = document.querySelector('.loading-box');
const successMessage = document.querySelector('.berhasil');
const errorMessage = document.querySelector('.gagal');

form.addEventListener('submit', async event => {
    event.preventDefault();

    // Show alert, loading and clear previous messages
    showAlert();
    showLoading();
    clearMessages();

    try {
        const nama = form.querySelector('#nama').value;
        const pocky = form.querySelector('input[name="pocky"]:checked').value;
        const coklat = form.querySelector('input[name="coklat"]:checked').value;
        const lainnya = form.querySelector('#lainnya').value;

        const message = { nama, pocky, coklat, lainnya };

        const response = await fetch('https://api-sand-six.vercel.app/message', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        // Handle success
        showSuccessMessage('Pesan terkirim!');
        resetForm();
    } catch (error) {
        // Handle error
        showErrorMessage(error.message);
    } finally {
        hideLoading();
    }
});

function showAlert() {
    alertElement.classList.remove('hidden');
}
function showLoading() {
    loadingBox.classList.remove('hidden');
}

function hideLoading() {
    loadingBox.classList.add('hidden');
}

function showSuccessMessage(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
}

function clearMessages() {
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function resetForm() {
    form.reset();
}
