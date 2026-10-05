// مجمع الفيحاء الطبي - ملف JavaScript
// تأثيرات التمرير، الكاونتر، نظام الحجز، التنقل المحمول

document.addEventListener('DOMContentLoaded', () => {
    // ---- Smooth Loader ----
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 800);
        }, 1200);
    }

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Mobile menu toggle ----
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // ---- Scroll Animations (IntersectionObserver) ----
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // ---- Counter Animation ----
    const counters = document.querySelectorAll('.trust-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(element, target) {
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            element.textContent = target >= 100 ? current + '+' : current;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ---- Particle Background ----
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 20}s`;
            particlesContainer.appendChild(p);
        }
    }

    // ---- Department Data ----
    const departmentsData = [
        { name: 'أمراض القلب والوعاء النبضي', icon: '❤️', color: '#10B981' },
        { name: 'أمراض الأطفال', icon: '👶', color: '#3B82F6' },
        { name: 'جراحة الأنسة', icon: '🛠️', color: '#8B5CF6' },
        { name: 'طب النسائية والولادة', icon: '🤱', color: '#F59E0B' },
        { name: 'طب العيون', icon: '👁️', color: '#06B6D4' },
        { name: 'أمراض الجرثومي', icon: '💉', color: '#EF4444' }
    ];

    const departmentsGrid = document.getElementById('departmentsGrid');
    if (departmentsGrid) {
        departmentsGrid.innerHTML = departmentsData.map((d, i) => `
            <div class="service-card" data-reveal="fade-up" data-delay="${i * 0.1}">
                <div class="service-icon" style="color:${d.color}">${d.icon}</div>
                <h3>${d.name}</h3>
                <p>رعاية متخصصة بأحدث التقنيات</p>
            </div>
        `).join('');
    }

    // ---- Doctors Data ----
    const doctorsData = [
        { name: 'د. محمد علي', specialty: 'أمراض القلب', icon: '❤️' },
        { name: 'د. فاطمة أحمد', specialty: 'أمراض الأطفال', icon: '👶' },
        { name: 'د. سارة خالد', specialty: 'جراحة الأنسة', icon: '🛠️' },
        { name: 'د. خالد عبد الله', specialty: 'طب النسائية', icon: '🤱' },
        { name: 'د. نورا حسين', specialty: 'طب العيون', icon: '👁️' },
        { name: 'د. عبد الرحمن فادي', specialty: 'أمراض الجرثومي', icon: '💉' }
    ];

    const doctorsGrid = document.getElementById('doctorsGrid');
    if (doctorsGrid) {
        doctorsGrid.innerHTML = doctorsData.map((d, i) => `
            <div class="service-card" data-reveal="fade-up" data-delay="${i * 0.1}">
                <div class="service-icon">${d.icon}</div>
                <h3>${d.name}</h3>
                <p>${d.specialty}</p>
            </div>
        `).join('');
    }

    // ---- Department Select Population ----
    const deptSelect = document.getElementById('department');
    if (deptSelect) {
        departmentsData.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.name;
            opt.textContent = d.name;
            deptSelect.appendChild(opt);
        });
    }

    // ---- Doctor Select Dynamic Population ----
    const doctorSelect = document.getElementById('doctor');
    if (deptSelect && doctorSelect) {
        deptSelect.addEventListener('change', () => {
            const selectedDept = deptSelect.value;
            doctorSelect.innerHTML = '<option value="">اختر الطبيب</option>';
            doctorSelect.disabled = !selectedDept;

            if (selectedDept) {
                departmentsData.forEach((d, idx) => {
                    if (d.name === selectedDept) {
                        const doctor = doctorsData[idx % doctorsData.length];
                        const opt = document.createElement('option');
                        opt.value = doctor.name;
                        opt.textContent = `${doctor.name} - ${doctor.specialty}`;
                        doctorSelect.appendChild(opt);
                    }
                });
            }
        });
    }

    // ---- Appointment Form Submission ----
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = appointmentForm.querySelector('.btn-submit');
            const btnText = btn.querySelector('.btn-text');
            btnText.textContent = 'جارٍ الإرسال...';
            btn.disabled = true;

            setTimeout(() => {
                const name = document.getElementById('patientName').value;
                btnText.textContent = `تم الحجز بنجاح! ${name}`;
                btn.style.background = '#10B981';
                appointmentForm.reset();
                doctorSelect.disabled = true;
            }, 1200);
        });
    }

    // ---- Contact Form Submission ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.textContent = 'جارٍ الإرسال...';
            btn.disabled = true;

            setTimeout(() => {
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
                btn.textContent = 'إرسال الرسالة';
                btn.disabled = false;
                contactForm.reset();
            }, 1000);
        });
    }

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (entry.isIntersecting && navLink) {
                navItems.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => sectionObserver.observe(s));
});
