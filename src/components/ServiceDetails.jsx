import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const serviceDetails = [
  {
    id: 'web-tasarim',
    title: 'Kurumsal Web Tasarım ve Web Geliştirme',
    summary:
      'Web tasarım hizmetimizde amacımız sadece güzel görünen bir site çıkarmak değil; hızlı açılan, mobil uyumlu, güvenli ve dönüşüm getiren bir yapı kurmaktır. React tabanlı modern altyapı ile SEO dostu bir mimari kurarak Google sıralamalarında daha güçlü bir temel oluşturuyoruz.',
    includeItems: [
      'Kurumsal tanıtım sayfaları, hizmet sayfaları ve iletişim altyapısı',
      'Mobil uyumlu (responsive) arayüz ve hız optimizasyonu',
      'Temel teknik SEO ayarları, başlık-meta kurgusu ve indexlenebilir yapı',
      'Form, WhatsApp, harita ve sosyal medya entegrasyonları'
    ],
    processItems: [
      'Marka analizi ve ihtiyaç toplama',
      'Tasarım mockup ve onay süreci',
      'Yazılım, test, performans optimizasyonu ve yayına alma'
    ],
    seoGain:
      'Doğru başlık yapısı (H1-H2-H3), teknik hız iyileştirmesi ve kaliteli içerik kurgusu ile organik trafikte daha sağlıklı büyüme hedeflenir.'
  },
  {
    id: 'e-ticaret',
    title: 'E-Ticaret Sitesi Kurulumu ve Satış Altyapısı',
    summary:
      'E-ticaret çözümlerinde odağımız ürünlerin bulunurluğunu ve sepete ekleme oranını artırmaktır. Kategori mimarisi, ürün detay sayfaları, ödeme-kargo entegrasyonları ve güven veren checkout akışıyla satış performansını yukarı taşıyoruz.',
    includeItems: [
      'Ürün-kategori yapı kurgusu ve filtreleme senaryoları',
      'Ödeme altyapısı, kargo takip ve sipariş yönetimi entegrasyonları',
      'Ürün SEO alanları (title, description, schema) optimizasyonu',
      'Kampanya, kupon ve sepet hatırlatıcı strateji kurgusu'
    ],
    processItems: [
      'Ürün yapısı ve operasyon analizi',
      'Tasarım + yazılım + entegrasyon kurulumları',
      'Canlıya geçiş, test siparişleri ve raporlama düzeni'
    ],
    seoGain:
      'Ürün odaklı anahtar kelime hedeflemesi, kategori bazlı içerik ve teknik düzen ile e-ticaret aramalarında daha görünür bir yapı oluşur.'
  },
  {
    id: 'seo',
    title: 'SEO Danışmanlığı, Teknik SEO ve İçerik SEO',
    summary:
      'SEO hizmetimizde hem teknik sorunları çözer hem de doğru anahtar kelime haritası ile içerik gücünü artırırız. Site içi optimizasyon, sayfa hızı, crawl düzeni ve arama niyeti odaklı içerik planlaması birlikte ele alınır.',
    includeItems: [
      'Anahtar kelime araştırması ve rakip analizi',
      'Teknik SEO kontrolü (index, canonicals, robots, sitemap, hız)',
      'Başlık-meta optimizasyonu ve içerik zenginleştirme planı',
      'Aylık raporlama ve sürekli iyileştirme aksiyonları'
    ],
    processItems: [
      'Mevcut durum analizi ve teknik denetim',
      'Önceliklendirilmiş aksiyon planı',
      'Uygulama, takip ve aylık performans değerlendirmesi'
    ],
    seoGain:
      'Doğru teknik altyapı ve düzenli içerik gelişimi sayesinde marka aramaları, organik tıklama oranı ve hedef anahtar kelime görünürlüğü artar.'
  },
  {
    id: 'google-ads',
    title: 'Google Ads Reklam Yönetimi',
    summary:
      'Google Ads yönetiminde bütçeyi rastgele değil veri odaklı yönetiyoruz. Doğru arama niyeti yakalama, negatif anahtar kelime stratejisi, dönüşüm takibi ve reklam metni testleri ile reklam verimini iyileştiriyoruz.',
    includeItems: [
      'Arama ve performans kampanya kurulumu',
      'Dönüşüm ölçümleme, call tracking ve hedef tanımları',
      'Reklam metni ve açılış sayfası A/B testleri',
      'Haftalık optimizasyon ve aylık net performans raporu'
    ],
    processItems: [
      'Hedef ve bütçe belirleme',
      'Kampanya kurulumu + ölçüm altyapısı',
      'Sürekli optimizasyon ve maliyet düşürme çalışmaları'
    ],
    seoGain:
      'Ads ile gelen veriler SEO içerik stratejisini de besler; dönüşen sorgular organik içerik planına aktarılarak çift yönlü büyüme sağlanır.'
  },
  {
    id: 'sosyal-medya',
    title: 'Sosyal Medya Yönetimi ve İçerik Üretimi',
    summary:
      'Sosyal medya yönetiminde marka sesi, hedef kitle dili ve düzenli içerik ritmi en kritik konudur. Görsel tasarım, içerik takvimi, etkileşim yönetimi ve raporlama ile hesapların istikrarlı büyümesini hedefleriz.',
    includeItems: [
      'Aylık içerik takvimi ve post/story planlaması',
      'Görsel, metin ve hashtag stratejisi',
      'Topluluk yönetimi ve DM-yorum takibi',
      'Aylık erişim, etkileşim ve takipçi kalite raporu'
    ],
    processItems: [
      'Marka sesi ve hedef kitle tanımlama',
      'İçerik üretimi ve onay süreci',
      'Yayın, izleme ve performans değerlendirmesi'
    ],
    seoGain:
      'Sosyal medya sinyalleri doğrudan sıralama faktörü olmasa da marka aramalarını ve web sitesine yönlendirmeyi artırarak SEO performansını dolaylı olarak güçlendirir.'
  },
  {
    id: 'mobil-uygulama',
    title: 'Mobil Uygulama Geliştirme (iOS ve Android)',
    summary:
      'Mobil uygulama hizmetimizde kullanıcının ilk 30 saniyede değer algılayacağı bir deneyim tasarlarız. Performans, sade arayüz ve güvenli altyapı ile hem kullanıcı memnuniyeti hem uzun vadeli tutunma oranı artar.',
    includeItems: [
      'UI/UX odaklı ekran akışları ve prototipleme',
      'API entegrasyonları ve yönetim paneli bağlantıları',
      'Bildirim, üyelik, ödeme ve takip fonksiyonları',
      'Yayın öncesi test, store yayınlama ve teknik destek'
    ],
    processItems: [
      'Fonksiyon listesi ve ürün yol haritası',
      'Tasarım + geliştirme sprintleri',
      'Test süreci, canlıya geçiş ve izleme'
    ],
    seoGain:
      'Mobil uygulama doğrudan web SEO yerine marka sadakati ve geri dönüş trafiğini güçlendirir; bu da arama hacmi ve marka bilinirliğine pozitif etki eder.'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Tasarım ve Dönüşüm Optimizasyonu',
    summary:
      'UI/UX tasarım hizmetinde hedefimiz ziyaretçinin siteyi kolay anlaması, hızlı hareket etmesi ve doğru aksiyona yönelmesidir. Bilgi mimarisi, okunabilirlik ve güven unsurlarıyla dönüşüm oranını artırıyoruz.',
    includeItems: [
      'Kullanıcı akışı, wireframe ve ekran hiyerarşisi',
      'Renk-tipografi ve marka tutarlılığı',
      'CTA, form ve etkileşim alanlarında dönüşüm odaklı düzen',
      'Kullanılabilirlik testleri ve sürekli iyileştirme'
    ],
    processItems: [
      'Kullanıcı davranışı analizi',
      'Tasarım prototipleme ve iterasyon',
      'Canlı test ve ölçüm odaklı revizyon'
    ],
    seoGain:
      'Daha iyi kullanıcı deneyimi, sayfada kalma süresi ve etkileşimi artırır; bu da arama motorlarına sayfa kalitesi sinyali olarak yansır.'
  },
  {
    id: 'logo-kimlik',
    title: 'Logo Tasarımı ve Kurumsal Kimlik',
    summary:
      'Logo ve kurumsal kimlik hizmetimiz markanızın dijitalde tek bakışta tanınmasını hedefler. Tutarlı bir görsel dil, hem reklam performansını hem de marka güvenini güçlendirir.',
    includeItems: [
      'Logo konseptleri, renk paleti ve tipografi seçimi',
      'Sosyal medya, web ve baskı kullanım dosyaları',
      'Marka kılavuzu (logo kullanım kuralları)',
      'Kurumsal kimlikte sürekli ve standardize görünüm'
    ],
    processItems: [
      'Marka konumlandırma analizi',
      'Konsept üretimi ve revize süreci',
      'Nihai paket teslimi ve kullanım rehberi'
    ],
    seoGain:
      'Güçlü marka kimliği, doğrudan marka aramalarını artırır. Marka aramaları arttıkça organik güven ve tıklanma oranları da güçlenir.'
  },
  {
    id: 'bakim-destek',
    title: 'Aylık Bakım, Güvenlik ve Teknik Destek',
    summary:
      'Yayına alınmış bir sitenin sürekli bakımı, SEO performansının korunması için kritik öneme sahiptir. Düzenli güncelleme, güvenlik taraması ve hız kontrolleriyle sitenin uzun vadede sağlıklı kalmasını sağlıyoruz.',
    includeItems: [
      'Düzenli yedekleme, güvenlik kontrolleri ve güncellemeler',
      'Hata düzeltmeleri ve küçük içerik revizeleri',
      'Sayfa hızı ve teknik durum takip raporu',
      'Acil durumlarda hızlı teknik müdahale'
    ],
    processItems: [
      'Mevcut sistem sağlık kontrolü',
      'Aylık teknik bakım ve koruyucu aksiyonlar',
      'Raporlama ve bir sonraki ay planı'
    ],
    seoGain:
      'Kırılmayan, hızlı ve güvenli bir site; index kayıpları, teknik hata birikimi ve organik trafik düşüşlerini önlemede çok daha dayanıklı olur.'
  }
];

const getSlidesToShowByViewport = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 4;
};

export default function ServiceDetails() {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShowByViewport);
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasMultipleDetailSlides = serviceDetails.length > slidesToShow;
  const visibleServiceDetails = Array.from(
    { length: Math.min(slidesToShow, serviceDetails.length) },
    (_, offset) => serviceDetails[(currentSlide + offset) % serviceDetails.length]
  );

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShowByViewport());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentSlide((prev) => (serviceDetails.length === 0 ? 0 : prev % serviceDetails.length));
  }, [slidesToShow]);

  const nextSlide = () => {
    if (!hasMultipleDetailSlides) return;
    setCurrentSlide((prev) => (prev + 1) % serviceDetails.length);
  };

  const prevSlide = () => {
    if (!hasMultipleDetailSlides) return;
    setCurrentSlide((prev) => (prev - 1 + serviceDetails.length) % serviceDetails.length);
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Detaylı Dijital Hizmetler',
    itemListElement: serviceDetails.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.title,
        description: item.summary,
        provider: {
          '@type': 'Organization',
          name: 'Tasarim Kurdu',
          url: 'https://www.tasarimkurdu.com/'
        }
      }
    }))
  };

  return (
    <section id="service-details" className="service-details-section">
      <div className="service-details-container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <motion.div
          className="service-details-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Detaylı Hizmet Rehberi</span>
          <h2>Satışını Yaptığımız Hizmetler Hakkında Detaylı Açıklamalar</h2>
          <p>
            Aşağıda sunduğumuz tüm hizmetleri kapsam, süreç ve beklenen kazanım başlıklarıyla detaylandırdık.
            Bu bölüm hem doğru karar vermenize yardımcı olur hem de arama motorlarında içerik derinliği sağlar.
          </p>
        </motion.div>

        <div className="service-details-carousel-container">
          <button className="service-details-carousel-btn prev-btn" onClick={prevSlide} aria-label="Onceki" disabled={!hasMultipleDetailSlides}>
            ‹
          </button>
          
          <div className="service-details-carousel-track">
            <div 
              className="service-details-carousel-content" 
              style={{ gridTemplateColumns: `repeat(${Math.min(slidesToShow, serviceDetails.length)}, minmax(0, 1fr))` }}
            >
              {visibleServiceDetails.map((item, index) => (
                <motion.article
                  key={`${item.id}-${index}`}
                  id={`service-${item.id}`}
                  className="service-detail-card reveal"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <h3>{item.title}</h3>
                  <p className="service-detail-summary">{item.summary}</p>

                  <h4>Neler Dahil?</h4>
                  <ul>
                    {item.includeItems.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>

                  <h4>Süreç Nasıl İlerler?</h4>
                  <ol>
                    {item.processItems.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>

                  <h4>SEO ve Ticari Kazanım</h4>
                  <p className="service-detail-seo">{item.seoGain}</p>

                  <a href="#pricing" className="service-detail-cta">
                    Bu hizmet için fiyatlandırmayı gör
                  </a>
                </motion.article>
              ))}
            </div>
          </div>

          <button className="service-details-carousel-btn next-btn" onClick={nextSlide} aria-label="Sonraki" disabled={!hasMultipleDetailSlides}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
