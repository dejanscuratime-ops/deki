import { FormEvent, useState } from "react";
import { ArrowUpRight, Building2, Check, Clock3, Hammer, Instagram, Mail, MapPin, Menu, Phone, Send, ShieldCheck, X } from "lucide-react";

const services = [
  { number: "01", title: "Grubi građevinski radovi", text: "Zidanje, betoniranje i ostali radovi od temelja do zatvaranja objekta.", icon: Hammer, photo: "/assets/project-3.jpg" },
  { number: "02", title: "Tesarski radovi", text: "Priprema i montaža drvenih i čeličnih konstrukcija za vaš objekat.", icon: Building2, photo: "/assets/project-5.jpg" },
  { number: "03", title: "Fasade", text: "Postavljanje fasadnih sistema, termoizolacija i završni slojevi.", icon: ShieldCheck, photo: "/assets/project-6.jpg" },
  { number: "04", title: "Keramika", text: "Postavljanje keramičkih pločica i oblaganje površina.", icon: Check, photo: "/assets/project-4.jpg" },
];

const gallery = [
  { src: "/assets/project-1.jpg", alt: "Kompletni grubi građevinski radovi Herceg Novi" },
  { src: "/assets/project-3.jpg", alt: "Grubi i završni građevinski radovi Herceg Novi" },
  { src: "/assets/project-4.jpg", alt: "Građevinski radovi BG Gradnja" },
  { src: "/assets/project-5.jpg", alt: "Radovi na objektu u Herceg Novom" },
  { src: "/assets/project-6.jpg", alt: "Detalj građevinskih radova" },
  { src: "/assets/project-7.jpg", alt: "BG Gradnja — radovi" },
];

const navItems = [["Naslovna", "top"], ["O nama", "about"], ["Usluge", "services"], ["Objekti", "gallery"], ["Kontakt", "contact"]];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  return (
    <div className="site-shell" id="top">
      <header className="site-header"><div className="container header-inner">
        <button className="brand" onClick={() => goTo("top")} aria-label="BG Gradnja naslovna"><img className="site-logo" src="/assets/bg-gradnja-logo.jpeg" alt="BG Gradnja — građevinska firma Herceg Novi - Igalo" /></button>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Glavna navigacija">{navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}<a className="header-cta" href="tel:+38269905405"><Phone size={15} /> Pozovite nas</a></nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div></header>

      <main>
        <section className="hero"><div className="hero-image" /><div className="hero-overlay" /><div className="container hero-content"><p className="eyebrow">GRUBI GRAĐEVINSKI RADOVI · HERCEG NOVI</p><h1>Od temelja<br /><span>do završne obrade.</span></h1><p className="hero-lead">BG-GRADNJA DOO radi grube i završne građevinske radove u Herceg Novom i okolini.</p><div className="hero-actions"><button className="button button-accent" onClick={() => goTo("contact")}>Pošaljite upit <ArrowUpRight size={17} /></button><button className="button button-ghost" onClick={() => goTo("gallery")}>Pogledajte objekte</button></div></div><div className="hero-scroll">SCROLL <span /></div></section>

        <section className="dark-section intro" id="about"><div className="container two-col"><div><p className="eyebrow eyebrow-light">01 / O FIRMI</p><h2>Radimo ono što smo dogovorili.</h2></div><div className="intro-copy"><p>BG-GRADNJA DOO radi kompletne grube građevinske radove u Herceg Novom i okolini.</p><p>U ponudi su tesarski i zidarski radovi, fasade i keramika. Za obim i cijenu radova potrebno je poslati upit.</p><div className="micro-proof"><span className="proof-line" /><span>5.0 / 4 utiska na javnom profilu</span></div></div></div></section>

        <section className="light-section principles"><div className="container two-col align-start"><div><p className="eyebrow">02 / KAKO RADIMO</p><h2>Dogovor, radovi, predaja.</h2></div><div className="principles-copy"><p>Obim radova i materijal dogovaraju se prije početka. Javne cijene nijesu objavljene, zato se svaka ponuda pravi prema objektu i poslu.</p><div className="principle-list"><div><strong>01</strong><span>Visok kvalitet radova</span></div><div><strong>02</strong><span>Iskusni majstori</span></div><div><strong>03</strong><span>Fleksibilnost i prilagodljivost</span></div><div><strong>04</strong><span>Brzo završavanje radova</span></div></div></div></div></section>

        <section className="service-section" id="services"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow">03 / USLUGE</p><h2>Šta radimo.</h2></div><p>Fotografije su iz javno dostupne galerije. Cjenovnik nije objavljen — <span className="missing">[NEDOSTAJE]</span>.</p></div><div className="service-grid">{services.map(({ number, title, text, icon: Icon, photo }) => <article className="service-card" key={title}><img className="service-photo" src={photo} alt={title} /><span className="service-number">{number}</span><Icon size={24} strokeWidth={1.3} /><h3>{title}</h3><p>{text}</p><button onClick={() => goTo("contact")}>Pošalji upit <ArrowUpRight size={15} /></button></article>)}</div></div></section>

        <section className="gallery-section" id="gallery"><div className="container"><div className="section-heading split-heading gallery-heading"><div><p className="eyebrow">04 / ZAVRŠENI OBJEKTI</p><h2>Radovi sa terena.</h2></div><p>Fotografije iz javne galerije BG-GRADNJA DOO. Kliknite na sliku za veći prikaz.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-item gallery-${index + 1}`} key={item.src} onClick={() => setLightbox(item.src)} aria-label={`Uvećaj: ${item.alt}`}><img src={item.src} alt={item.alt} /><span>{String(index + 1).padStart(2, "0")} <ArrowUpRight size={16} /></span></button>)}</div></div></section>

        <section className="dark-section contact-section" id="contact"><div className="container contact-grid"><div><p className="eyebrow eyebrow-light">05 / KONTAKT</p><h2>Pošaljite<br /><span>upit.</span></h2><p className="contact-lead">Napišite šta treba da se radi, gdje je objekat i kako da vas kontaktiramo.</p><a className="button button-accent" href="tel:+38269905405">Pozovite 069/905-405 <Phone size={16} /></a></div><div className="contact-details"><div className="detail"><MapPin size={19} /><div><small>ADRESA</small><p>Svetozara Živojinovića bb<br />85340, Herceg Novi</p></div></div><div className="detail"><Clock3 size={19} /><div><small>RADNO VRIJEME</small><p>Ponedjeljak – Subota<br />07:00 – 21:00</p></div></div><div className="detail"><Mail size={19} /><div><small>EMAIL</small><p><a href="mailto:gvozdenovicblagoje982@gmail.com">gvozdenovicblagoje982@gmail.com</a></p></div></div><div className="detail"><Instagram size={19} /><div><small>INSTAGRAM</small><p><a href="https://www.instagram.com/bg.gradnja/" target="_blank" rel="noreferrer">@bg.gradnja</a></p></div></div></div><form className="inquiry-form" onSubmit={handleSubmit}><p className="form-title">Forma za upit</p>{submitted ? <div className="form-success"><Check size={18} /><p>Hvala. Upit je zabilježen.<br />Javite nam se i direktno na 069/905-405.</p></div> : <><div className="form-row"><label>Ime i prezime<input name="name" required placeholder="Vaše ime" /></label><label>Telefon<input name="phone" required placeholder="069 / ..." /></label></div><label>Email<input name="email" type="email" placeholder="vas@email.com" /></label><label>Vrsta radova<select name="service" defaultValue=""><option value="" disabled>Izaberite uslugu</option><option>Grubi građevinski radovi</option><option>Tesarski radovi</option><option>Fasade</option><option>Keramika</option></select></label><label>Poruka<textarea name="message" required placeholder="Kratak opis objekta i radova" rows={4} /></label><button className="button button-accent form-submit" type="submit">Pošalji upit <Send size={15} /></button></>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><button className="brand footer-brand" onClick={() => goTo("top")}><img className="site-logo footer-logo" src="/assets/bg-gradnja-logo.jpeg" alt="BG Gradnja logo" /></button><p className="footer-note">Grubi i završni građevinski radovi<br />u Herceg Novom i okolini.</p></div><div><p className="footer-label">MAPA SAJTA</p><div className="footer-links">{navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}</div></div><div><p className="footer-label">KONTAKT</p><a href="tel:+38269905405">069/905-405</a><a href="mailto:gvozdenovicblagoje982@gmail.com">gvozdenovicblagoje982@gmail.com</a><a href="https://www.instagram.com/bg.gradnja/" target="_blank" rel="noreferrer">Instagram / @bg.gradnja</a></div></div><div className="container footer-bottom"><span>© 2026 BG-GRADNJA DOO</span><span>Logo i paleta preuzeti iz dostavljenog brenda</span></div></footer>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button className="lightbox-close" aria-label="Zatvori" onClick={() => setLightbox(null)}><X /></button><img src={lightbox} alt="Uvećani prikaz rada" onClick={(event) => event.stopPropagation()} /></div>}
    </div>
  );
}
