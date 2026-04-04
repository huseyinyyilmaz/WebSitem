import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Web sitesi ne kadar sürede teslim edilir?',
      answer: 'Projenin karmaşıklığına göre değişmekle birlikte, standart bir kurumsal web sitesi 2-3 hafta içinde teslim edilir. E-ticaret projeleri 3-4 hafta, özel yazılım gerektiren projeler ise 4-8 hafta sürebilir. İlk görüşmede size net bir zaman çizelgesi sunuyoruz.'
    },
    {
      question: 'Web sitemi kendim güncelleyebilir miyim?',
      answer: 'Evet! Tüm web sitelerimiz kullanıcı dostu yönetim paneli ile gelir. Metin, resim ve içerik güncellemelerini kolayca kendiniz yapabilirsiniz. Ayrıca ücretsiz eğitim desteği de sağlıyoruz.'
    },
    {
      question: 'Mobil uyumlu site yapıyor musunuz?',
      answer: 'Kesinlikle! Tüm tasarımlarımız %100 mobil uyumludur (responsive). Siteniz telefon, tablet ve masaüstü cihazlarda kusursuz görünür. Mobil kullanıcı deneyimine özel önem veriyoruz.'
    },
    {
      question: 'SEO hizmeti veriyor musunuz?',
      answer: 'Evet, tüm web sitelerimiz temel SEO optimizasyonu ile gelir. Ayrıca devam eden SEO desteği, Google Ads yönetimi ve dijital pazarlama hizmetleri de sunuyoruz. İhtiyacınıza özel paketler hazırlayabiliriz.'
    },
    {
      question: 'Fiyatlar ne kadar?',
      answer: 'Fiyatlarımız proje kapsamına göre değişir. Basit tanıtım siteleri 15.000 TL\'den, e-ticaret projeleri 30.000 TL\'den başlar. Detaylı teklif için lütfen bizimle iletişime geçin.'
    },
    {
      question: 'Site canlıya alındıktan sonra destek veriyor musunuz?',
      answer: 'Evet! Tüm projelerimiz 3 ay ücretsiz teknik destek garantisi ile gelir. Hosting, alan adı yönetimi ve küçük güncellemeler dahildir. Sonrasında aylık bakım paketlerimiz mevcuttur.'
    },
    {
      question: 'Hosting ve domain hizmeti sağlıyor musunuz?',
      answer: 'Evet, güvenli ve hızlı hosting çözümleri sunuyoruz. İsterseniz kendi hosting\'inizde kurulum yapabiliriz, isterseniz bizim sunucularımızda barındırabiliriz. Domain (alan adı) alımında da yardımcı oluyoruz.'
    },
    {
      question: 'E-ticaret sitesine ödeme sistemi entegre ediliyor mu?',
      answer: 'Tabii ki! İyzico, PayTR, Stripe gibi tüm popüler ödeme sistemlerini entegre ediyoruz. Kredi kartı, banka kartı, havale/EFT gibi tüm ödeme yöntemleri eklenebilir.'
    },
    {
      question: 'Sosyal medya hesaplarımı web siteme bağlayabilir miyim?',
      answer: 'Evet, Instagram, Facebook, Twitter, LinkedIn gibi tüm sosyal medya hesaplarınızı sitenize entegre ediyoruz. Sosyal medya yönetimi hizmeti de sunuyoruz.'
    },
    {
      question: 'Siteme analiz paneli eklenecek mi?',
      answer: 'Kesinlikle! Google Analytics veya tercih ettiğiniz analiz aracını ücretsiz olarak kuruyoruz. Ziyaretçi sayısı, davranışlar ve dönüşüm oranlarını takip edebilirsiniz.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <motion.div 
          className="faq-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Merak Edilenler</span>
          <h2>Sıkça Sorulan Sorular</h2>
          <p>En çok merak edilen sorulara yanıtlar. Aklınıza takılan başka bir soru varsa bize ulaşın!</p>
        </motion.div>

        <motion.div 
          className="faq-list reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="question-text">{faq.question}</span>
                <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="faq-cta reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Sorunuza yanıt bulamadınız mı?</h3>
          <p>Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız!</p>
          <a href="https://wa.me/+905541460813" target="_blank" rel="noopener noreferrer" className="faq-contact-btn">
            WhatsApp ile İletişime Geçin
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
