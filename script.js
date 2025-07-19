// JavaScript code for the splash screen - Runs when the entire page has loaded
window.addEventListener('load', function() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Hide the splash screen after a short delay
    // 3000 milliseconds = 3 seconds (You can change this value)
    setTimeout(() => {
        if (splashScreen) { // Ensure the element exists before manipulating it
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
            splashScreen.style.pointerEvents = 'none'; // Make it not clickable after fading out
        }
    }, 3000); // 3 seconds delay before starting to fade out
});


// All your existing JavaScript code should be wrapped inside DOMContentLoaded
// because it deals with elements that need to be present when the DOM is ready.
document.addEventListener('DOMContentLoaded', function() {
    // 1. تحديث السنة الحالية في الفوتر تلقائياً
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const currentYear2Span = document.getElementById('currentYear2'); // لصفحة دراسة الحالة
    if (currentYear2Span) {
        currentYear2Span.textContent = new Date().getFullYear();
    }

    // 2. التمرير السلس (Smooth Scrolling)
    document.querySelectorAll('nav a[href^="#"], .btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header')?.offsetHeight || 0), // يتم طرح ارتفاع الهيدر
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. التحقق من صحة حقول نموذج الاتصال (Form Validation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع الإرسال الافتراضي للصفحة

            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;

            let isValid = true;
            let errorMessage = '';

            // التحقق من الاسم
            if (name.trim() === '') {
                isValid = false;
                errorMessage += 'الرجاء إدخال اسمك.\n';
            }

            // التحقق من البريد الإلكتروني باستخدام تعبير عادي بسيط
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                errorMessage += 'الرجاء إدخال بريد إلكتروني صالح.\n';
            }

            // التحقق من الرسالة
            if (message.trim() === '') {
                isValid = false;
                errorMessage += 'الرجاء كتابة رسالتك.\n';
            }

            if (!isValid) {
                alert('خطأ في الإدخال:\n' + errorMessage);
            } else {
                // إذا كانت البيانات صحيحة، يمكنك إرسال النموذج هنا
                // For demonstration, just show an alert
                alert('تم إرسال رسالتك بنجاح! (هذا النموذج تجريبي)');
                this.reset(); // مسح حقول النموذج بعد الإرسال
                // في مشروع حقيقي، ستقوم بإرسال البيانات إلى خادم (backend) باستخدام Fetch API أو XMLHttpRequest
                // مثال: fetch('/submit-form', { method: 'POST', body: new FormData(this) })
            }
        });
    }

    // 4. تأثيرات حركية (Fade-in on scroll for sections)
    const observerOptions = {
        root: null, // العنصر الذي يكون جزءاً منه Target (viewport في هذه الحالة)
        rootMargin: '0px',
        threshold: 0.1 // عندما يكون 10% من العنصر مرئياً
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور مرة واحدة
            }
        });
    }, observerOptions);

    // تطبيق التأثير على الأقسام الرئيسية في الصفحة
    document.querySelectorAll('section').forEach(section => {
        // لا نريد تطبيق التأثير على الهيدر أو الفوتر
        if (!section.classList.contains('hero') && !section.classList.contains('case-study-hero') && !section.classList.contains('contact-section') && section.id !== 'hero' && section.tagName !== 'HEADER' && section.tagName !== 'FOOTER') {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            sectionObserver.observe(section);
        }
    });

});