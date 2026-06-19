

document.addEventListener('DOMContentLoaded', () => {



    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        scrollProgress.style.width = scrolled + '%';

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects .project-card');
    const projectsGrid = document.querySelector('#projects .projects-grid');
    const searchInput = document.getElementById('projectSearch');
    const sortSelect = document.getElementById('projectSort');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'year-desc';

    function updateProjects() {
        if (!projectsGrid || projectCards.length === 0) return;

        const cardsArray = Array.from(projectCards);

        // 1. Sort the cards
        cardsArray.sort((a, b) => {
            if (currentSort === 'year-desc') {
                const yearA = parseInt(a.getAttribute('data-year') || '0');
                const yearB = parseInt(b.getAttribute('data-year') || '0');
                return yearB - yearA;
            } else if (currentSort === 'year-asc') {
                const yearA = parseInt(a.getAttribute('data-year') || '0');
                const yearB = parseInt(b.getAttribute('data-year') || '0');
                return yearA - yearB;
            } else if (currentSort === 'alpha-asc') {
                const titleA = a.querySelector('.project-title').textContent.toLowerCase().trim();
                const titleB = b.querySelector('.project-title').textContent.toLowerCase().trim();
                return titleA.localeCompare(titleB);
            } else if (currentSort === 'alpha-desc') {
                const titleA = a.querySelector('.project-title').textContent.toLowerCase().trim();
                const titleB = b.querySelector('.project-title').textContent.toLowerCase().trim();
                return titleB.localeCompare(titleA);
            }
            return 0;
        });

        // Re-append to grid to update DOM order
        cardsArray.forEach(card => {
            projectsGrid.appendChild(card);
        });

        // 2. Filter and search visibility
        let visibleCount = 0;
        cardsArray.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const desc = card.querySelector('.project-desc').textContent.toLowerCase();
            const role = card.querySelector('.project-role-info') ? card.querySelector('.project-role-info').textContent.toLowerCase() : '';
            
            // Collect tech keywords
            const techSpans = card.querySelectorAll('.project-tech span');
            let techText = '';
            techSpans.forEach(span => {
                techText += span.textContent.toLowerCase() + ' ';
            });

            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = currentSearch === '' || 
                title.includes(currentSearch) || 
                desc.includes(currentSearch) || 
                role.includes(currentSearch) || 
                techText.includes(currentSearch);

            if (matchesFilter && matchesSearch) {
                if (card.style.display !== 'flex') {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'var(--transition)';
                    }, 50);
                }
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Handle "No projects found" message if none match
        let noProjectsMsg = document.getElementById('no-projects-msg');
        if (visibleCount === 0) {
            if (!noProjectsMsg) {
                noProjectsMsg = document.createElement('div');
                noProjectsMsg.id = 'no-projects-msg';
                noProjectsMsg.style.textAlign = 'center';
                noProjectsMsg.style.padding = '50px 20px';
                noProjectsMsg.style.gridColumn = '1 / -1';
                noProjectsMsg.style.color = 'var(--text-muted)';
                noProjectsMsg.style.fontSize = '1.1rem';
                noProjectsMsg.innerHTML = '<i class="fa-regular fa-folder-open" style="font-size: 3.5rem; margin-bottom: 15px; display: block; color: var(--primary);"></i> Tidak ada proyek yang cocok dengan pencarian Anda.';
                projectsGrid.appendChild(noProjectsMsg);
            } else {
                noProjectsMsg.style.display = 'block';
            }
        } else {
            if (noProjectsMsg) {
                noProjectsMsg.style.display = 'none';
            }
        }
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.getAttribute('data-filter');
            updateProjects();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            updateProjects();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            updateProjects();
        });
    }

    // Run once on load to establish initial order
    updateProjects();


    const photoFrame = document.getElementById('photoFrame');
    const photoInput = document.getElementById('photoInput');

    if (photoFrame && photoInput) {
        photoFrame.addEventListener('click', () => {

            if (photoFrame.classList.contains('photo-placeholder')) {
                photoInput.click();
            }
        });

        photoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {

                    photoFrame.classList.remove('photo-placeholder');
                    photoFrame.innerHTML = '';

                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = 'Uploaded Profile Photo';
                    img.classList.add('profile-photo');

                    const editOverlay = document.createElement('div');
                    editOverlay.style.position = 'absolute';
                    editOverlay.style.top = '0';
                    editOverlay.style.left = '0';
                    editOverlay.style.width = '100%';
                    editOverlay.style.height = '100%';
                    editOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                    editOverlay.style.display = 'flex';
                    editOverlay.style.flexDirection = 'column';
                    editOverlay.style.justifyContent = 'center';
                    editOverlay.style.alignItems = 'center';
                    editOverlay.style.opacity = '0';
                    editOverlay.style.transition = 'var(--transition)';
                    editOverlay.style.borderRadius = 'var(--border-radius-lg)';
                    editOverlay.style.color = '#fff';
                    editOverlay.style.cursor = 'pointer';
                    editOverlay.innerHTML = '<i class="fa-solid fa-pen" style="font-size: 2rem; margin-bottom: 10px;"></i><span>Ganti Foto</span>';

                    photoFrame.appendChild(img);
                    photoFrame.appendChild(editOverlay);

                    photoFrame.addEventListener('mouseenter', () => {
                        editOverlay.style.opacity = '1';
                    });
                    photoFrame.addEventListener('mouseleave', () => {
                        editOverlay.style.opacity = '0';
                    });
                    editOverlay.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        photoInput.click();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');

            submitBtn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btnIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {

                formStatus.style.display = 'block';
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-regular fa-circle-check"></i> Pesan terkirim! Terima kasih telah menghubungi saya.';

                submitBtn.disabled = false;
                btnText.textContent = 'Kirim Pesan';
                btnIcon.innerHTML = '<i class="fa-regular fa-paper-plane"></i>';

                contactForm.reset();

                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1800);
        });
    }

});
