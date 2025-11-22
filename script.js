class DashboardSystem {
    constructor() {
        this.currentState = {
            department: '',
            year: '',
            session: '',
            level: 'departments'
        };
        this.init();
    }

    init() {
        setTimeout(() => {
            this.checkAuthentication();
            this.setupEventListeners();
            this.loadUserInfo();
            this.loadDepartments();
        }, 100);
    }

    // Offline-aware authentication
    checkAuthentication() {
        // Online auth
        if (window.authSystem && window.authSystem.isAuthenticated()) {
            this.hideProtectionOverlay();
            return true;
        }

        // Offline auth from localStorage
        const localUser = localStorage.getItem('dashboard_user');
        if (localUser) {
            this.hideProtectionOverlay();
            return true;
        }

        // No auth
        this.showProtectionOverlay();
        return false;
    }

    showProtectionOverlay() {
        const overlay = document.getElementById('protection-overlay');
        const dashboardContent = document.querySelector('.dashboard-container');
        const footer = document.querySelector('footer');
        if (overlay) overlay.style.display = 'flex';
        if (dashboardContent) dashboardContent.style.display = 'none';
        if (footer) footer.style.display = 'none';
    }

    hideProtectionOverlay() {
        const overlay = document.getElementById('protection-overlay');
        const dashboardContent = document.querySelector('.dashboard-container');
        const footer = document.querySelector('footer');
        if (overlay) overlay.style.display = 'none';
        if (dashboardContent) dashboardContent.style.display = 'block';
        if (footer) footer.style.display = 'block';
    }

    setupEventListeners() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());

        const loginCode = document.getElementById('login-code');
        if (loginCode) loginCode.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.attemptLogin(); });

        const loginEmail = document.getElementById('login-email');
        if (loginEmail) loginEmail.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.attemptLogin(); });
    }

    loadUserInfo() {
        let user = null;
        if (window.authSystem && window.authSystem.getCurrentUser()) {
            user = window.authSystem.getCurrentUser();
        } else if (localStorage.getItem('dashboard_user')) {
            user = JSON.parse(localStorage.getItem('dashboard_user'));
        }

        if (!user) return;

        const userNameElement = document.getElementById('user-name');
        const userDepartmentElement = document.getElementById('user-department');
        const userYearElement = document.getElementById('user-year');
        const userUniversityElement = document.getElementById('user-university');
        const welcomeMessageElement = document.getElementById('welcome-message');

        if (userNameElement) userNameElement.textContent = user.fullName;
        if (userDepartmentElement) userDepartmentElement.textContent = user.department;
        if (userYearElement) userYearElement.textContent = `Year ${user.year}, Section ${user.section}`;
        if (userUniversityElement) userUniversityElement.textContent = user.university;

        if (welcomeMessageElement) welcomeMessageElement.textContent = `Welcome back, ${user.fullName}!`;
    }

    attemptLogin() {
        if (!window.authSystem) {
            this.showLoginError('Auth system not loaded. Please refresh.');
            return;
        }

        const email = document.getElementById('login-email')?.value;
        const code = document.getElementById('login-code')?.value;

        if (!email || !code) {
            this.showLoginError('Please enter both email and access code');
            return;
        }

        try {
            const validation = window.authSystem.validateUser(email, code);
            if (validation.valid) {
                // Save locally for offline use
                localStorage.setItem('dashboard_user', JSON.stringify(validation.user));
                localStorage.setItem('dashboard_session_time', Date.now());

                window.authSystem.createUserSession(validation.user);
                this.hideProtectionOverlay();
                this.loadUserInfo();
                this.showLoginSuccess('Login successful! You can now use the app offline.');
                setTimeout(() => window.location.reload(), 1500);
            } else {
                this.showLoginError(validation.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showLoginError('Login failed. Please try again.');
        }
    }

    showLoginError(message) {
        const existingError = document.querySelector('.login-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error message error';
        errorDiv.innerHTML = message;

        const loginForm = document.querySelector('.login-form');
        if (loginForm) loginForm.appendChild(errorDiv);

        const loginCode = document.getElementById('login-code');
        if (loginCode) loginCode.value = '';
    }

    showLoginSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'message success';
        successDiv.textContent = message;
        successDiv.style.marginTop = '15px';
        const protectionModal = document.querySelector('.protection-modal');
        if (protectionModal) {
            protectionModal.appendChild(successDiv);
            setTimeout(() => { if (successDiv.parentNode) successDiv.remove(); }, 3000);
        }
    }

    logout() {
        if (window.authSystem) window.authSystem.logout();
        localStorage.removeItem('dashboard_user');
        localStorage.removeItem('dashboard_session_time');
        this.showProtectionOverlay();
        window.location.href = 'index.html';
    }

    // Navigation functions (loadDepartments, loadYears, loadSessions, etc.)
    // Keep all your original methods here without modification
    // ...
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { window.dashboardSystem = new DashboardSystem(); }, 100);
});

// Global functions
function loadDepartments() { if (window.dashboardSystem) window.dashboardSystem.loadDepartments(); }
function loadYears(department) { if (window.dashboardSystem) window.dashboardSystem.loadYears(department); }
function loadSessions(year) { if (window.dashboardSystem) window.dashboardSystem.loadSessions(year); }
function loadSubjects(session) { if (window.dashboardSystem) window.dashboardSystem.loadSubjects(session); }
function loadFeaturedContent(session) { if (window.dashboardSystem) window.dashboardSystem.loadFeaturedContent(session); }
function goToPart(subject, part) { if (window.dashboardSystem) window.dashboardSystem.goToPart(subject, part); }
function goToFeatured(feature, part) { if (window.dashboardSystem) window.dashboardSystem.goToFeatured(feature, part); }
function attemptLogin() { if (window.dashboardSystem) window.dashboardSystem.attemptLogin(); }
