import ContactForm from "@/components/ContactForm";
import { services, site } from "@/lib/site";

const links = [
  ["Home", "#top"], ["Services", "#services"], ["About", "#about"],
  ["Testimonials", "#testimonials"], ["Contact", "#contact"],
] as const;

export default function Home() {
  return (
    <>
      <div className="util">
        <div className="wrap util-inner">
          <span>Serving The Austin and Houston Metro Areas (Harris & Travis Counties)</span>
          <span>Call <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></span>
        </div>
      </div>
      <header className="top">
        <div className="wrap header-inner">
          <a className="logo" href="#top">
            <img
              src="/Logo.png"
              alt="Steadfast Home Care logo"
              className="brand-mark"
            />
            <span>Steadfast Home Care LLC</span>
          </a>          <nav aria-label="Main">
            {links.map(([name, href]) => <a key={name} href={href}>{name}</a>)}
            <a className="btn" href={`tel:${site.phoneHref}`}>Call now</a>
          </nav>
        </div>
      </header>
      <main id="top">
        <section className="hero"><div className="wrap hero-grid">
          <div>
            <h1>Caring help at home, when you need it.</h1>
            <p>Personal care, companionship, household help, and relief for family caregivers, provided in the comfort of home.</p>
            <div className="actions"><a className="btn" href="#contact">Start your care</a><a className="btn line" href="#services">View services</a></div>
          </div>
          <aside className="panel" aria-label="Services at a glance">
            <h2>How we help</h2>
            <ul>{["Personal care assistance", "Companionship and supervision", "Household assistance", "Respite services"].map(item => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div></section>
        <section className="intro" id="about"><div className="wrap two-col">
          <h2>Support that helps you stay comfortable and independent at home</h2>
          <div>
            <p>We provide in-home care for people who want to stay in their own homes, and for families who need a dependable partner. Care is arranged around daily routines, abilities, and preferences.</p>
            <p>Our caregivers help with personal care, keep company, look after the household, and give family caregivers scheduled time away. Share your goals, and we will help you plan the right level of support.</p>
            <a className="btn brand" href={`mailto:${site.email}`}>Talk with us</a>
          </div>
        </div></section>
        <section className="start" id="contact"><div className="wrap two-col">
          <div>
            <h2>Speak with our care team</h2>
            <p>Have questions, or ready to schedule a consultation? Call us or send the short form.</p>
            <a className="big" href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
            <p><strong>Serving families since: 2026</strong></p>
          </div>
          <ContactForm />
        </div></section>
        <section className="services" id="services"><div className="wrap">
          <div className="section-head"><h2>Our in-home care services</h2><p>Choose one service or combine several. Each is arranged around your needs and schedule.</p></div>
          <div className="services-grid">{services.map(service => (
            <article className="service-card" key={service.title}>
              <div className="band" /><div className="service-body"><h3>{service.title}</h3><p className="lead">{service.lead}</p>
                <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul></div>
            </article>
          ))}</div>
        </div></section>
        <section className="quotes" id="testimonials"><div className="wrap">
          <h2>What families say</h2>
          <div className="qgrid">{[1, 2, 3].map(n => (
            <blockquote key={n}>Replace this with a real testimonial from a client or family member.<cite>Name, relationship</cite></blockquote>
          ))}</div>
        </div></section>
        <section className="cta"><div className="wrap">
          <h2>Here for your family</h2><p>Contact our team to talk through what kind of help would make life easier at home.</p>
          <a className="btn brand" href={`mailto:${site.email}`}>Contact our care team</a>
        </div></section>
      </main>
      <footer><div className="wrap">
        <div className="footer-grid">
          <div><h3>Steadfast Home Cares LLC</h3><p>Compassionate in-home care, arranged around you.</p><p>Serving The Austin and Houston Metro Areas (Harris & Travis Counties)</p></div>
          <div><h3>Explore</h3><ul>{links.map(([name, href]) => <li key={name}><a href={href}>{name}</a></li>)}</ul></div>
          <div><h3>Contact</h3><p>Phone: <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></p><p>Email: <a href={`mailto:${site.email}`}>{site.email}</a></p><p>Address: {site.address}</p><p>License #: {site.license}</p></div>
        </div>
        <div className="legal">© 2026 Steadfast Home Cares LLC. All rights reserved.</div>
      </div></footer>
    </>
  );
}
