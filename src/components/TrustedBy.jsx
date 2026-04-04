import { motion } from 'framer-motion';

export default function TrustedBy() {
  const partners = [
    {
      name: 'TechCorp',
      logo: 'https://ui-avatars.com/api/?name=TechCorp&background=fbbf24&color=000&size=120&bold=true'
    },
    {
      name: 'DigitalHub',
      logo: 'https://ui-avatars.com/api/?name=DigitalHub&background=6366f1&color=fff&size=120&bold=true'
    },
    {
      name: 'StartupX',
      logo: 'https://ui-avatars.com/api/?name=StartupX&background=10b981&color=fff&size=120&bold=true'
    },
    {
      name: 'MediaPro',
      logo: 'https://ui-avatars.com/api/?name=MediaPro&background=ef4444&color=fff&size=120&bold=true'
    },
    {
      name: 'CloudSync',
      logo: 'https://ui-avatars.com/api/?name=CloudSync&background=8b5cf6&color=fff&size=120&bold=true'
    },
    {
      name: 'DataFlow',
      logo: 'https://ui-avatars.com/api/?name=DataFlow&background=f59e0b&color=000&size=120&bold=true'
    },
    {
      name: 'WebSolutions',
      logo: 'https://ui-avatars.com/api/?name=WebSolutions&background=3b82f6&color=fff&size=120&bold=true'
    },
    {
      name: 'BizGrow',
      logo: 'https://ui-avatars.com/api/?name=BizGrow&background=ec4899&color=fff&size=120&bold=true'
    }
  ];

  return (
    <section id="trusted-by" className="trusted-by-section">
      <div className="trusted-by-container">
        <motion.div 
          className="trusted-by-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Güvenilir İş Ortağı</span>
          <h2>Birlikte Çalıştığımız Markalar</h2>
          <p>Türkiye'nin önde gelen markalarına hizmet veriyoruz.</p>
        </motion.div>

        <motion.div 
          className="partners-grid reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="partner-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="trusted-by-cta reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Siz de bu listeye katılın!</h3>
          <p>Markanızı dijitalde güçlendirmek için hemen bizimle iletişime geçin.</p>
          <a href="https://wa.me/+905541460813" target="_blank" rel="noopener noreferrer" className="trusted-cta-btn">
            İletişime Geç
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
