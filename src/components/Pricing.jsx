import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Pricing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) setSlidesToShow(1);
      else if (window.innerWidth <= 1100) setSlidesToShow(2);
      else setSlidesToShow(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const plans = [
    {
      name: 'Başlangıç',
      price: '9.999',
      period: 'Başlangıç Paketi',
      description: 'Küçük işletmeler ve girişimciler için ideal',
      features: [
        'Responsive Tasarım (5 Sayfa)',
        'Temel SEO Optimizasyonu',
        'İletişim Formu',
        'Google Maps Entegrasyonu',
        'Sosyal Medya Bağlantıları',
        '3 Ay Ücretsiz Destek',
        'Mobil Uyumlu',
        'Hızlı Yükleme'
      ],
      highlight: false,
      cta: 'Hemen Başla',
      showPrice: true
    },
    {
      name: 'Profesyonel',
      price: '21.999',
      period: 'Profesyonel Paket',
      description: 'Büyüyen işletmeler için özel çözümler',
      features: [
        'Responsive Tasarım (10 Sayfa)',
        'İleri Seviye SEO',
        'Blog Modülü',
        'E-Posta Newsletter',
        'Analytics ve Raporlama',
        '6 Ay Ücretsiz Destek',
        'Admin Paneli',
        'Özel Animasyonlar',
        'Çoklu Dil Desteği',
        'Canlı Chat Entegrasyonu'
      ],
      highlight: true,
      badge: 'Popüler',
      cta: 'Hemen Al',
      showPrice: true
    },
    {
      name: 'E-Ticaret',
      price: 'Teklif Alın',
      period: 'Özel Fiyatlandırma',
      description: 'Online satış yapan markalar için',
      features: [
        'E-Ticaret Platformu',
        'Sınırsız Ürün',
        'Ödeme Sistemi Entegrasyonu',
        'Kargo Entegrasyonu',
        'Stok Yönetimi',
        'Müşteri Paneli',
        '1 Yıl Ücretsiz Destek',
        'Sipariş Takibi',
        'Kampanya ve İndirim Sistemi',
        'Fatura ve E-Arşiv',
        'Toplu SMS/Mail Gönderimi',
        'Ürün Yorumları'
      ],
      highlight: false,
      cta: 'Teklif Al',
      showPrice: false
    }
  ];

  const additionalServices = [
    {
      name: 'Logo Tasarımı',
      price: '2.500',
      isMonthly: false,
      description: 'Markanızın karakterini yansıtan, dijital ve baskı kullanımına uygun profesyonel logo tasarımı.',
      details: [
        '3 farklı konsept ve 2 revize turu',
        'Renkli, siyah ve beyaz varyasyonlar',
        'PNG, SVG, PDF ve kaynak dosya teslimi'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      name: 'SEO Paketi',
      price: '3.999',
      isMonthly: true,
      description: 'Arama motorlarında görünürlüğü artıran teknik ve içerik odaklı aylık SEO yönetimi.',
      details: [
        'Anahtar kelime analizi ve rakip takibi',
        'Teknik SEO iyileştirmeleri (hız, meta, yapı)',
        'Aylık performans raporu ve aksiyon planı'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      )
    },
    {
      name: 'Google Ads',
      price: '4.500',
      isMonthly: true,
      description: 'Bütçenizi verimli kullanan, dönüşüm odaklı Google Ads kampanya kurulumu ve optimizasyonu.',
      details: [
        'Arama, görüntülü ve yeniden pazarlama kampanyaları',
        'Hedef kitle, teklif ve bütçe optimizasyonu',
        'Haftalık takip ve aylık dönüşüm raporlaması'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20M5 20V10M10 20V4M15 20v-8M20 20v-6" />
        </svg>
      )
    },
    {
      name: 'Sosyal Medya Yönetimi',
      price: '5.999',
      isMonthly: true,
      description: 'Marka dilinize uygun planlı içerik üretimi ve hesap yönetimi ile düzenli sosyal medya büyümesi.',
      details: [
        'Aylık içerik takvimi ve post tasarımları',
        'Metin yazımı, hashtag stratejisi ve paylaşım planı',
        'Erişim, etkileşim ve büyüme raporlaması'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        </svg>
      )
    },
    {
      name: 'Mobil Uygulama',
      price: '35.000',
      isMonthly: false,
      description: 'İş modelinize özel kullanıcı dostu mobil uygulama geliştirme (iOS ve Android).',
      details: [
        'UI/UX tasarımı ve prototip süreci',
        'API entegrasyonu ve temel admin panel bağlantısı',
        'Test, yayınlama ve lansman desteği'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      name: 'Bakım ve Destek',
      price: '1.500',
      isMonthly: true,
      description: 'Sitenizin güvenli, güncel ve hızlı kalması için düzenli teknik bakım ve destek hizmeti.',
      details: [
        'Güvenlik güncellemeleri ve yedekleme',
        'Hata düzeltme ve küçük içerik güncellemeleri',
        'Performans kontrolü ve aylık bakım raporu'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    }
  ];

  const visibleAdditionalServices = Array.from(
    { length: Math.min(slidesToShow, additionalServices.length) },
    (_, offset) => additionalServices[(currentSlide + offset) % additionalServices.length]
  );
  const hasMultipleAdditionalSlides = additionalServices.length > slidesToShow;

  const nextAdditionalSlide = () => {
    if (!hasMultipleAdditionalSlides) return;
    setCurrentSlide((prev) => (prev + 1) % additionalServices.length);
  };

  const prevAdditionalSlide = () => {
    if (!hasMultipleAdditionalSlides) return;
    setCurrentSlide((prev) => (prev - 1 + additionalServices.length) % additionalServices.length);
  };

  useEffect(() => {
    setCurrentSlide((prev) => (additionalServices.length === 0 ? 0 : prev % additionalServices.length));
  }, [slidesToShow, additionalServices.length]);

  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-container">
        <motion.div
          className="pricing-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Fiyatlandırma</span>
          <h2 id="pricing-heading">Size Uygun Paketi Seçin</h2>
          <p>İhtiyacınıza göre tasarlanmış esnek paketler. Özel projeler için özel teklif alabilirsiniz.</p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.highlight ? 'highlighted' : ''} reveal`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}

              <div className="pricing-header-card">
                <h3>{plan.name}</h3>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-price">
                {plan.showPrice ? (
                  <>
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-currency">TL</span>
                  </>
                ) : (
                  <span className="price-amount" style={{ fontSize: '2.5rem' }}>{plan.price}</span>
                )}
                <span className="price-period">{plan.period}</span>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/+905541460813"
                target="_blank"
                rel="noopener noreferrer"
                className={`pricing-cta ${plan.highlight ? 'primary' : 'secondary'}`}
              >
                {plan.cta}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="additional-services-section reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="pricing-header additional-pricing-header">
            <span className="subtitle">Ek Hizmetler</span>
            <h2 id="additional-services-heading">Ek Hizmetlerimiz</h2>
            <p>Paketinizi güçlendirecek ek servislerimizi ihtiyacınıza göre seçip birlikte planlayabiliriz.</p>
          </div>

          <div className="additional-carousel-container" role="region" aria-labelledby="additional-services-heading" aria-label="Ek hizmetler carousel">
            <button 
              className="additional-carousel-btn prev-btn" 
              onClick={prevAdditionalSlide}
              aria-label="Önceki Ek Hizmet"
              disabled={!hasMultipleAdditionalSlides}
            >
              ‹
            </button>
            
            <div className="additional-carousel-track" aria-live="polite" aria-atomic="true">
              <div 
                key={`additional-${currentSlide}-${slidesToShow}`}
                className="additional-carousel-content carousel-animating"
                style={{ gridTemplateColumns: `repeat(${Math.min(slidesToShow, additionalServices.length)}, minmax(0, 1fr))` }}
              >
                {visibleAdditionalServices.map((service, index) => (
              <motion.div
                key={`${service.name}-${index}`}
                className="additional-service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="additional-icon">{service.icon}</div>
                <h4>{service.name}</h4>
                <p>{service.description}</p>

                <ul className="additional-service-details">
                  {service.details.map((detail, detailIndex) => (
                    <li key={`${service.name}-${detailIndex}`}>{detail}</li>
                  ))}
                </ul>

                <div className="additional-price">
                  <span className="price">{service.price}</span>
                  <span className="currency">TL</span>
                  {service.isMonthly ? <span className="period">/ay</span> : <span className="period"> tek seferlik</span>}
                </div>
              </motion.div>
                ))}
              </div>
            </div>

            <button 
              className="additional-carousel-btn next-btn" 
              onClick={nextAdditionalSlide}
              aria-label="Sonraki Ek Hizmet"
              disabled={!hasMultipleAdditionalSlides}
            >
              ›
            </button>
          </div>
        </motion.div>

        <motion.div
          className="pricing-note reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="note-icon">*</div>
          <div>
            <h4>Özel Proje mi?</h4>
            <p>Yukarıdaki paketler standart çözümlerimizdir. Özel ihtiyaçlarınız için <a href="https://wa.me/+905541460813" target="_blank" rel="noopener">bizimle iletişime geçin</a> ve size özel teklif alalım.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
