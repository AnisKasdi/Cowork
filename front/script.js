// Gestion de la navigation entre les pages
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showIndex() {
    showPage('indexPage');
}

function showLogin() {
    showPage('loginPage');
}

function showRegister() {
    showPage('registerPage');
}

function showDashboard() {
    showPage('dashboardPage');
}

// Scroll vers les features
function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Gestion de la connexion
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validation simple
    if (email && password) {
        // Simuler une connexion réussie
        console.log('Connexion avec:', email);
        
        // Sauvegarder l'utilisateur (en mémoire)
        const userData = {
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
        };
        
        // Stocker dans sessionStorage pour cette démo
        sessionStorage.setItem('user', JSON.stringify(userData));
        
        // Afficher un message de succès
    showNotification('Connexion réussie ! Bienvenue', 'success');
        
        // Rediriger vers le dashboard après un court délai
        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showNotification('Veuillez remplir tous les champs', 'error');
    }
}

// Gestion de l'inscription
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Validation simple
    if (name && email && password) {
        // Vérifier que c'est un email universitaire
        if (!email.includes('@etu.') && !email.includes('@u-')) {
            showNotification('Veuillez utiliser votre email universitaire', 'error');
            return;
        }
        
        // Simuler une inscription réussie
        console.log('Inscription:', { name, email });
        
        const userData = {
            email: email,
            name: name,
            registeredTime: new Date().toISOString()
        };
        
        sessionStorage.setItem('user', JSON.stringify(userData));
        
    showNotification('Compte créé avec succès !', 'success');
        
        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showNotification('Veuillez remplir tous les champs', 'error');
    }
}

// Déconnexion
function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        sessionStorage.removeItem('user');
    showNotification('Déconnexion réussie. À bientôt !', 'success');
        setTimeout(() => {
            showIndex();
        }, 1000);
    }
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les anciennes notifications
    const oldNotif = document.querySelector('.notification');
    if (oldNotif) {
        oldNotif.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    });
    
    // Couleurs selon le type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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

// Toggle user menu (pour future implémentation)
function toggleUserMenu() {
    console.log('Menu utilisateur cliqué');
    // Ici vous pouvez ajouter un menu dropdown
    showNotification('Fonctionnalité à venir !', 'info');
}

// Simulation de données pour le dashboard
function initDashboard() {
    // Vérifier si l'utilisateur est connecté
    const user = sessionStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        console.log('Utilisateur connecté:', userData);
    }
}

// Fonctions pour les interactions du dashboard
function joinSession(sessionName) {
    showNotification(`Vous avez rejoint la session: ${sessionName}`, 'success');
}

function createGroup() {
    showNotification('Ouverture du formulaire de création de groupe...', 'info');
}

function followUser(userName) {
    showNotification(`Vous suivez maintenant ${userName}`, 'success');
}

function likePost(postId) {
    console.log('Like post:', postId);
    showNotification('Publication aimée !', 'success');
}

function commentPost(postId) {
    console.log('Comment on post:', postId);
    showNotification('Fonctionnalité de commentaire à venir !', 'info');
}

function sharePost(postId) {
    console.log('Share post:', postId);
    showNotification('Lien copié dans le presse-papier !', 'success');
}

// Gestion de la recherche
let searchTimeout;
function handleSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        console.log('Recherche:', query);
        if (query.length > 2) {
            showNotification(`Recherche de: "${query}"...`, 'info');
        }
    }, 500);
}

// Ajouter l'écouteur d'événements pour la recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            handleSearch(e.target.value);
        });
    }
    
    // Initialiser le dashboard si nécessaire
    initDashboard();
    
    // Vérifier si l'utilisateur est déjà connecté
    const user = sessionStorage.getItem('user');
    if (user && window.location.hash === '#dashboard') {
        showDashboard();
    }
});

// Gestion des groupes
function selectGroup(groupName) {
    showNotification(`Groupe sélectionné: ${groupName}`, 'info');
    console.log('Chargement du groupe:', groupName);
}

// Navigation dans la sidebar
const sidebarItems = document.querySelectorAll('.sidebar-menu li');
sidebarItems.forEach(item => {
    item.addEventListener('click', function() {
        sidebarItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const text = this.textContent.trim();
        showNotification(`Navigation vers: ${text}`, 'info');
    });
});

// Gestion des sessions
function createSession() {
    showNotification('Ouverture du formulaire de création de session...', 'info');
}

// Statistiques en temps réel (simulation)
function updateStats() {
    // Simulation de mise à jour des stats
    console.log('Mise à jour des statistiques...');
}

// Mettre à jour les stats toutes les 30 secondes
setInterval(updateStats, 30000);

// Gestion du calendrier
document.querySelectorAll('.calendar-date').forEach(date => {
    date.addEventListener('click', function() {
        if (!this.classList.contains('today')) {
            showNotification(`Date sélectionnée: ${this.textContent} octobre`, 'info');
        }
    });
});

// Sauvegarder la préférence de thème (pour future implémentation)
function toggleTheme() {
    console.log('Toggle theme');
    showNotification('Fonctionnalité de thème à venir !', 'info');
}

// Messages d'aide au démarrage
console.log('StudyHub - Application de Coworking Étudiant');
console.log('Navigation disponible:');
console.log('   - showIndex() : Page d\'accueil');
console.log('   - showLogin() : Page de connexion');
console.log('   - showRegister() : Page d\'inscription');
console.log('   - showDashboard() : Tableau de bord');

// Export des fonctions pour utilisation globale
window.showIndex = showIndex;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.showDashboard = showDashboard;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.scrollToFeatures = scrollToFeatures;
window.toggleUserMenu = toggleUserMenu;