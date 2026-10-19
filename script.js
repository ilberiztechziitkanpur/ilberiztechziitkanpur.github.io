// State Management
const state = {
    data: null,
    currentView: 'batches', // batches, subjects, chapters, items, viewer, search
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

                // Also index chapter so topics and chapters without uploaded PDFs can be discovered
                const chapBlob = [
                    chapter.name,
                    chapter.description || '',
                    subject.name,
                    batch.name
                ].join(' ').toLowerCase();
                searchIndex.push({
                    type: 'chapter',
                    batch,
                    subject,
                    chapter,
                    itemCount: items.length,
                    searchBlob: chapBlob
                });
            });
        });
    });
}

// Initialize App
async function init() {
    setupMobileMenu();
    setupSearch();

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

    // Latest Update Quick Launch: Julius Caesar Class Notes (English Literature Ch 1)
    const jcNav = document.createElement('div');
    const isJcActive = state.currentView !== 'search' && state.path[1] === 'sub-10-eng' && state.path[2] === 'chap-eng-1';
    jcNav.className = `nav-item nav-item-featured ${isJcActive ? 'active' : ''}`;
    jcNav.innerHTML = `
        <span class="material-symbols-outlined icon" style="color: #a855f7;">theater_comedy</span>
        <span style="font-weight: 600;">Julius Caesar Notes</span>
        <span class="nav-badge-hot" style="background: linear-gradient(135deg, #a855f7, #7c3aed); color:#fff;">NEW</span>
    `;
    jcNav.onclick = () => {
        closeSidebarOnMobile();
        resetSearch();
        const batch = state.data.batches.find(b => b.id === 'batch-class-10');
        const engSub = batch?.subjects?.find(s => s.id === 'sub-10-eng');
        const jcChap = engSub?.chapters?.find(c => c.id === 'chap-eng-1');
        if (jcChap) {
            navigateTo('items', [batch.id, engSub.id, jcChap.id]);
        }
    };
    navMenu.appendChild(jcNav);
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
            const isCurrent = state.currentView === 'items';
            addCrumb(chapter.name, isCurrent ? null : () => navigateTo('items', state.path.slice(0, 3)), isCurrent);
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
        const header = createSectionHeader('Select Your Class', 'Choose your curriculum level to explore subjects, study notes & lectures');
        wrapper.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'cards-grid';
        state.data.batches.forEach((batch, idx) => {
            grid.appendChild(createCard({
                title: batch.name,
                subtitle: batch.description,
                icon: batch.icon || 'school',
                onClick: () => navigateTo('subjects', [batch.id]),
                badge: `${batch.subjects.length} Subjects`,
                actionText: 'Explore Subjects',
                index: idx
            }));
        });
        wrapper.appendChild(grid);
    } 
    else if (state.currentView === 'subjects') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        if (!batch) return;

        const header = createSectionHeader(batch.name, `${batch.description} • All 9 Prescribed Subjects`);
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
                index: idx
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
            const count = chap.items ? chap.items.length : 0;
            const badgeText = chap.featured ? 'Interactive DPP' : (count > 0 ? `${count} Notes Ready` : 'In Progress');
            const iconName = chap.featured ? 'bolt' : 'auto_stories';
            
            const cardEl = createCard({
                title: chap.name,
                subtitle: chap.description || `${count} available study resources`,
                icon: iconName,
                onClick: () => navigateTo('items', [batch.id, sub.id, chap.id]),
                badge: badgeText,
                isInteractive: !!chap.featured,
                actionText: chap.featured ? 'Open Engine' : 'View Notes',
                index: idx
            });
            if (chap.featured) cardEl.classList.add('card-featured');
            grid.appendChild(cardEl);
        });
        wrapper.appendChild(grid);
    }
    else if (state.currentView === 'items') {
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const sub = batch?.subjects?.find(s => s.id === state.path[1]);
        const chap = sub?.chapters?.find(c => c.id === state.path[2]);
        if (!chap) return;

        const header = createSectionHeader(chap.name, `${sub.name} • Chapter Class Notes & Study Material`);
        wrapper.appendChild(header);

        const items = chap.items || [];
        if (items.length === 0) {
            const emptyBox = document.createElement('div');
            emptyBox.className = 'empty-chapter-box';
            emptyBox.innerHTML = `
                <span class="material-symbols-outlined icon">cloud_sync</span>
                <h3>Notes Being Uploaded for ${chap.name}</h3>
                <p>The notes and lecture modules for this chapter are currently in progress. You can check the <strong>Geography</strong> section to view complete series notes!</p>
                <div style="margin-top: 20px;">
                    <button class="viewer-btn primary" id="jump-geo-btn">
                        <span class="material-symbols-outlined">public</span> Go to Geography Notes
                    </button>
                </div>
            `;
            wrapper.appendChild(emptyBox);

            const jumpBtn = emptyBox.querySelector('#jump-geo-btn');
            if (jumpBtn) {
                jumpBtn.onclick = () => {
                    const geoSub = batch.subjects.find(s => s.id === 'sub-10-geo');
                    if (geoSub) {
                        navigateTo('chapters', [batch.id, geoSub.id]);
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
            seenChapterIds.add(entry.chapter.id);
        } else if (entry.type === 'chapter') {
            if (!seenChapterIds.has(entry.chapter.id)) {
                chapterResults.push(entry);
            }
        }
    });

    const standaloneChapters = chapterResults.filter(ch => !seenChapterIds.has(ch.chapter.id));
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
            <p>Try searching for topics like "Julius Caesar", "Act 3 Scene 1", "Act 3 Scene 2", "Antony Speech", "Mahatma Gandhi", "Rowlatt Act", "Jallianwala Bagh", "Non-Cooperation", "Muslim League", "1857", "Nationalism", "First Phase", "Second Phase", "Climate", "Soil", "Vegetation", "Water", "Energy", "GST" or "Trigonometry".</p>
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
            const card = createCard({
                title: res.item.title,
                subtitle: `${res.batch.name} • ${res.subject.name} • ${res.chapter.name}`,
                icon: isInter ? 'quiz' : (isPdf ? 'picture_as_pdf' : 'play_circle'),
                onClick: () => {
                    resetSearch();
                    navigateTo('viewer', [res.batch.id, res.subject.id, res.chapter.id], res.item);
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
            const count = res.itemCount;
            const card = createCard({
                title: res.chapter.name,
                subtitle: `${res.batch.name} • ${res.subject.name} • ${res.chapter.description || 'Chapter Overview'}`,
                icon: 'auto_stories',
                onClick: () => {
                    resetSearch();
                    navigateTo('items', [res.batch.id, res.subject.id, res.chapter.id]);
                },
                badge: count > 0 ? `${count} Notes Ready` : 'Class 10 Syllabus',
                isPdf: false,
                isInteractive: false,
                actionText: 'Open Chapter',
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

function createCard({ title, subtitle, icon, onClick, badge = null, isPdf = false, isInteractive = false, actionText = 'Explore', index = 0 }) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.style.setProperty('--i', Math.min(index, 10));
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
            ${badge ? `<span class="${badgeClass}">${badge}</span>` : ''}
        </div>
        <div class="card-content">
            <h3>${title}</h3>
            <p>${subtitle}</p>
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

    // Header
    const header = document.createElement('div');
    header.className = 'viewer-header';
    header.innerHTML = `
        <div class="viewer-title-wrap">
            <span class="lecture-badge" style="color: #38bdf8; display:flex; align-items:center; gap:5px;">
                <span class="material-symbols-outlined" style="font-size:16px;">bolt</span>
                Interactive Engine • ICSE 2027 Geography
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
            <span>${item.subtitle || 'ICSE 2027 Geography Interactive Engine'}</span>
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

function createPdfViewer(initialItem) {
    if (activeViewerCleanup) {
        activeViewerCleanup();
        activeViewerCleanup = null;
    }

    const container = document.createElement('div');
    container.className = 'pdf-viewer-container';

    // Contextual Data
    const batch = state.data.batches.find(b => b.id === state.path[0]);
    const subject = batch?.subjects?.find(s => s.id === state.path[1]);
    let currentChapter = subject?.chapters?.find(c => c.id === state.path[2]);
    const allChapters = subject?.chapters || [];
    let chapterNotes = (currentChapter?.items || []).filter(it => it.type === 'pdf');

    // Live DOM iframe cache: preserves exact reading slide & zoom when switching notes
    const iframeCache = new Map();
    let currentNoteItem = initialItem;
    let isTheaterFullscreen = !!state.isFullscreenActive;

    // Header element
    const header = document.createElement('div');
    header.className = 'viewer-header';

    // Build Chapter Dropdown items
    const currentChapIdx = allChapters.findIndex(c => c.id === currentChapter?.id);
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
        const isActive = chap.id === currentChapter?.id;
        const chapLabel = chap.name.includes(':') ? chap.name.split(':')[0] : 'Ch';
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
                <button class="viewer-btn chapter-select-btn" id="chapter-select-btn" title="Switch Chapter in ${subject?.name || 'Subject'}">
                    <span class="material-symbols-outlined icon">menu_book</span>
                    <span class="chapter-select-text">${currentChapter?.name || 'Chapter'}</span>
                    <span class="material-symbols-outlined arrow">expand_more</span>
                </button>
                <div class="chapter-dropdown-menu" id="chapter-dropdown-menu">
                    <div class="chapter-dropdown-header">
                        <span>Chapters in ${subject?.name || 'Subject'}</span>
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
            <span class="viewer-shortcut-hint"><kbd>F</kbd> Fullscreen</span>
            <span class="viewer-shortcut-hint"><kbd>Esc</kbd> Exit</span>
            <span class="viewer-shortcut-hint"><kbd>Alt+←/→</kbd> Switch Notes</span>
        </div>
    `;

    container.appendChild(header);
    container.appendChild(frameWrapper);
    container.appendChild(footer);

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

        // Bind Note Pill Clicks
        const pillBtns = centerGroup.querySelectorAll('.note-pill-btn');
        pillBtns.forEach(pill => {
            pill.onclick = () => {
                const targetNote = chapterNotes.find(n => n.id === pill.dataset.noteId);
                if (targetNote) showNote(targetNote);
            };
        });

        // Bind Prev / Next Note Buttons
        const prevNoteBtn = centerGroup.querySelector('#prev-note-btn');
        if (prevNoteBtn) {
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            prevNoteBtn.disabled = (curIdx <= 0);
            prevNoteBtn.onclick = () => {
                const idx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
                if (idx > 0) showNote(chapterNotes[idx - 1]);
            };
        }

        const nextNoteBtn = centerGroup.querySelector('#next-note-btn');
        if (nextNoteBtn) {
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            nextNoteBtn.disabled = (curIdx >= chapterNotes.length - 1 || curIdx === -1);
            nextNoteBtn.onclick = () => {
                const idx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
                if (idx < chapterNotes.length - 1 && idx !== -1) {
                    showNote(chapterNotes[idx + 1]);
                }
            };
        }
    }

    // In-Place Chapter Switching: preserves existing container in DOM, keeping pure F11 native fullscreen 100% active
    function switchChapterInViewer(targetChapId) {
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
            navigateTo('items', [batch.id, subject.id, targetChap.id]);
            return;
        }

        // 1. Update Chapter References & State without unmounting container
        currentChapter = targetChap;
        chapterNotes = pdfs;
        state.path = [batch.id, subject.id, targetChap.id];
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
        frameWrapper.innerHTML = '';
        iframeCache.clear();
        showNote(pdfs[0]);

        // 5. Re-render Note Tabs
        renderNoteTabsUI();

        // 6. Sync background breadcrumbs & navigation
        renderBreadcrumbs();
        renderNav();

        // 7. Close dropdown menu
        if (chapterDropdownMenu) chapterDropdownMenu.classList.remove('open');
    }

    // Initialize with first note and render center note tabs
    showNote(initialItem);
    renderNoteTabsUI();

    // Event: Chapter Selector Dropdown Toggle
    const chapterSelectBtn = header.querySelector('#chapter-select-btn');
    const chapterDropdownMenu = header.querySelector('#chapter-dropdown-menu');
    const chapterSelectWrapper = header.querySelector('#chapter-select-wrapper');

    if (chapterSelectBtn && chapterDropdownMenu) {
        chapterSelectBtn.onclick = (e) => {
            e.stopPropagation();
            chapterDropdownMenu.classList.toggle('open');
        };
    }

    // Event: Chapter Item Click (In-Place Chapter Switch, preserving Fullscreen)
    const chapItems = header.querySelectorAll('.chapter-dropdown-item');
    chapItems.forEach(itemEl => {
        itemEl.onclick = (e) => {
            e.stopPropagation();
            switchChapterInViewer(itemEl.dataset.chapId);
        };
    });

    // Event: Quick Prev/Next Chapter Buttons
    const quickPrevChap = header.querySelector('#quick-prev-chap');
    if (quickPrevChap) {
        quickPrevChap.onclick = (e) => {
            e.stopPropagation();
            const curChapIdx = allChapters.findIndex(c => c.id === currentChapter.id);
            if (curChapIdx > 0) {
                switchChapterInViewer(allChapters[curChapIdx - 1].id);
            }
        };
    }

    const quickNextChap = header.querySelector('#quick-next-chap');
    if (quickNextChap) {
        quickNextChap.onclick = (e) => {
            e.stopPropagation();
            const curChapIdx = allChapters.findIndex(c => c.id === currentChapter.id);
            if (curChapIdx >= 0 && curChapIdx < allChapters.length - 1) {
                switchChapterInViewer(allChapters[curChapIdx + 1].id);
            }
        };
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
        fullscreenBtn.onclick = () => toggleTheaterFullscreen();
    }

    // Event: Back Button
    header.querySelector('#viewer-back-btn').onclick = () => {
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
        navigateTo('items', state.path.slice(0, 3));
    };

    // Global Keydown & Document Click Listeners
    function handleViewerKeydown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'F11' || e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleTheaterFullscreen();
        } else if (e.key === 'Escape' && isTheaterFullscreen) {
            e.preventDefault();
            toggleTheaterFullscreen(false);
        } else if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            if (curIdx < chapterNotes.length - 1 && curIdx !== -1) {
                showNote(chapterNotes[curIdx + 1]);
            }
        } else if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            const curIdx = chapterNotes.findIndex(n => n.id === currentNoteItem.id);
            if (curIdx > 0) {
                showNote(chapterNotes[curIdx - 1]);
            }
        }
    }

    function handleDocClick(e) {
        if (chapterSelectWrapper && !chapterSelectWrapper.contains(e.target)) {
            if (chapterDropdownMenu) chapterDropdownMenu.classList.remove('open');
        }
    }

    function handleFullscreenChange() {
        const fsEl = getNativeFullscreenElement();
        if (!fsEl && isTheaterFullscreen) {
            toggleTheaterFullscreen(false);
        } else if (fsEl && !isTheaterFullscreen) {
            toggleTheaterFullscreen(true);
        }
    }

    document.addEventListener('keydown', handleViewerKeydown);
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
        document.removeEventListener('keydown', handleViewerKeydown);
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
