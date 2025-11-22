/* ------------------------------ */
/* ROOT VARIABLES */
/* ------------------------------ */
:root {
    --primary: #0077cc;
    --primary-dark: #005fa3;
    --secondary: #6a11cb;
    --light-bg: #f9fafc;
    --card-bg: #ffffff;
    --text-dark: #333;
    --text-light: #555;
    --border-radius: 16px;
}

/* ------------------------------ */
/* RESET */
/* ------------------------------ */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
}

body {
    background: var(--light-bg);
    color: var(--text-dark);
    line-height: 1.6;
}

/* ------------------------------ */
/* HEADER */
/* ------------------------------ */
.dashboard-header {
    width: 100%;
    background: var(--primary);
    color: white;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-content span {
    font-size: 24px;
    font-weight: 600;
}

.header-subtitle {
    font-size: 14px;
    opacity: 0.9;
}

.logout-btn {
    background: white;
    border: none;
    padding: 10px 18px;
    font-size: 14px;
    cursor: pointer;
    color: var(--primary-dark);
    border-radius: 10px;
    font-weight: 600;
    transition: 0.3s ease;
}

.logout-btn:hover {
    background: #e8e8e8;
}

/* ------------------------------ */
/* BREADCRUMB */
/* ------------------------------ */
.breadcrumb {
    font-size: 14px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
}

.breadcrumb a {
    text-decoration: none;
    color: var(--primary-dark);
    font-weight: 500;
}

/* ------------------------------ */
/* CONTAINER */
/* ------------------------------ */
.dashboard-container {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
}

/* ------------------------------ */
/* SECTION TITLES */
/* ------------------------------ */
.category-title {
    font-size: 22px;
    font-weight: 700;
    margin: 15px 0 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* ------------------------------ */
/* CARDS */
/* ------------------------------ */
.overview-card {
    background: var(--card-bg);
    padding: 25px;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    margin-bottom: 25px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

.overview-card h2 {
    margin-bottom: 12px;
    color: var(--primary-dark);
}

.notes-list {
    margin-top: 10px;
    padding-left: 18px;
}

.notes-list li {
    margin-bottom: 6px;
    color: var(--text-dark);
}

/* ------------------------------ */
/* PARTS GRID */
/* ------------------------------ */
.parts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.part-card {
    background: var(--card-bg);
    padding: 20px;
    border-radius: var(--border-radius);
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 10px rgba(0,0,0,0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.part-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.part-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.part-badge {
    background: var(--secondary);
    padding: 4px 10px;
    border-radius: 12px;
    color: white;
    font-size: 12px;
}

.part-info {
    margin-top: 10px;
    font-size: 13px;
    color: var(--text-light);
    display: flex;
    justify-content: space-between;
}

/* ------------------------------ */
/* IMAGES */
/* ------------------------------ */
.full-img {
    width: 100%;
    max-height: 380px;
    border-radius: 14px;
    margin-top: 15px;
    object-fit: contain;
    background: #f1f1f1;
}

/* ------------------------------ */
/* VIDEO LINKS */
/* ------------------------------ */
.overview-card a {
    color: var(--primary-dark);
    text-decoration: none;
    font-weight: 600;
}

.overview-card a:hover {
    text-decoration: underline;
}

/* ------------------------------ */
/* MOBILE RESPONSIVE */
/* ------------------------------ */
@media (max-width: 768px) {
    .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    .full-img {
        max-height: 280px;
    }
}

@media (max-width: 480px) {
    .header-content span {
        font-size: 20px;
    }
    .logout-btn {
        width: 100%;
        text-align: center;
    }
}