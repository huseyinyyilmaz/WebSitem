import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'web', name: 'Web Tasarım' },
    { id: 'ecommerce', name: 'E-Ticaret' },
    { id: 'mobile', name: 'Mobil App' },
    { id: 'branding', name: 'Marka Kimliği' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Modern E-Ticaret Sitesi',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      description: 'Ödeme entegrasyonu, stok yönetimi ve admin paneli',
      tech: ['E-Ticaret', 'Responsive', 'SEO'],
      link: '#'
    },
    {
      id: 2,
      title: 'Kurumsal Web Sitesi',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      description: 'Profesyonel kurumsal web tasarımı ve içerik yönetimi',
      tech: ['React', 'Modern Design', 'SEO'],
      link: '#'
    },
    {
      id: 3,
      title: 'Mobil Uygulama',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
      description: 'iOS ve Android için native mobil uygulama',
      tech: ['React Native', 'Firebase', 'API'],
      link: '#'
    },
    {
      id: 4,
      title: 'Logo & Kurumsal Kimlik',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      description: 'Profesyonel logo tasarımı ve marka kimlik paketi',
      tech: ['Logo Design', 'Branding', 'Identity'],
      link: '#'
    },
    {
      id: 5,
      title: 'SEO & Dijital Pazarlama',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      description: 'Google Ads, SEO optimizasyonu ve sosyal medya yönetimi',
      tech: ['SEO', 'Google Ads', 'Analytics'],
      link: '#'
    },
    {
      id: 6,
      title: 'E-Ticaret Mağaza',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      description: 'Online satış platformu ve kargo entegrasyonu',
      tech: ['WooCommerce', 'Payment', 'Shipping'],
      link: '#'
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-container">
        <motion.div 
          className="portfolio-header reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Çalışmalarımız</span>
          <h2>Son Projelerimiz</h2>
          <p>Müşterilerimiz için hayata geçirdiğimiz başarılı projelere göz atın.</p>
        </motion.div>

        <motion.div 
          className="portfolio-filters reveal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="portfolio-grid"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="portfolio-item reveal"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tech-stack">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <button className="view-project-btn">
                        Projeyi Görüntüle
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                className="project-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </button>
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="modal-content">
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.description}</p>
                  <div className="tech-stack">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <a href={selectedProject.link} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                    Projeyi Ziyaret Et
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
