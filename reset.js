const form = document.getElementById('passwordResetForm');
const emailField = document.getElementById('email');
const newPasswordField = document.getElementById('newPassword');
const confirmPasswordField = document.getElementById('confirmPassword');
const passwordFields = document.querySelector('.password-fields');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());

    if (emailValid) {
        emailField.classList.remove('is-invalid');
        passwordFields.style.display = 'block';

        const newPassword = newPasswordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();

        if (newPassword && newPassword === confirmPassword) {
            Swal.fire({
                title: 'Password Reset Successful!',
                text: 'Your password has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                form.reset();
                passwordFields.style.display = 'none';
            });
        } else {
            confirmPasswordField.classList.toggle('is-invalid', newPassword !== confirmPassword);
        }

        newPasswordField.addEventListener('input', () => newPasswordField.classList.remove('is-invalid'));
        confirmPasswordField.addEventListener('input', () => confirmPasswordField.classList.remove('is-invalid'));
    } else {
        emailField.classList.add('is-invalid');
    }
});


function togglePasswordVisibility(inputField, toggleButton) {
    const input = document.getElementById(inputField);
    input.type = input.type === 'password' ? 'text' : 'password';
    toggleButton.textContent = input.type === 'password' ? 'Show' : 'Hide';
}

document.getElementById('toggleNewPassword').addEventListener('click', function() {
    togglePasswordVisibility('newPassword', this);
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    togglePasswordVisibility('confirmPassword', this);
});
