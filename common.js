(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var yclid = urlParams.get('yclid');
    var gclid = urlParams.get('gclid');
    var utm_source = urlParams.get('utm_source') || (gclid ? 'google' : 'yandex');
    var utm_medium = urlParams.get('utm_medium') || 'cpc';
    var utm_campaign = urlParams.get('utm_campaign') || 'direct';
    var utm_term = urlParams.get('utm_term') || '';
    var utm_content = urlParams.get('utm_content') || '';

    window.visionFlowClientId = null;

    function buildStartParam(clientId) {
        var startParam = utm_source + '_' + utm_medium + '_' + utm_campaign;
        if (utm_term) startParam += '_' + utm_term;
        if (utm_content) startParam += '_' + utm_content;
        if (clientId) startParam += '_cid_' + clientId;
        if (yclid && yclid !== '{logid}') startParam += '_yclid_' + yclid;
        if (gclid) startParam += '_gclid_' + gclid;
        return startParam;
    }

    var redirected = false;
    window.goToBot = function() {
        if (redirected) return;
        redirected = true;
        var startParam = buildStartParam(window.visionFlowClientId);
        var botLink = 'https://t.me/vision_flow_bot?start=' + encodeURIComponent(startParam);
        if (typeof gtag === 'function') gtag('event', 'page_view');
        setTimeout(function() { window.location.href = botLink; }, 500);
    };

    function bindCta(id) {
        var btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', function(e) { e.preventDefault(); window.goToBot(); });
    }
    bindCta('ctaBtn');
    bindCta('headerCtaBtn');

    (function burgerMenu() {
        var btn = document.getElementById('burgerBtn');
        var nav = document.querySelector('.site-nav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function() {
            btn.classList.toggle('active');
            nav.classList.toggle('nav-open');
            document.body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
        });
        [].slice.call(nav.querySelectorAll('.nav-link, .nav-dropdown-menu a')).forEach(function(a) {
            a.addEventListener('click', function() {
                btn.classList.remove('active');
                nav.classList.remove('nav-open');
                document.body.style.overflow = '';
            });
        });
    })();

    (function docsDropdown() {
        var triggers = document.querySelectorAll('.nav-dropdown-trigger');
        triggers.forEach(function(btn) {
            var wrap = btn.closest('.nav-dropdown');
            if (!wrap) return;
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-dropdown.open').forEach(function(o) { if (o !== wrap) o.classList.remove('open'); });
                wrap.classList.toggle('open');
            });
        });
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown.open').forEach(function(o) { o.classList.remove('open'); });
        });
    })();

    (function preserveParams() {
        var q = window.location.search;
        if (!q) return;
        var sel = '.site-nav a[href^="index.html"], .site-nav a[href^="about.html"], .site-nav a[href^="howto.html"], .site-nav a[href^="possibilities.html"], .site-nav a[href^="faq.html"], .site-nav a[href^="privacy.html"], .site-nav a[href^="offer.html"], .footer-links a, .nav-dropdown-menu a';
        document.querySelectorAll(sel).forEach(function(a) {
            var href = a.getAttribute('href');
            if (href && href !== '#' && href.indexOf('?') === -1) a.setAttribute('href', href + q);
        });
    })();

    if (typeof ym !== 'undefined') {
        ym(104830688, 'getClientID', function(retrievedClientID) { window.visionFlowClientId = retrievedClientID; });
    }
})();
