import React from "react";


export default function CapsuleHero() {
  return (
    <section className="capsule-hero">
      <div
        className="capsule-hero-images"
        style={{ position: 'relative' }}
      >
        <img
          className="capsule-hero-img-large"
          src="/producthero.png"
          alt="Fashion Capsule Main"
          style={{
            width: '100vw',
            height: '75vh',
            objectFit: 'cover',
            display: 'block',
            marginTop: '80px',
            maxWidth: '100%',
            maxHeight: '600px',
          }}
        />
        <div
          className="capsule-hero-desc"
          style={{
            position: 'absolute',
            right: '32px',
            bottom: '24px',
            background: 'rgba(255,255,255,0.85)',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            maxWidth: '320px',
            textAlign: 'right',
            fontSize: '1rem',
          }}
        >
          <h3 style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>About This Saree</h3>
          <p style={{ margin: '8px 0 0 0', color: '#333', fontSize: '1rem' }}>
            Experience the elegance and tradition of our featured saree, crafted with premium materials and vibrant colors.
          </p>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .capsule-hero-img-large {
              height: 45vh !important;
              margin-top: 60px !important;
            }
            .capsule-hero-desc {
              right: 4px !important;
              bottom: 4px !important;
              padding: 6px 8px !important;
              font-size: 0.8rem !important;
              max-width: 60vw !important;
              width: 60vw !important;
            }
            .capsule-hero-desc h3 {
              font-size: 0.9rem !important;
            }
            .capsule-hero-desc p {
              font-size: 0.8rem !important;
            }
          }
        `}</style>
      </div>
      
    </section>
  );
}
