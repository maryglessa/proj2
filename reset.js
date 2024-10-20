const form = document.getElementById('passwordResetForm');
const email = document.getElementById('email');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const passwordFields = document.querySelector('.password-fields');
const emptyFeedback = document.querySelector('.empty-feedback');

// Toggle password visibility
function toggleVisibility(fieldId, button) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
    button.textContent = field.type === 'password' ? 'Show' : 'Hide';
}

document.getElementById('toggleNewPassword').onclick = function() {
    toggleVisibility('newPassword', this);
};

document.getElementById('toggleConfirmPassword').onclick = function() {
    toggleVisibility('confirmPassword', this);
};

form.onsubmit = function(event) {
    event.preventDefault();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!emailValid) {
        email.classList.add('is-invalid');
        return;
    }

    email.classList.remove('is-invalid');
    passwordFields.style.display = 'block';

    const newPass = newPassword.value.trim();
    const confirmPass = confirmPassword.value.trim();

    if (newPass && !confirmPass) {
        emptyFeedback.style.display = 'block';
    } else {
        emptyFeedback.style.display = 'none';
    }

    if (newPass && newPass === confirmPass) {
        Swal.fire({
            title: 'Password Reset Successful!',
            text: 'Your password has been updated.',
            icon: 'success'
        }).then(function() {
            form.reset();
            passwordFields.style.display = 'none';
        });
    } else if (newPass && confirmPass && newPass !== confirmPass) {
        confirmPassword.classList.add('is-invalid');
    }

    newPassword.oninput = function() {
        newPassword.classList.remove('is-invalid');
        emptyFeedback.style.display = 'none';
    };

    confirmPassword.oninput = function() {
        confirmPassword.classList.remove('is-invalid');
    };
};
