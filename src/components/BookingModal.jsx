import React, { useState } from 'react';

export default function BookingModal({ isOpen, onClose, defaultRoom = '' }) {
  const [room, setRoom] = useState(defaultRoom || 'ეზოს ატელიე');
  const [guests, setGuests] = useState('2 სტუმარი');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="დახურვა">
          &times;
        </button>

        {confirmed ? (
          <div className="modal-success-box">
            <div className="modal-check-mark">&check;</div>
            <h3 className="modal-title">ჯავშნის მოთხოვნა მიღებულია</h3>
            <p className="modal-desc" style={{ marginTop: '10px' }}>
              მადლობას გიხდით „ამარას“ არჩევისთვის. ჩვენი მასპინძელი გადაამოწმებს <strong>{room}</strong>-ის ხელმისაწვდომობას და მითითებულ დროში დაგიკავშირდებათ დეტალების დასაზუსტებლად.
            </p>
            <button
              onClick={() => {
                setConfirmed(false);
                onClose();
              }}
              className="btn-primary"
              style={{ marginTop: '18px' }}
            >
              მთავარ გვერდზე დაბრუნება
            </button>
          </div>
        ) : (
          <>
            <h3 className="modal-title">ნომრის დაჯავშნა</h3>
            <p className="modal-desc">
              შეარჩიეთ თქვენთვის სასურველი ნომერი და თარიღები. ჩვენი მიღების სამსახური დაუყოვნებლივ დაგიდასტურებთ ჯავშანს.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">ნომრის ტიპი</label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="form-select"
                >
                  <option value="ეზოს ატელიე">ეზოს ატელიე (340 ₾ / ღამე)</option>
                  <option value="აივნის ლუქსი">აივნის ლუქსი (480 ₾ / ღამე)</option>
                  <option value="მანსარდის რეზიდენცია">მანსარდის რეზიდენცია (680 ₾ / ღამე)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">შემოსვლა (Check-in)</label>
                  <input
                    type="date"
                    required
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">გასვლა (Check-out)</label>
                  <input
                    type="date"
                    required
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">სტუმრების რაოდენობა</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="form-select"
                >
                  <option value="1 სტუმარი">1 სტუმარი</option>
                  <option value="2 სტუმარი">2 სტუმარი</option>
                  <option value="3 სტუმარი">3 სტუმარი</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: '8px' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  ჯავშნის მოთხოვნის გაგზავნა
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
