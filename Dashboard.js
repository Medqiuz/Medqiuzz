document.addEventListener('DOMContentLoaded', () => {
    const DEVELOPMENT_MODE = true;

    if (!window.authSystem) return;

    const overlay = document.getElementById('protection-overlay');

    if (!DEVELOPMENT_MODE) {
        // Show overlay if user not logged in
        if (!authSystem.isAuthenticated()) {
            overlay.style.display = 'block';
            return;
        }
    } else {
        // Development mode: hide overlay
        if (overlay) overlay.style.display = 'none';
        console.log('Development mode ON: overlay disabled');
    }

    // Load user info
    const user = authSystem.getCurrentUser();
    if (user) {
        const nameEl = document.getElementById('user-name');
        const deptEl = document.getElementById('user-department');
        const yearEl = document.getElementById('user-year');
        const uniEl = document.getElementById('user-university');

        if (nameEl) nameEl.textContent = user.fullName;
        if (deptEl) deptEl.textContent = user.department;
        if (yearEl) yearEl.textContent = user.year;
        if (uniEl) uniEl.textContent = user.university;
    }

    // Disable all department styles initially
    disableDepartmentStyles();

    // Attach logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => authSystem.logout());
    }
});

function disableDepartmentStyles() {
    const pharmacyCSS = document.getElementById('pharmacy-css');
    const year2CSS = document.getElementById('year2-css');
    const session1CSS = document.getElementById('session1-css');

    if (pharmacyCSS) pharmacyCSS.disabled = true;
    if (year2CSS) year2CSS.disabled = true;
    if (session1CSS) session1CSS.disabled = true;
}

function loadPharmacyStyles() {
    const pharmacyCSS = document.getElementById('pharmacy-css');
    if (pharmacyCSS) pharmacyCSS.disabled = false;
    console.log('Pharmacy styles enabled');
}
