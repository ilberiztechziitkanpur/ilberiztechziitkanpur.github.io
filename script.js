// State Management
const state = {
    data: null,
    currentView: 'batches', // batches, subjects, chapters, items, viewer, search
    previousView: 'batches',
    path: [], // [batchId, subjectId, chapterId]
    currentItem: null,
    searchQuery: '',
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

// Initialize App
async function init() {
    setupMobileMenu();
    setupSearch();

    // 1. Direct local load (works when double-clicking index.html offline via file://)
    if (window.COURSE_DATA) {
        state.data = window.COURSE_DATA;
        renderNav();
        renderView();
        return;
    }

    // 2. Fetch data.json fallback (works when served on GitHub Pages or local HTTP server)
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        state.data = await response.json();
        renderNav();
        renderView();
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
        const isActive = state.path[0] === batch.id && state.currentView !== 'viewer';
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

    // Quick Launch: Geography 100 MCQ Engine
    const mcqNav = document.createElement('div');
    const isMcqActive = state.currentItem?.id === 'geo-mcq-engine-full';
    mcqNav.className = `nav-item nav-item-featured ${isMcqActive ? 'active' : ''}`;
    mcqNav.innerHTML = `
        <span class="material-symbols-outlined icon" style="color: #38bdf8;">bolt</span>
        <span style="font-weight: 600;">Geography 100 MCQs</span>
        <span class="nav-badge-hot">HOT</span>
    `;
    mcqNav.onclick = () => {
        closeSidebarOnMobile();
        resetSearch();
        const batch = state.data.batches.find(b => b.id === 'batch-class-10');
        const geoSub = batch?.subjects?.find(s => s.id === 'sub-10-geo');
        const mcqChap = geoSub?.chapters?.find(c => c.id === 'chap-geo-mcq');
        if (mcqChap && mcqChap.items.length > 0) {
            navigateTo('viewer', [batch.id, geoSub.id, mcqChap.id], mcqChap.items[0]);
        } else {
            window.location.href = 'geography-100-mcq-engine.html';
        }
    };
    navMenu.appendChild(mcqNav);
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
    const homeBtn = document.createElement('span');
    homeBtn.className = 'breadcrumb-item material-symbols-outlined';
    homeBtn.textContent = 'home';
    homeBtn.title = 'Back to Overview';
    homeBtn.onclick = () => {
        resetSearch();
        navigateTo('batches', []);
    };
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
            addCrumb(batch.name, () => navigateTo('subjects', [batch.id]));
        }
    }

    if (state.path.length > 1) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const subject = batch?.subjects?.find(s => s.id === state.path[1]);
        if (subject) {
            addCrumb(subject.name, () => navigateTo('chapters', [batch.id, subject.id]));
        }
    }

    if (state.path.length > 2) {
        addCrumbSeparator();
        const batch = state.data.batches.find(b => b.id === state.path[0]);
        const subject = batch?.subjects?.find(s => s.id === state.path[1]);
        const chapter = subject?.chapters?.find(c => c.id === state.path[2]);
        if (chapter) {
            addCrumb(chapter.name, () => navigateTo('items', state.path.slice(0, 3)));
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

function addCrumb(name, onClick) {
    const crumb = document.createElement('span');
    crumb.className = 'breadcrumb-item';
    crumb.textContent = name;
    crumb.onclick = onClick;
    breadcrumbs.appendChild(crumb);
}

// Navigation Logic
function navigateTo(view, pathArgs, item = null) {
    state.currentView = view;
    state.path = pathArgs;

    if (item) {
        state.currentItem = item;
    }

    renderNav();
    renderBreadcrumbs();
    renderView();
    if (contentArea) contentArea.scrollTop = 0;
}

// Main View Rendering
function renderView() {
    contentArea.innerHTML = '';
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
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    const normalizedQuery = query.toLowerCase();
    const results = [];

    state.data.batches.forEach(batch => {
        batch.subjects.forEach(subject => {
            subject.chapters.forEach(chapter => {
                const items = chapter.items || [];
                items.forEach(item => {
                    const match = item.title.toLowerCase().includes(normalizedQuery) ||
                                  (item.subtitle && item.subtitle.toLowerCase().includes(normalizedQuery)) ||
                                  chapter.name.toLowerCase().includes(normalizedQuery) ||
                                  subject.name.toLowerCase().includes(normalizedQuery);
                    if (match) {
                        results.push({ batch, subject, chapter, item });
                    }
                });
            });
        });
    });

    const header = createSectionHeader(
        `Search Results for "${query}"`,
        `Found ${results.length} matching document${results.length === 1 ? '' : 's'}`
    );
    wrapper.appendChild(header);

    if (results.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'no-results';
        emptyState.innerHTML = `
            <span class="material-symbols-outlined icon">search_off</span>
            <h3>No matching notes found</h3>
            <p>Try searching for topics like "Climate", "Soil", "Vegetation", "Water", "Energy" or "Mineral".</p>
        `;
        wrapper.appendChild(emptyState);
    } else {
        const grid = document.createElement('div');
        grid.className = 'cards-grid';

        results.forEach((res, idx) => {
            const isInter = res.item.type === 'interactive' || res.item.type === 'app';
            const isPdf = res.item.type === 'pdf';
            const card = createCard({
                title: res.item.title,
                subtitle: `${res.batch.name} • ${res.subject.name} • ${res.chapter.name}`,
                icon: isInter ? 'quiz' : (isPdf ? 'picture_as_pdf' : 'play_circle'),
                onClick: () => {
                    navigateTo('viewer', [res.batch.id, res.subject.id, res.chapter.id], res.item);
                },
                badge: isInter ? 'Interactive Engine' : res.subject.name,
                isPdf: isPdf,
                isInteractive: isInter,
                actionText: isInter ? 'Launch Engine' : (isPdf ? 'Read Notes' : 'Watch Lecture'),
                index: idx
            });
            if (isInter) card.classList.add('card-featured');
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
    card.style.setProperty('--i', index);
    card.onclick = onClick;
    
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
            <span>${item.subtitle || 'ICSE 2027 Geography Master 100 MCQ DPP & 8-Year DNA Engine'}</span>
        </div>
        <div>
            <span>100 Questions • Instant Practice & Timed DPP Modes • Live Chapter Diagnostic Report</span>
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

// PDF Reader & Viewer Component
function createPdfViewer(item) {
    const container = document.createElement('div');
    container.className = 'pdf-viewer-container';

    // Header
    const header = document.createElement('div');
    header.className = 'viewer-header';
    header.innerHTML = `
        <div class="viewer-title-wrap">
            <span class="lecture-badge">Class Notes Document</span>
            <h2>${item.title}</h2>
        </div>
        <div class="viewer-actions">
            <button class="viewer-btn" id="viewer-back-btn">
                <span class="material-symbols-outlined">arrow_back</span> Back
            </button>
            <a href="${item.file}" target="_blank" rel="noopener noreferrer" class="viewer-btn">
                <span class="material-symbols-outlined">open_in_new</span> Open in New Tab
            </a>
            <a href="${item.file}" download="${item.title}.pdf" class="viewer-btn primary">
                <span class="material-symbols-outlined">download</span> Download PDF
            </a>
        </div>
    `;

    // PDF Frame Wrapper
    const frameWrapper = document.createElement('div');
    frameWrapper.className = 'pdf-frame-wrapper';

    const iframe = document.createElement('iframe');
    iframe.src = `${item.file}#view=FitH`;
    iframe.className = 'pdf-iframe';
    iframe.title = item.title;

    frameWrapper.appendChild(iframe);

    // Footer
    const footer = document.createElement('div');
    footer.className = 'viewer-footer';
    footer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-outlined" style="color: #f87171;">picture_as_pdf</span>
            <span>${item.title} &bull; File Size: ${item.size || 'Document'}</span>
        </div>
        <div>
            <span>Use browser reader controls or pinch-to-zoom to read smoothly.</span>
        </div>
    `;

    container.appendChild(header);
    container.appendChild(frameWrapper);
    container.appendChild(footer);

    header.querySelector('#viewer-back-btn').onclick = () => {
        navigateTo('items', state.path.slice(0, 3));
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
