/* =================================================================
   SITE.JS — Hotel Lameira
   Funcionalidades partilhadas por todas as páginas:
   - Injeção do header e footer (substitui o <iframe>)
   - Menu de navegação responsivo (hambúrguer em mobile)
   - Alternância de tema claro/escuro (persistente)
   - Botão "voltar ao topo"
   - Marcação do link activo no menu
   ================================================================= */

(function () {
    "use strict";

    /* ---------- CAMINHOS RELATIVOS ----------
       Como o site usa pastas HTML/CSS/Media na raiz,
       todas as páginas estão em /HTML/, por isso os
       caminhos relativos partem sempre de ../ */
    const BASE = "";

    /* =================================================
       1. HTML DO HEADER
       ================================================= */
    function getHeaderHTML() {
        return `
        <div class="site-header-inner">
            <a href="${BASE}index.html" class="site-logo">
                <img src="${BASE}Media/imagem_logo.png" alt="Logótipo Hotel Lameira">
                <h3>Hotel</h3>
            </a>

            <nav class="site-nav" id="siteNav">
                <a href="${BASE}index.html" data-page="home">Home</a>
                <a href="${BASE}nossoServicos.html" data-page="nossoServicos">Serviços</a>
                <a href="${BASE}portifolio.html" data-page="portifolio">Portfólio</a>
                <a href="${BASE}contactos.html" data-page="contactos">Contactos</a>
                <a href="${BASE}blog.html" data-page="blog">Blog</a>
                <a href="${BASE}sobreNos.html" data-page="sobreNos">Sobre Nós</a>
            </nav>

            <div class="site-header-actions">
                <button id="themeToggle" class="theme-toggle-btn" aria-label="Alternar tema claro/escuro" title="Alternar tema">
                    <i class="fa-solid fa-moon" id="themeIcon"></i>
                </button>
                <button id="navToggle" class="nav-toggle-btn" aria-label="Abrir menu de navegação" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>`;
    }

    /* =================================================
       2. HTML DO FOOTER
       ================================================= */
    function getFooterHTML() {
        return `
        <div class="footer-inner">
            <div class="footer-col footer-col-brand">
                <div class="footer-logo-row">
                    <img class="footer-logo-img" src="${BASE}Media/imagem_logo.png" alt="Logótipo Hotel Lameira">
                    <h3 class="footer-brand-name">Hotel</h3>
                </div>
                <p class="footer-tagline">Conforto, elegância e hospitalidade no coração de Angola.</p>
                <div class="footer-socials">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="https://wa.me/244900000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-title">Navegação</h4>
                <ul class="footer-link-list">
                    <li><a href="${BASE}index.html">Home</a></li>
                    <li><a href="${BASE}nossoServicos.html">Serviços</a></li>
                    <li><a href="${BASE}portifolio.html">Portfólio</a></li>
                    <li><a href="${BASE}contactos.html">Contactos</a></li>
                    <li><a href="${BASE}sobreNos.html">Sobre Nós</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4 class="footer-col-title">Legal</h4>
                <ul class="footer-link-list">
                    <li><a href="${BASE}politaDePrivacidade.html">Política de Privacidade</a></li>
                    <li><a href="${BASE}TermosCondicoes.html">Termos e Condições</a></li>
                    <li><a href="${BASE}perguntasFrequentes.html">Perguntas Frequentes</a></li>
                    <li><a href="${BASE}blog.html">Blog</a></li>
                </ul>
            </div>

            <div class="footer-col footer-col-newsletter">
                <h4 class="footer-col-title">Newsletter</h4>
                <p class="footer-newsletter-text">Receba promoções exclusivas. Inscreva-se para receber novidades e ofertas especiais do nosso hotel.</p>
                <form id="newsletterForm" class="footer-newsletter-form" onsubmit="return false;">
                    <div class="footer-newsletter-row">
                        <input type="email" placeholder="O seu e-mail" required aria-label="O seu e-mail">
                        <button type="submit">Subscrever</button>
                    </div>
                    <p id="newsletterMsg" class="newsletter-msg" aria-live="polite"></p>
                </form>
            </div>
        </div>

        <div class="footer-bottom-bar">
            <p>&copy; 2026 Hotel Lameira — Luanda, Angola. Todos os direitos reservados.</p>
        </div>`;
    }

    /* =================================================
       3. INJETAR HEADER E FOOTER NA PÁGINA
       ================================================= */
    function injectLayout() {
        const headerMount = document.getElementById("site-header");
        const footerMount = document.getElementById("site-footer");

        if (headerMount) {
            headerMount.innerHTML = getHeaderHTML();
        }
        if (footerMount) {
            footerMount.innerHTML = getFooterHTML();
        }
    }

    /* =================================================
       4. MARCAR LINK ACTIVO NO MENU
       ================================================= */
    function highlightActiveLink() {
        const path = window.location.pathname;
        const fileName = path.substring(path.lastIndexOf("/") + 1).replace(".html", "") || "home";

        document.querySelectorAll(".site-nav a").forEach(function (link) {
            if (link.dataset.page === fileName) {
                link.classList.add("active-link");
            }
        });
    }

    /* =================================================
       5. MENU MOBILE (hambúrguer)
       ================================================= */
    function setupMobileMenu() {
        const navToggle = document.getElementById("navToggle");
        const siteNav = document.getElementById("siteNav");

        if (!navToggle || !siteNav) return;

        navToggle.addEventListener("click", function () {
            const isOpen = siteNav.classList.toggle("nav-open");
            navToggle.classList.toggle("active");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            document.body.style.overflow = isOpen ? "hidden" : "";
        });

        // Fechar o menu ao clicar num link (mobile)
        siteNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                siteNav.classList.remove("nav-open");
                navToggle.classList.remove("active");
                navToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });
    }

    /* =================================================
       6. TEMA CLARO / ESCURO (persistente via localStorage)
       ================================================= */
    function setupThemeToggle() {
        const toggleBtn = document.getElementById("themeToggle");
        const icon = document.getElementById("themeIcon");
        if (!toggleBtn || !icon) return;

        function applyIcon(theme) {
            icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }

        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        applyIcon(currentTheme);

        toggleBtn.addEventListener("click", function () {
            const isLight = document.documentElement.getAttribute("data-theme") === "light";
            const newTheme = isLight ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", newTheme);
            try {
                localStorage.setItem("hotelLameiraTheme", newTheme);
            } catch (e) { /* localStorage indisponível — ignora silenciosamente */ }
            applyIcon(newTheme);
        });
    }

    /* =================================================
       7. BOTÃO VOLTAR AO TOPO
       ================================================= */
    function setupBackToTop() {
        const btn = document.createElement("button");
        btn.id = "backToTopBtn";
        btn.className = "back-to-top-btn";
        btn.setAttribute("aria-label", "Voltar ao topo");
        btn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        document.body.appendChild(btn);

        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });

        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =================================================
       8. NEWSLETTER — feedback simples (sem back-end)
       ================================================= */
    function setupNewsletter() {
        document.addEventListener("submit", function (e) {
            if (e.target && e.target.id === "newsletterForm") {
                const msg = document.getElementById("newsletterMsg");
                const input = e.target.querySelector("input[type=email]");
                if (msg && input && input.value) {
                    msg.textContent = "Obrigado! Verifique o seu e-mail para confirmar a inscrição.";
                    input.value = "";
                }
            }
        });
    }

    /* =================================================
       9. BANNER DE COOKIES (consentimento RGPD)
       Só aparece se o utilizador ainda não decidiu.
       A aceitação activa o tracking (ver loadAnalytics).
       ================================================= */
    function setupCookieBanner() {
        const decision = localStorage.getItem("hotelLameiraCookieConsent");

        if (decision === "accepted") {
            loadAnalytics();
            return;
        }
        if (decision === "declined") {
            return;
        }

        const banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.id = "cookieBanner";
        banner.innerHTML = `
            <p>Utilizamos cookies para melhorar a sua experiência e analisar o tráfego do site.
               Consulte a nossa <a href="${BASE}politaDePrivacidade.html">Política de Privacidade</a>.</p>
            <div class="cookie-actions">
                <button class="cookie-decline" id="cookieDecline">Rejeitar</button>
                <button class="cookie-accept" id="cookieAccept">Aceitar</button>
            </div>`;
        document.body.appendChild(banner);

        // Levanta o botão "voltar ao topo" enquanto o banner estiver visível,
        // para que um nunca bloqueie cliques no outro.
        const backToTop = document.getElementById("backToTopBtn");
        if (backToTop) backToTop.classList.add("banner-open");

        requestAnimationFrame(function () {
            banner.classList.add("visible");
        });

        function dismissBanner(consentValue) {
            try { localStorage.setItem("hotelLameiraCookieConsent", consentValue); } catch (e) {}
            banner.classList.remove("visible");
            if (backToTop) backToTop.classList.remove("banner-open");
            setTimeout(function () { banner.remove(); }, 400);
        }

        document.getElementById("cookieAccept").addEventListener("click", function () {
            dismissBanner("accepted");
            loadAnalytics();
        });

        document.getElementById("cookieDecline").addEventListener("click", function () {
            dismissBanner("declined");
        });
    }

    /* =================================================
       10. ANALYTICS / PIXEL DE RASTREAMENTO
       --------------------------------------------------
       PRONTO PARA PRODUÇÃO: troque "G-XXXXXXXXXX" pelo
       ID real do Google Analytics (GA4) e/ou descomente
       o bloco do Meta Pixel com o seu Pixel ID.
       Só corre depois do utilizador aceitar os cookies.
       ================================================= */
    function loadAnalytics() {
        if (window.__analyticsLoaded) return;
        window.__analyticsLoaded = true;

        /* ---- Google Analytics (GA4) ----
        const gaScript = document.createElement("script");
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
        */

        /* ---- Meta Pixel (Facebook/Instagram Ads) ----
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'SEU_PIXEL_ID');
        fbq('track', 'PageView');
        */

        console.log("[Hotel Lameira] Consentimento de analytics aceite — pronto para activar GA4 / Meta Pixel.");
    }

    /* =================================================
       11. ANIMAÇÃO DE REVELAÇÃO AO SCROLL
       --------------------------------------------------
       Qualquer elemento com a classe "bemvindo-reveal" aparece
       com um fade + deslize suave quando entra no viewport.
       Usa Intersection Observer (leve, sem dependências).
       ================================================= */
    function setupScrollReveal() {
        const items = document.querySelectorAll('.bemvindo-reveal');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            // Navegador sem suporte: mostra tudo de imediato
            items.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function (el) { observer.observe(el); });
    }

    /* =================================================
       12. CONTADOR ANIMADO (ex: "98% hóspedes que recomendam")
       ================================================= */
    function setupAnimatedCounters() {
        const counters = document.querySelectorAll('[data-count-to]');
        if (!counters.length) return;

        function animateCounter(el) {
            const target = parseInt(el.dataset.countTo, 10) || 0;
            const duration = 1400;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
                el.textContent = Math.round(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            }
            requestAnimationFrame(tick);
        }

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(function (el) { observer.observe(el); });
    }

    /* =================================================
       INICIALIZAÇÃO
       ================================================= */
    document.addEventListener("DOMContentLoaded", function () {
        injectLayout();
        highlightActiveLink();
        setupMobileMenu();
        setupThemeToggle();
        setupBackToTop();
        setupNewsletter();
        setupCookieBanner();
        setupScrollReveal();
        setupAnimatedCounters();
    });
})();

/* =====================================================
   APLICAR TEMA GUARDADO O MAIS RÁPIDO POSSÍVEL
   (fora do DOMContentLoaded para evitar "flash" de tema errado)
   Este bloco corre de imediato quando o <script> é lido no <head>.
   ===================================================== */
(function applyStoredThemeEarly() {
    try {
        const saved = localStorage.getItem("hotelLameiraTheme");
        if (saved === "light" || saved === "dark") {
            document.documentElement.setAttribute("data-theme", saved);
        }
    } catch (e) { /* localStorage indisponível — mantém o tema por omissão */ }
})();
