// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = `
            <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = `
            <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>
        `;
    }
}

// Validation email universitaire
function validateUniversityEmail(email) {
    const universityDomains = ['@etu.', '@u-', '@univ-', '@edu.'];
    return universityDomains.some(domain => email.includes(domain));
}

// Afficher erreur
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--error)';
    }
}

// Cacher erreur
function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement) {
        errorElement.classList.remove('active');
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'var(--gray-300)';
    }
}

// Notification toast
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        color: white;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gestion du formulaire de connexion
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Reset errors
        hideError('email');
        hideError('password');
        
        let isValid = true;
        
        // Validation email
        if (!email) {
            showError('email', 'L\'email est requis');
            isValid = false;
        } else if (!validateUniversityEmail(email)) {
            showError('email', 'Veuillez utiliser votre email universitaire');
            isValid = false;
        }
        
        // Validation password
        if (!password) {
            showError('password', 'Le mot de passe est requis');
            isValid = false;
        }
        
        if (isValid) {
            // Simuler la connexion
            const submitBtn = loginForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                <span>Connexion en cours...</span>
            `;
            
            // Simulation d'appel API
            setTimeout(() => {
                // Stocker l'utilisateur
                const userData = {
                    email: email,
                    name: email.split('@')[0].replace('.', ' '),
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('studyhub_user', JSON.stringify(userData));
                
                showNotification('Connexion réussie ! Bienvenue 👋', 'success');
                
                // Redirection vers le dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        }
    });
    
    // Validation en temps réel
    document.getElementById('email')?.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateUniversityEmail(email)) {
            showError('email', 'Veuillez utiliser votre email universitaire');
        } else {
            hideError('email');
        }
    });
}

// Gestion du formulaire d'inscription
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const university = document.getElementById('university').value;
        const terms = document.getElementById('terms').checked;
        
        // Reset errors
        hideError('name');
        hideError('email');
        hideError('password');
        hideError('university');
        hideError('terms');
        
        let isValid = true;
        
        // Validation nom
        if (!name || name.length < 3) {
            showError('name', 'Le nom doit contenir au moins 3 caractères');
            isValid = false;
        }
        
        // Validation email
        if (!email) {
            showError('email', 'L\'email est requis');
            isValid = false;
        } else if (!validateUniversityEmail(email)) {
            showError('email', 'Veuillez utiliser votre email universitaire');
            isValid = false;
        }
        
        // Validation password
        if (!password) {
            showError('password', 'Le mot de passe est requis');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'Le mot de passe doit contenir au moins 8 caractères');
            isValid = false;
        }
        
        // Validation université
        if (!university) {
            showError('university', 'Veuillez sélectionner votre université');
            isValid = false;
        }
        
        // Validation terms
        if (!terms) {
            showError('terms', 'Vous devez accepter les conditions d\'utilisation');
            isValid = false;
        }
        
        if (isValid) {
            const submitBtn = registerForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                <span>Création du compte...</span>
            `;
            
            // Simulation d'appel API
            setTimeout(() => {
                const userData = {
                    name: name,
                    email: email,
                    university: university,
                    registeredTime: new Date().toISOString()
                };
                
                localStorage.setItem('studyhub_user', JSON.stringify(userData));
                
                showNotification('Compte créé avec succès ! 🎉', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        }
    });
    
    // Validation en temps réel
    document.getElementById('email')?.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateUniversityEmail(email)) {
            showError('email', 'Veuillez utiliser votre email universitaire');
        } else {
            hideError('email');
        }
    });
    
    document.getElementById('password')?.addEventListener('input', function() {
        if (this.value.length > 0 && this.value.length < 8) {
            showError('password', 'Le mot de passe doit contenir au moins 8 caractères');
        } else {
            hideError('password');
        }
    });
}

// Gestion des boutons sociaux
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        showNotification('Fonctionnalité bientôt disponible !', 'success');
    });
});

// Animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

console.log('🔐 Auth system loaded');