document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const images = document.querySelectorAll('.image-container img');
    const passwordInput = document.getElementById('password');
    const showIcon = document.getElementById('show-icon');
    const hideIcon = document.getElementById('hide-icon');
    let currentImageIndex = 0;

    // Start the first image as active
    images[currentImageIndex].classList.add('active');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });

    showIcon.addEventListener('click', () => {
        passwordInput.type = 'text';
        showIcon.style.display = 'none';
        hideIcon.style.display = 'inline';
    });

    hideIcon.addEventListener('click', () => {
        passwordInput.type = 'password';
        showIcon.style.display = 'inline';
        hideIcon.style.display = 'none';
    });

    attachInputListeners();

    function attachInputListeners() {
        const inputs = document.querySelectorAll('#login-form input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }

    function validateForm() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        let isValid = true;
        clearErrorStates();

        if (username === '') {
            setErrorState('username');
            isValid = false;
        }
        if (password === '') {
            setErrorState('password');
            isValid = false;
        }
        return isValid;
    }

    function setErrorState(field) {
        document.getElementById(field).classList.add('error');
    }

    function clearErrorStates() {
        document.querySelectorAll('.input-group input').forEach(input => {
            input.classList.remove('error');
        });
    }

    // Image rotation logic
    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }, 3000); // Changed the interval back to 3000ms for smooth transition
});
