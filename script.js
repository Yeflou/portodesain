

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
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                    
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                        card.style.transition = 'var(--transition)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

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

    // --- PROJECT MODAL FUNCTIONALITY ---
    const projectsData = {
        posyandu: {
            title: "Sistem Informasi Posyandu",
            badge: "WEB APPLICATION",
            tech: "HTML • CSS • JavaScript • MySQL",
            about: "Sistem Informasi Posyandu Kemuning 12 adalah sebuah platform digital yang dirancang untuk memodernisasi pencatatan data kesehatan balita, pendaftaran, dan rekam medis tumbuh kembang anak secara real-time.",
            roles: [
                "Analisis Sistem",
                "Database Design",
                "UI/UX Design",
                "Development",
                "Testing"
            ],
            features: [
                "Pendaftaran Balita secara Online",
                "Pencatatan Rekam Medis (Tinggi & Berat Badan)",
                "Pemantauan Kurva KMS (Kartu Menuju Sehat)",
                "Laporan Kesehatan Balita Otomatis",
                "Monitoring Status Gizi Anak"
            ],
            github: "https://github.com/ameliaflora/posyandu-kemuning",
            gallery: [
                { id: "dashboard", label: "Dashboard" },
                { id: "databalita", label: "Data Balita" },
                { id: "pemeriksaan", label: "Pemeriksaan" },
                { id: "laporan", label: "Laporan Bulanan" }
            ],
            type: "browser"
        },
        perpustakaan: {
            title: "Sistem Informasi Perpustakaan",
            badge: "BACKEND APPLICATION",
            tech: "Golang • Gin • PostgreSQL",
            about: "Aplikasi manajemen perpustakaan berbasis REST API untuk otomasi manajemen sirkulasi buku, keanggotaan, pencatatan transaksi peminjaman, dan denda secara otomatis.",
            roles: [
                "Database Design",
                "API Development",
                "API Documentation",
                "Middleware & Security",
                "Integration Testing"
            ],
            features: [
                "Manajemen Katalog Buku & Kategori",
                "Sistem Keanggotaan Perpustakaan",
                "Pencatatan Transaksi Peminjaman & Pengembalian",
                "Kalkulasi Denda Keterlambatan Otomatis",
                "Autentikasi JWT (JSON Web Token)"
            ],
            github: "https://github.com/ameliaflora/library-api",
            gallery: [
                { id: "api-endpoints", label: "API Endpoints" },
                { id: "data-buku", label: "Data Buku" },
                { id: "data-anggota", label: "Data Anggota" },
                { id: "transaksi-pinjam", label: "Transaksi Peminjaman" }
            ],
            type: "browser"
        },
        gsheets: {
            title: "Google Sheets Data Filtering & Integration",
            badge: "API INTEGRATION",
            tech: "PHP • Google Sheets API",
            about: "Sistem integrasi data otomatis untuk penarikan data dari Google Sheets API, penyaringan berdasarkan parameter dinamis, dan pemrosesan data ke server lokal.",
            roles: [
                "Sistem Integrasi",
                "API Integration",
                "Data Filtering Development",
                "Cache Optimization",
                "Testing"
            ],
            features: [
                "Koneksi Google Sheets API (Service Account)",
                "Penyaringan Baris Data secara Real-Time",
                "Sinkronisasi Data Dua Arah",
                "Caching Data untuk Limit Kuota API",
                "Visualisasi Dashboard Hasil Filter"
            ],
            github: "https://github.com/ameliaflora/gsheets-integration",
            gallery: [
                { id: "dashboard", label: "Dashboard Filter" },
                { id: "source-sheets", label: "Source Google Sheets" },
                { id: "processed-data", label: "Data Terproses" },
                { id: "api-status", label: "Status Koneksi API" }
            ],
            type: "browser"
        },
        inventoryhp: {
            title: "Sistem Inventaris Handphone",
            badge: "INFORMATION SYSTEM",
            tech: "CodeIgniter • MySQL • HTML • CSS",
            about: "Sistem inventaris berbasis web untuk membantu pengelolaan stok handphone, transaksi masuk-keluar barang, dan pelaporan inventaris.",
            roles: [
                "Analisis Sistem",
                "Database Design",
                "UI/UX Design",
                "Development",
                "Testing"
            ],
            features: [
                "Manajemen Data Handphone",
                "Pencatatan Stok Masuk & Keluar",
                "Pengelolaan Supplier",
                "Laporan Inventaris",
                "Monitoring Stok"
            ],
            github: "https://github.com/ameliaflora/inventory-ci",
            gallery: [
                { id: "dashboard", label: "Dashboard Inventaris" },
                { id: "data-hp", label: "Data Handphone" },
                { id: "transaksi", label: "Transaksi Barang" },
                { id: "laporan", label: "Laporan Inventaris" }
            ],
            type: "browser"
        },
        sumtime: {
            title: "SumTime - Aplikasi Pemesanan Dimsum",
            badge: "MOBILE APPLICATION",
            tech: "Flutter • Supabase",
            about: "Aplikasi mobile lintas platform (iOS & Android) untuk pemesanan dimsum online secara instan, lengkap dengan keranjang belanja dinamis dan pelacakan status pesanan real-time.",
            roles: [
                "Mobile Development",
                "UI/UX Design",
                "Database Design (PostgreSQL)",
                "Real-time Service Integration",
                "Testing"
            ],
            features: [
                "Katalog Menu Dimsum Interaktif",
                "Keranjang Belanja & Checkout Instan",
                "Autentikasi Pengguna (Supabase Auth)",
                "Pelacakan Status Pesanan secara Real-Time",
                "Notifikasi Pesanan Dapur & Pengantaran"
            ],
            github: "https://github.com/ameliaflora/sumtime-flutter",
            gallery: [
                { id: "dashboard", label: "Dashboard Dimsum" },
                { id: "keranjang", label: "Keranjang Belanja" },
                { id: "status-pesanan", label: "Status Pesanan" },
                { id: "detail-menu", label: "Detail Menu" }
            ],
            type: "mobile"
        }
    };

    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalAbout = document.getElementById('modalAbout');
    const modalTechText = document.getElementById('modalTechText');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalRolesList = document.getElementById('modalRolesList');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const previewsGrid = document.getElementById('previewsGrid');

    // Open Modal
    const openProjectModal = (projectKey) => {
        const project = projectsData[projectKey];
        if (!project) return;

        // Populate text content
        modalBadge.textContent = project.badge;
        modalTitle.textContent = project.title;
        modalAbout.textContent = project.about;
        modalTechText.textContent = project.tech;

        // Populate Roles List
        modalRolesList.innerHTML = '';
        project.roles.forEach(role => {
            const li = document.createElement('li');
            li.textContent = role;
            modalRolesList.appendChild(li);
        });

        // Populate Features List
        modalFeaturesList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeaturesList.appendChild(li);
        });

        // Set GitHub link
        modalGithubLink.href = project.github;

        // Populate Previews Grid (2x2)
        previewsGrid.innerHTML = '';
        project.gallery.forEach(screen => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            const previewLabel = document.createElement('div');
            previewLabel.className = 'preview-item-label';
            previewLabel.textContent = screen.label;
            previewItem.appendChild(previewLabel);

            const deviceWrapper = document.createElement('div');
            const isMobile = project.type === 'mobile';
            deviceWrapper.className = isMobile ? 'mock-mobile-device' : 'mock-browser-device';

            if (isMobile) {
                deviceWrapper.innerHTML = `
                    <div class="mock-mobile-speaker"></div>
                    <div class="mock-mobile-camera"></div>
                    <div class="mock-mobile-screen">
                        <div class="mock-mobile-status-bar">
                            <span class="mock-time">09:41</span>
                            <div class="mock-status-icons">
                                <i class="fa-solid fa-wifi"></i>
                                <i class="fa-solid fa-signal"></i>
                                <i class="fa-solid fa-battery-full"></i>
                            </div>
                        </div>
                        <div class="mock-mobile-content mock-viewport"></div>
                        <div class="mock-mobile-home-indicator"></div>
                    </div>
                `;
                previewItem.appendChild(deviceWrapper);
                const viewport = deviceWrapper.querySelector('.mock-viewport');
                renderMobileScreenContent(viewport, projectKey, screen.id);
            } else {
                deviceWrapper.innerHTML = `
                    <div class="mock-browser-header">
                        <div class="mock-browser-dots">
                            <span class="mock-dot mock-dot-close"></span>
                            <span class="mock-dot mock-dot-minimize"></span>
                            <span class="mock-dot mock-dot-expand"></span>
                        </div>
                        <div class="mock-browser-address">
                            <i class="fa-solid fa-lock security-lock"></i>
                            <span class="address-text">localhost:3000/${projectKey}/${screen.id}</span>
                        </div>
                    </div>
                    <div class="mock-browser-viewport mock-viewport"></div>
                `;
                previewItem.appendChild(deviceWrapper);
                const viewport = deviceWrapper.querySelector('.mock-viewport');
                renderBrowserScreenContent(viewport, projectKey, screen.id);
            }

            previewsGrid.appendChild(previewItem);
        });

        // Show modal & disable scroll
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close Modal
    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        previewsGrid.innerHTML = '';
    };

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', closeProjectModal);
        modalOverlay.addEventListener('click', closeProjectModal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeProjectModal();
            }
        });
    }

    // Attach click triggers
    const attachDetailTriggers = () => {
        document.querySelectorAll('.btn-detail').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectKey = button.getAttribute('data-project');
                openProjectModal(projectKey);
            });
        });
    };

    attachDetailTriggers();

    const renderBrowserScreenContent = (viewport, projectKey, screenId) => {
        let htmlContent = '';
        
        if (projectKey === 'posyandu') {
            if (screenId === 'dashboard') {
                htmlContent = `
                    <div class="mock-view posyandu-dashboard">
                        <div class="mock-view-header">
                            <h5>Kemuning 12 Dashboard</h5>
                            <span class="badge-live"><span class="pulse-dot"></span> Live</span>
                        </div>
                        <div class="mock-stats-grid">
                            <div class="mock-stat-card">
                                <span class="stat-label">Total Balita</span>
                                <span class="stat-value">124</span>
                                <span class="stat-sub text-success"><i class="fa-solid fa-arrow-up"></i> 12%</span>
                            </div>
                            <div class="mock-stat-card">
                                <span class="stat-label">Kehadiran</span>
                                <span class="stat-value">92%</span>
                                <span class="stat-sub text-success">Sangat Baik</span>
                            </div>
                            <div class="mock-stat-card">
                                <span class="stat-label">Status Sehat</span>
                                <span class="stat-value">110</span>
                                <span class="stat-sub">KMS Hijau</span>
                            </div>
                        </div>
                        <div class="mock-chart-container">
                            <h6>Grafik Kunjungan Bulanan</h6>
                            <div class="mock-bar-chart">
                                <div class="chart-bar" style="height: 35%;" data-month="Jan"></div>
                                <div class="chart-bar" style="height: 55%;" data-month="Feb"></div>
                                <div class="chart-bar" style="height: 45%;" data-month="Mar"></div>
                                <div class="chart-bar" style="height: 70%;" data-month="Apr"></div>
                                <div class="chart-bar active" style="height: 85%;" data-month="Mei"></div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'databalita') {
                htmlContent = `
                    <div class="mock-view posyandu-databalita">
                        <div class="mock-view-header">
                            <h5>Data Balita</h5>
                            <button class="btn-mock-add"><i class="fa-solid fa-plus"></i> Tambah</button>
                        </div>
                        <div class="mock-search-bar">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Cari nama balita..." disabled value="Alvian">
                        </div>
                        <table class="mock-table">
                            <thead>
                                <tr>
                                    <th>Nama Balita</th>
                                    <th>Umur</th>
                                    <th>Nama Ibu</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="highlight">
                                    <td><strong>Alvian Putra</strong></td>
                                    <td>18 bln</td>
                                    <td>Siti Aminah</td>
                                    <td><span class="tbl-badge green">Sehat</span></td>
                                </tr>
                                <tr>
                                    <td>Bella Clarissa</td>
                                    <td>8 bln</td>
                                    <td>Dewi Lestari</td>
                                    <td><span class="tbl-badge yellow">Gizi Kurang</span></td>
                                </tr>
                                <tr>
                                    <td>Daffa Satria</td>
                                    <td>24 bln</td>
                                    <td>Ratna Sari</td>
                                    <td><span class="tbl-badge green">Sehat</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (screenId === 'pemeriksaan') {
                htmlContent = `
                    <div class="mock-view posyandu-pemeriksaan">
                        <div class="mock-view-header">
                            <h5>Rekam Pemeriksaan</h5>
                        </div>
                        <div class="mock-checkup-card">
                            <div class="card-header-main">
                                <h6>Alvian Putra <span class="sub">(18 Bulan)</span></h6>
                                <span class="date-tag">15 Jun 2026</span>
                            </div>
                            <div class="card-metrics">
                                <div class="metric-box">
                                    <span class="lbl">Berat Badan</span>
                                    <span class="val">11.2 Kg</span>
                                    <span class="stat green"><i class="fa-solid fa-circle-check"></i> Normal</span>
                                </div>
                                <div class="metric-box">
                                    <span class="lbl">Tinggi Badan</span>
                                    <span class="val">82.5 Cm</span>
                                    <span class="stat green"><i class="fa-solid fa-circle-check"></i> Normal</span>
                                </div>
                            </div>
                            <div class="card-details">
                                <div class="detail-row">
                                    <strong>Imunisasi:</strong>
                                    <span>Campak Booster, DPT 3</span>
                                </div>
                                <div class="detail-row">
                                    <strong>Catatan:</strong>
                                    <span>Tumbuh kembang anak sangat baik dan sesuai kurva KMS. Disarankan untuk menjaga asupan gizi seimbang.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'laporan') {
                htmlContent = `
                    <div class="mock-view posyandu-laporan">
                        <div class="mock-view-header">
                            <h5>Laporan Bulanan Kesehatan</h5>
                        </div>
                        <div class="mock-report-summary">
                            <div class="report-row"><span>Gizi Baik:</span><strong>85 Balita</strong></div>
                            <div class="report-row"><span>Kurang Gizi:</span><strong>4 Balita</strong></div>
                            <div class="report-row"><span>Imunisasi Lengkap:</span><strong>98 Balita</strong></div>
                        </div>
                    </div>
                `;
            }
        } else if (projectKey === 'perpustakaan') {
            if (screenId === 'api-endpoints') {
                htmlContent = `
                    <div class="mock-view library-api">
                        <div class="mock-view-header">
                            <h5>API Endpoints</h5>
                            <span class="badge-live">Swagger</span>
                        </div>
                        <div class="api-endpoints-list">
                            <div class="api-item get">
                                <span class="method">GET</span>
                                <span class="path">/api/v1/books</span>
                            </div>
                            <div class="api-item post">
                                <span class="method">POST</span>
                                <span class="path">/api/v1/rentals</span>
                            </div>
                        </div>
                        <div class="code-block-container">
                            <div class="code-header">Response GET /books</div>
                            <pre class="code-output"><code>{
  "id": 1024,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "status": "BORROWED"
}</code></pre>
                        </div>
                    </div>
                `;
            } else if (screenId === 'data-buku') {
                htmlContent = `
                    <div class="mock-view library-books">
                        <div class="mock-view-header">
                            <h5>Katalog Buku</h5>
                        </div>
                        <div class="books-grid-mock">
                            <div class="book-card-mock">
                                <div class="book-cover-mock orange">Code</div>
                                <div class="book-info-mock">
                                    <h6>Clean Code</h6>
                                    <span class="status-badge red">Dipinjam</span>
                                </div>
                            </div>
                            <div class="book-card-mock">
                                <div class="book-cover-mock blue">Algo</div>
                                <div class="book-info-mock">
                                    <h6>Intro Algorithms</h6>
                                    <span class="status-badge green">Tersedia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'data-anggota') {
                htmlContent = `
                    <div class="mock-view library-members">
                        <div class="mock-view-header">
                            <h5>Daftar Anggota</h5>
                        </div>
                        <div class="member-list-mock">
                            <div class="member-card-mock">
                                <div class="member-avatar">AF</div>
                                <div class="member-details">
                                    <h6>Amelia Flora</h6>
                                    <span class="id">LIB-001 • Aktif</span>
                                </div>
                            </div>
                            <div class="member-card-mock suspended">
                                <div class="member-avatar">BS</div>
                                <div class="member-details">
                                    <h6>Budi Santoso</h6>
                                    <span class="id text-error">LIB-002 • Overdue</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'transaksi-pinjam') {
                htmlContent = `
                    <div class="mock-view library-loans">
                        <div class="mock-view-header">
                            <h5>Peminjaman Buku Aktif</h5>
                        </div>
                        <div class="loan-list">
                            <div class="loan-item">
                                <span>Go Programming - Amelia Flora</span>
                                <span class="due-date">Due: 22 Jun 2026</span>
                            </div>
                            <div class="loan-item text-error">
                                <span>Clean Code - Budi Santoso</span>
                                <span class="due-date">Due: 14 Jun (Overdue)</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else if (projectKey === 'gsheets') {
            if (screenId === 'dashboard') {
                htmlContent = `
                    <div class="mock-view gsheets-dashboard">
                        <div class="mock-view-header">
                            <h5>Dashboard Integrasi</h5>
                            <span class="sync-status active"><i class="fa-solid fa-circle-check"></i> Connected</span>
                        </div>
                        <div class="sync-actions">
                            <button class="btn-sync-now"><i class="fa-solid fa-arrows-rotate"></i> Sync Sheets</button>
                        </div>
                        <div class="metrics-row">
                            <div class="metric-box">
                                <span class="label">Total Rows</span>
                                <span class="value">2.540</span>
                            </div>
                            <div class="metric-box">
                                <span class="label">Filtered</span>
                                <span class="value">1.821</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'source-sheets') {
                htmlContent = `
                    <div class="mock-view gsheets-source">
                        <div class="gsheets-header-bar">
                            <span class="title-green"><i class="fa-regular fa-file-excel"></i> Google Sheets Source</span>
                        </div>
                        <div class="sheets-grid-container">
                            <table class="sheets-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="header-row">
                                        <td class="row-num">1</td>
                                        <td>ID</td>
                                        <td>Nama</td>
                                        <td>Status</td>
                                    </tr>
                                    <tr>
                                        <td class="row-num">2</td>
                                        <td>1</td>
                                        <td>Aditya</td>
                                        <td>Active</td>
                                    </tr>
                                    <tr>
                                        <td class="row-num">3</td>
                                        <td>2</td>
                                        <td>Rina</td>
                                        <td>Pending</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            } else if (screenId === 'processed-data') {
                htmlContent = `
                    <div class="mock-view gsheets-processed">
                        <div class="mock-view-header">
                            <h5>Data Terproses</h5>
                        </div>
                        <p class="description">Filtering: <strong>Status = Active</strong></p>
                        <table class="mock-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Aditya</td>
                                    <td><span class="tbl-badge green">Active</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (screenId === 'api-status') {
                htmlContent = `
                    <div class="mock-view gsheets-api-status">
                        <div class="mock-view-header">
                            <h5>Google API Status</h5>
                        </div>
                        <div class="api-debug-box">
                            <div class="debug-row"><span>API Client:</span><span class="text-success">Connected</span></div>
                            <div class="debug-row"><span>OAuth Type:</span><span>Service Account</span></div>
                            <div class="debug-row"><span>Response Time:</span><span>142ms</span></div>
                        </div>
                    </div>
                `;
            }
        } else if (projectKey === 'inventoryhp') {
            if (screenId === 'dashboard') {
                htmlContent = `
                    <div class="mock-view inventory-dashboard">
                        <div class="mock-view-header">
                            <h5>Dashboard Inventaris</h5>
                        </div>
                        <div class="mock-stats-grid">
                            <div class="mock-stat-card">
                                <span class="stat-label">Total Unit</span>
                                <span class="stat-value">412 Pcs</span>
                            </div>
                            <div class="mock-stat-card">
                                <span class="stat-label">Nilai Stok</span>
                                <span class="stat-value">Rp 1.25M</span>
                            </div>
                            <div class="mock-stat-card">
                                <span class="stat-label">Limit Stok</span>
                                <span class="stat-value text-error">3 Seri</span>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'data-hp') {
                htmlContent = `
                    <div class="mock-view inventory-data">
                        <div class="mock-view-header">
                            <h5>Stok Handphone & IMEI</h5>
                        </div>
                        <table class="mock-table small-text">
                            <thead>
                                <tr>
                                    <th>Model HP</th>
                                    <th>IMEI</th>
                                    <th>Stok</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>iPhone 14 Pro</strong></td>
                                    <td>359182...</td>
                                    <td>14 Pcs</td>
                                </tr>
                                <tr>
                                    <td>Samsung S23</td>
                                    <td>358249...</td>
                                    <td>8 Pcs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (screenId === 'transaksi') {
                htmlContent = `
                    <div class="mock-view inventory-transactions">
                        <div class="mock-view-header">
                            <h5>Riwayat Transaksi</h5>
                        </div>
                        <div class="transaction-timeline">
                            <div class="t-item in">
                                <span class="t-badge green">IN</span>
                                <div class="t-details">
                                    <h6>+10 Pcs iPhone 14 Pro</h6>
                                    <span class="meta">15 Jun 2026 • Supplier</span>
                                </div>
                            </div>
                            <div class="t-item out">
                                <span class="t-badge red">OUT</span>
                                <div class="t-details">
                                    <h6>-1 Pcs Samsung S23</h6>
                                    <span class="meta">15 Jun 2026 • Rian Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'laporan') {
                htmlContent = `
                    <div class="mock-view inventory-reports">
                        <div class="mock-view-header">
                            <h5>Laporan Inventaris</h5>
                        </div>
                        <div class="mock-stats-grid">
                            <div class="mock-stat-card">
                                <span class="stat-label">Barang Masuk</span>
                                <span class="stat-value">84 Pcs</span>
                            </div>
                            <div class="mock-stat-card">
                                <span class="stat-label">Barang Keluar</span>
                                <span class="stat-value">52 Pcs</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        
        viewport.innerHTML = htmlContent;
    };

    const renderMobileScreenContent = (viewport, projectKey, screenId) => {
        let htmlContent = '';
        
        if (projectKey === 'sumtime') {
            if (screenId === 'dashboard') {
                htmlContent = `
                    <div class="mobile-app sumtime-home">
                        <div class="app-header">
                            <div class="user-info">
                                <span class="greeting">Halo, Amelia</span>
                                <span class="location"><i class="fa-solid fa-location-dot"></i> Surakarta</span>
                            </div>
                            <div class="cart-icon"><i class="fa-solid fa-shopping-bag"></i><span class="cart-badge">3</span></div>
                        </div>
                        <div class="app-promo-card">
                            <h6>Diskon Dimsum Day!</h6>
                            <p>Diskon 20% khusus hari ini</p>
                        </div>
                        <div class="menu-section">
                            <span class="menu-title">Menu Terlaris</span>
                            <div class="dimsum-list">
                                <div class="dimsum-card">
                                    <div class="dimsum-img-mock red">Siomay</div>
                                    <div class="dimsum-info">
                                        <h6>Siomay Dimsum</h6>
                                        <span class="price">Rp 18.000</span>
                                    </div>
                                </div>
                                <div class="dimsum-card">
                                    <div class="dimsum-img-mock orange">Hakau</div>
                                    <div class="dimsum-info">
                                        <h6>Hakau Udang</h6>
                                        <span class="price">Rp 22.000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'keranjang') {
                htmlContent = `
                    <div class="mobile-app sumtime-cart">
                        <div class="app-header-back">
                            <h5>Keranjang Belanja</h5>
                        </div>
                        <div class="cart-items-list">
                            <div class="cart-item-mock">
                                <div class="c-avatar red"></div>
                                <div class="c-info">
                                    <h6>Siomay Dimsum</h6>
                                    <span class="price">Rp 18.000</span>
                                    <div class="qty-selector">
                                        <span>-</span><strong>2</strong><span>+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="checkout-footer">
                            <div class="total-row">
                                <span>Total Tagihan</span>
                                <span class="total-val">Rp 58.000</span>
                            </div>
                            <button class="btn-checkout">Pesan Sekarang</button>
                        </div>
                    </div>
                `;
            } else if (screenId === 'status-pesanan') {
                htmlContent = `
                    <div class="mobile-app sumtime-tracking">
                        <div class="app-header-back">
                            <h5>Status Pesanan</h5>
                        </div>
                        <div class="tracking-summary">
                            <span class="order-id">ID: #ST-98725</span>
                            <span class="estimated-time">Estimasi: 20 Menit</span>
                        </div>
                        <div class="tracking-stepper">
                            <div class="step done">
                                <span class="step-dot"><i class="fa-solid fa-check"></i></span>
                                <div class="step-desc">
                                    <h6>Pesanan Diterima</h6>
                                    <span class="time">09:42 • Dapur</span>
                                </div>
                            </div>
                            <div class="step active">
                                <span class="step-dot"><i class="fa-solid fa-person-biking fa-fade"></i></span>
                                <div class="step-desc">
                                    <h6>Driver Mengirim</h6>
                                    <span class="time">Sedang di perjalanan</span>
                                </div>
                            </div>
                            <div class="step">
                                <span class="step-dot"><i class="fa-solid fa-house"></i></span>
                                <div class="step-desc">
                                    <h6>Pesanan Sampai</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (screenId === 'detail-menu') {
                htmlContent = `
                    <div class="mobile-app sumtime-menu-detail">
                        <div class="app-header-back">
                            <h5>Detail Menu</h5>
                        </div>
                        <div class="dimsum-large-img">Siomay Dimsum</div>
                        <div class="dimsum-detail-body">
                            <h5>Siomay Dimsum Jumbo</h5>
                            <p class="desc">Dibuat dari campuran daging ayam segar dan udang pilihan.</p>
                            <span class="price">Rp 18.000</span>
                        </div>
                    </div>
                `;
            }
        }
        
        viewport.innerHTML = htmlContent;
    };
});
