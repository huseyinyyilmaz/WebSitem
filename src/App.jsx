import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import aboutImg from './1.jpg';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// --- [ AYARLAR ] ---
// NOT: Mobilde arka plan geometrileri (particles) kasma yapmasın diye ayarları dinamik yöneteceğiz.

// [GÜNCELLENDİ] Logo Bileşeni
// public klasöründe şu dosyalar olması beklenir:
// - /tasarimkurdu-logo.png
// - /mobiltasarimkurdu-logo.png  (mobilde daha iyi görünmesi için opsiyonel)
const Logo = ({ isMobile = false, variant = "header" }) => {
  // public klasöründe beklenen dosyalar:
  // - /tasarimkurdu-logo.png
  // - /mobiltasarimkurdu-logo.png          (mobil header için)
  // - /mobiltasarimkurdu-logo-siyah.png    (mobil menü açıkken, beyaz zeminde görünsün diye)
  const src = (() => {
    if (!isMobile) return "/tasarimkurdu-logo.png";
    if (variant === "mobileMenu") return "/mobiltasarimkurdu-logo-siyah.png";
    return "/mobiltasarimkurdu-logo.png";
  })();

  return (
    <div className={`logo-container ${variant === "mobileMenu" ? "logo--menu" : variant === "mobileHeader" ? "logo--mobile-header" : "logo--navbar"}`}>
      <img
        src={src}
        alt="TasarımKurdu Logo"
        className={variant === "mobileMenu" ? "mobile-menu-logo-img" : variant === "mobileHeader" ? "mobile-header-logo-img" : "navbar-logo-img"}
        loading="eager"
        decoding="async"
      />

      <div className="logo-text-container">
        <span className="logo-title">TASARIMKURDU</span>
        <span className="logo-subtitle">WEB & GRAFİK ÇÖZÜMLERİ</span>
      </div>
    </div>
  );
};


function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Mobil tespiti (performans ve layout ayarları için)
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 640px)');
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setIsMobile(mqMobile.matches);
      setPrefersReducedMotion(mqReduced.matches);
    };
    sync();

    mqMobile.addEventListener?.('change', sync);
    mqReduced.addEventListener?.('change', sync);

    return () => {
      mqMobile.removeEventListener?.('change', sync);
      mqReduced.removeEventListener?.('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
      setIsMobileServicesOpen(false);
    }
  }, [isMobile]);

  const slidesPerView = isMobile ? 1 : 3;

  const servicesOriginal = [
    { id: "01", title: "Web Geliştirme", desc: "Modern teknolojiler (React, Python) kullanarak; hızlı, %100 SEO uyumlu, mobil dostu ve dönüşüm odaklı kurumsal web siteleri inşa ediyoruz.", icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "02", title: "Mobil Uygulama", desc: "iOS ve Android platformlarında sorunsuz çalışan, kullanıcı deneyimi (UX) yüksek, performanslı native ve hibrit mobil uygulamalar geliştiriyoruz.", icon: <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zM10 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "03", title: "UI/UX Tasarım", desc: "Kullanıcı alışkanlıklarını analiz ederek, markanızın kimliğini yansıtan, estetik ve kullanımı kolay arayüz tasarımları hazırlıyoruz.", icon: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "04", title: "Dijital Pazarlama", desc: "Sosyal medya yönetimi, içerik stratejisi ve veri odaklı kampanyalarla markanızın dijital dünyadaki görünürlüğünü ve etkileşimini artırıyoruz.", icon: <path d="M2 20h20M5 20V10M10 20V4M15 20v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "05", title: "E-Ticaret Çözümleri", desc: "Güvenli ödeme altyapısı, kolay yönetim paneli ve satış artırıcı özelliklerle donatılmış, 7/24 kazandıran e-ticaret mağazaları kuruyoruz.", icon: <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "06", title: "Yapay Zeka & Veri", desc: "İş süreçlerinizi hızlandıran yapay zeka destekli otomasyonlar, veri analizi sistemleri ve özel bot yazılımları üretiyoruz.", icon: <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4.93 19.07a10 10 0 0 1 1.65-10.85 2 2 0 0 1 3.24 2.63 6 6 0 0 0-.6 7.69 2 2 0 0 1-2.63 3.24 10 10 0 0 1-1.66-2.71z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> },
    { id: "07", title: "Google Ads Reklamları", desc: "Hedef kitlenize nokta atışı ulaşmanızı sağlayan optimizasyonlu Google reklamlarıyla, bütçenizi en verimli şekilde kullanmanızı sağlıyoruz.", icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> }
  ];

  const services = [...servicesOriginal, ...servicesOriginal, ...servicesOriginal];
  const philosophyData = [
    { title: "Biz Ne Değiliz?", desc: "Gösterip geçmeyiz, etki bırakmıyorsa yapmayız." },
    { title: "Peki Neyiz?", desc: "Görünene değil, görünmeyene müdahale ederiz." },
    { title: "Hedefimiz Ne?", desc: "Markanı anlatmak değil, hissettirerek göstermek isteriz." },
    { title: "Nerede Kaybolur?", desc: "Anlam taşımıyorsa, güzel görünse de silinir." },
    { title: "Kim Unutulur?", desc: "Sadece sesi çıkan değil, iz bırakmayan herkes unutulur." },
    { title: "Ne Eksik Kalır?", desc: "İmaj doluysa bile, hissi yoksa her şey eksik kalır." },
    { title: "Ne Olmazsa Olmaz?", desc: "Tutku yoksa, tasarım yalnızca şekildir." },
    { title: "Ne İçin Varız?", desc: "Fikirleri değil, izleri kalıcı kılmak için." },
    { title: "Nereden Başlar?", desc: "Görünenden değil, hissettirdiğinden." },
  ];

  const [currentIndex, setCurrentIndex] = useState(servicesOriginal.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const isTransitioning = useRef(false);

  const scrollToServiceCard = (index) => {
    setCurrentIndex(servicesOriginal.length + index);
    setTransitionEnabled(true);
    const element = document.getElementById('services');
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    setIsDropdownOpen(false); setIsMobileMenuOpen(false); setIsMobileServicesOpen(false);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const onDragStart = (e) => { if (isTransitioning.current) return; setIsDragging(true); setStartX(e.pageX || e.touches[0].pageX); setTransitionEnabled(false); };
  const onDragMove = (e) => { if (!isDragging) return; const currentX = e.pageX || e.touches[0].pageX; const diff = currentX - startX; setDragOffset(diff); };
  const onDragEnd = () => { if (!isDragging) return; setIsDragging(false); setTransitionEnabled(true); const threshold = 100; if (dragOffset < -threshold) nextSlide(); else if (dragOffset > threshold) prevSlide(); setDragOffset(0); };

  const nextSlide = () => { if (isTransitioning.current) return; isTransitioning.current = true; setTransitionEnabled(true); setCurrentIndex(prev => prev + 1); };
  const prevSlide = () => { if (isTransitioning.current) return; isTransitioning.current = true; setTransitionEnabled(true); setCurrentIndex(prev => prev - 1); };
  const handleTransitionEnd = () => { isTransitioning.current = false; const totalOriginal = servicesOriginal.length; if (currentIndex >= totalOriginal * 2) { setTransitionEnabled(false); setCurrentIndex(currentIndex - totalOriginal); } else if (currentIndex < totalOriginal) { setTransitionEnabled(false); setCurrentIndex(currentIndex + totalOriginal); } };

  const particlesInit = useCallback(async engine => { await loadSlim(engine); }, []);
  const scrollToSection = (id) => { const element = document.getElementById(id); if (element) { window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' }); setIsMobileMenuOpen(false); } };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      const servicesSection = document.getElementById('services');
      const aboutSection = document.getElementById('about');
      const howItWorksSection = document.getElementById('how-it-works');
      const philosophySection = document.getElementById('philosophy');
      
      if (philosophySection && scrollY >= philosophySection.offsetTop - 300) setActiveSection('philosophy');
      else if (howItWorksSection && scrollY >= howItWorksSection.offsetTop - 300) setActiveSection('how-it-works');
      else if (aboutSection && scrollY >= aboutSection.offsetTop - 300) setActiveSection('about');
      else if (servicesSection && scrollY >= servicesSection.offsetTop - 300) setActiveSection('services');
      else setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('active'); } });
    }, { threshold: 0.1 });
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  const whatsappLink = "https://wa.me/+905541460813";
  const instagramLink = "https://www.instagram.com/tasarimmkurdu";
  const marqueeItems = ["SİBER GÜVENLİK", "WEB TASARIM", "PYTHON YAZILIM", "SEO OPTİMİZASYON", "MOBİL UYGULAMA", "E-TİCARET ÇÖZÜMLERİ", "VERİ ANALİZİ", "KURUMSAL KİMLİK", "YAPAY ZEKA", "DİJİTAL PAZARLAMA", "OTOMASYON"];

  // Mobilde particles kapalı (performans). İstersen burayı "düşük ayar"a da çevirebiliriz.
  const shouldRenderParticles = !prefersReducedMotion;
  const particleOptions = {
    fpsLimit: isMobile ? 30 : 60,
    detectRetina: true,
    background: { color: { value: "transparent" } },
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: "repulse" },
        resize: true
      },
      modes: { repulse: { distance: isMobile ? 90 : 150, duration: 0.4 } }
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        enable: true,
        color: "#ffffff",
        distance: isMobile ? 140 : 190,
        opacity: isMobile ? 0.15 : 0.22,
        width: 1
      },
      move: { enable: true, speed: isMobile ? 0.35 : 1.4 },
      number: { value: isMobile ? 28 : 90, density: { enable: true, area: 900 } },
      opacity: { value: isMobile ? 0.45 : 0.42 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: isMobile ? 3 : 4 } }
    }
  };

  return (
    <div className="app-container">

			<a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="floating-whatsapp">
				<svg width="35" height="35" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			</a>

			{isMobile && (
				<>
					<div
						className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
						onClick={() => setIsMobileMenuOpen(false)}
					/>
					<div className={`mobile-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
						<div className="sidebar-header">
							<div className="logo-mobile">
								<Logo isMobile={isMobile} variant="mobileMenu" />
							</div>
							<div className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
								✕
							</div>
						</div>

						<ul className="sidebar-links">
							<li><a onClick={() => scrollToSection('home')}>ANASAYFA</a></li>
							<li className="mobile-dropdown">
								<div
									className={`dropdown-toggle ${activeSection === 'services' ? 'active' : ''}`}
									onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
								>
									HİZMETLER <span className={`arrow ${isMobileServicesOpen ? 'up' : ''}`}>▼</span>
								</div>
								<ul className={`mobile-submenu ${isMobileServicesOpen ? 'open' : ''}`}>
									{servicesOriginal.map((service, index) => (
										<li key={service.id}>
											<a onClick={() => scrollToServiceCard(index)}>{service.title}</a>
										</li>
									))}
								</ul>
							</li>
							<li><a onClick={() => scrollToSection('about')}>HAKKIMIZDA</a></li>
							<li><a onClick={() => scrollToSection('how-it-works')}>NASIL ÇALIŞIRIZ</a></li>
							<li><a onClick={() => scrollToSection('philosophy')}>MARKA FELSEFESİ</a></li>
							<li><a onClick={() => scrollToSection('footer')}>İLETİŞİM</a></li>
						</ul>

						<div className="sidebar-footer">
							<a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="sidebar-btn">
								TEKLİF ALIN
							</a>
						</div>
					</div>
				</>
			)}

			<nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="logo" onClick={() => scrollToSection('home')}><Logo isMobile={isMobile} variant={isMobile ? "mobileHeader" : "navbar"} /></div>
          {isMobile && (<div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(true)}><div className="bar"></div><div className="bar"></div><div className="bar"></div></div>)}
			<ul className="nav-links desktop-only">
            
            {/* [GÜNCELLENDİ] Instagram Sol Tarafa Daha Çok Kaydırıldı */}
				<li className={`nav-home-with-instagram ${activeSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="nav-instagram-link" onClick={(e) => e.stopPropagation()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
					<span className="nav-home-text">ANASAYFA</span>
            </li>

            <li className={`dropdown-container ${activeSection === 'services' ? 'active' : ''}`} onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)} onClick={() => scrollToSection('services')}>
              HİZMETLER ▾
              {isDropdownOpen && (<div className="dropdown-menu">{servicesOriginal.map((service, index) => (<a key={service.id} onClick={(e) => { e.stopPropagation(); scrollToServiceCard(index); }}>{service.title}</a>))}</div>)}
            </li>
            <li className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>HAKKIMIZDA</li>
            <li className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => scrollToSection('how-it-works')}>NASIL ÇALIŞIRIZ</li>
            <li className={activeSection === 'philosophy' ? 'active' : ''} onClick={() => scrollToSection('philosophy')}>MARKA FELSEFESİ</li>
            <li className={activeSection === 'footer' ? 'active' : ''} onClick={() => scrollToSection('footer')}>İLETİŞİM</li>
          </ul>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="offer-btn desktop-only"><span className="btn-text">TEKLİF ALIN</span><div className="yellow-bg"></div></a>
      </nav>

      <div className="main-content">
        <header id="home" className="hero-section">
          {shouldRenderParticles && (
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={particleOptions}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none", height: "100%" }}
            />
          )}
          <div className="hero-text reveal">
            {/* [ELLE DÜZENLE] ÇEVRİM İÇİ ROZETİ (CSS: .online-badge-container, .online-dot) */}
            <div className="online-badge-container"><div className="online-dot"></div><span>Şu an Çevrimiçi</span></div>
            <h1>PROFESYONEL <br /><span className="outline-text">WEB TASARIM</span> <br />AJANSI</h1>
            <p>Geleceği tahmin etmenin en iyi yolu, onu tasarlamaktır. TasarımKurdu olarak vizyonumuz; sadece işlevsel web siteleri yapmak değil, markanıza değer katan, yaşayan ve gelişen dijital ekosistemler kurmaktır. Biz bugünü değil, sonrasını düşünerek tasarlarız.</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="offer-btn main-size"><span className="btn-text">TEKLİF ALIN</span><div className="yellow-bg"></div></a>
          </div>
          <div className="hero-image reveal"><img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454628-2918517.png" alt="Web Tasarım" /></div>
        </header>

        <div className="scrolling-ticker"><div className="ticker-track">{[...marqueeItems, ...marqueeItems].map((item, index) => (<div className="ticker-item" key={index}><span className="ticker-dot">●</span>{item}</div>))}</div></div>

        <section id="services" className="services-section">
          <div className="services-header reveal"><span className="subtitle">Kurumsal Çözümler</span><h2>Hizmetlerimiz</h2><p>Dijital dünyada iz bırakmak isteyen markalar için stratejik çözümler üretiyoruz.</p></div>
          <div className="slider-container reveal" onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd} onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}>
            <button className="slider-btn prev-btn" onClick={prevSlide}>‹</button>
            <div className="services-wrapper-window">
              <div className="services-slider-track" onTransitionEnd={handleTransitionEnd} style={{ transform: `translateX(calc(-${currentIndex * (100 / slidesPerView)}% + ${dragOffset}px))`, transition: transitionEnabled ? 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)' : 'none', cursor: isDragging ? 'grabbing' : 'grab' }}>
                 {services.map((service, index) => (
                    <div key={`${service.id}-${index}`} className="service-slide">
                      <div className="service-card"><div className="card-number-bg">{service.id}</div><div className="card-top"><div className="card-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">{service.icon}</svg></div></div><h3>{service.title}</h3><p>{service.desc}</p><div className="card-footer"><span className="detail-link">Detaylı Bilgi</span><div className="detail-circle">→</div></div></div>
                    </div>
                 ))}
              </div>
            </div>
            <button className="slider-btn next-btn" onClick={nextSlide}>›</button>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-container"><div className="about-content-wrapper reveal"><div className="about-text-content">{/* [ELLE DÜZENLE] BİZ KİMİZ? (beyaz çizgi CSS: .about-subtitle::after) */}
                <span className="about-subtitle">Biz Kimiz?</span>
                {/* [ELLE DÜZENLE] HAKKIMIZDA BAŞLIK (sarı çizgi CSS: .about-title) */}
                <h2 className="about-title">Hakkımızda</h2><h3>Dijital dünyada sıradan olmayı reddediyoruz.</h3><p>2020’den bu yana; markaların dijitalde güçlü, hızlı ve etkileyici bir duruş sergilemesi için çalışıyoruz. Web tasarım ve dijital çözümlerimizde, yalnızca göze hitap eden değil, aynı zamanda sonuç üreten projeler geliştiriyoruz.

Kullanıcı deneyimi, performans ve modern tasarım anlayışıyla; markaları dijital dünyada bir adım öne taşıyoruz.</p></div><div className="about-gold-badge"><div className="gold-badge-header">
                {/* [ELLE DÜZENLE] ROZET LOGOSU + MARKA YAZISI (navbar logosundan bağımsız) */}
                <div className="gold-badge-left">
                  <img className="badge-logo-img" src="/tasarimkurdu-logo.png" alt="Tasarımkurdu Logo" />
                  <div className="gold-badge-brandblock">
                    <div className="gold-badge-brand">TASARIMKURDU</div>
                    <div className="gold-badge-sub">WEB &amp; GRAFİK ÇÖZÜMLERİ</div>
                  </div>
                </div>
                <span className="gold-badge-number"></span>
              </div><div className="gold-badge-content"><h2>Yarının Tasarımları, Bugünden.</h2></div></div></div><div className="about-image-wrapper reveal"><img src={aboutImg} alt="Hakkımızda" /></div></div>
        </section>

        <section id="how-it-works" className="how-it-works-section">
          <div className="how-it-works-header reveal"><h2>Nasıl <span className="yellow-text">Çalışıyoruz?</span></h2><h3>Basit, hızlı ve etkili süreç.</h3></div>
          <div className="how-it-works-container reveal"><div className="step-progress-bar"></div><div className="step-item"><div className="step-number">01</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div><h4>İletişim</h4><p>WhatsApp'tan bize ulaşın, ihtiyaçlarınızı dinleyelim.</p></div><div className="step-item"><div className="step-number">02</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586"/></svg></div><h4>Tasarım</h4><p>İşletmenize özel modern tasarım hazırlayalım.</p></div><div className="step-item"><div className="step-number">03</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><h4>Geliştirme</h4><p>Hızlı ve optimize kodlama ile sitenizi geliştirelim.</p></div><div className="step-item"><div className="step-number">04</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h4>Yayın</h4><p>24 saat içinde siteniz canlıya alınsın!</p></div></div>
        </section>

        <section id="philosophy" className="philosophy-section">
          <div className="philosophy-header reveal"><span className="subtitle">Değerlerimiz</span><h2>Marka Felsefesi</h2><p>Sadece kod yazmıyoruz, markanıza ruh katıyoruz.</p></div>
          <div className="philosophy-container reveal">
            {philosophyData.map((item, index) => (
              <div key={index} className="philosophy-item-wrapper">
                <div className="philosophy-box rotating-border"><h4>{item.title}</h4><div className="philosophy-divider"></div><p>{item.desc}</p></div>
                {index < 6 && (<div className="philosophy-arrow arrow-down-animate"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>)}
              </div>
            ))}
          </div>
        </section>

      </div> 
      
      <footer id="footer" className="footer-section">
        <div className="footer-container reveal">
          <div className="footer-col logo-col">
            <div className="footer-logo"><Logo isMobile={isMobile} /></div>
        
          </div>
          <div className="footer-col">
            <h4>Hizmetlerimiz</h4>
            <ul>
              <li><a onClick={() => scrollToServiceCard(0)}>Web Tasarım</a></li>
              <li><a onClick={() => scrollToServiceCard(6)}>Google Ads Reklamları</a></li>
              <li><a onClick={() => scrollToServiceCard(0)}>Web Yazılım</a></li>
              <li><a onClick={() => scrollToServiceCard(4)}>E-ticaret</a></li>
              <li><a onClick={() => scrollToSection('footer')}>Sosyal Medya Danışmanlığı</a></li>
              <li><a onClick={() => scrollToServiceCard(1)}>Mobil Uygulama Geliştirme</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><a onClick={() => scrollToSection('home')}>Anasayfa</a></li>
              <li><a onClick={() => scrollToSection('about')}>Hakkımızda</a></li>
              <li><a onClick={() => scrollToSection('services')}>Hizmetler</a></li>
              <li><a onClick={() => scrollToSection('how-it-works')}>Nasıl Çalışırız</a></li>
              <li><a onClick={() => scrollToSection('philosophy')}>Marka Felsefesi</a></li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>İletişim Bilgileri</h4>
            <div className="contact-item"><i className="fas fa-phone-alt"></i><span>0554 146 08 13</span></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><span>tasarimmkurdu@gmail.com</span></div>
</div>
        </div>
        <div className="footer-bottom">
          <p>Copyright 2026 © TasarımKurdu - Tüm Hakları Saklıdır.</p>
        
        </div>
      </footer>

    </div>
  );
}

export default App;