import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Mehmet Demir',
      role: 'Kurucu, TechStartup',
      image: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'TasarımKurdu ile çalışmak harika bir deneyimdi. Web sitemiz sadece görsel olarak değil, teknik olarak da mükemmel. SEO performansımız %200 arttı!',
      project: 'Kurumsal Web Sitesi'
    },
    {
      id: 2,
      name: 'Ayşe Yılmaz',
      role: 'E-Ticaret Sahibi',
      image: 'https://ui-avatars.com/api/?name=Ayse+Yilmaz&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'E-ticaret sitemiz 3 haftada hazır oldu. Satışlarımız ilk ayda %150 arttı. Profesyonellik ve hız konusunda 10/10 puan veriyorum.',
      project: 'E-Ticaret Platformu'
    },
    {
      id: 3,
      name: 'Can Öztürk',
      role: 'Restoran Sahibi',
      image: 'https://ui-avatars.com/api/?name=Can+Ozturk&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'Mobil uygulamamız sayesinde müşterilerimiz online sipariş verebiliyor. Arayüz çok kullanıcı dostu ve hızlı. Kesinlikle tavsiye ederim!',
      project: 'Mobil Uygulama Geliştirme'
    },
    {
      id: 4,
      name: 'Zeynep Kara',
      role: 'Pazarlama Müdürü',
      image: 'https://ui-avatars.com/api/?name=Zeynep+Kara&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'Dijital pazarlama stratejimizi yeniden yapılandırdılar. Google Ads kampanyalarımızın ROI\'si inanılmaz derecede arttı. Gerçek profesyoneller!',
      project: 'Dijital Pazarlama & SEO'
    },
    {
      id: 5,
      name: 'Burak Şahin',
      role: 'Girişimci',
      image: 'https://ui-avatars.com/api/?name=Burak+Sahin&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'Logo ve kurumsal kimlik tasarımımız tam istediğimiz gibi oldu. Marka algımız büyük ölçüde değişti ve müşteri güveni arttı.',
      project: 'Marka Kimliği Tasarımı'
    },
    {
      id: 6,
      name: 'Elif Arslan',
      role: 'Hizmet Sektörü',
      image: 'https://ui-avatars.com/api/?name=Elif+Arslan&background=fbbf24&color=000&size=100',
      rating: 5,
      text: 'Web sitemiz hem masaüstünde hem mobilde kusursuz çalışıyor. Müşteri geri bildirimleri harika. Destek ekipleri de çok yardımcı oldu.',
      project: 'Responsive Web Tasarım'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={index < rating ? '#fbbf24' : 'none'}
        stroke="#fbbf24"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <motion.div 
          className="testimonials-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Müşteri Görüşleri</span>
          <h2>Ne Dediler?</h2>
          <p>Birlikte çalıştığımız markalar ve müşterilerimizden gelen gerçek yorumlar.</p>
        </motion.div>

        <div className="testimonials-slider reveal">
          <button className="testimonial-nav-btn prev" onClick={prevSlide} aria-label="Önceki">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="testimonials-track testimonials-3col">
            {/* Sol sidebar */}
            {(() => {
              const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
              const prev = testimonials[prevIndex];
              return (
                <motion.div
                  key={`prev-${prev.id}`}
                  className="testimonial-card sidebar-left"
                  onClick={() => setCurrentIndex(prevIndex)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="quote-icon">"</div>
                  <div className="testimonial-rating">{renderStars(prev.rating)}</div>
                  <p className="testimonial-text">{prev.text.length > 100 ? prev.text.substring(0, 100) + '...' : prev.text}</p>
                  <div className="testimonial-author-mini">
                    <img src={prev.image} alt={prev.name} />
                    <div>
                      <h5>{prev.name}</h5>
                      <span>{prev.role}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Ortada büyük */}
            {(() => {
              const active = testimonials[currentIndex];
              return (
                <motion.div
                  key={`active-${active.id}`}
                  className="testimonial-card active"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="quote-icon">"</div>
                  <div className="testimonial-rating">{renderStars(active.rating)}</div>
                  <p className="testimonial-text">{active.text}</p>
                  <div className="testimonial-project">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {active.project}
                  </div>
                  <div className="testimonial-author">
                    <img src={active.image} alt={active.name} />
                    <div>
                      <h4>{active.name}</h4>
                      <p>{active.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Sağ sidebar */}
            {(() => {
              const nextIndex = (currentIndex + 1) % testimonials.length;
              const next = testimonials[nextIndex];
              return (
                <motion.div
                  key={`next-${next.id}`}
                  className="testimonial-card sidebar-right"
                  onClick={() => setCurrentIndex(nextIndex)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="quote-icon">"</div>
                  <div className="testimonial-rating">{renderStars(next.rating)}</div>
                  <p className="testimonial-text">{next.text.length > 100 ? next.text.substring(0, 100) + '...' : next.text}</p>
                  <div className="testimonial-author-mini">
                    <img src={next.image} alt={next.name} />
                    <div>
                      <h5>{next.name}</h5>
                      <span>{next.role}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>

          <button className="testimonial-nav-btn next" onClick={nextSlide} aria-label="Sonraki">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Yorum ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
