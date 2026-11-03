import ContactForm from "components/ContactForm";

const services = [
  {
    title: "Personal Care Assistance",
    lead: "Hands-on help with daily routines.",
    items: [
      "Assistance with bathing and grooming",
      "Dressing and personal hygiene",
      "Toileting and other authorized daily living activities",
      "Assistance with mobility and routine activities, when appropriate to the caregiver’s training",
    ],
  },
  {
    title: "Companionship and Supervision",
    lead: "Good company and a watchful eye.",
    items: [
      "Friendly conversation and social engagement",
      "Recreational activities and companionship",
      "Assistance with daily routines",
      "General observation and communication of concerns to the appropriate person",
    ],
  },
  {
    title: "Household Assistance",
    lead: "A comfortable, orderly home.",
    items: [
      "Light housekeeping",
      "Laundry and linen changes",
      "Meal preparation",
      "Grocery shopping and essential errands",
      "Assistance with maintaining an orderly home environment",
    ],
  },
  {
    title: "Respite Services",
    lead: "A break for the people who care for them.",
    items: [
      "Scheduled relief for family caregivers",
      "Short-term assistance arranged in advance",
      "Support during agreed service hours",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Finding someone we could trust to help care for our loved one was incredibly important to our family. Having compassionate, respectful assistance with everyday needs makes such a difference. Knowing that their comfort and dignity are being prioritized gives our family greater peace of mind.",
    author: "-Valued Patient",
  },
  {
    quote:
      "Sometimes, it's the little things that make the biggest difference. Having someone to talk with, share activities, and help with everyday routines brings so much comfort. It's reassuring to know that companionship and genuine human connection are part of the care being provided.",
    author: "Valued Patient",
  },
  {
    quote:
      "Being a caregiver for someone you love can be rewarding, but it can also be overwhelming. Having dependable support gives our family the opportunity to take a breath, handle other responsibilities, and know that our loved one is receiving attentive care. We're grateful for the difference that this kind of support can make.",
    author: "Valued Patient",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="util">
        <div className="wrap util-inner">
          <span>Serving the Austin and Houston metro areas (Harris &amp; Travis Counties)</span>
          <span>Call <a href="tel:+12175889686">(217) 588-9686</a></span>
        </div>
      </div>

      <header className="top">
        <div className="wrap header-inner">
          <a className="logo" href="#top">Steadfast Home Care LLC</a>
          <nav aria-label="Main navigation">
            <a href="#top">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <a className="btn nav-btn" href="tel:+12175889686">Call now</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="watermark-section">
          <video className="watermark-video" autoPlay muted loop playsInline aria-hidden="true">
            <source src="/Graphics/videocare.mp4" type="video/mp4" />
          </video>
          <div className="watermark-overlay" />
          <div className="wrap section-content">
            <div className="hero-text">
              <h1 className="tag">Caring help at home, when you need it.</h1>
              <p>
                Personal care, companionship, household help, and relief for
                family caregivers, provided in the comfort of home.
              </p>
              <div className="actions">
                <a className="btn" href="#contact">Start your care</a>
                <a className="btn line" href="#services">View services</a>
              </div>
            </div>
            <aside className="panel" aria-label="Services at a glance">
              <h2>How we help</h2>
              <ul>
                <li>Personal care assistance</li>
                <li>Companionship and supervision</li>
                <li>Household assistance</li>
                <li>Respite services</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="intro" id="about">
          <div className="wrap intro-grid">
            <h2>Support that helps you stay comfortable and independent at home</h2>
            <div>
              <p>
                We provide in-home care for people who want to stay in their own
                homes, and for families who need a dependable partner. Care is
                arranged around daily routines, abilities, and preferences.
              </p>
              <p>
                Our caregivers help with personal care, keep company, look after
                the household, and give family caregivers scheduled time away.
                Share your goals, and we will help you plan the right level of support.
              </p>
              <a className="btn brand" href="mailto:hesangbedo@steadfasthomecares.com">Talk with us</a>
            </div>
          </div>
        </section>

        <section className="start" id="contact">
          <div className="wrap start-grid">
            <div>
              <h2>Speak with our care team</h2>
              <p>Have questions, or ready to schedule a consultation? Call us or send the short form.</p>
              <a className="big" href="tel:+12175889686">Call Now</a>
              <p><strong>Serving families since: 2026</strong></p>
            </div>
            <ContactForm />
          </div>
        </section>

        <section className="services" id="services">
          <div className="wrap">
            <div className="head">
              <h2>Our in-home care services</h2>
              <p>Choose one service or combine several. Each is arranged around your needs and schedule.</p>
            </div>
            <div className="service-grid">
              {services.map((service, index) => (
                <article className="card" key={service.title}>
                  <div className={`band band-${index + 1}`} />
                  <div className="card-body">
                    <h3>{service.title}</h3>
                    <p className="lead">{service.lead}</p>
                    <ul>
                      {service.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="brochure">
              <img src="/Graphics/Brochure.png" alt="Steadfast Home Care brochure" />
            </div>
          </div>
        </section>

        <section className="quotes" id="testimonials">
          <div className="wrap">
            <h2>What families say</h2>
            <div className="quote-grid">
              {testimonials.map((item) => (
                <blockquote key={item.quote}>
                  “{item.quote}”
                  <cite>{item.author}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <h2>Here for your family</h2>
            <p>Contact our team to talk through what kind of help would make life easier at home.</p>
            <a className="btn brand" href="mailto:hesangbedo@steadfasthomecares.com">Contact our care team</a>
            <div className="office-image">
              <img src="/Graphics/office.png" alt="Steadfast Home Care office" />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-cols">
            <div>
              <h3>Steadfast Home Care LLC</h3>
              <p>Compassionate in-home care, arranged around you.</p>
              <p>Serving the Austin and Houston metro areas (Harris &amp; Travis Counties)</p>
            </div>
            <div>
              <h3>Explore</h3>
              <ul className="footer-links">
                <li><a href="#top">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Phone: <a href="tel:+12175889686">(217) 588-9686</a></p>
              <p>Email: <a href="mailto:hesangbedo@steadfasthomecares.com">hesangbedo@steadfasthomecares.com</a></p>
              <p>Address: 14205 N MoPac Expy Ste 570 #296932 Austin, TX 78728</p>
              <p>License #: 025413</p>
            </div>
          </div>
          <div className="legal">
            © 2026 Steadfast Home Care LLC. All rights reserved. Add your privacy
            policy and non-discrimination notice links here.
          </div>
        </div>
      </footer>
    </>
  );
}
