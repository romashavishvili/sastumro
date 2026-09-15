import React from 'react';

export default function Dining() {
  return (
    <section id="dining" className="dining-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">სასადილო სივრცე</span>
            <h2 className="section-title">ეზოს ვერანდა და სასადილო</h2>
          </div>
          <p className="section-desc">
            სეზონური საუზმე და ქართული ქვევრის ნატურალური ღვინოები ძველი ლეღვის ხის ჩრდილში.
          </p>
        </div>

        <div className="dining-grid">
          <div className="dining-col">
            <h3 className="dining-col-title">დილის საუზმე</h3>
            <p className="dining-col-text">
              ახალგამომცხვარი დედას პური, იმერული და სულგუნის ნედლი ყველი კახეთიდან, ხელნაკეთი ლეღვისა და კაკლის მურაბები და მთის ყვავილების ჩაი.
            </p>
          </div>

          <div className="dining-col">
            <h3 className="dining-col-title">ქვევრის ღვინის სარდაფი</h3>
            <p className="dining-col-text">
              მცირე ოჯახური მარნებიდან შერჩეული ბიო-დინამიკური რქაწითელი, ქისი და საფერავი. ყოველ საღამოს ვთავაზობთ დეგუსტაციას სასტუმროს სომელიესთან ერთად.
            </p>
          </div>

          <div className="dining-col">
            <h3 className="dining-col-title">საღამოს კერძები</h3>
            <p className="dining-col-text">
              ნელი ცეცხლითა და თიხის ჭურჭელში მომზადებული კერძები: ბატკნის ჩაქაფული ტარხუნით, ღუმელში გამომცხვარი კალმახი და ადგილობრივი მწვანილეული.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
