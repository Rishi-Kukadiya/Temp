document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const images = document.querySelectorAll('.image-container img');
    const aadharInput = document.getElementById('aadhar');
    const dobInput = document.getElementById('dob');
    const nameInput = document.getElementById('name');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');

    
    let currentImageIndex = 0; // Initialize current image index
    images[currentImageIndex].classList.add('active');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            form.submit();
        }
    });

    // Aadhar Input Formatting and Placeholder with Underscores
    aadharInput.addEventListener('input', function () {
        let value = this.value.replace(/\D/g, '').substring(0, 12); // Remove non-digit characters, limit to 12 digits
        let formattedValue = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3'); // Format the value in 4-4-4 format
        this.value = formattedValue;
    });

    aadharInput.addEventListener('focus', function () {
        if (this.value === '') {
            this.placeholder = '____-____-____'; // Show underscores on focus
        }
    });

    aadharInput.addEventListener('blur', function () {
        if (this.value === '') {
            this.placeholder = '____-____-____'; // Retain underscores when empty
        } else {
            this.placeholder = ''; // Clear placeholder when filled
        }
    });

    // Automatically open the calendar when clicking anywhere in the Date of Birth field
    dobInput.addEventListener('click', () => {
        dobInput.showPicker();
    });

    // Validation function that highlights invalid fields
    function validateForm() {
        let isValid = true;

        // Reset the input fields to remove previous error styles
        resetErrorStates();

        // Check if Name is empty
        if (nameInput.value.trim() === '') {
            setErrorState(nameInput);
            isValid = false;
        }

        // Check if Aadhar is properly filled (12 digits)
        const aadharValue = aadharInput.value.replace(/-/g, '').trim();
        if (aadharValue.length !== 12) {
            setErrorState(aadharInput);
            isValid = false;
        }

        // Check if Date of Birth is selected
        if (dobInput.value.trim() === '') {
            setErrorState(dobInput);
            isValid = false;
        }

        // Check if Mobile is 10 digits
        if (!/^\d{10}$/.test(mobileInput.value.trim())) {
            setErrorState(mobileInput);
            isValid = false;
        }

        // Check if Password is provided
        if (passwordInput.value.trim() === '') {
            setErrorState(passwordInput);
            isValid = false;
        }

        return isValid;
    }

    // Function to reset error states
    function resetErrorStates() {
        [nameInput, aadharInput, dobInput, mobileInput, passwordInput].forEach(input => {
            input.classList.remove('error');
        });
    }

    // Function to set error state
    function setErrorState(input) {
        input.classList.add('error');
    }

    // Password Toggle Functionality
    const togglePassword = document.getElementById('toggle-password');
    const showIcon = document.getElementById('show-icon');
    const hideIcon = document.getElementById('hide-icon');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        showIcon.style.display = type === 'password' ? 'inline' : 'none';
        hideIcon.style.display = type === 'password' ? 'none' : 'inline';
    });

    [nameInput, aadharInput, dobInput, mobileInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });

    // Image rotation logic
    setInterval(() => {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }, 3000); // Interval for image rotation
});

     