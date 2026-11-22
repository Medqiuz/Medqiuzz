class DashboardSystem {
    constructor() {
        this.currentState = {
            department: "",
            year: "",
            session: "",
            level: "departments"
        };

        this.init();
    }

    async init() {
        this.setupEventListeners();

        try {
            // Wait until Firebase checks the current login session.
            if (window.authReady) {
                await window.authReady;
            }

            if (this.checkAuthentication()) {
                this.loadUserInfo();
                this.loadDepartments();
            }
        } catch (error) {
            console.error("Dashboard initialization error:", error);
            this.showProtectionOverlay();
        }
    }

    checkAuthentication() {
        const authenticated =
            window.authSystem &&
            window.authSystem.isAuthenticated();

        if (authenticated) {
            this.hideProtectionOverlay();
            return true;
        }

        this.showProtectionOverlay();
        return false;
    }

    showProtectionOverlay() {
        const overlay = document.getElementById("protection-overlay");
        const content = document.querySelector(".dashboard-container");
        const footer = document.querySelector("footer");

        if (overlay) overlay.style.display = "flex";
        if (content) content.style.display = "none";
        if (footer) footer.style.display = "none";
    }

    hideProtectionOverlay() {
        const overlay = document.getElementById("protection-overlay");
        const content = document.querySelector(".dashboard-container");
        const footer = document.querySelector("footer");

        if (overlay) overlay.style.display = "none";
        if (content) content.style.display = "block";
        if (footer) footer.style.display = "block";
    }

    setupEventListeners() {
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => this.logout());
        }

        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-code");

        [emailInput, passwordInput].forEach((input) => {
            if (input) {
                input.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        this.attemptLogin();
                    }
                });
            }
        });
    }

    loadUserInfo() {
        const user = window.authSystem?.getCurrentUser();

        if (!user) return;

        const name = document.getElementById("user-name");
        const department = document.getElementById("user-department");
        const year = document.getElementById("user-year");
        const university = document.getElementById("user-university");
        const welcome = document.getElementById("welcome-message");

        if (name) name.textContent = user.fullName || "";
        if (department) department.textContent = user.department || "";
        if (year) {
            year.textContent =
                `Year ${user.year || ""}, Section ${user.section || ""}`;
        }
        if (university) university.textContent = user.university || "";
        if (welcome) {
            welcome.textContent = `Welcome back, ${user.fullName || "Student"}!`;
        }
    }

    async attemptLogin() {
        const emailInput = document.getElementById("login-email");
        const passwordInput = document.getElementById("login-code");

        const email = emailInput?.value.trim();
        const password = passwordInput?.value;

        if (!email || !password) {
            this.showLoginError("Enter your email and account password.");
            return;
        }

        if (!window.authSystem) {
            this.showLoginError("Authentication system is not loaded. Refresh the page.");
            return;
        }

        const loginButton = document.querySelector(
            '.login-form button[onclick="attemptLogin()"]'
        );

        if (loginButton) loginButton.disabled = true;

        try {
            await window.authSystem.login(email, password);

            this.hideProtectionOverlay();
            this.loadUserInfo();

            if (passwordInput) passwordInput.value = "";

            this.showLoginSuccess("Login successful!");

        } catch (error) {
            console.error("Login error:", error);

            let message = "Login failed. Check your email and password.";

            if (error.code === "auth/invalid-credential" ||
                error.code === "auth/wrong-password" ||
                error.code === "auth/user-not-found") {
                message = "Incorrect email or password.";
            } else if (error.code === "auth/too-many-requests") {
                message = "Too many attempts. Please try again later.";
            } else if (error.message) {
                message = error.message;
            }

            this.showLoginError(message);

        } finally {
            if (loginButton) loginButton.disabled = false;
        }
    }

    showLoginError(message) {
        document.querySelector(".login-error")?.remove();

        const errorDiv = document.createElement("div");
        errorDiv.className = "login-error message error";
        errorDiv.textContent = message;

        const loginForm = document.querySelector(".login-form");

        if (loginForm) {
            loginForm.appendChild(errorDiv);
        } else {
            alert(message);
        }

        const passwordInput = document.getElementById("login-code");
        if (passwordInput) passwordInput.value = "";
    }

    showLoginSuccess(message) {
        document.querySelector(".login-success")?.remove();

        const successDiv = document.createElement("div");
        successDiv.className = "login-success message success";
        successDiv.textContent = message;
        successDiv.style.marginTop = "15px";

        const modal = document.querySelector(".protection-modal");

        if (modal) {
            modal.appendChild(successDiv);

            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

    async logout() {
        try {
            if (window.authSystem) {
                await window.authSystem.logout();
            } else {
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error("Logout error:", error);
            alert("Could not log out. Please try again.");
        }
    }
}

// Start dashboard after the HTML is loaded.
document.addEventListener("DOMContentLoaded", () => {
    window.dashboardSystem = new DashboardSystem();
});

// Global functions used by HTML onclick attributes.
function loadDepartments() {
    window.dashboardSystem?.loadDepartments?.();
}

function loadYears(department) {
    window.dashboardSystem?.loadYears?.(department);
}

function loadSessions(year) {
    window.dashboardSystem?.loadSessions?.(year);
}

function loadSubjects(session) {
    window.dashboardSystem?.loadSubjects?.(session);
}

function loadFeaturedContent(session) {
    window.dashboardSystem?.loadFeaturedContent?.(session);
}

function goToPart(subject, part) {
    window.dashboardSystem?.goToPart?.(subject, part);
}

function goToFeatured(feature, part) {
    window.dashboardSystem?.goToFeatured?.(feature, part);
}

function attemptLogin() {
    window.dashboardSystem?.attemptLogin();
}
