// State Management
const state = {
    data: null,
    currentView: 'batches', // batches, subjects, chapters, subchapters, items, viewer, search
    previousView: 'batches',
    path: [], // [batchId, subjectId, chapterId]
    currentItem: null,
    searchQuery: '',
    isFullscreenActive: false, // Persists true F11 fullscreen across note & chapter switches
};

// DOM Elements
const contentArea = document.getElementById('content-area');
const breadcrumbs = document.getElementById('breadcrumbs');
const navMenu = document.getElementById('nav-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');

// Native F11 Fullscreen Helpers
function getNativeFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
}

async function requestPureFullscreen(element) {
    const el = element || document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (req) {
        try {
            await req.call(el);
            return true;
        } catch (err) {
            console.warn('Native requestFullscreen failed:', err);
            if (el !== document.documentElement) {
                const docReq = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullscreen;
                if (docReq) {
                    try {
                        await docReq.call(document.documentElement);
                        return true;
                    } catch (e) {
                        console.warn('Fallback fullscreen failed:', e);
                    }
                }
            }
        }
    }
    return false;
}

async function exitPureFullscreen() {
    const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    if (getNativeFullscreenElement() && exit) {
        try {
            await exit.call(document);
        } catch (err) {
            console.warn('exitFullscreen failed:', err);
        }
    }
}

// Pre-computed search index for instant zero-overhead lookups
let searchIndex = [];

function buildSearchIndex() {
    searchIndex = [];
    if (!state.data || !state.data.batches) return;

    state.data.batches.forEach(batch => {
        batch.subjects.forEach(subject => {
            subject.chapters.forEach(chapter => {
                if (chapter.subchapters && chapter.subchapters.length > 0) {
                    chapter.subchapters.forEach(subchap => {
                        const items = subchap.items || [];
                        items.forEach(item => {
                            const searchBlob = [
                                item.title,
                                item.subtitle || '',
                                subchap.name,
                                subchap.author || '',
                                chapter.name,
                                subject.name,
                                batch.name
                            ].join(' ').toLowerCase();
                            searchIndex.push({
                                type: 'item',
                                batch,
                                subject,
                                chapter,
                                subchapter: subchap,
                                item,
                                searchBlob
                            });
                        });
                        const subchapBlob = [
                            subchap.name,
                            subchap.author || '',
                            subchap.description || '',
                            chapter.name,
                            subject.name,
                            batch.name
                        ].join(' ').toLowerCase();
                        searchIndex.push({
                            type: 'subchapter',
                            batch,
                            subject,
                            chapter,
                            subchapter: subchap,
                            itemCount: items.length,
                            searchBlob: subchapBlob
                        });
                    });
                } else {
                    const items = chapter.items || [];
                    items.forEach(item => {
                        const searchBlob = [
                            item.title,
                            item.subtitle || '',
                            chapter.name,
                            subject.name,
                            batch.name
                        ].join(' ').toLowerCase();
                        searchIndex.push({
                            type: 'item',
                            batch,
                            subject,
                            chapter,
                            item,
                            searchBlob
                        });
                    });
                }

                // Also index chapter so topics and chapters without uploaded PDFs can be discovered
                const chapBlob = [
                    chapter.name,
                    chapter.description || '',
                    subject.name,
                    batch.name
                ].join(' ').toLowerCase();
                const totalItemCount = chapter.subchapters
                    ? chapter.subchapters.reduce((sum, sc) => sum + (sc.items ? sc.items.length : 0), 0)
                    : (chapter.items || []).length;
                searchIndex.push({
                    type: 'chapter',
                    batch,
                    subject,
                    chapter,
                    itemCount: totalItemCount,
                    searchBlob: chapBlob
                });
            });
        });
    });
}

// ==========================================================================
// Frontend Access Control Gate (Single Source of Truth)
// ==========================================================================
const SITE_SECURITY_PASSCODE = '11223344';
const AUTH_STORAGE_KEY = 'ilberiz_auth';
const AUTH_TOKEN = 'granted';

function isUserAuthenticated() {
    try {
        const auth = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
        return auth === AUTH_TOKEN || auth === SITE_SECURITY_PASSCODE;
    } catch (e) {
        return false;
    }
}

function setAuthentication(rememberDevice) {
    try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN);
        if (rememberDevice) {
            localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN);
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    } catch (e) {}
}

function clearAuthentication() {
    try {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}
}

function setupAuthGate() {
    const authForm = document.getElementById('auth-form');
    const authInput = document.getElementById('auth-password-input');
    const authError = document.getElementById('auth-error-msg');
    const authGroup = document.getElementById('auth-input-group');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const toggleVisibilityBtn = document.getElementById('auth-toggle-visibility');
    const rememberCheckbox = document.getElementById('auth-remember-checkbox');
    const eyeIcon = document.getElementById('auth-eye-icon');
    const sidebarLockBtn = document.getElementById('sidebar-lock-btn');
    const topbarLockBtn = document.getElementById('topbar-lock-btn');

    if (toggleVisibilityBtn && authInput && eyeIcon) {
        toggleVisibilityBtn.addEventListener('click', () => {
            const isPassword = authInput.type === 'password';
            authInput.type = isPassword ? 'text' : 'password';
            eyeIcon.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    }

    if (authInput) {
        authInput.addEventListener('input', () => {
            if (authGroup && authGroup.classList.contains('has-error')) {
                authGroup.classList.remove('has-error');
            }
            if (authError) {
                authError.style.display = 'none';
            }
        });
    }

    function handleAuthSubmit(e) {
        if (e) e.preventDefault();
        if (!authInput) return;
        const entered = authInput.value.trim();

        if (entered === SITE_SECURITY_PASSCODE) {
            // Password Correct -> Unlock website
            if (authError) authError.style.display = 'none';
            if (authGroup) authGroup.classList.remove('has-error', 'shake');

            const remember = rememberCheckbox ? rememberCheckbox.checked : true;
            setAuthentication(remember);

            if (authSubmitBtn) {
                authSubmitBtn.classList.add('success');
                authSubmitBtn.innerHTML = '<span class="material-symbols-outlined btn-icon">check_circle</span><span>Access Granted!</span>';
            }

            const authGate = document.getElementById('auth-gate');
            if (authGate) {
                authGate.classList.add('unlocking');
            }

            setTimeout(() => {
                document.documentElement.classList.add('is-authenticated');
                if (authGate) {
                    authGate.classList.remove('unlocking');
                }
                // Check if a destination redirect was requested
                const urlParams = new URLSearchParams(window.location.search);
                const redirectParam = urlParams.get('redirect');
                if (redirectParam) {
                    try {
                        const decoded = decodeURIComponent(redirectParam);
                        if (decoded.startsWith('/') || decoded.startsWith('./') || decoded.startsWith('../') || decoded.startsWith('geography/') || decoded.startsWith('file://') || decoded.startsWith(window.location.origin)) {
                            window.location.replace(decoded);
                            return;
                        }
                    } catch (err) {}
                }
                startApp();
            }, 350);
        } else {
            // Password Incorrect -> Deny access
            if (authError) {
                authError.innerHTML = '<span class="material-symbols-outlined">gpp_bad</span> Incorrect password. Access denied.';
                authError.style.display = 'flex';
            }
            if (authGroup) {
                authGroup.classList.add('has-error', 'shake');
                setTimeout(() => authGroup.classList.remove('shake'), 480);
            }
            if (navigator.vibrate) {
                try { navigator.vibrate(200); } catch (e) {}
            }
            authInput.select();
            authInput.focus();
        }
    }

    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    function lockWebsite() {
        clearAuthentication();
        document.documentElement.classList.remove('is-authenticated');
        appStarted = false;
        if (contentArea) contentArea.innerHTML = '';
        if (navMenu) navMenu.innerHTML = '';
        if (authInput) {
            authInput.value = '';
            authInput.type = 'password';
            if (eyeIcon) eyeIcon.textContent = 'visibility';
            setTimeout(() => authInput.focus(), 150);
        }
        if (authSubmitBtn) {
            authSubmitBtn.classList.remove('success');
            authSubmitBtn.innerHTML = '<span class="material-symbols-outlined btn-icon">lock_open</span><span class="btn-text">Unlock Platform</span>';
        }
        if (authError) {
            authError.style.display = 'none';
        }
        if (authGroup) {
            authGroup.classList.remove('has-error', 'shake');
        }
    }

    if (sidebarLockBtn) {
        sidebarLockBtn.addEventListener('click', lockWebsite);
    }
    if (topbarLockBtn) {
        topbarLockBtn.addEventListener('click', lockWebsite);
    }
}

let appStarted = false;

// Launch Main App
async function startApp() {
    if (appStarted) return;
    appStarted = true;

    // 1. Direct local load (works when double-clicking index.html offline via file://)
    if (window.COURSE_DATA) {
        state.data = window.COURSE_DATA;
        buildSearchIndex();
        renderNav();
        renderView();
        if (contentArea) contentArea.scrollTop = 0;
        return;
    }

    // 2. Fetch data.json fallback (works when served on GitHub Pages or local HTTP server)
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        state.data = await response.json();
        buildSearchIndex();
        renderNav();
        renderView();
        if (contentArea) contentArea.scrollTop = 0;
    } catch (error) {
        contentArea.innerHTML = `
            <div class="no-results">
                <span class="material-symbols-outlined icon">error</span>
                <h3>Failed to load course data</h3>
                <p>Please ensure data.json exists and is accessible.</p>
            </div>
        `;
        console.error('Data fetch error:', error);
    }
}

// Initialize App
async function init() {
    setupMobileMenu();
    setupSearch();
    setupAuthGate();

    if (isUserAuthenticated()) {
        document.documentElement.classList.add('is-authenticated');
        startApp();
    } else {
        document.documentElement.classList.remove('is-authenticated');
        const authInput = document.getElementById('auth-password-input');
        if (authInput) {
            setTimeout(() => authInput.focus(), 150);
        }
    }
}

// Mobile Menu Setup
function setupMobileMenu() {
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebarOnMobile);
    }
}

function closeSidebarOnMobile() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
}

// Search Setup
function setupSearch() {
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.trim();

        if (clearSearchBtn) {
            if (query.length > 0) {
                clearSearchBtn.classList.remove('hidden');
            } else {
                clearSearchBtn.classList.add('hidden');
            }
        }

        debounceTimer = setTimeout(() => {
            handleSearch(query);
        }, 150);
    });

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.classList.add('hidden');
            handleSearch('');
            searchInput.focus();
        });
    }

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            handleSearch('');
            searchInput.blur();
        }
    });

    // Global keyboard shortcut: Press / or Ctrl+K anywhere to focus search
    window.addEventListener('keydown', (e) => {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        const isEditing = activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable);
        if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K'))) && !isEditing) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
    });
}

function handleSearch(query) {
    state.searchQuery = query;

    if (!query) {
        if (state.currentView === 'search') {
            state.currentView = state.previousView || 'batches';
            renderNav();
            renderBreadcrumbs();
            renderView();
        }
        return;
    }

    if (state.currentView !== 'search') {
        state.previousView = state.currentView;
        state.currentView = 'search';
    }

    renderNav();
    renderBreadcrumbs();
    renderSearchResults(query);
}

// Navigation Rendering
function renderNav() {
    if (!state.data) return;
    navMenu.innerHTML = '';

    // "All Batches" Home Item
    const homeItem = document.createElement('div');
    homeItem.className = `nav-item ${state.currentView === 'batches' && state.path.length === 0 ? 'active' : ''}`;
    homeItem.innerHTML = `
        <span class="material-symbols-outlined icon">dashboard</span>
        <span>Overview</span>
    `;
    homeItem.onclick = () => {
        closeSidebarOnMobile();
        resetSearch();
        navigateTo('batches', []);
    };
    navMenu.appendChild(homeItem);

    // Batches
    state.data.batches.forEach(batch => {
        const item = document.createElement('div');
        const isActive = state.currentView !== 'search' && state.currentView !== 'viewer' && state.path[0] === batch.id && state.path.length <= 1;
        item.className = `nav-item ${isActive ? 'active' : ''}`;
        item.innerHTML = `
            <span class="material-symbols-outlined icon">${batch.icon || 'school'}</span>
            <span>${batch.name}</span>
        `;
        item.onclick = () => {
            closeSidebarOnMobile();
            resetSearch();
            navigateTo('subjects', [batch.id]);
        };
        navMenu.appendChild(item);
    });

    // Latest Update Quick Launch: World Wars & Dictatorships (History Ch 10, 11 & 12)
    const warNav = document.createElement('div');
    const isWarActive = state.currentView !== 'search' && state.path[1] === 'sub-10-his' && (state.path[2] === 'chap-his-10' || state.path[2] === 'chap-his-11' || state.path[2] === 'chap-his-12');
    warNav.className = `nav-item nav-item-featured ${isWarActive ? 'active' : ''}`;
    warNav.innerHTML = `
        <span class="material-symbols-outlined icon" style="color: #a855f7;">public</span>
        <span style="font-weight: 600;">World Wars & Dictators</span>
        <span class="nav-badge-hot" style="background: linear-gradient(135deg, #a855f7, #6366f1); color:#fff; box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);">NEW</span>
    `;
    warNav.onclick = () => {
        closeSidebarOnMobile();
        resetSearch();
        const batch = state.data.batches.find(b => b.id === 'batch-class-10');
        const hisSub = batch?.subjects?.find(s => s.id === 'sub-10-his');
        const warChap = hisSub?.chapters?.find(c => c.id === 'chap-his-10');
        if (warChap) {
            navigateTo('items', [batch.id, hisSub.id, warChap.id]);
        }
    };
    navMenu.appendChild(warNav);
}

function resetSearch() {
    if (searchInput) {
        searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
        state.searchQuery = '';
    }
}

// Breadcrumb Rendering
function renderBreadcrumbs() {
    breadcrumbs.innerHTML = '';

    // Home
    const isHomeActive = state.currentView === 'batches' && state.path.length === 0;
    const homeBtn = document.createElement('span');
    homeBtn.className = `breadcrumb-item material-symbols-outlined ${isHomeActive ? 'active' : ''}`;
    homeBtn.textContent = 'home';
    homeBtn.title = 'Back to Overview';
    if (!isHomeActive) {
        homeBtn.onclick = () => {
            resetSearch();
            navigateTo('batches', []);
        };
    }
    breadcrumbs.appendChild(homeBtn);

    if (state.currentView === 'search') {
        addCrumbSeparator();
        const searchCrumb = document.createElement('span');
        searchCrumb.className = 'breadcrumb-item active';
        searchCrumb.textContent = `Search: "${state.searchQuery}"`;
        breadcrumbs.appendChild(searchCrumb);
        return;
    }

    if (state.path.length > 0) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        if (batch) {
            const isCurrent = state.currentView === 'subjects' && state.path.length === 1;
            addCrumb(batch.name, isCurrent ? null : () => navigateTo('subjects', [batch.id]), isCurrent);
        }
    }

    if (state.path.length > 1) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const subject = batch?.subjects?.find(s => s.id === state.path[1]);
        if (subject) {
            const isCurrent = state.currentView === 'chapters' && state.path.length === 2;
            addCrumb(subject.name, isCurrent ? null : () => navigateTo('chapters', [batch.id, subject.id]), isCurrent);
        }
    }

    if (state.path.length > 2) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const subject = batch?.subjects?.find(s => s.id === state.path[1]);
        const chapter = subject?.chapters?.find(c => c.id === state.path[2]);
        if (chapter) {
            const hasSubchap = chapter.subchapters && chapter.subchapters.length > 0;
            const isCurrent = (state.currentView === 'subchapters' || (state.currentView === 'items' && !hasSubchap)) && state.path.length === 3;
            addCrumb(chapter.name, isCurrent ? null : () => {
                if (hasSubchap) {
                    navigateTo('subchapters', [batch.id, subject.id, chapter.id]);
                } else {
                    navigateTo('items', [batch.id, subject.id, chapter.id]);
                }
            }, isCurrent);
        }
    }

    if (state.path.length > 3) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const subject = batch?.subjects?.find(s => s.id === state.path[1]);
        const chapter = subject?.chapters?.find(c => c.id === state.path[2]);
        const subchap = chapter?.subchapters?.find(sc => sc.id === state.path[3]);
        if (subchap) {
            const isCurrent = state.currentView === 'items' && state.path.length === 4;
            addCrumb(subchap.name, isCurrent ? null : () => navigateTo('items', state.path.slice(0, 4)), isCurrent);
        }
    }

    if (state.currentView === 'viewer' && state.currentItem) {
        addCrumbSeparator();
        const itemCrumb = document.createElement('span');
        itemCrumb.className = 'breadcrumb-item active';
        itemCrumb.textContent = state.currentItem.title;
        breadcrumbs.appendChild(itemCrumb);
    }
}

function addCrumbSeparator() {
    const sep = document.createElement('span');
    sep.className = 'material-symbols-outlined breadcrumb-separator';
    sep.textContent = 'chevron_right';
    breadcrumbs.appendChild(sep);
}

function addCrumb(name, onClick, isActive = false) {
    const crumb = document.createElement('span');
    crumb.className = `breadcrumb-item ${isActive ? 'active' : ''}`;
    crumb.textContent = name;
    if (onClick && !isActive) crumb.onclick = onClick;
    breadcrumbs.appendChild(crumb);
}

// Navigation Logic
function navigateTo(view, pathArgs, item = null) {
    state.currentView = view;
    state.path = pathArgs;
    state.currentItem = (view === 'viewer') ? item : null;

    renderNav();
    renderBreadcrumbs();
    renderView();
    if (contentArea) contentArea.scrollTop = 0;
}

// Main View Rendering
function renderView() {
    contentArea.innerHTML = '';
    const appContainer = document.querySelector('.app-container');
    if (contentArea) {
        contentArea.scrollTop = 0;
        if (state.currentView === 'viewer') {
            document.body.classList.add('viewer-active');
            if (appContainer) appContainer.classList.add('viewer-active');
            if (state.isFullscreenActive) {
                document.body.classList.add('theater-fullscreen-active');
                if (appContainer) appContainer.classList.add('theater-fullscreen-active');
            }
            contentArea.classList.add('viewer-active');
        } else {
            state.isFullscreenActive = false;
            exitPureFullscreen();
            document.body.classList.remove('viewer-active');
            document.body.classList.remove('theater-fullscreen-active');
            if (appContainer) {
                appContainer.classList.remove('viewer-active');
                appContainer.classList.remove('theater-fullscreen-active');
                appContainer.classList.remove('sidebar-collapsed');
            }
            contentArea.classList.remove('viewer-active');
        }
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    if (state.currentView === 'batches') {
        const batch = state.data.batches[0]; // Class 10th

        // Executive Hero Header & Dashboard Spotlight
        const heroSection = document.createElement('div');
        heroSection.className = 'dashboard-hero-banner';
        heroSection.innerHTML = `
            <div class="hero-crest-badge">
                <span class="material-symbols-outlined">workspace_premium</span>
                <span>CISCE Board Curriculum 2025–2027</span>
            </div>
            <h1 class="hero-title">Ilberiz Techz <span class="text-gradient">IIT Kanpur</span></h1>
            <p class="hero-description">The authoritative Class 10th ICSE study vault & examination platform. Access high-yield theory notes, board specimen blueprints, and interactive DPP test engines.</p>
            
            <div class="hero-stats-row">
                <div class="hero-stat-card">
                    <span class="stat-number">9</span>
                    <span class="stat-label">Prescribed Subjects</span>
                </div>
                <div class="hero-stat-card">
                    <span class="stat-number">45+</span>
                    <span class="stat-label">Full Class Notes</span>
                </div>
                <div class="hero-stat-card">
                    <span class="stat-number">12+</span>
                    <span class="stat-label">Interactive Engines</span>
                </div>
                <div class="hero-stat-card">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Board Aligned</span>
                </div>
            </div>
        `;
        wrapper.appendChild(heroSection);

        // Fast-Track Study Spotlight
        const spotlightSection = document.createElement('div');
        spotlightSection.className = 'spotlight-section';
        spotlightSection.innerHTML = `
            <div class="spotlight-header">
                <div class="spotlight-header-left">
                    <span class="material-symbols-outlined icon">bolt</span>
                    <h3>High-Yield Fast Track</h3>
                </div>
                <span class="spotlight-sub">Jump straight to top requested resources</span>
            </div>
            <div class="spotlight-chips-grid">
                <button class="spotlight-chip featured-chip" id="spot-his-ww1" type="button">
                    <span class="material-symbols-outlined" style="color: #a855f7;">public</span>
                    <span class="spotlight-chip-text">History • First World War</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #a855f7, #6366f1);">NEW</span>
                </button>
                <button class="spotlight-chip featured-chip" id="spot-his-ww2" type="button">
                    <span class="material-symbols-outlined" style="color: #ef4444;">military_tech</span>
                    <span class="spotlight-chip-text">History • Second World War Notes</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #ef4444, #f97316);">NEW</span>
                </button>
                <button class="spotlight-chip featured-chip" id="spot-his-dict" type="button">
                    <span class="material-symbols-outlined" style="color: #f59e0b;">gavel</span>
                    <span class="spotlight-chip-text">History • Rise of Dictatorships</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #f59e0b, #d97706);">NEW</span>
                </button>
                <button class="spotlight-chip featured-chip" id="spot-his-quit" type="button">
                    <span class="material-symbols-outlined" style="color: #f43f5e;">flag</span>
                    <span class="spotlight-chip-text">History • Quit India Movement</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #f43f5e, #f97316);">NEW</span>
                </button>
                <button class="spotlight-chip featured-chip" id="spot-his-indep" type="button">
                    <span class="material-symbols-outlined" style="color: #10b981;">handshake</span>
                    <span class="spotlight-chip-text">History • Independence & Partition</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #10b981, #059669);">NEW</span>
                </button>
                <button class="spotlight-chip featured-chip" id="spot-his-1857" type="button">
                    <span class="material-symbols-outlined" style="color: #38bdf8;">swords</span>
                    <span class="spotlight-chip-text">History • 1857 Revolt Vault</span>
                    <span class="chip-badge-hot" style="background: linear-gradient(135deg, #0ea5e9, #6366f1);">HOT</span>
                </button>
            </div>
        `;
        wrapper.appendChild(spotlightSection);

        // Bind Spotlight Clicks
        const spotWW1 = spotlightSection.querySelector('#spot-his-ww1');
        if (spotWW1 && batch) {
            spotWW1.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-10']);
        }
        const spotWW2 = spotlightSection.querySelector('#spot-his-ww2');
        if (spotWW2 && batch) {
            spotWW2.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-12']);
        }
        const spotDict = spotlightSection.querySelector('#spot-his-dict');
        if (spotDict && batch) {
            spotDict.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-11']);
        }
        const spotQuit = spotlightSection.querySelector('#spot-his-quit');
        if (spotQuit && batch) {
            spotQuit.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-7']);
        }
        const spotIndep = spotlightSection.querySelector('#spot-his-indep');
        if (spotIndep && batch) {
            spotIndep.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-9']);
        }
        const spot1857 = spotlightSection.querySelector('#spot-his-1857');
        if (spot1857 && batch) {
            spot1857.onclick = () => navigateTo('items', [batch.id, 'sub-10-his', 'chap-his-1']);
        }

        const header = createSectionHeader('Curriculum Classes', 'Choose your curriculum level to explore subjects, study notes & lectures');
        wrapper.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        state.data.batches.forEach((b, idx) => {
            const subjectNames = b.subjects ? b.subjects.map(s => s.name).slice(0, 7).join(' • ') + '...' : '';
            grid.appendChild(createCard({
                title: b.name + ' ICSE Board Preparation',
                subtitle: b.description || 'Comprehensive study notes, solutions, and lectures',
                icon: b.icon || 'school',
                onClick: () => navigateTo('subjects', [b.id]),
                badge: `${b.subjects.length} Prescribed Subjects`,
                actionText: 'Explore All 9 Subjects',
                index: idx,
                extraMeta: `<span class="curriculum-preview-pills">${subjectNames}</span>`
            }));
        });
        wrapper.appendChild(grid);
    } 
    else if (state.currentView === 'subjects') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        if (!batch) return;

        const header = createSectionHeader(batch.name + ' Prescribed Subjects', `${batch.description} • CISCE Class 10 Syllabus`);
        wrapper.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        batch.subjects.forEach((sub, idx) => {
            const totalItems = sub.chapters.reduce((sum, chap) => sum + (chap.items ? chap.items.length : 0), 0);
            const badgeText = totalItems > 0 ? `${sub.chapters.length} Ch • ${totalItems} Notes` : `${sub.chapters.length} Chapters`;
            
            grid.appendChild(createCard({
                title: sub.name,
                subtitle: sub.description,
                icon: sub.icon || 'menu_book',
                onClick: () => navigateTo('chapters', [batch.id, sub.id]),
                badge: badgeText,
                actionText: 'Open Chapters',
                index: idx,
                subjectId: sub.id
            }));
        });
        wrapper.appendChild(grid);
    }
    else if (state.currentView === 'chapters') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const sub = batch?.subjects?.find(s => s.id === state.path[1]);
        if (!sub) return;

        const header = createSectionHeader(sub.name, `${batch.name} • Select a chapter to read notes and solutions`);
        wrapper.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        sub.chapters.forEach((chap, idx) => {
            const hasSub = chap.subchapters && chap.subchapters.length > 0;
            let count = 0;
            let badgeText = '';
            let actionText = 'View Notes';

            if (hasSub) {
                const totalNotes = chap.subchapters.reduce((sum, sc) => sum + (sc.items ? sc.items.length : 0), 0);
                const isPoemCollection = chap.id === 'chap-eng-2';
                const unitType = isPoemCollection ? 'Poems' : 'Stories';
                badgeText = totalNotes > 0 ? `${chap.subchapters.length} ${unitType} • ${totalNotes} Notes` : `${chap.subchapters.length} ${unitType}`;
                actionText = `Explore ${unitType}`;
            } else {
                count = chap.items ? chap.items.length : 0;
                badgeText = chap.featured ? 'Interactive DPP' : (count > 0 ? `${count} Notes Ready` : 'In Progress');
                actionText = chap.featured ? 'Open Engine' : 'View Notes';
            }
            const iconName = chap.featured ? 'bolt' : 'auto_stories';
            
            const cardEl = createCard({
                title: chap.name,
                subtitle: chap.description || `${count} available study resources`,
                icon: iconName,
                onClick: () => {
                    if (hasSub) {
                        navigateTo('subchapters', [batch.id, sub.id, chap.id]);
                    } else {
                        navigateTo('items', [batch.id, sub.id, chap.id]);
                    }
                },
                badge: badgeText,
                isInteractive: !!chap.featured,
                actionText: actionText,
                index: idx,
                subjectId: sub.id
            });
            if (chap.featured) cardEl.classList.add('card-featured');
            grid.appendChild(cardEl);
        });
        wrapper.appendChild(grid);
    }
    else if (state.currentView === 'subchapters') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const sub = batch?.subjects?.find(s => s.id === state.path[1]);
        const chap = sub?.chapters?.find(c => c.id === state.path[2]);
        if (!chap) return;

        const isPoemCollection = chap.id === 'chap-eng-2';
        const unitType = isPoemCollection ? 'Poems' : 'Short Stories';
        const header = createSectionHeader(chap.name, `${sub.name} • All 5 Prescribed ${unitType} for ICSE Class 10`);
        wrapper.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        (chap.subchapters || []).forEach((subchap, idx) => {
            const count = subchap.items ? subchap.items.length : 0;
            const badgeText = count > 0 ? `${count} Note${count === 1 ? '' : 's'} Ready` : 'In Progress';
            const cardEl = createCard({
                title: subchap.name,
                subtitle: subchap.author ? `${subchap.author} • ${subchap.description}` : subchap.description,
                icon: 'menu_book',
                onClick: () => navigateTo('items', [batch.id, sub.id, chap.id, subchap.id]),
                badge: badgeText,
                actionText: count > 0 ? 'View Notes' : 'Open Chapter',
                index: idx
            });
            grid.appendChild(cardEl);
        });
        wrapper.appendChild(grid);
    }
    else if (state.currentView === 'items') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const sub = batch?.subjects?.find(s => s.id === state.path[1]);
        const chap = sub?.chapters?.find(c => c.id === state.path[2]);
        if (!chap) return;

        const subchap = (state.path.length >= 4 && chap.subchapters)
            ? chap.subchapters.find(sc => sc.id === state.path[3])
            : null;

        const currentTarget = subchap || chap;
        const parentTitle = subchap ? chap.name : sub.name;
        const header = createSectionHeader(currentTarget.name, `${parentTitle} • Class Notes & Study Material`);
        wrapper.appendChild(header);

        const items = currentTarget.items || [];
        if (items.length === 0) {
            const emptyBox = document.createElement('div');
            emptyBox.className = 'empty-chapter-box';
            emptyBox.innerHTML = `
                <span class="material-symbols-outlined icon">cloud_sync</span>
                <h3>Notes Being Uploaded for ${currentTarget.name}</h3>
                <p>The notes and lecture modules for this ${subchap ? 'chapter' : 'section'} are currently in progress. You can explore available notes across the curriculum!</p>
                <div style="margin-top: 20px;">
                    <button class="viewer-btn primary" id="jump-back-btn">
                        <span class="material-symbols-outlined">arrow_back</span> ${subchap ? 'Back to ' + chap.name : 'Back to Chapters'}
                    </button>
                </div>
            `;
            wrapper.appendChild(emptyBox);

            const jumpBtn = emptyBox.querySelector('#jump-back-btn');
            if (jumpBtn) {
                jumpBtn.onclick = () => {
                    if (subchap) {
                        navigateTo('subchapters', [batch.id, sub.id, chap.id]);
                    } else {
                        navigateTo('chapters', [batch.id, sub.id]);
                    }
                };
            }
        } else {
            const grid = document.createElement('div');
            grid.className = 'cards-grid';
            items.forEach((item, idx) => {
                const isInter = item.type === 'interactive' || item.type === 'app';
                const isPdf = item.type === 'pdf';
                const cardEl = createCard({
                    title: item.title,
                    subtitle: item.subtitle || 'High-yield comprehensive notes with diagrams',
                    icon: isInter ? 'quiz' : (isPdf ? 'picture_as_pdf' : 'play_circle'),
                    onClick: () => navigateTo('viewer', state.path, item),
                    badge: item.badge || (isPdf ? `PDF • ${item.size || 'Notes'}` : 'Video Lecture'),
                    isPdf: isPdf,
                    isInteractive: isInter,
                    actionText: isInter ? 'Launch Engine' : (isPdf ? 'Read Notes' : 'Watch Lecture'),
                    index: idx
                });
                if (isInter) cardEl.classList.add('card-featured');
                grid.appendChild(cardEl);
            });
            wrapper.appendChild(grid);
        }
    }
    else if (state.currentView === 'viewer') {
        if (state.currentItem?.type === 'pdf') {
            wrapper.appendChild(createPdfViewer(state.currentItem));
        } else if (state.currentItem?.type === 'interactive' || state.currentItem?.type === 'app') {
            wrapper.appendChild(createInteractiveViewer(state.currentItem));
        } else {
            wrapper.appendChild(createVideoPlayer(state.currentItem));
        }
    }

    contentArea.appendChild(wrapper);
}

// Search Results Rendering
function renderSearchResults(query) {
    contentArea.innerHTML = '';
    if (contentArea) contentArea.scrollTop = 0;
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    const normalizedQuery = query.toLowerCase();
    const itemResults = [];
    const chapterResults = [];
    const seenChapterIds = new Set();

    searchIndex.forEach(entry => {
        if (!entry.searchBlob.includes(normalizedQuery)) return;
        if (entry.type === 'item') {
            itemResults.push(entry);
            seenChapterIds.add(entry.subchapter ? entry.subchapter.id : entry.chapter.id);
        } else if (entry.type === 'chapter' || entry.type === 'subchapter') {
            const id = entry.subchapter ? entry.subchapter.id : entry.chapter.id;
            if (!seenChapterIds.has(id)) {
                chapterResults.push(entry);
            }
        }
    });

    const standaloneChapters = chapterResults.filter(ch => !seenChapterIds.has(ch.subchapter ? ch.subchapter.id : ch.chapter.id));
    const totalResults = itemResults.length + standaloneChapters.length;

    const header = createSectionHeader(
        `Search Results for "${query}"`,
        `Found ${totalResults} matching study resource${totalResults === 1 ? '' : 's'}`
    );
    wrapper.appendChild(header);

    if (totalResults === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'no-results';
        emptyState.innerHTML = `
            <span class="material-symbols-outlined icon">search_off</span>
            <h3>No matching notes found</h3>
            <p>Try searching for topics like "Julius Caesar", "Act 3 Scene 1", "Act 3 Scene 2", "Antony Speech", "Mahatma Gandhi", "Dandi March", "Simon Commission", "Civil Disobedience", "Chauri Chaura", "Rowlatt Act", "Jallianwala Bagh", "Non-Cooperation", "Muslim League", "1857", "Nationalism", "First Phase", "Second Phase", "Climate", "Soil", "Vegetation", "Water", "Energy", "GST" or "Trigonometry".</p>
        `;
        wrapper.appendChild(emptyState);
    } else {
        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        let cardIndex = 0;

        // 1. Direct Item Matches (Notes & Interactive Engines)
        itemResults.forEach((res) => {
            const isInter = res.item.type === 'interactive' || res.item.type === 'app';
            const isPdf = res.item.type === 'pdf';
            const itemPath = res.subchapter
                ? [res.batch.id, res.subject.id, res.chapter.id, res.subchapter.id]
                : [res.batch.id, res.subject.id, res.chapter.id];
            const targetSubtitle = res.subchapter
                ? `${res.batch.name} • ${res.subject.name} • ${res.subchapter.name}`
                : `${res.batch.name} • ${res.subject.name} • ${res.chapter.name}`;
            const card = createCard({
                title: res.item.title,
                subtitle: targetSubtitle,
                icon: isInter ? 'quiz' : (isPdf ? 'picture_as_pdf' : 'play_circle'),
                onClick: () => {
                    resetSearch();
                    navigateTo('viewer', itemPath, res.item);
                },
                badge: isInter ? 'Interactive Engine' : res.subject.name,
                isPdf: isPdf,
                isInteractive: isInter,
                actionText: isInter ? 'Launch Engine' : (isPdf ? 'Read Notes' : 'Watch Lecture'),
                index: cardIndex++
            });
            if (isInter) card.classList.add('card-featured');
            grid.appendChild(card);
        });

        // 2. Standalone Chapter Matches (for subject/chapter searches)
        standaloneChapters.forEach((res) => {
            const isSub = !!res.subchapter;
            const targetTitle = isSub ? res.subchapter.name : res.chapter.name;
            const targetSubtitle = isSub
                ? `${res.batch.name} • ${res.subject.name} • ${res.chapter.name} • ${res.subchapter.author || res.subchapter.description || ''}`
                : `${res.batch.name} • ${res.subject.name} • ${res.chapter.description || 'Chapter Overview'}`;
            const count = res.itemCount;
            const card = createCard({
                title: targetTitle,
                subtitle: targetSubtitle,
                icon: 'auto_stories',
                onClick: () => {
                    resetSearch();
                    if (isSub) {
                        navigateTo('items', [res.batch.id, res.subject.id, res.chapter.id, res.subchapter.id]);
                    } else if (res.chapter.subchapters && res.chapter.subchapters.length > 0) {
                        navigateTo('subchapters', [res.batch.id, res.subject.id, res.chapter.id]);
                    } else {
                        navigateTo('items', [res.batch.id, res.subject.id, res.chapter.id]);
                    }
                },
                badge: count > 0 ? `${count} Note${count === 1 ? '' : 's'} Ready` : 'Class 10 Syllabus',
                isPdf: false,
                isInteractive: false,
                actionText: count > 0 ? 'View Notes' : 'Open Chapter',
                index: cardIndex++
            });
            grid.appendChild(card);
        });

        wrapper.appendChild(grid);
    }

    contentArea.appendChild(wrapper);
}

// UI Helpers
function createSectionHeader(title, subtitle) {
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
        <div>
            <h2>${title}</h2>
            <p>${subtitle}</p>
        </div>
    `;
    return header;
}

function createCard({ title, subtitle, icon, onClick, badge = null, isPdf = false, isInteractive = false, actionText = 'Explore', index = 0, subjectId = null, extraMeta = null }) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.style.setProperty('--i', Math.min(index, 10));
    if (subjectId) {
        card.setAttribute('data-subject', subjectId);
    }
    card.onclick = onClick;
    card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick();
        }
    };
    
    let iconClass = 'card-icon';
    let badgeClass = 'card-badge';
    if (isInteractive) {
        iconClass = 'card-icon interactive-icon';
        badgeClass = 'card-badge interactive-badge';
    } else if (isPdf) {
        iconClass = 'card-icon pdf-icon';
        badgeClass = 'card-badge pdf-badge';
    }

    card.innerHTML = `
        <div class="card-top">
            <div class="${iconClass}">
                <span class="material-symbols-outlined">${icon}</span>
            </div>
            ${badge ? `<span class="${badgeClass}">${isInteractive ? '<span class="live-pulse-dot"></span>' : ''}${badge}</span>` : ''}
        </div>
        <div class="card-content">
            <h3>${title}</h3>
            <p>${subtitle}</p>
            ${extraMeta ? `<div class="card-extra-meta">${extraMeta}</div>` : ''}
        </div>
        <div class="card-footer-action">
            <span>${actionText}</span>
            <span class="material-symbols-outlined">arrow_forward</span>
        </div>
    `;
    return card;
}

// Interactive App & DPP Engine Viewer Component
function createInteractiveViewer(item) {
    const container = document.createElement('div');
    container.className = 'interactive-viewer-container';

    const currentSubName = state.currentSubject?.name || 'ICSE 2027';

    // Header
    const header = document.createElement('div');
    header.className = 'viewer-header';
    header.innerHTML = `
        <div class="viewer-title-wrap">
            <span class="lecture-badge" style="color: #38bdf8; display:flex; align-items:center; gap:5px;">
                <span class="material-symbols-outlined" style="font-size:16px;">bolt</span>
                Interactive Engine • ICSE 2027 ${currentSubName}
            </span>
            <h2>${item.title}</h2>
        </div>
        <div class="viewer-actions">
            <button class="viewer-btn" id="interactive-back-btn">
                <span class="material-symbols-outlined">arrow_back</span> Back
            </button>
            <a href="${item.file}" target="_blank" rel="noopener noreferrer" class="viewer-btn primary" title="Open in dedicated full screen tab">
                <span class="material-symbols-outlined">open_in_new</span> Fullscreen Tab
            </a>
            <button class="viewer-btn" id="interactive-reload-btn" title="Reset or Reload Session">
                <span class="material-symbols-outlined">refresh</span> Reload
            </button>
        </div>
    `;

    // Frame Wrapper
    const frameWrapper = document.createElement('div');
    frameWrapper.className = 'interactive-frame-wrapper';

    const iframe = document.createElement('iframe');
    iframe.src = item.file;
    iframe.className = 'interactive-iframe';
    iframe.title = item.title;
    iframe.setAttribute('allow', 'fullscreen');

    frameWrapper.appendChild(iframe);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'viewer-footer';
    footer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #38bdf8;">quiz</span>
            <span>${item.subtitle || `ICSE 2027 ${currentSubName} Interactive Engine`}</span>
        </div>
        <div>
            <span>${item.badge || 'High-Yield Engine • Automated Feedback & Diagnostics'}</span>
        </div>
    `;

    container.appendChild(header);
    container.appendChild(frameWrapper);
    container.appendChild(footer);

    header.querySelector('#interactive-back-btn').onclick = () => {
        navigateTo('items', state.path.slice(0, 3));
    };

    header.querySelector('#interactive-reload-btn').onclick = () => {
        iframe.src = item.file;
    };

    return container;
}

// PDF Reader & Viewer Component with Fullscreen, In-Chapter Note Switcher, Persistent Slides & Chapter Switcher
let activeViewerCleanup = null;

// High-Responsiveness Pointer & Click Binder
// Fixes browser focus de-activation delays when clicking HTML UI out of native PDF plugins
function bindInstantClick(btn, action) {
    if (!btn) return;
    let lastTrigger = 0;
    const trigger = (e) => {
        if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') {
            return;
        }
        const now = Date.now();
        // 450ms debounce prevents synthetic mouse/click events emitted 300ms after touchstart from double-firing
        if (now - lastTrigger < 450) {
            if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
            if (e && typeof e.preventDefault === 'function') e.preventDefault();
            return;
        }
        lastTrigger = now;
        window.focus();
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        action(e);
    };

    // Primary events: pointerdown fires immediately on the very first touch/mouse press before browser click suppression
    btn.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return; // Only primary button
        trigger(e);
    });
    // Universal click fallback (keyboard Enter/Space, accessibility tools)
    btn.addEventListener('click', trigger);

    // Proactively reclaim window focus the instant mouse cursor enters the button
    btn.addEventListener('pointerenter', () => window.focus(), { passive: true });
    btn.addEventListener('mouseenter', () => window.focus(), { passive: true });
}

function createPdfViewer(initialItem) {
    if (activeViewerCleanup) {
        activeViewerCleanup();
        activeViewerCleanup = null;
    }

    const container = document.createElement('div');
    container.className = 'pdf-viewer-container';
    container.setAttribute('tabindex', '-1');
    container.style.outline = 'none';

    // Contextual Data
    const batch = state.data.batches.find(b => b.id === state.path[0]);
    const subject = batch?.subjects?.find(s => s.id === state.path[1]);
    let currentChapter = subject?.chapters?.find(c => c.id === state.path[2]);
    let currentSubchapter = (state.path.length >= 4 && currentChapter?.subchapters)
        ? currentChapter.subchapters.find(sc => sc.id === state.path[3])
        : null;

    let activeContainer = currentSubchapter || currentChapter;
    const allChapters = currentSubchapter ? currentChapter.subchapters : (subject?.chapters || []);
    let chapterNotes = (activeContainer?.items || []).filter(it => it.type === 'pdf');

    // Live DOM iframe cache: preserves exact reading slide & zoom when switching notes
    const iframeCache = new Map();
    let currentNoteItem = initialItem;
    let isTheaterFullscreen = !!state.isFullscreenActive;

    // Header element
    const header = document.createElement('div');
    header.className = 'viewer-header';

    // Build Chapter Dropdown items
    const currentChapIdx = allChapters.findIndex(c => c.id === activeContainer?.id);
    const prevChapter = currentChapIdx > 0 ? allChapters[currentChapIdx - 1] : null;
    const nextChapter = currentChapIdx >= 0 && currentChapIdx < allChapters.length - 1 ? allChapters[currentChapIdx + 1] : null;

    let chapterDropdownHtml = '';
    allChapters.forEach((chap) => {
        const pCount = (chap.items || []).filter(i => i.type === 'pdf').length;
        const iCount = (chap.items || []).filter(i => i.type === 'interactive' || i.type === 'app').length;
        let badgeHtml = '';
        if (pCount > 0) {
            badgeHtml = `<span class="chap-drop-badge notes">${pCount} Note${pCount === 1 ? '' : 's'}</span>`;
        } else if (iCount > 0) {
            badgeHtml = `<span class="chap-drop-badge dpp">Theory Vault</span>`;
        } else {
            badgeHtml = `<span class="chap-drop-badge empty">In Progress</span>`;
        }
        const isActive = chap.id === activeContainer?.id;
        const chapLabel = chap.name.includes(':') ? chap.name.split(':')[0] : (currentSubchapter ? 'Poem' : 'Ch');
        const chapTitle = chap.name.includes(':') ? chap.name.split(':').slice(1).join(':').trim() : chap.name;

        chapterDropdownHtml += `
            <div class="chapter-dropdown-item ${isActive ? 'active' : ''}" data-chap-id="${chap.id}">
                <div class="chap-drop-info">
                    <span class="chap-drop-num">${chapLabel}</span>
                    <span class="chap-drop-title">${chapTitle}</span>
                </div>
                ${badgeHtml}
            </div>
        `;
    });

    header.innerHTML = `
        <div class="viewer-left-group">
            <button class="viewer-btn" id="viewer-back-btn" title="Back to Chapter Grid">
                <span class="material-symbols-outlined">arrow_back</span>
                <span class="btn-label">Back</span>
            </button>
            <div class="chapter-select-wrapper" id="chapter-select-wrapper">
                <button class="viewer-btn chapter-select-btn" id="chapter-select-btn" title="Switch ${currentSubchapter ? 'Chapter' : 'Chapter'} in ${currentSubchapter ? currentChapter?.name || 'Collection' : subject?.name || 'Subject'}">
                    <span class="material-symbols-outlined icon">menu_book</span>
                    <span class="chapter-select-text">${activeContainer?.name || 'Chapter'}</span>
                    <span class="material-symbols-outlined arrow">expand_more</span>
                </button>
                <div class="chapter-dropdown-menu" id="chapter-dropdown-menu">
                    <div class="chapter-dropdown-header">
                        <span>${currentSubchapter ? currentChapter?.name || 'Collection' : 'Chapters in ' + (subject?.name || 'Subject')}</span>
                        <div class="chapter-nav-quick">
                            <button class="chap-quick-btn" id="quick-prev-chap" ${!prevChapter ? 'disabled' : ''} title="Previous Chapter">
                                <span class="material-symbols-outlined">arrow_back_ios</span>
                            </button>
                            <button class="chap-quick-btn" id="quick-next-chap" ${!nextChapter ? 'disabled' : ''} title="Next Chapter">
                                <span class="material-symbols-outlined">arrow_forward_ios</span>
                            </button>
                        </div>
                    </div>
                    <div class="chapter-dropdown-list">
                        ${chapterDropdownHtml}
                    </div>
                </div>
            </div>
        </div>

        <div class="viewer-center-group"></div>

        <div class="viewer-actions">
            <button class="viewer-btn viewer-fullscreen-btn" id="viewer-fullscreen-btn" title="Full Screen View (Press F or F11)">
                <span class="material-symbols-outlined">fullscreen</span>
                <span class="btn-label">Fullscreen</span>
            </button>
            <a href="${initialItem.file}" target="_blank" rel="noopener noreferrer" class="viewer-btn icon-only-mobile" id="viewer-newtab-btn" title="Open PDF in Browser Tab">
                <span class="material-symbols-outlined">open_in_new</span>
                <span class="btn-label">New Tab</span>
            </a>
            <a href="${initialItem.file}" download="${initialItem.title}.pdf" class="viewer-btn primary icon-only-mobile" id="viewer-download-btn" title="Download Offline Copy">
                <span class="material-symbols-outlined">download</span>
                <span class="btn-label">Download</span>
            </a>
        </div>
    `;

    // Frame Wrapper for Persistent Iframes
    const frameWrapper = document.createElement('div');
    frameWrapper.className = 'pdf-frame-wrapper';

    // Floating Edge Note Navigation Buttons (Effortless 1-click note switching)
    const floatPrevBtn = document.createElement('button');
    floatPrevBtn.className = 'floating-note-nav prev-note-float';
    floatPrevBtn.id = 'float-prev-note';
    floatPrevBtn.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';
    floatPrevBtn.setAttribute('aria-label', 'Previous Note');

    const floatNextBtn = document.createElement('button');
    floatNextBtn.className = 'floating-note-nav next-note-float';
    floatNextBtn.id = 'float-next-note';
    floatNextBtn.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';
    floatNextBtn.setAttribute('aria-label', 'Next Note');

    bindInstantClick(floatPrevBtn, (e) => {
        const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
        if (curIdx > 0) showNote(chapterNotes[curIdx - 1]);
    });

    bindInstantClick(floatNextBtn, (e) => {
        const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
        if (curIdx < chapterNotes.length - 1 && curIdx !== -1) {
            showNote(chapterNotes[curIdx + 1]);
        }
    });

    frameWrapper.appendChild(floatPrevBtn);
    frameWrapper.appendChild(floatNextBtn);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'viewer-footer';
    footer.innerHTML = `
        <div class="viewer-footer-left">
            <span class="material-symbols-outlined" style="color: #f87171;">picture_as_pdf</span>
            <span id="footer-note-title" class="footer-note-title">${initialItem.title}</span>
            <span class="footer-badge" id="footer-note-size">${initialItem.size || 'Document'}</span>
        </div>
        <div class="viewer-footer-right">
            <span class="viewer-shortcut-hint"><kbd>F11</kbd> / <kbd>F</kbd> Fullscreen</span>
            <span class="viewer-shortcut-hint"><kbd>Esc</kbd> Exit</span>
            <span class="viewer-shortcut-hint"><kbd>[</kbd> / <kbd>]</kbd> Switch Notes</span>
        </div>
    `;

    container.appendChild(header);
    container.appendChild(frameWrapper);
    container.appendChild(footer);

    // Proactive Window Focus Reclamation: When cursor hovers over header, controls, or footer,
    // seamlessly bring window focus back to main document so single clicks and key shortcuts work on the very first event
    header.addEventListener('pointerenter', () => window.focus(), { passive: true });
    header.addEventListener('mouseenter', () => window.focus(), { passive: true });
    header.addEventListener('pointerdown', () => window.focus(), { passive: true });
    header.addEventListener('mousedown', () => window.focus(), { passive: true });

    footer.addEventListener('pointerenter', () => window.focus(), { passive: true });
    footer.addEventListener('pointerdown', () => window.focus(), { passive: true });

    const newTabLink = header.querySelector('#viewer-newtab-btn');
    if (newTabLink) newTabLink.addEventListener('pointerenter', () => window.focus(), { passive: true });
    const downloadLink = header.querySelector('#viewer-download-btn');
    if (downloadLink) downloadLink.addEventListener('pointerenter', () => window.focus(), { passive: true });

    const fullscreenBtn = header.querySelector('#viewer-fullscreen-btn');
    if (isTheaterFullscreen) {
        container.classList.add('theater-fullscreen');
        document.body.classList.add('theater-fullscreen-active');
        const appContainer = document.querySelector('.app-container');
        if (appContainer) appContainer.classList.add('theater-fullscreen-active');
        if (fullscreenBtn) {
            fullscreenBtn.classList.add('active');
            const iconEl = fullscreenBtn.querySelector('.material-symbols-outlined');
            const labelEl = fullscreenBtn.querySelector('.btn-label');
            if (iconEl) iconEl.textContent = 'fullscreen_exit';
            if (labelEl) labelEl.textContent = 'Exit';
            fullscreenBtn.title = 'Exit Fullscreen (Esc, F, or F11)';
        }
        if (!getNativeFullscreenElement()) {
            requestPureFullscreen(container);
        }
    }

    // Note Switcher Function preserving live DOM scroll & slide position
    function showNote(targetItem) {
        if (!targetItem) return;
        currentNoteItem = targetItem;
        state.currentItem = targetItem;
        renderBreadcrumbs();

        // 1. Update Note Tabs UI
        const pillBtns = header.querySelectorAll('.note-pill-btn');
        pillBtns.forEach(pill => {
            if (pill.dataset.noteId === targetItem.id) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });

        const curIdx = chapterNotes.findIndex(n => n.id === targetItem.id);
        const prevNoteBtn = header.querySelector('#prev-note-btn');
        const nextNoteBtn = header.querySelector('#next-note-btn');
        if (prevNoteBtn) prevNoteBtn.disabled = (curIdx <= 0);
        if (nextNoteBtn) nextNoteBtn.disabled = (curIdx >= chapterNotes.length - 1 || curIdx === -1);

        // Update Floating Edge Chevrons
        if (floatPrevBtn) {
            floatPrevBtn.style.display = (chapterNotes.length > 1 && curIdx > 0) ? 'flex' : 'none';
            floatPrevBtn.title = (curIdx > 0) ? `Previous Note (${chapterNotes[curIdx - 1]?.title || ''})` : '';
        }
        if (floatNextBtn) {
            floatNextBtn.style.display = (chapterNotes.length > 1 && curIdx < chapterNotes.length - 1 && curIdx !== -1) ? 'flex' : 'none';
            floatNextBtn.title = (curIdx < chapterNotes.length - 1 && curIdx !== -1) ? `Next Note (${chapterNotes[curIdx + 1]?.title || ''})` : '';
        }

        // 2. Manage Iframes without destroying: keep active in view, hide inactive
        let activeIframe = iframeCache.get(targetItem.id);
        if (!activeIframe) {
            activeIframe = document.createElement('iframe');
            activeIframe.className = 'pdf-iframe active';
            activeIframe.title = targetItem.title;
            activeIframe.setAttribute('allow', 'fullscreen');

            const savedPage = localStorage.getItem('icse_last_page_' + targetItem.id);
            const pageHash = savedPage ? `#page=${savedPage}&view=Fit` : '#view=Fit';
            activeIframe.src = `${targetItem.file}${pageHash}`;

            frameWrapper.appendChild(activeIframe);
            iframeCache.set(targetItem.id, activeIframe);
        } else {
            activeIframe.className = 'pdf-iframe active';
        }

        // Hide other iframes smoothly while keeping them mounted in DOM
        iframeCache.forEach((frame, id) => {
            if (id !== targetItem.id) {
                frame.className = 'pdf-iframe inactive';
            }
        });

        // 3. Update actions & footer
        const newTabBtn = header.querySelector('#viewer-newtab-btn');
        if (newTabBtn) newTabBtn.href = targetItem.file;

        const downloadBtn = header.querySelector('#viewer-download-btn');
        if (downloadBtn) {
            downloadBtn.href = targetItem.file;
            downloadBtn.download = `${targetItem.title}.pdf`;
        }

        const footerTitle = footer.querySelector('#footer-note-title');
        if (footerTitle) footerTitle.textContent = targetItem.title;

        const footerSize = footer.querySelector('#footer-note-size');
        if (footerSize) footerSize.textContent = targetItem.size || 'Document';
    }

    // Render Center Note Tabs dynamically
    function renderNoteTabsUI() {
        const centerGroup = header.querySelector('.viewer-center-group');
        if (!centerGroup) return;

        let noteTabsHtml = '';
        if (chapterNotes.length > 1) {
            let pillsHtml = '';
            chapterNotes.forEach((note, idx) => {
                const isActive = note.id === currentNoteItem.id;
                pillsHtml += `
                    <button class="note-pill-btn ${isActive ? 'active' : ''}" data-note-id="${note.id}" title="${note.title}">
                        <span class="material-symbols-outlined pill-icon">description</span>
                        <span>Note ${String(idx + 1).padStart(2, '0')}</span>
                    </button>
                `;
            });
            noteTabsHtml = `
                <div class="notes-tab-group">
                    <button class="note-nav-arrow" id="prev-note-btn" title="Previous Note (Alt + ←)">
                        <span class="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div class="note-pills-container">
                        ${pillsHtml}
                    </div>
                    <button class="note-nav-arrow" id="next-note-btn" title="Next Note (Alt + →)">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            `;
        } else if (chapterNotes.length === 1) {
            noteTabsHtml = `
                <div class="single-note-badge">
                    <span class="material-symbols-outlined">description</span>
                    <span>Part 01 • Complete Notes</span>
                </div>
            `;
        } else {
            noteTabsHtml = `
                <div class="single-note-badge">
                    <span class="material-symbols-outlined">description</span>
                    <span>No Notes Available</span>
                </div>
            `;
        }

        centerGroup.innerHTML = noteTabsHtml;

        // Bind Note Pill Clicks (Instant responsiveness on very first touch or click)
        const pillBtns = centerGroup.querySelectorAll('.note-pill-btn');
        pillBtns.forEach(pill => {
            bindInstantClick(pill, () => {
                const targetNote = chapterNotes.find(n => n.id === pill.dataset.noteId);
                if (targetNote) showNote(targetNote);
            });
        });

        // Bind Prev / Next Note Buttons
        const prevNoteBtn = centerGroup.querySelector('#prev-note-btn');
        if (prevNoteBtn) {
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            prevNoteBtn.disabled = (curIdx <= 0);
            bindInstantClick(prevNoteBtn, () => {
                const idx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
                if (idx > 0) showNote(chapterNotes[idx - 1]);
            });
        }

        const nextNoteBtn = centerGroup.querySelector('#next-note-btn');
        if (nextNoteBtn) {
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            nextNoteBtn.disabled = (curIdx >= chapterNotes.length - 1 || curIdx === -1);
            bindInstantClick(nextNoteBtn, () => {
                const idx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
                if (idx < chapterNotes.length - 1 && idx !== -1) {
                    showNote(chapterNotes[idx + 1]);
                }
            });
        }
    }

    // Chapter Selector Dropdown Helpers
    function closeChapterDropdown() {
        if (chapterDropdownMenu && chapterDropdownMenu.classList.contains('open')) {
            chapterDropdownMenu.classList.remove('open');
        }
        if (chapterSelectBtn && chapterSelectBtn.classList.contains('open')) {
            chapterSelectBtn.classList.remove('open');
        }
    }

    function openChapterDropdown() {
        if (!chapterDropdownMenu) return;
        chapterDropdownMenu.classList.add('open');
        if (chapterSelectBtn) chapterSelectBtn.classList.add('open');
        // Scroll currently active chapter into view within dropdown list
        const activeItem = chapterDropdownMenu.querySelector('.chapter-dropdown-item.active');
        if (activeItem) {
            try {
                activeItem.scrollIntoView({ block: 'nearest' });
            } catch (err) {}
        }
    }

    // In-Place Chapter Switching: preserves existing container in DOM, keeping pure F11 native fullscreen 100% active
    function switchChapterInViewer(targetChapId) {
        if (!targetChapId) return;

        // If clicking currently active chapter, cleanly close menu and return
        if (targetChapId === activeContainer?.id) {
            closeChapterDropdown();
            return;
        }

        const targetChap = allChapters.find(c => c.id === targetChapId);
        if (!targetChap) return;

        const pdfs = (targetChap.items || []).filter(i => i.type === 'pdf');
        if (pdfs.length === 0) {
            state.isFullscreenActive = false;
            exitPureFullscreen();
            const appContainer = document.querySelector('.app-container');
            document.body.classList.remove('viewer-active');
            document.body.classList.remove('theater-fullscreen-active');
            if (appContainer) {
                appContainer.classList.remove('viewer-active');
                appContainer.classList.remove('theater-fullscreen-active');
            }
            if (currentSubchapter) {
                navigateTo('items', [batch.id, subject.id, currentChapter.id, targetChap.id]);
            } else {
                navigateTo('items', [batch.id, subject.id, targetChap.id]);
            }
            return;
        }

        // 1. Update Chapter References & State without unmounting container
        if (currentSubchapter) {
            currentSubchapter = targetChap;
            state.path = [batch.id, subject.id, currentChapter.id, targetChap.id];
        } else {
            currentChapter = targetChap;
            state.path = [batch.id, subject.id, targetChap.id];
        }
        activeContainer = targetChap;
        chapterNotes = pdfs;
        currentNoteItem = pdfs[0];
        state.currentItem = pdfs[0];

        // 2. Update Header Dropdown UI
        const chapTitleText = header.querySelector('.chapter-select-text');
        if (chapTitleText) chapTitleText.textContent = targetChap.name || 'Chapter';

        header.querySelectorAll('.chapter-dropdown-item').forEach(itemEl => {
            if (itemEl.dataset.chapId === targetChap.id) {
                itemEl.classList.add('active');
            } else {
                itemEl.classList.remove('active');
            }
        });

        // 3. Update Quick Prev / Next Chapter Buttons
        const curChapIdx = allChapters.findIndex(c => c.id === targetChap.id);
        const newPrev = curChapIdx > 0 ? allChapters[curChapIdx - 1] : null;
        const newNext = curChapIdx >= 0 && curChapIdx < allChapters.length - 1 ? allChapters[curChapIdx + 1] : null;

        const qPrev = header.querySelector('#quick-prev-chap');
        if (qPrev) {
            qPrev.disabled = !newPrev;
            qPrev.title = newPrev ? `Previous: ${newPrev.name}` : 'No Previous Chapter';
        }

        const qNext = header.querySelector('#quick-next-chap');
        if (qNext) {
            qNext.disabled = !newNext;
            qNext.title = newNext ? `Next: ${newNext.name}` : 'No Next Chapter';
        }

        // 4. Reset iframes & cache, mount new note immediately
        frameWrapper.querySelectorAll('.pdf-iframe').forEach(el => el.remove());
        iframeCache.clear();
        showNote(pdfs[0]);

        // 5. Re-render Note Tabs
        renderNoteTabsUI();

        // 6. Sync background breadcrumbs & navigation
        renderBreadcrumbs();
        renderNav();

        // 7. Close dropdown menu cleanly
        closeChapterDropdown();
    }

    // Initialize with first note and render center note tabs
    showNote(initialItem);
    renderNoteTabsUI();

    // Event: Chapter Selector Dropdown Toggle (Rock-Solid Touch & Click Handling)
    const chapterSelectBtn = header.querySelector('#chapter-select-btn');
    const chapterDropdownMenu = header.querySelector('#chapter-dropdown-menu');
    const chapterSelectWrapper = header.querySelector('#chapter-select-wrapper');

    if (chapterSelectBtn && chapterDropdownMenu) {
        let lastToggleTime = 0;

        const toggleDropdown = (e) => {
            if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
            const now = Date.now();
            if (now - lastToggleTime < 350) return;
            lastToggleTime = now;
            window.focus();

            const isOpen = chapterDropdownMenu.classList.contains('open');
            if (isOpen) {
                closeChapterDropdown();
            } else {
                openChapterDropdown();
            }
        };

        chapterSelectBtn.addEventListener('click', toggleDropdown);
        chapterSelectBtn.addEventListener('pointerenter', () => window.focus(), { passive: true });
        chapterSelectBtn.addEventListener('mouseenter', () => window.focus(), { passive: true });
    }

    // Event: Chapter Item Click (In-Place Chapter Switch, preserving Fullscreen)
    // Uses standard click with stopPropagation so touch-drag scrolling is NEVER blocked or misfired
    const chapItems = header.querySelectorAll('.chapter-dropdown-item');
    chapItems.forEach(itemEl => {
        itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            window.focus();
            switchChapterInViewer(itemEl.dataset.chapId);
        });
    });

    // Event: Quick Prev/Next Chapter Buttons
    const quickPrevChap = header.querySelector('#quick-prev-chap');
    if (quickPrevChap) {
        quickPrevChap.addEventListener('click', (e) => {
            e.stopPropagation();
            window.focus();
            const curChapIdx = allChapters.findIndex(c => c.id === activeContainer?.id);
            if (curChapIdx > 0) {
                switchChapterInViewer(allChapters[curChapIdx - 1].id);
            }
        });
    }

    const quickNextChap = header.querySelector('#quick-next-chap');
    if (quickNextChap) {
        quickNextChap.addEventListener('click', (e) => {
            e.stopPropagation();
            window.focus();
            const curChapIdx = allChapters.findIndex(c => c.id === activeContainer?.id);
            if (curChapIdx >= 0 && curChapIdx < allChapters.length - 1) {
                switchChapterInViewer(allChapters[curChapIdx + 1].id);
            }
        });
    }

    // Event: Fullscreen Toggle (Pure Native F11 Fullscreen)
    async function toggleTheaterFullscreen(forcedState = null) {
        const nextState = (forcedState !== null) ? forcedState : !isTheaterFullscreen;
        isTheaterFullscreen = nextState;
        state.isFullscreenActive = nextState;

        const iconEl = fullscreenBtn ? fullscreenBtn.querySelector('.material-symbols-outlined') : null;
        const labelEl = fullscreenBtn ? fullscreenBtn.querySelector('.btn-label') : null;
        const appContainer = document.querySelector('.app-container');

        if (isTheaterFullscreen) {
            document.body.classList.add('theater-fullscreen-active');
            if (appContainer) appContainer.classList.add('theater-fullscreen-active');
            container.classList.add('theater-fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.classList.add('active');
                if (iconEl) iconEl.textContent = 'fullscreen_exit';
                if (labelEl) labelEl.textContent = 'Exit';
                fullscreenBtn.title = 'Exit Fullscreen (Esc, F, or F11)';
            }
            await requestPureFullscreen(container);
        } else {
            state.isFullscreenActive = false;
            document.body.classList.remove('theater-fullscreen-active');
            if (appContainer) appContainer.classList.remove('theater-fullscreen-active');
            container.classList.remove('theater-fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.classList.remove('active');
                if (iconEl) iconEl.textContent = 'fullscreen';
                if (labelEl) labelEl.textContent = 'Fullscreen';
                fullscreenBtn.title = 'Full Screen View (Press F or F11)';
            }
            await exitPureFullscreen();
        }
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('pointerenter', () => window.focus(), { passive: true });
        fullscreenBtn.addEventListener('mouseenter', () => window.focus(), { passive: true });
        fullscreenBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.focus();
            toggleTheaterFullscreen();
        });
        fullscreenBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.focus();
            toggleTheaterFullscreen();
        });
    }

    // Event: Back Button
    const viewerBackBtn = header.querySelector('#viewer-back-btn');
    if (viewerBackBtn) {
        bindInstantClick(viewerBackBtn, () => {
            state.isFullscreenActive = false;
            exitPureFullscreen();
            const appContainer = document.querySelector('.app-container');
            document.body.classList.remove('viewer-active');
            document.body.classList.remove('theater-fullscreen-active');
            if (appContainer) {
                appContainer.classList.remove('viewer-active');
                appContainer.classList.remove('theater-fullscreen-active');
                appContainer.classList.remove('sidebar-collapsed');
            }
            const backPath = state.path.length >= 4 ? state.path.slice(0, 4) : state.path.slice(0, 3);
            navigateTo('items', backPath);
        });
    }

    // Global Keydown & Document Click Listeners
    function handleViewerKeydown(e) {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

        const isFKey = e.key === 'f' || e.key === 'F' || e.code === 'KeyF' || e.key === 'F11' || e.code === 'F11';
        const isEscKey = e.key === 'Escape' || e.code === 'Escape';
        
        // Clean, non-conflicting note switching shortcuts for keyboard users
        const isNextNote = (e.key === ']' || e.code === 'BracketRight' || e.key === 'n' || e.key === 'N' || (e.altKey && (e.key === 'ArrowRight' || e.code === 'ArrowRight')));
        const isPrevNote = (e.key === '[' || e.code === 'BracketLeft' || e.key === 'p' || e.key === 'P' || (e.altKey && (e.key === 'ArrowLeft' || e.code === 'ArrowLeft')));

        if (isFKey) {
            e.preventDefault();
            e.stopPropagation();
            toggleTheaterFullscreen();
        } else if (isEscKey) {
            // Close chapter dropdown first if open
            if (chapterDropdownMenu && chapterDropdownMenu.classList.contains('open')) {
                e.preventDefault();
                e.stopPropagation();
                closeChapterDropdown();
                return;
            }
            if (isTheaterFullscreen) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheaterFullscreen(false);
            }
        } else if (isNextNote) {
            if (e.repeat) return;
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            if (curIdx < chapterNotes.length - 1 && curIdx !== -1) {
                showNote(chapterNotes[curIdx + 1]);
            }
        } else if (isPrevNote) {
            if (e.repeat) return;
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            if (curIdx > 0) {
                showNote(chapterNotes[curIdx - 1]);
            }
        }
    }

    function handleDocClick(e) {
        if (chapterSelectWrapper && !chapterSelectWrapper.contains(e.target)) {
            closeChapterDropdown();
        }
    }

    function handleWindowBlur() {
        closeChapterDropdown();
    }

    function handleFullscreenChange() {
        const fsEl = getNativeFullscreenElement();
        if (!fsEl && isTheaterFullscreen) {
            toggleTheaterFullscreen(false);
        } else if (fsEl && !isTheaterFullscreen) {
            toggleTheaterFullscreen(true);
        }
    }

    window.addEventListener('keydown', handleViewerKeydown, true);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('pointerdown', handleDocClick);
    document.addEventListener('click', handleDocClick);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    activeViewerCleanup = () => {
        state.isFullscreenActive = false;
        exitPureFullscreen();
        document.body.classList.remove('theater-fullscreen-active');
        document.body.classList.remove('viewer-active');
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.classList.remove('theater-fullscreen-active');
            appContainer.classList.remove('viewer-active');
        }
        window.removeEventListener('keydown', handleViewerKeydown, true);
        window.removeEventListener('blur', handleWindowBlur);
        document.removeEventListener('pointerdown', handleDocClick);
        document.removeEventListener('click', handleDocClick);
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };

    return container;
}

// Video Player Component
function createVideoPlayer(item) {
    const container = document.createElement('div');
    container.className = 'video-player-container';

    // Header
    const header = document.createElement('div');
    header.className = 'video-header';
    header.innerHTML = `
        <div class="video-title-wrap">
            <span class="lecture-badge">Lecture Video</span>
            <h2>${item.title}</h2>
        </div>
        <button class="back-btn" id="player-back-btn">
            <span class="material-symbols-outlined">arrow_back</span> Back
        </button>
    `;

    // Embed Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-wrapper';

    const iframe = document.createElement('iframe');
    iframe.src = `https://t.me/${state.data.channelUsername}/${item.telegramPostId}?embed=1&dark=1`;
    iframe.className = 'telegram-iframe';
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.allowFullscreen = true;

    wrapper.appendChild(iframe);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'player-footer';
    footer.innerHTML = `
        <div class="player-info">
            <span class="material-symbols-outlined">info</span>
            <span>Having playback issues? You can open the lecture directly on Telegram:</span>
        </div>
        <a href="https://t.me/${state.data.channelUsername}/${item.telegramPostId}" target="_blank" rel="noopener noreferrer" class="open-telegram-btn">
            <span class="material-symbols-outlined">open_in_new</span> Open in Telegram
        </a>
    `;

    container.appendChild(header);
    container.appendChild(wrapper);
    container.appendChild(footer);

    header.querySelector('#player-back-btn').onclick = () => {
        navigateTo('items', state.path.slice(0, 3));
    };

    return container;
}

// Start
document.addEventListener('DOMContentLoaded', init);
