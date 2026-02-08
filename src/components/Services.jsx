import React from 'react'
import '../App.css' // Stilleri buradan çekecek

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Neler Yapıyorum?</h2>
      <div className="cards-container">
        
        {/* Kart 1 */}
        <div className="card">
          <h3>Web Tasarım</h3>
          <p>Modern, hızlı ve mobil uyumlu web siteleri tasarlıyorum.</p>
        </div>

        {/* Kart 2 */}
        <div className="card">
          <h3>Logo & Marka</h3>
          <p>Markanızın yüzünü yansıtan akılda kalıcı logolar.</p>
        </div>

        {/* Kart 3 */}
        <div className="card">
          <h3>E-Ticaret</h3>
          <p>Ürünlerinizi satabileceğiniz güvenli ödeme sistemleri.</p>
        </div>

      </div>
    </section>
  )
}

export default Services