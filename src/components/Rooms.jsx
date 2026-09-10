import React, { useState } from 'react';

export default function Rooms({ onOpenBooking }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const rooms = [
    {
      number: 'ნომერი 01',
      name: 'ეზოს ატელიე',
      specs: '34 მ² &bull; 2 სტუმარი &bull; შიდა ეზოს ხედი',
      description:
        'პირველ სართულზე მდებარე მყუდრო ნომერი, რომელიც უშუალოდ უკავშირდება ძველ მოკირწყლულ ეზოს. ოთახში დაგხვდებათ რესტავრირებული აგურის თაღი, კაკლის ხის საწოლი, მუხის იატაკი და ხელით მოჭიქული კერამიკის დეტალები.',
      amenities: ['შიდა ეზოს გასასვლელი', 'მუხის იატაკი', 'იტალიური შხაპი', 'ქართული ჩაის კუთხე'],
      price: '340 ₾',
      period: '/ ღამე',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      alt: 'სასტუმრო ამარას ეზოს ატელიე',
    },
    {
      number: 'ნომერი 02',
      name: 'აივნის ლუქსი',
      specs: '48 მ² &bull; 2 სტუმარი &bull; სოლოლაკის ხედი',
      description:
        'მეორე სართულის ნომერი ტრადიციული ჭვირული ხის აივნით, რომელიც ამაღლების ქუჩასა და ძველი თბილისის სახურავებს გადაჰყურებს. ოთახს აქვს 4-მეტრიანი ჭერი, მოქმედი თუჯის ბუხარი და თავისუფლად მდგომი ქვის აბაზანა.',
      amenities: ['ისტორიული ხის აივანი', 'თუჯის ბუხარი', 'ქვის აბაზანა', 'ვინილის საკრავი'],
      price: '480 ₾',
      period: '/ ღამე',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      alt: 'სასტუმრო ამარას აივნის ლუქსი',
    },
    {
      number: 'ნომერი 03',
      name: 'მანსარდის რეზიდენცია',
      specs: '65 მ² &bull; 3 სტუმრამდე &bull; მთაწმინდის ხედი',
      description:
        'სახლის ზედა სართულზე მოწყობილი ყველაზე ვრცელი სივრცე დახრილი მუხის კოჭებითა და მთაწმინდის ხედით. მოიცავს ცალკე მოსასვენებელ ზონას, მცირე ბიბლიოთეკასა და პერსონალურ საუზმის სერვისს.',
      amenities: ['მთაწმინდის პანორამა', 'საკითხავი კუთხე', 'ქვევრის ღვინის ბარი', 'საუზმე ნომერში'],
      price: '680 ₾',
      period: '/ ღამე',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      alt: 'სასტუმრო ამარას მანსარდის რეზიდენცია',
    },
  ];

  return (
    <section id="rooms" className="rooms">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">ნომრები და რეზიდენციები</span>
            <h2 className="section-title">ათი განმარტოებული ოთახი</h2>
          </div>
          <p className="section-desc">
            თითოეული ოთახი ინდივიდუალურად არის დაპროექტებული ისტორიული შენობის არქიტექტურის გათვალისწინებით.
          </p>
        </div>

        {/* Rooms List with Unsplash Photography */}
        <div className="rooms-list">
          {rooms.map((room, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className={`room-card ${isHovered ? 'is-active-hover' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Real Photography Placeholder */}
                <div className="room-image-wrap">
                  <img
                    src={room.image}
                    alt={room.alt}
                    loading="lazy"
                    className="room-image"
                  />
                </div>

                {/* Room Body & Details */}
                <div className="room-body">
                  <div className="room-top">
                    <span className="room-number-tag">{room.number}</span>
                    <h3 className="room-name">{room.name}</h3>
                    <span
                      className="room-specs"
                      dangerouslySetInnerHTML={{ __html: room.specs }}
                    />
                    <p className="room-desc">{room.description}</p>
                    <div className="room-amenities">
                      {room.amenities.map((amenity, aIdx) => (
                        <span key={aIdx} className="amenity-pill">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Price and Reservation Action */}
                  <div className="room-bottom-row">
                    <div className="room-price-box">
                      <span className="room-price-val">{room.price}</span>
                      <span className="room-price-unit">{room.period}</span>
                    </div>
                    <button
                      onClick={() => onOpenBooking(room.name)}
                      className="btn-reserve-room"
                    >
                      ნომრის არჩევა
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
