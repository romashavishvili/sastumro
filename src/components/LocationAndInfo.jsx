import React from 'react';

export default function LocationAndInfo() {
  return (
    <section id="location" className="location-info-section">
      <div className="container">
        <div className="location-grid">
          {/* Stylized Architectural Location Card */}
          <div className="map-visual-card">
            <div className="map-canvas-box">
              <div className="map-grid-lines" />
              <div className="map-street-contour" />
              <div className="map-pin">
                <div className="pin-marker" />
                <span className="pin-label">ამარა &bull; ამაღლების ქ. 14</span>
              </div>
            </div>

            <div className="map-details-box">
              <h4 className="how-to-reach-title">როგორ მოგვაგნოთ &bull; სოლოლაკი</h4>
              <p className="how-to-reach-text">
                თავისუფლების მოედნიდან და რუსთაველის გამზირიდან 7 წუთის სავალზე ფეხით, ამაღლების ქუჩის მშვიდ აღმართზე. თბილისის საერთაშორისო აეროპორტიდან ავტომობილით &mdash; 25 წუთი (ტრანსფერის ორგანიზება შესაძლებელია კონსიერჟთან).
              </p>
            </div>
          </div>

          {/* Practical Info Block */}
          <div className="practical-info-wrap">
            <div>
              <span className="section-label">პრაქტიკული დეტალები</span>
              <h3 className="practical-heading">სასარგებლო ინფორმაცია</h3>
            </div>

            <ul className="practical-list">
              <li className="practical-item">
                <span className="practical-item-title">შემოსვლა და გასვლა</span>
                <p className="practical-item-text">
                  შემოსვლა (Check-in) 15:00 საათიდან &bull; გასვლა (Check-out) 12:00 საათამდე (მოთხოვნით შესაძლებელია მოქნილი განრიგი).
                </p>
              </li>

              <li className="practical-item">
                <span className="practical-item-title">გაუქმების პირობები</span>
                <p className="practical-item-text">
                  ჯავშნის უფასო გაუქმება ან თარიღების შეცვლა შესაძლებელია ჩამოსვლამდე 48 საათით ადრე.
                </p>
              </li>

              <li className="practical-item">
                <span className="practical-item-title">შინაური ცხოველები</span>
                <p className="practical-item-text">
                  სიამოვნებით ვმასპინძლობთ პატარა ზომის (8 კგ-მდე) შინაურ ცხოველებს წინასწარი შეთანხმებით.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
