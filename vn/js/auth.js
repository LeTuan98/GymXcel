document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }

    addInputAnimations();
});

async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    const btn = e.target.querySelector('.btn-primary');
    showLoading(btn);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
        const res = await fetch('../backend/auth/login_handler.php', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        hideLoading(btn, 'Sign In');

        if (data.error) {
            showErrorMessage(data.error);
            return;
        }

        let user_name = data.user.name;
        showSuccessMessage(user_name + '! Chào mừng bạn về nhà!');
        setTimeout(() => {
            window.location.href = 'index.php';
        }, 1500);

    } catch (err) {
        hideLoading(btn, 'Sign In');
        showErrorMessage('Server error');
        console.error(err);
    }
}


async function handleRegister(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.querySelector('input[name="terms"]').checked;

    if (!fullname || !email || !password || !confirmPassword) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match!');
        return;
    }

    if (!terms) {
        showErrorMessage('Please agree to the Terms & Conditions');
        return;
    }

    const btn = e.target.querySelector('.btn-primary');
    showLoading(btn);

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    try {
        const response = await fetch('../backend/auth/register_handler.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        hideLoading(btn, 'Create Account');

        if (data.error) {
            showErrorMessage(data.error);
            return;
        }
        let user_name = data.user.name;
        showSuccessMessage( user_name+ '! Chào bạn, từ bây giờ mong được giúp đỡ nhé!');
        setTimeout(() => {
            window.location.href = 'profile.php';
        }, 3000);

    } catch (error) {
        hideLoading(btn, 'Create Account');
        showErrorMessage('Server error. Please try again.');
        console.error(error);
    }
}


async function handleForgotPassword(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const btn = e.target.querySelector('.btn-primary');

    showLoading(btn);

    try {
        const formData = new FormData();
        formData.append('email', email);

        const response = await fetch('../backend/auth/forgot_password_handler.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        hideLoading(btn, 'Send Reset Link');

        if (!data.success) {
            showErrorMessage(data.message);
            return;
        }

        showSuccessMessage('Reset link sent! Check your email.');

        console.log('RESET TOKEN (demo):', data.token);

    } catch (error) {
        hideLoading(btn, 'Send Reset Link');
        showErrorMessage('Server error. Please try again.');
        console.error(error);
    }
}


function showLoading(btn) {
    btn.disabled = true;
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.style.opacity = '0.7';
}

function hideLoading(btn, originalText) {
    btn.disabled = false;
    btn.textContent = originalText || btn.dataset.originalText;
    btn.style.opacity = '1';
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.flash-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `flash-message flash-${type}`;
    messageDiv.textContent = message;

    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideDown 0.3s ease-out forwards;
        max-width: 90%;
        text-align: center;
    `;

    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #34D399, #10B981)';
        messageDiv.style.color = 'white';
    } else {
        messageDiv.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
        messageDiv.style.color = 'white';
    }

    document.body.appendChild(messageDiv);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            to {
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease-in forwards';
        const upStyle = document.createElement('style');
        upStyle.textContent = `
            @keyframes slideUp {
                to {
                    transform: translateX(-50%) translateY(-100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(upStyle);

        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

function addInputAnimations() {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');

            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });

        if (input.value) {
            input.parentElement.classList.add('filled');
        }
    });
}

const emailInput = document.getElementById('email');

if (emailInput && document.getElementById('registerForm')) {
    emailInput.addEventListener('blur', async () => {
        const email = emailInput.value.trim();
        if (!email) return;

        const formData = new FormData();
        formData.append('email', email);

        const res = await fetch('../backend/auth/check_email.php', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (data.exists) {
            showErrorMessage('Email already exists');
        }
    });
}
