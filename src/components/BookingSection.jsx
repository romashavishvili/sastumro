import React, { useState } from 'react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2 სტუმარი',
    name: '',
    email: '',
    room: 'ეზოს ატელიე',
  });

  const [errors, setErrors] = useState({});
  const [confirmedData, setConfirmedData] = useState(null);

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'გთხოვთ შეიყვანოთ თქვენი სახელი და გვარი.';
    }

    if (!formData.email.trim()) {
      errs.email = 'გთხოვთ მიუთითოთ ელფოსტის მისამართი.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'გთხოვთ შეიყვანოთ ელფოსტის სწორი ფორმატი (მაგ: name@domain.com).';
    }

    if (!formData.checkIn) {
      errs.checkIn = 'გთხოვთ აირჩიოთ შემოსვლის თარიღი.';
    }

    if (!formData.checkOut) {
      errs.checkOut = 'გთხოვთ აირჩიოთ გასვლის თარიღი.';
    } else if (formData.checkIn && formData.checkOut <= formData.checkIn) {
      errs.checkOut = 'გასვლის თარიღი უნდა იყოს შემოსვლის თარიღზე გვიან.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    // Generate a simulated reservation reference code
    const refCode = 'AMR-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedData({
      ...formData,
      refCode,
    });
  };

  return (
    <section id="booking" className="booking-section">
      <div className="container">
        <div className="booking-card">
          {confirmedData ? (
            <div className="booking-confirmation">
              <div className="confirmation-badge">&check;</div>
              <h3 className="confirmation-title">თქვენი ჯავშანი მიღებულია</h3>
              <p className="confirmation-details">
                მადლობას გიხდით, <strong>{confirmedData.name}</strong>. „ამარას“ მიღების სამსახურმა წარმატებით დაარეგისტრირა თქვენი ჯავშნის მოთხოვნა <strong>{confirmedData.room}</strong>-ზე. დეტალური ინფორმაცია და ვაუჩერი გაგზავნილია ელფოსტაზე: <strong>{confirmedData.email}</strong>.
              </p>

              <div className="confirmation-meta">
                <span>ჯავშნის კოდი: <strong>{confirmedData.refCode}</strong></span>
                <span>პერიოდი: <strong>{confirmedData.checkIn} &mdash; {confirmedData.checkOut}</strong></span>
                <span>სტუმრები: <strong>{confirmedData.guests}</strong></span>
              </div>

              <button
                onClick={() => setConfirmedData(null)}
                className="btn-secondary"
                style={{ marginTop: '16px' }}
              >
                ახალი ჯავშნის გაფორმება
              </button>
            </div>
          ) : (
            <>
              <div className="booking-header">
                <h3 className="booking-title">ნომრის ონლაინ დაჯავშნა</h3>
                <p className="booking-desc">
                  მიუთითეთ სასურველი თარიღები და პირადი მონაცემები. გარანტირებული საუკეთესო ტარიფი პირდაპირი ჯავშნისას.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="booking-form-grid">
                  {/* Check-In */}
                  <div className="booking-field">
                    <label className="booking-label">შემოსვლა (Check-in) *</label>
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => {
                        setFormData({ ...formData, checkIn: e.target.value });
                        if (errors.checkIn) setErrors({ ...errors, checkIn: null });
                      }}
                      className={`booking-input ${errors.checkIn ? 'input-error' : ''}`}
                    />
                  </div>

                  {/* Check-Out */}
                  <div className="booking-field">
                    <label className="booking-label">გასვლა (Check-out) *</label>
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => {
                        setFormData({ ...formData, checkOut: e.target.value });
                        if (errors.checkOut) setErrors({ ...errors, checkOut: null });
                      }}
                      className={`booking-input ${errors.checkOut ? 'input-error' : ''}`}
                    />
                  </div>

                  {/* Room Selection */}
                  <div className="booking-field">
                    <label className="booking-label">ნომრის კატეგორია</label>
                    <select
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="booking-select"
                    >
                      <option value="ეზოს ატელიე">ეზოს ატელიე (340 ₾ / ღამე)</option>
                      <option value="აივნის ლუქსი">აივნის ლუქსი (480 ₾ / ღამე)</option>
                      <option value="მანსარდის რეზიდენცია">მანსარდის რეზიდენცია (680 ₾ / ღამე)</option>
                    </select>
                  </div>

                  {/* Guests */}
                  <div className="booking-field">
                    <label className="booking-label">სტუმრების რაოდენობა</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="booking-select"
                    >
                      <option value="1 სტუმარი">1 სტუმარი</option>
                      <option value="2 სტუმარი">2 სტუმარი</option>
                      <option value="3 სტუმარი">3 სტუმარი</option>
                      <option value="4 სტუმარი">4 სტუმარი</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="booking-field">
                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ width: '100%', whiteSpace: 'nowrap' }}
                    >
                      შემოწმება და დაჯავშნა
                    </button>
                  </div>
                </div>

                {/* Additional Row for Name and Email */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginTop: '16px',
                  }}
                >
                  <div className="booking-field">
                    <label className="booking-label">სრული სახელი და გვარი *</label>
                    <input
                      type="text"
                      placeholder="მაგ: გიორგი ბერიძე"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      className={`booking-input ${errors.name ? 'input-error' : ''}`}
                    />
                  </div>

                  <div className="booking-field">
                    <label className="booking-label">ელფოსტა *</label>
                    <input
                      type="email"
                      placeholder="giorgi@example.ge"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className={`booking-input ${errors.email ? 'input-error' : ''}`}
                    />
                  </div>
                </div>

                {/* Validation Errors Display */}
                {Object.keys(errors).length > 0 && (
                  <div className="error-banner">
                    {Object.values(errors).map((err, idx) => (
                      <div key={idx}>&bull; {err}</div>
                    ))}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
