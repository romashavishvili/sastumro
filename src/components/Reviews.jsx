import React from 'react';

export default function Reviews() {
  const reviews = [
    {
      author: 'ნინო კალანდაძე',
      origin: 'თბილისი &bull; დასვენება ეზოს ატელიეში',
      quote:
        '„სოლოლაკის შუაგულში ასეთი უჩვეულო სიჩუმე იშვიათობაა. დილაობით ეზოში ლეღვის ხის ქვეშ მირთმეული ყავა და ოთახში ნამდვილი ხის სურნელი სრულად გაწყვეტინებს კავშირს ქალაქის აჩქარებულ ტემპთან.“',
      rating: 5,
    },
    {
      author: 'მარკუს და ელენა ვებერი',
      origin: 'ციურიხი, შვეიცარია &bull; აივნის ლუქსი',
      quote:
        '„ისტორიული აივნიდან ძველი თბილისის სახურავებზე ხედი განუმეორებელია. თუჯის ბუხარი საღამოს მყუდროებას ჰმატებს, ხოლო სასტუმროს გუნდის ყურადღება და სითბო პირველივე წუთიდან იგრძნობა.“',
      rating: 5,
    },
    {
      author: 'დავით გოგოლაძე',
      origin: 'ბათუმი &bull; მანსარდის რეზიდენცია',
      quote:
        '„დახვეწილი არქიტექტურა ყოველგვარი ზედმეტი პომპეზურობის გარეშე. მანსარდის სივრცე, ბიბლიოთეკა და საღამოს ქვევრის ღვინის დეგუსტაცია ნამდვილად პრემიუმ კლასის მასპინძლობის ნიმუშია.“',
      rating: 5,
    },
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">სტუმრების გამოხმაურება</span>
            <h2 className="section-title">შთაბეჭდილებები ამარაზე</h2>
          </div>
          <p className="section-desc">
            ჩვენი სტუმრების გულწრფელი სიტყვები სიმშვიდის, ისტორიული კედლებისა და პირადი მასპინძლობის შესახებ.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="review-card">
              <div className="review-stars">
                {Array.from({ length: rev.rating }).map((_, sIdx) => (
                  <span key={sIdx}>&#9733;</span>
                ))}
              </div>

              <p className="review-quote">{rev.quote}</p>

              <div className="review-author-wrap">
                <h4 className="review-author">{rev.author}</h4>
                <p
                  className="review-origin"
                  dangerouslySetInnerHTML={{ __html: rev.origin }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
