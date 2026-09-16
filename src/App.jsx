import { useState, useEffect, useRef } from "react";
import "./index.css";
import logoUrl from "./assets/logo.png";

function App() {
  const rootRef = useRef(null);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("fr");
  const [navOpen, setNavOpen] = useState(false);

  // Apply saved theme on first load, falling back to system preference
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("lt-theme");
    } catch (e) {
      /* localStorage unavailable */
    }
    const systemDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : systemDark);

    let savedLang = null;
    try {
      savedLang = localStorage.getItem("lt-lang");
    } catch (e) {
      /* localStorage unavailable */
    }
    if (savedLang) setLang(savedLang);
  }, []);

  // Reflect theme on <html> and persist it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      localStorage.setItem("lt-theme", dark ? "dark" : "light");
    } catch (e) {
      /* localStorage unavailable */
    }
  }, [dark]);

  // Swap bilingual text and persist the chosen language
  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      root.querySelectorAll("[data-fr]").forEach((el) => {
        el.textContent = el.getAttribute(`data-${lang}`);
      });
    }
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("lt-lang", lang);
    } catch (e) {
      /* localStorage unavailable */
    }
  }, [lang]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div ref={rootRef}>
<header>
  <div className="nav-row">
    <a className="brand" href="#top">
      <img className="brand-mark" src={logoUrl} alt="LT Akono crest" />
      <div className="brand-text">Lycée Technique d'Akono<small data-fr="LT AKONO · 6e — Tle" data-en="G.T.H.S. AKONO · Form 1 — Upper Sixth">LT AKONO · 6e — Tle</small></div>
    </a>
    <nav className={navOpen ? "links open" : "links"}>
      <a href="#top" data-fr="Accueil" data-en="Home">Accueil</a>
      <a href="#apropos" data-fr="À propos" data-en="About">À propos</a>
      <a href="#filieres" data-fr="Filières" data-en="Programs">Filières</a>
      <a href="#admissions" data-fr="Admissions" data-en="Admissions">Admissions</a>
      <a href="#actualites" data-fr="Actualités" data-en="News">Actualités</a>
      <a href="#galerie" data-fr="Galerie" data-en="Gallery">Galerie</a>
      <a href="#contact" data-fr="Contact" data-en="Contact">Contact</a>
    </nav>
    <div className="controls">
      <div className="lang-switch">
        <button className={lang === "fr" ? "active" : ""} onClick={() => setLang("fr")}>FR</button>
        <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
      </div>
      <div className="switch" data-on={dark ? "true" : "false"} role="button" tabIndex={0} aria-label="Toggle dark mode" onClick={toggleTheme} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleTheme()}>
        <div className="icons"><span>☀</span><span>☾</span></div>
        <div className="knob"></div>
      </div>
      <button className="menu-toggle" aria-label="Menu" onClick={() => setNavOpen((o) => !o)}><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<main id="top">
  <section className="hero section-panel" style={{ borderBottom: "1px solid var(--line)", padding: 0 }}>
    <div className="hero-inner">
      <div className="hero-tag" data-fr="ÉTABLISSEMENT D'ENSEIGNEMENT TECHNIQUE" data-en="TECHNICAL EDUCATION INSTITUTION">ÉTABLISSEMENT D'ENSEIGNEMENT TECHNIQUE</div>
      <h1 className="hero-title" data-fr="Former les techniciens et ingénieurs de demain" data-en="Training tomorrow's technicians and engineers">Former les techniciens et ingénieurs de demain</h1>
      <p className="hero-sub" data-fr="Du 1er cycle au 2nd cycle, le Lycée Technique d'Akono (LT AKONO) prépare ses élèves aux métiers techniques à travers un enseignement rigoureux et des ateliers pratiques bien équipés." data-en="From lower to upper secondary, Government Technical High School Akono (G.T.H.S. AKONO) prepares students for technical careers through rigorous teaching and well-equipped workshops.">Du 1er cycle au 2nd cycle, le Lycée Technique d'Akono (LT AKONO) prépare ses élèves aux métiers techniques à travers un enseignement rigoureux et des ateliers pratiques bien équipés.</p>
      <div className="hero-cta">
        <a href="#admissions" className="btn btn-primary" data-fr="Procédure d'admission" data-en="Admissions process">Procédure d'admission</a>
        <a href="#filieres" className="btn btn-outline" data-fr="Voir les filières" data-en="View programs">Voir les filières</a>
      </div>
      <div className="hero-stats">
        <div><div className="stat-num">7</div><div className="stat-label" data-fr="Filières techniques" data-en="Technical programs">Filières techniques</div></div>
        <div><div className="stat-num">1200+</div><div className="stat-label" data-fr="Élèves inscrits" data-en="Enrolled students">Élèves inscrits</div></div>
        <div><div className="stat-num">85%</div><div className="stat-label" data-fr="Taux de réussite" data-en="Pass rate">Taux de réussite</div></div>
        <div><div className="stat-num">1998</div><div className="stat-label" data-fr="Année de création" data-en="Founded">Année de création</div></div>
      </div>
    </div>
  </section>

  <section id="apropos" className="section-panel about-section">
    <div className="wrap about-grid">
      <div>
        <div className="section-num">01</div>
        <h2 className="section-title" data-fr="Une pédagogie qui allie théorie et pratique" data-en="An education that pairs theory with practice">Une pédagogie qui allie théorie et pratique</h2>
        <p style={{ marginTop: "22px" }} data-fr="Depuis 1998, notre établissement forme des élèves du premier cycle (6e à 3e) au second cycle technique (2nde à Terminale), dans des filières industrielles, commerciales et de service. Chaque filière dispose d'ateliers et de salles spécialisées où les élèves appliquent directement les notions apprises en classe." data-en="Since 1998, our school has taught students from lower secondary (Form 1 to Form 4) through upper secondary technical tracks (Lower Sixth to Upper Sixth), across industrial, commercial and service programs. Every program has dedicated workshops and specialized rooms where students apply what they learn in class directly.">Depuis 1998, notre établissement forme des élèves du premier cycle (6e à 3e) au second cycle technique (2nde à Terminale), dans des filières industrielles, commerciales et de service. Chaque filière dispose d'ateliers et de salles spécialisées où les élèves appliquent directement les notions apprises en classe.</p>
        <p data-fr="Nos élèves se présentent au BEPC, au Probatoire et au Baccalauréat technique, avec un encadrement individualisé et un suivi régulier des parents." data-en="Our students sit the BEPC, Probatoire and Technical Baccalaureate exams, with individualized support and regular parent follow-up.">Nos élèves se présentent au BEPC, au Probatoire et au Baccalauréat technique, avec un encadrement individualisé et un suivi régulier des parents.</p>
      </div>
      <div className="about-panel">
        <h3 data-fr="ÉTABLISSEMENT EN CHIFFRES" data-en="SCHOOL AT A GLANCE">ÉTABLISSEMENT EN CHIFFRES</h3>
        <ul>
          <li><span data-fr="Cycle" data-en="Cycle">Cycle</span><span data-fr="6e → Tle" data-en="Form 1 → U6">6e → Tle</span></li>
          <li><span data-fr="Enseignants" data-en="Teaching staff">Enseignants</span><span>62</span></li>
          <li><span data-fr="Ateliers équipés" data-en="Equipped workshops">Ateliers équipés</span><span>9</span></li>
          <li><span data-fr="Langue d'enseignement" data-en="Language of instruction">Langue d'enseignement</span><span data-fr="FR / EN" data-en="FR / EN">FR / EN</span></li>
          <li><span data-fr="Internat" data-en="Boarding">Internat</span><span data-fr="Filles & Garçons" data-en="Girls & Boys">Filles & Garçons</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section id="filieres" className="section-panel programs-section">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="section-num">02</div>
          <h2 className="section-title" data-fr="Filières techniques" data-en="Technical programs">Filières techniques</h2>
        </div>
        <div className="section-note" data-fr="Chaque filière mène à un diplôme reconnu (CAP, Probatoire, Baccalauréat technique)." data-en="Every program leads to a recognized diploma (CAP, Probatoire, Technical Baccalaureate).">Chaque filière mène à un diplôme reconnu (CAP, Probatoire, Baccalauréat technique).</div>
      </div>
      <div className="dept-grid">
        <div className="dept-card">
          <div className="dept-code">AMEB · 01</div>
          <h3 data-fr="Génie Bois" data-en="Wood Engineering">Génie Bois</h3>
          <p data-fr="Menuiserie, ébénisterie et transformation du bois." data-en="Carpentry, cabinetmaking and wood processing.">Menuiserie, ébénisterie et transformation du bois.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">F4 · 02</div>
          <h3 data-fr="Génie Bâtiment" data-en="Building Engineering">Génie Bâtiment</h3>
          <p data-fr="Construction, topographie et dessin technique du bâtiment." data-en="Construction, surveying and building technical drawing.">Construction, topographie et dessin technique du bâtiment.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">F3 · 03</div>
          <h3 data-fr="Génie Électrique" data-en="Electrical Engineering">Génie Électrique</h3>
          <p data-fr="Installations électriques, automatismes et maintenance des équipements." data-en="Electrical installations, automation and equipment maintenance.">Installations électriques, automatismes et maintenance des équipements.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">CMA-MVT · 04</div>
          <h3 data-fr="Construction Mécanique, Automobile et Maintenance Après-Vente" data-en="Mechanical & Automotive Construction and After-Sales Maintenance">Construction Mécanique, Automobile et Maintenance Après-Vente</h3>
          <p data-fr="Usinage, mécanique automobile et service après-vente." data-en="Machining, automotive mechanics and after-sales servicing.">Usinage, mécanique automobile et service après-vente.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">CG · 05</div>
          <h3 data-fr="Comptabilité et Gestion" data-en="Accounting & Management">Comptabilité et Gestion</h3>
          <p data-fr="Comptabilité générale, gestion commerciale et fiscalité." data-en="General accounting, commercial management and taxation.">Comptabilité générale, gestion commerciale et fiscalité.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">ESF · 06</div>
          <h3 data-fr="Économie Sociale et Familiale" data-en="Social & Family Economics">Économie Sociale et Familiale</h3>
          <p data-fr="Nutrition, gestion du foyer et sciences sociales appliquées." data-en="Nutrition, home management and applied social sciences.">Nutrition, gestion du foyer et sciences sociales appliquées.</p>
        </div>
        <div className="dept-card">
          <div className="dept-code">IH · 07</div>
          <h3 data-fr="Industrie Textile et Habillement" data-en="Textile & Garment Industry">Industrie Textile et Habillement</h3>
          <p data-fr="Confection, stylisme et technologies du textile." data-en="Garment making, styling and textile technology.">Confection, stylisme et technologies du textile.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="admissions" className="section-panel admissions-section">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="section-num">03</div>
          <h2 className="section-title" data-fr="Procédure d'admission" data-en="Admissions process">Procédure d'admission</h2>
        </div>
        <div className="section-note" data-fr="Les inscriptions se déroulent chaque année de mai à septembre." data-en="Registration runs every year from May to September.">Les inscriptions se déroulent chaque année de mai à septembre.</div>
      </div>
      <div className="steps">
        <div className="step">
          <div className="step-index">01</div>
          <h4 data-fr="Retrait du dossier" data-en="Collect the file">Retrait du dossier</h4>
          <p data-fr="Auprès du secrétariat, du lundi au vendredi." data-en="From the front office, Monday to Friday.">Auprès du secrétariat, du lundi au vendredi.</p>
        </div>
        <div className="step">
          <div className="step-index">02</div>
          <h4 data-fr="Constitution du dossier" data-en="Prepare documents">Constitution du dossier</h4>
          <p data-fr="Bulletins, acte de naissance, photos d'identité." data-en="Report cards, birth certificate, ID photos.">Bulletins, acte de naissance, photos d'identité.</p>
        </div>
        <div className="step">
          <div className="step-index">03</div>
          <h4 data-fr="Test d'orientation" data-en="Placement test">Test d'orientation</h4>
          <p data-fr="Pour orienter l'élève vers la filière adaptée." data-en="To guide the student toward the right program.">Pour orienter l'élève vers la filière adaptée.</p>
        </div>
        <div className="step">
          <div className="step-index">04</div>
          <h4 data-fr="Confirmation" data-en="Confirmation">Confirmation</h4>
          <p data-fr="Paiement des frais et remise du certificat de scolarité." data-en="Fee payment and issuance of the enrollment certificate.">Paiement des frais et remise du certificat de scolarité.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="actualites" className="section-panel news-section">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="section-num">04</div>
          <h2 className="section-title" data-fr="Actualités" data-en="News">Actualités</h2>
        </div>
      </div>
      <div className="news-grid">
        <div className="news-card">
          <div className="news-thumb"></div>
          <div className="news-body">
            <div className="news-date">12 SEPT 2026</div>
            <h4 data-fr="Rentrée scolaire 2026-2027" data-en="School year 2026-2027 opening">Rentrée scolaire 2026-2027</h4>
            <p data-fr="Reprise des cours pour toutes les classes le 15 septembre." data-en="Classes resume for all levels on September 15.">Reprise des cours pour toutes les classes le 15 septembre.</p>
          </div>
        </div>
        <div className="news-card">
          <div className="news-thumb"></div>
          <div className="news-body">
            <div className="news-date">28 AOÛT 2026</div>
            <h4 data-fr="Résultats au Baccalauréat technique" data-en="Technical Baccalaureate results">Résultats au Baccalauréat technique</h4>
            <p data-fr="85% de réussite pour la promotion 2026." data-en="85% pass rate for the class of 2026.">85% de réussite pour la promotion 2026.</p>
          </div>
        </div>
        <div className="news-card">
          <div className="news-thumb"></div>
          <div className="news-body">
            <div className="news-date">03 JUIL 2026</div>
            <h4 data-fr="Portes ouvertes des ateliers" data-en="Workshop open day">Portes ouvertes des ateliers</h4>
            <p data-fr="Visite guidée des ateliers pour les futurs élèves et parents." data-en="Guided workshop tours for prospective students and parents.">Visite guidée des ateliers pour les futurs élèves et parents.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="galerie" className="section-panel gallery-section">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="section-num">05</div>
          <h2 className="section-title" data-fr="Ateliers & vie scolaire" data-en="Workshops & school life">Ateliers & vie scolaire</h2>
        </div>
      </div>
      <div className="gallery-grid">
        <div className="g1" data-fr="Atelier Génie Civil" data-en="Civil Eng. workshop">Atelier Génie Civil</div>
        <div className="g2" data-fr="Atelier Génie Électrique" data-en="Electrical workshop">Atelier Génie Électrique</div>
        <div className="g3" data-fr="Salle Informatique" data-en="ICT lab">Salle Informatique</div>
        <div className="g4" data-fr="Cérémonie de remise" data-en="Graduation ceremony">Cérémonie de remise</div>
      </div>
    </div>
  </section>

  <section id="contact" className="section-panel contact-section" style={{ borderBottom: "none" }}>
    <div className="wrap contact-grid">
      <div>
        <div className="section-num">06</div>
        <h2 className="section-title" data-fr="Contactez-nous" data-en="Get in touch">Contactez-nous</h2>
        <form style={{ marginTop: "28px" }} onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label data-fr="Nom complet" data-en="Full name">Nom complet</label>
            <input type="text" required />
          </div>
          <div className="field">
            <label data-fr="Adresse e-mail" data-en="Email address">Adresse e-mail</label>
            <input type="email" required />
          </div>
          <div className="field">
            <label data-fr="Message" data-en="Message">Message</label>
            <textarea required></textarea>
          </div>
          <button className="btn btn-primary" type="submit" data-fr="Envoyer le message" data-en="Send message">Envoyer le message</button>
        </form>
      </div>
      <div>
        <ul className="info-list">
          <li><div className="k" data-fr="ADRESSE" data-en="ADDRESS">ADRESSE</div><span data-fr="BP : 09, Akono, Département de la Mefou-et-Akono, Région du Centre, Cameroun" data-en="P.O. Box: 09, Akono, Mefou and Akono Division, Centre Region, Cameroon">BP : 09, Akono, Département de la Mefou-et-Akono, Région du Centre, Cameroun</span></li>
          <li><div className="k" data-fr="TÉLÉPHONE" data-en="PHONE">TÉLÉPHONE</div>693 41 30 68 / 650 35 64 52</li>
          <li><div className="k" data-fr="E-MAIL" data-en="EMAIL">E-MAIL</div>ltakono16@yahoo.com</li>
          <li><div className="k" data-fr="HORAIRES DU SECRÉTARIAT" data-en="OFFICE HOURS">HORAIRES DU SECRÉTARIAT</div><span data-fr="Lundi – Vendredi, 7h30 – 15h30" data-en="Monday – Friday, 7:30am – 3:30pm">Lundi – Vendredi, 7h30 – 15h30</span></li>
        </ul>
      </div>
    </div>
  </section>
</main>

<footer>
  <div className="wrap footer-shell">
    <div className="footer-map">
      <iframe
        title="Google Maps preview of Lycée Technique d'Akono"
        src="https://maps.google.com/maps?q=Lyc%C3%A9e%20Technique%20d%27Akono%20Akono%20Cameroon&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="foot-row">
      <span data-fr="© 2026 Lycée Technique d'Akono" data-en="© 2026 G.T.H.S. Akono">© 2026 Lycée Technique d'Akono</span>
      <span className="mono" data-fr="Matricule : 5KC1TEFD110406102" data-en="School code: 5KC1TEFD110406102">Matricule : 5KC1TEFD110406102</span>
      <a
        className="map-link"
        href="https://maps.app.goo.gl/9kZjKdreauA4Rwrz8"
        target="_blank"
        rel="noreferrer"
        data-fr="Voir sur Google Maps"
        data-en="View on Google Maps"
      >
        Voir sur Google Maps
      </a>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;
