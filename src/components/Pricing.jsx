import { motion } from 'framer-motion';

export default function Pricing() {
  const plans = [
    {
      name: 'Baslangic',
      price: '9.999',
      period: 'Baslangic Paketi',
      description: 'Kucuk isletmeler ve girisimciler icin ideal',
      features: [
        'Responsive Tasarim (5 Sayfa)',
        'Temel SEO Optimizasyonu',
        'Iletisim Formu',
        'Google Maps Entegrasyonu',
        'Sosyal Medya Baglantilari',
        '3 Ay Ucretsiz Destek',
        'Mobil Uyumlu',
        'Hizli Yukleme'
      ],
      highlight: false,
      cta: 'Hemen Basla',
      showPrice: true
    },
    {
      name: 'Profesyonel',
      price: '21.999',
      period: 'Profesyonel Paket',
      description: 'Buyuyen isletmeler icin ozel cozumler',
      features: [
        'Responsive Tasarim (10 Sayfa)',
        'Ileri Seviye SEO',
        'Blog Modulu',
        'E-Posta Newsletter',
        'Analytics ve Raporlama',
        '6 Ay Ucretsiz Destek',
        'Admin Paneli',
        'Ozel Animasyonlar',
        'Coklu Dil Destegi',
        'Canli Chat Entegrasyonu'
      ],
      highlight: true,
      badge: 'Populer',
      cta: 'Hemen Al',
      showPrice: true
    },
    {
      name: 'E-Ticaret',
      price: 'Teklif Alin',
      period: 'Ozel Fiyatlandirma',
      description: 'Online satis yapan markalar icin',
      features: [
        'E-Ticaret Platformu',
        'Sinirsiz Urun',
        'Odeme Sistemi Entegrasyonu',
        'Kargo Entegrasyonu',
        'Stok Yonetimi',
        'Musteri Paneli',
        '1 Yil Ucretsiz Destek',
        'Siparis Takibi',
        'Kampanya ve Indirim Sistemi',
        'Fatura ve E-Arsiv',
        'Toplu SMS/Mail Gonderimi',
        'Urun Yorumlari'
      ],
      highlight: false,
      cta: 'Teklif Al',
      showPrice: false
    }
  ];

  const additionalServices = [
    {
      name: 'Logo Tasarimi',
      price: '2.500',
      isMonthly: false,
      description: 'Markanizin karakterini yansitan, dijital ve baski kullanimina uygun profesyonel logo tasarimi.',
      details: [
        '3 farkli konsept ve 2 revize turu',
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
      description: 'Arama motorlarinda gorunurlugu artiran teknik ve icerik odakli aylik SEO yonetimi.',
      details: [
        'Anahtar kelime analizi ve rakip takibi',
        'Teknik SEO iyilestirmeleri (hiz, meta, yapi)',
        'Aylik performans raporu ve aksiyon plani'
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
      description: 'Butcenizi verimli kullanan, donusum odakli Google Ads kampanya kurulumu ve optimizasyonu.',
      details: [
        'Arama, goruntulu ve yeniden pazarlama kampanyalari',
        'Hedef kitle, teklif ve butce optimizasyonu',
        'Haftalik takip ve aylik donusum raporlamasi'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20M5 20V10M10 20V4M15 20v-8M20 20v-6" />
        </svg>
      )
    },
    {
      name: 'Sosyal Medya Yonetimi',
      price: '5.999',
      isMonthly: true,
      description: 'Marka dilinize uygun planli icerik uretimi ve hesap yonetimi ile duzenli sosyal medya buyumesi.',
      details: [
        'Aylik icerik takvimi ve post tasarimlari',
        'Metin yazimi, hashtag stratejisi ve paylasim plani',
        'Erisim, etkilesim ve buyume raporlamasi'
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
      description: 'Is modelinize ozel kullanici dostu mobil uygulama gelistirme (iOS ve Android).',
      details: [
        'UI/UX tasarimi ve prototip sureci',
        'API entegrasyonu ve temel admin panel baglantisi',
        'Test, yayinlama ve lansman destegi'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      )
    },
    {
      name: 'Bakim ve Destek',
      price: '1.500',
      isMonthly: true,
      description: 'Sitenizin guvenli, guncel ve hizli kalmasi icin duzenli teknik bakim ve destek hizmeti.',
      details: [
        'Guvenlik guncellemeleri ve yedekleme',
        'Hata duzeltme ve kucuk icerik guncellemeleri',
        'Performans kontrolu ve aylik bakim raporu'
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    }
  ];

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
          <h2>Size Uygun Paketi Seçin</h2>
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
            <h2>Ek Hizmetlerimiz</h2>
            <p>Paketinizi güçlendirecek ek servislerimizi ihtiyacınıza göre seçip birlikte planlayabiliriz.</p>
          </div>

          <div className="additional-services-grid">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
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
            <h4>Ozel Proje mi?</h4>
            <p>Yukaridaki paketler standart cozumlerimizdir. Ozel ihtiyaclariniz icin <a href="https://wa.me/+905541460813" target="_blank" rel="noopener">bizimle iletisime gecin</a> ve size ozel teklif alalim.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
