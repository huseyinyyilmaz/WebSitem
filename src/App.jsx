import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import aboutImg from './1.jpg';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// Yeni Bileşenler
import ContactForm from './components/ContactForm';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Stats from './components/Stats';
import ServiceDetails from './components/ServiceDetails';

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
      const nextIsMobile = mqMobile.matches;
      setIsMobile(nextIsMobile);
      setPrefersReducedMotion(mqReduced.matches);

      if (!nextIsMobile) {
        setIsMobileMenuOpen(false);
        setIsMobileServicesOpen(false);
      }
    };
    sync();

    mqMobile.addEventListener?.('change', sync);
    mqReduced.addEventListener?.('change', sync);

    return () => {
      mqMobile.removeEventListener?.('change', sync);
      mqReduced.removeEventListener?.('change', sync);
    };
  }, []);

  const slidesPerView = isMobile ? 1 : 3;

  // Services carousel state
  const [servicesSlide, setServicesSlide] = useState(0);
  const servicesMaxSlide = servicesOriginal.length - 3;

  const nextServicesSlide = () => {
    setServicesSlide(prev => (prev >= servicesMaxSlide ? 0 : prev + 1));
  };

  const prevServicesSlide = () => {
    setServicesSlide(prev => (prev <= 0 ? servicesMaxSlide : prev - 1));
  };

  const servicesOriginal = [
    { 
      id: "01", 
      title: "Web Geliştirme", 
      desc: "Modern teknolojiler (React, Vue.js, Python, Node.js) kullanarak %100 SEO uyumlu, mobil responsive ve kullanıcı dostu kurumsal web siteleri geliştiriyoruz. Google Core Web Vitals standartlarına uygun, hızlı yükleme süreleri ve mükemmel performans skorlarıyla arama motorlarında üst sıralarda yer almanızı sağlıyoruz. SSL sertifikası, güvenlik duvarı ve düzenli yedekleme sistemiyle sitenizin güvenliğini garanti ediyoruz. WordPress, özel CMS ya da sıfırdan kod yazımı - ihtiyacınıza uygun çözümler sunuyoruz.", 
      icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "02", 
      title: "Mobil Uygulama Geliştirme", 
      desc: "iOS (Swift) ve Android (Kotlin, Java) platformlarında native mobil uygulama geliştirme hizmeti sunuyoruz. React Native ve Flutter ile cross-platform çözümler sayesinde tek geliştirme süreciyle her iki platformda da mükemmel performans elde ediyoruz. Push notification, çevrimdışı çalışma, konum servisleri, kamera entegrasyonu, ödeme sistemleri ve sosyal medya entegrasyonları dahil tüm özellikleri sağlıyoruz. App Store ve Google Play Store yayınlama süreçlerinde tam destek veriyoruz.", 
      icon: <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zM10 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "03", 
      title: "UI/UX Tasarım", 
      desc: "Kullanıcı deneyimi (UX) araştırması ve kullanıcı arayüzü (UI) tasarımı konusunda uzman ekibimizle, markanızın dijital kimliğini yansıtan, estetik ve kullanımı kolay tasarımlar üretiyoruz. Wireframe, mockup ve prototip aşamalarıyla kullanıcı testleri yaparak, en yüksek dönüşüm oranlarını hedefliyoruz. Figma, Adobe XD, Sketch gibi profesyonel araçlarla çalışıyoruz. Web sitesi, mobil uygulama, dashboard ve SaaS ürünleri için özel UI/UX tasarımları hazırlıyoruz. Renk psikolojisi, tipografi ve accessibility standartlarına tam uyumluluk sağlıyoruz.", 
      icon: <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "04", 
      title: "Dijital Pazarlama & Sosyal Medya", 
      desc: "Facebook, Instagram, LinkedIn, Twitter ve TikTok'ta profesyonel sosyal medya yönetimi hizmeti sunuyoruz. İçerik stratejisi, grafik tasarım, video prodüksiyon, influencer iş birlikleri ve community management ile markanızın dijital varlığını güçlendiriyoruz. Google Analytics, Meta Business Suite ve benzeri araçlarla veri odaklı kampanya optimizasyonu yapıyoruz. Email marketing, SEO (arama motoru optimizasyonu), content marketing ve brand awareness çalışmalarıyla organik erişiminizi artırıyor, hedef kitlenizle güçlü bağlar kuruyoruz. Aylık raporlama ve strateji güncellemeleri sağlıyoruz.", 
      icon: <path d="M2 20h20M5 20V10M10 20V4M15 20v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "05", 
      title: "E-Ticaret Çözümleri", 
      desc: "Ticimax, IdaSoft, Shopify, WooCommerce ve özel e-ticaret altyapılarıyla güvenli, hızlı ve karlı online mağazalar kuruyoruz. Ürün yönetimi, stok takibi, kargo entegrasyonu (Yurtiçi, MNG, Aras, UPS vb.), sanal POS entegrasyonu (tüm bankalar), fatura ve muhasebe sistemleri dahil tüm e-ticaret süreçlerinizi yönetiyoruz. N11, Trendyol, Hepsiburada gibi pazaryeri entegrasyonları, WhatsApp sipariş sistemi, canlı destek, indirim kuponları ve sadakat programları ile satışlarınızı katla. Mobil uyumlu, hızlı checkout ve güvenli ödeme altyapısıyla müşteri memnuniyetini maksimize ediyoruz.", 
      icon: <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "06", 
      title: "Yapay Zeka & Otomasyon", 
      desc: "ChatGPT API entegrasyonu, özel AI chatbot geliştirme, makine öğrenmesi modelleri ve veri analiz sistemleriyle iş süreçlerinizi otomatikleştiriyoruz. Python, TensorFlow, PyTorch kullanarak özel yapay zeka çözümleri üretiyoruz. Müşteri hizmetleri botu, satış asistanı, veri scraping, sentiment analizi, görüntü işleme ve doğal dil işleme (NLP) projeleri gerçekleştiriyoruz. RPA (Robotic Process Automation) ile tekrarlayan işlerinizi otomasyona alıyor, iş gücü maliyetlerinizi düşürüp verimliliğinizi artırıyoruz. API entegrasyonları ve webhook sistemleriyle farklı platformları birbirine bağlıyoruz.", 
      icon: <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4.93 19.07a10 10 0 0 1 1.65-10.85 2 2 0 0 1 3.24 2.63 6 6 0 0 0-.6 7.69 2 2 0 0 1-2.63 3.24 10 10 0 0 1-1.66-2.71z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    },
    { 
      id: "07", 
      title: "Google Ads & Reklamcılık", 
      desc: "Google Ads (eski adıyla AdWords), Google Shopping, Display Network ve YouTube reklamlarıyla hedef kitlenize ulaşmanızı sağlıyoruz. Anahtar kelime araştırması, rakip analizi, reklam metni optimizasyonu, landing page tasarımı ve sürekli A/B testleriyle ROAS (reklam yatırım getirisi) oranınızı maksimize ediyoruz. Google Analytics 4 ve Google Tag Manager kurulumu, remarketing kampanyaları, conversion tracking ve detaylı performans raporlaması sunuyoruz. Facebook Ads, Instagram Ads ve LinkedIn Ads yönetimi ile tüm dijital reklam kanallarınızı optimize ediyoruz. Sertifikalı Google Partners ekibimizle bütçenizi en verimli şekilde yönetiyoruz.", 
      icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
    }
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
      const portfolioSection = document.getElementById('portfolio');
      const pricingSection = document.getElementById('pricing');
      const testimonialsSection = document.getElementById('testimonials');
      const faqSection = document.getElementById('faq');
      const contactSection = document.getElementById('contact');
      
      if (contactSection && scrollY >= contactSection.offsetTop - 300) setActiveSection('contact');
      else if (faqSection && scrollY >= faqSection.offsetTop - 300) setActiveSection('faq');
      else if (testimonialsSection && scrollY >= testimonialsSection.offsetTop - 300) setActiveSection('testimonials');
      else if (pricingSection && scrollY >= pricingSection.offsetTop - 300) setActiveSection('pricing');
      else if (portfolioSection && scrollY >= portfolioSection.offsetTop - 300) setActiveSection('portfolio');
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

			<a href={instagramLink} target="_blank" rel="noopener noreferrer" className="floating-instagram" aria-label="Instagram">
				<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.5" stroke="white" strokeWidth="2"/>
          <circle cx="12" cy="12" r="4.2" stroke="white" strokeWidth="2"/>
          <circle cx="17.6" cy="6.4" r="1.2" fill="white"/>
        </svg>
			</a>

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
							<li><a onClick={() => scrollToSection('portfolio')}>PROJELERİMİZ</a></li>
							<li><a onClick={() => scrollToSection('pricing')}>FİYATLAR</a></li>
							<li><a onClick={() => scrollToSection('testimonials')}>YORUMLAR</a></li>
							<li><a onClick={() => scrollToSection('faq')}>S.S.S</a></li>
							<li><a onClick={() => scrollToSection('contact')}>İLETİŞİM</a></li>
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
            <li className={activeSection === 'portfolio' ? 'active' : ''} onClick={() => scrollToSection('portfolio')}>PROJELERİMİZ</li>
            <li className={activeSection === 'pricing' ? 'active' : ''} onClick={() => scrollToSection('pricing')}>FİYATLAR</li>
            <li className={activeSection === 'testimonials' ? 'active' : ''} onClick={() => scrollToSection('testimonials')}>YORUMLAR</li>
            <li className={activeSection === 'faq' ? 'active' : ''} onClick={() => scrollToSection('faq')}>S.S.S</li>
            <li className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>İLETİŞİM</li>
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
            <p>
              Geleceği tahmin etmenin en iyi yolu, onu tasarlamaktır. TasarımKurdu olarak vizyonumuz; sadece işlevsel web siteleri yapmak değil, markanıza değer katan, yaşayan ve gelişen dijital ekosistemler kurmaktır. 
              <br /><br />
              <strong>İstanbul merkezli</strong> dijital ajansımızda, <strong>React, Python, Node.js</strong> gibi modern teknolojilerle <strong>%100 SEO uyumlu</strong>, hızlı ve güvenli web siteleri geliştiriyoruz. 2020’den beri <strong>500+ başarılı proje</strong>, <strong>250+ mutlu müşteri</strong> ve <strong>%98 müşteri memnuniyeti</strong> ile sektörde güvenilir bir iş ortağıyız.
              <br /><br />
              Kurumsal web tasarım, e-ticaret çözümleri, mobil uygulama geliştirme, Google Ads ve sosyal medya yönetimi ile markanızı dijital dünyada zirveye taşıyoruz. Biz bugünü değil, sonrasını düşünerek tasarım yaparız.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="offer-btn main-size"><span className="btn-text">TEKLİF ALIN</span><div className="yellow-bg"></div></a>
          </div>
          <div className="hero-image reveal"><img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-3454628-2918517.png" alt="Profesyonel Web Tasarım ve Geliştirme Hizmetleri - Modern, Responsive ve SEO Uyumlu Web Siteleri" loading="eager" /></div>
        </header>

        <div className="scrolling-ticker"><div className="ticker-track">{[...marqueeItems, ...marqueeItems].map((item, index) => (<div className="ticker-item" key={index}><span className="ticker-dot">●</span>{item}</div>))}</div></div>

        <section id="services" className="services-section">
          <div className="services-header reveal">
            <span className="subtitle">Kurumsal Çözümler</span>
            <h2>Hizmetlerimiz</h2>
            <p>Dijital dünyada iz bırakmak isteyen markalar için stratejik çözümler üretiyoruz.</p>
          </div>
          
          {/* Carousel Layout */}
          <div className="services-carousel-container">
            <button className="services-carousel-btn prev-btn" onClick={prevServicesSlide} aria-label="Önceki">
              ‹
            </button>
            
            <div className="services-carousel-track">
              <div 
                className="services-carousel-content" 
                style={{ transform: `translateX(-${servicesSlide * (100 / 3)}%)` }}
              >
                {servicesOriginal.map((service, index) => (
                  <div key={service.id} className="service-card">
                    <div className="card-number-bg">{String(index + 1).padStart(2, '0')}</div>
                    <div className="card-top">
                      <div className="card-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {service.icon}
                        </svg>
                      </div>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                    <a href="#service-details" className="card-footer">
                      <span className="detail-link">Detaylı Bilgi</span>
                      <div className="detail-circle">→</div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <button className="services-carousel-btn next-btn" onClick={nextServicesSlide} aria-label="Sonraki">
              ›
            </button>
          </div>
        </section>

        <ServiceDetails />

        <section id="about" className="about-section">
          <div className="about-container"><div className="about-content-wrapper reveal"><div className="about-text-content">{/* [ELLE DÜZENLE] BİZ KİMİZ? (beyaz çizgi CSS: .about-subtitle::after) */}
                <span className="about-subtitle">Biz Kimiz?</span>
                {/* [ELLE DÜZENLE] HAKKIMIZDA BAŞLIK (sarı çizgi CSS: .about-title) */}
                <h2 className="about-title">Hakkımızda</h2>
                <h3>Dijital dünyada sıradan olmayı reddediyoruz.</h3>
                <p>
                  <strong>2020’den bu yana</strong> markaların dijitalde güçlü, hızlı ve etkileyici bir duruş sergilemesi için çalışıyoruz. Web tasarım ve dijital çözümlerimizde, yalnızca göze hitap eden değil, aynı zamanda <strong>sonuç üreten</strong> projeler geliştiriyoruz.
                </p>
                <p>
                  <strong>Kullanıcı deneyimi (UX), performans ve modern tasarım anlayışıyla</strong>; markaları dijital dünyada bir adım öne taşıyoruz. <strong>Google Core Web Vitals</strong> standartlarına uygun, hızlı yüklenme süreleri ve mükemmel performans skorlarıyla arama motorlarında üst sıralarda yer almanizi sağlıyoruz.
                </p>
                <p>
                  Ekibimiz <strong>React, Vue.js, Python, Node.js, Swift, Kotlin</strong> gibi modern teknolojilerde uzmanlaşmış yazılım geliştiriciler, UI/UX tasarımcılar, SEO uzmanları ve dijital pazarlama profesyonellerinden oluşuyor. Her proje için <strong>özel stratejiler</strong> geliştiriyor, sektör analizi yapıyor ve rakiplerinizin önüne geçmenizi sağlıyoruz.
                </p>
                <p>
                  <strong>500+ başarılı proje</strong>, <strong>250+ mutlu müşteri</strong> ve <strong>%98 müşteri memnuniyeti</strong> oranlarıyla sektörde güvenilir bir iş ortağıyız. ISO 27001 bilgi güvenliği standartlarına uygun çalışıyor, müşteri verilerini en yüksek güvenlik seviyesinde koruyoruz.
                </p>
                <p>
                  <strong>Misyonumuz:</strong> Markaları dijital dönüşümde lider konuma taşımak, teknoloji ve yaratıcılığı bir araya getirerek ölçülebilir sonuçlar üretmek.<br />
                  <strong>Vizyonumuz:</strong> Türkiye’nin en güvenilir ve yenilikçi dijital ajansı olmak, global pazarda rekabet edebilir dijital çözümler sunmak.
                </p>
              </div><div className="about-gold-badge"><div className="gold-badge-header">
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
          <div className="how-it-works-header reveal">
            <h2>Nasıl <span className="yellow-text">Çalışıyoruz?</span></h2>
            <h3>Basit, hızlı ve etkili süreç.</h3>
            <p>4 adımda projenizi canlıya taşıyoruz. Şffaf iletişim, hızlı teslimat ve kusursuz kalite garantisi.</p>
          </div>
          <div className="how-it-works-container reveal"><div className="step-progress-bar"></div><div className="step-item"><div className="step-number">01</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg></div><h4>İletişim & Analiz</h4><p>WhatsApp'tan bize ulaşın, ihtiyaçlarınızı detaylı dinleyelim. Sektör analizi, rakip araştırması ve hedef kitle belirleme ile projenizin temelini oluşturuyoruz. <strong>Süre: 1-2 gün</strong></p></div><div className="step-item"><div className="step-number">02</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586"/></svg></div><h4>Tasarım & Prototip</h4><p>İşletmenize özel modern tasarım hazırlayalım. Figma üzerinde wireframe, mockup ve interaktif prototip geliştiriyoruz. Renk paleti, tipografi, kullanıcı akışını onayınıza sunuyoruz. <strong>Süre: 3-5 gün</strong></p></div><div className="step-item"><div className="step-number">03</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div><h4>Geliştirme & Test</h4><p>Hızlı ve optimize kodlama ile sitenizi geliştirelim. React, Python, Node.js ile modern altyapı, mobil uyumluluk, SEO optimizasyonu ve güvenlik testleri yapıyoruz. Sürekli önizleme ile ilerlemeyi takip edebilirsiniz. <strong>Süre: 5-10 gün</strong></p></div><div className="step-item"><div className="step-number">04</div><div className="icon-box"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h4>Yayın & Destek</h4><p>24 saat içinde siteniz canlıya alınsın! Domain, hosting, SSL sertifikası, Google Analytics ve Search Console entegrasyonlarıyla hizmete sunuyoruz. 1 yıl ücretsiz teknik destek dahil. <strong>Süre: 1 gün</strong></p></div></div>
        </section>

        <section id="philosophy" className="philosophy-section">
          <div className="philosophy-header reveal">
            <span className="subtitle">Değerlerimiz</span>
            <h2>Marka Felsefesi</h2>
            <p>Sadece kod yazmıyoruz, markanıza ruh katıyoruz.</p>
          </div>
          <div className="philosophy-container reveal">
            {philosophyData.map((item, index) => (
              <div key={index} className="philosophy-item-wrapper">
                <div className="philosophy-box rotating-border"><h4>{item.title}</h4><div className="philosophy-divider"></div><p>{item.desc}</p></div>
                {index < 6 && (<div className="philosophy-arrow arrow-down-animate"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>)}
              </div>
            ))}
          </div>
        </section>

        <Stats />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactForm />

      </div> 
      
      <footer id="footer" className="footer-section">
        <div className="footer-container reveal">
          <div className="footer-col logo-col">
            <div className="footer-logo">
              <Logo isMobile={isMobile} />
            </div>
            <p className="footer-desc">
              Dijital dünyada iz bırakmak isteyen markalar için stratejik çözümler üretiyoruz. Modern web tasarım ve dijital pazarlama hizmetleriyle markanızı zirveye taşıyoruz.
            </p>
            <div className="footer-social">
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="mailto:tasarimmkurdu@gmail.com" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Hizmetlerimiz</h4>
            <ul>
              <li><a onClick={() => scrollToServiceCard(0)}>Web Geliştirme</a></li>
              <li><a onClick={() => scrollToServiceCard(1)}>Mobil Uygulama</a></li>
              <li><a onClick={() => scrollToServiceCard(2)}>UI/UX Tasarım</a></li>
              <li><a onClick={() => scrollToServiceCard(3)}>Dijital Pazarlama</a></li>
              <li><a onClick={() => scrollToServiceCard(4)}>E-Ticaret Çözümleri</a></li>
              <li><a onClick={() => scrollToServiceCard(6)}>Google Ads</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><a onClick={() => scrollToSection('home')}>Anasayfa</a></li>
              <li><a onClick={() => scrollToSection('about')}>Hakkımızda</a></li>
              <li><a onClick={() => scrollToSection('portfolio')}>Projelerimiz</a></li>
              <li><a onClick={() => scrollToSection('pricing')}>Fiyatlar</a></li>
              <li><a onClick={() => scrollToSection('testimonials')}>Müşteri Yorumları</a></li>
              <li><a onClick={() => scrollToSection('faq')}>Sıkça Sorulan Sorular</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4>İletişim</h4>
            <div className="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>0554 146 08 13</span>
            </div>
            <div className="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>tasarimmkurdu@gmail.com</span>
            </div>
            <div className="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Pzt-Cmt: 09:00 - 18:00</span>
            </div>
            <div className="contact-cta">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-whatsapp-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp'tan Yazın
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright 2026 © <strong>TasarımKurdu</strong> - Tüm Hakları Saklıdır.</p>
          <div className="footer-bottom-links">
            <a onClick={() => scrollToSection('faq')}>Gizlilik Politikası</a>
            <span className="separator">•</span>
            <a onClick={() => scrollToSection('faq')}>Kullanım Şartları</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
