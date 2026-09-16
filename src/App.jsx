import { useState, useEffect, useRef } from "react";
import "./index.css";
import logoUrl from "./assets/logo.png";
import heroAssemblyUrl from "./assets/hero-assembly.jpg";

function App() {
  const rootRef = useRef(null);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("fr");
  const [navOpen, setNavOpen] = useState(false);
  const [specialityIndex, setSpecialityIndex] = useState(0);

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
  const closeMobileMenu = () => setNavOpen(false);
  const showPreviousSpeciality = () => {
    setSpecialityIndex((index) =>
      index === 0 ? specialities.length - 1 : index - 1
    );
  };
  const showNextSpeciality = () => {
    setSpecialityIndex((index) =>
      index === specialities.length - 1 ? 0 : index + 1
    );
  };
  const specialities = [
    {
      code: "CG · 01",
      fr: "Comptabilité et Gestion",
      en: "Accounting & Management",
      descriptionFr: "Comptabilité générale, gestion commerciale et fiscalité.",
      descriptionEn: "General accounting, commercial management and taxation.",
    },
    {
      code: "CMA-MVT · 02",
      fr: "Construction Mécanique, Automobile et Maintenance Après-Vente",
      en: "Mechanical & Automotive Construction and After-Sales Maintenance",
      descriptionFr: "Usinage, mécanique automobile et service après-vente.",
      descriptionEn: "Machining, automotive mechanics and after-sales servicing.",
    },
    {
      code: "ESF · 03",
      fr: "Économie Sociale et Familiale",
      en: "Social & Family Economics",
      descriptionFr: "Nutrition, gestion du foyer et sciences sociales appliquées.",
      descriptionEn: "Nutrition, home management and applied social sciences.",
    },
    {
      code: "F4 · 04",
      fr: "Génie Bâtiment",
      en: "Building Engineering",
      descriptionFr: "Construction, topographie et dessin technique du bâtiment.",
      descriptionEn: "Construction, surveying and building technical drawing.",
    },
    {
      code: "AMEB · 05",
      fr: "Génie Bois",
      en: "Wood Engineering",
      descriptionFr: "Menuiserie, ébénisterie et transformation du bois.",
      descriptionEn: "Carpentry, cabinetmaking and wood processing.",
    },
    {
      code: "F3 · 06",
      fr: "Génie Électrique",
      en: "Electrical Engineering",
      descriptionFr: "Installations électriques, automatismes et maintenance des équipements.",
      descriptionEn: "Electrical installations, automation and equipment maintenance.",
    },
    {
      code: "IH · 07",
      fr: "Industrie Textile et Habillement",
      en: "Textile & Garment Industry",
      descriptionFr: "Confection, stylisme et technologies du textile.",
      descriptionEn: "Garment making, styling and textile technology.",
    },
  ];
  const departments = [
    {
      groupFr: "DÉPARTEMENTS DE TRONC COMMUN",
      groupEn: "COMMON CORE DEPARTMENTS",
      departments: [
        { name: "Anglais", head: "Ofuka", teachers: ["FOMBERE", "MANGA C.", "NNAMBOLE"] },
        { name: "EPS", head: "EMBOLO", teachers: ["GUIMKENG"] },
        { name: "Français", head: "MEBENGA", teachers: ["MBIA NOAH"] },
        { name: "Histoire-Géographie-ECM-Philosophie", head: "ESSONO", teachers: ["ABAH ACHILLE", "ETEME", "MANGA"] },
        { name: "Hygiène-Biologie", head: "TETKA", teachers: [] },
        { name: "Informatique", head: "NKETCHOGUE", teachers: ["OKA"] },
        { name: "Mathématiques", head: "NGONO ONDOA", teachers: ["DIFFO", "FOKOUE"] },
        { name: "Physique-Chimie", head: "NGOLI", teachers: ["AGHA", "NDENGUE", "NZOUETCHOU", "YOMI"] },
      ],
    },
    {
      groupFr: "DÉPARTEMENTS DE SPÉCIALITÉ",
      groupEn: "SPECIALITY DEPARTMENTS",
      departments: [
        { name: "ACA", head: "EBA EFFA", teachers: ["ALOA", "AMBA'A", "MBEZELE", "MESSI BISSA", "N'DI NDJIBU LIZETTE", "NFONO"] },
        { name: "MENU/AMEB", head: "MVOGO B.", teachers: ["DJUIFO", "KETOUM", "MESSINA", "NIJEN", "ONANA A."] },
        { name: "ESCOM/CG", head: "MENGUE NTYE", teachers: ["AMOUAVOURI", "EWONDO", "MENGUE YANA", "MINLO", "TCHOUMTCHOUA"] },
        { name: "CM", head: "NLEND B.", teachers: ["BELLALOMO", "FORMIN", "TSAMO A."] },
        { name: "Droit", head: "LEA", teachers: ["BIDJO", "BOULE"] },
        { name: "Économie", head: "NOAH ATEBA", teachers: ["MEKO O.", "OLEMBE M."] },
        { name: "ESF", head: "MABE T.", teachers: ["GUIADEM T.", "MAKAM H.", "MBASSIKOL", "MOMNOUGUI", "ZEUFACK D."] },
        { name: "EE/F3", head: "GUIADEM O.", teachers: ["JEWELDAI", "NTSAMA MB."] },
        { name: "MACO/F4", head: "MAFFO N.", teachers: ["AWANA E.", "DJUATIO", "NGUEMA", "NJOH", "OWONE E.", "VOUNDI"] },
        { name: "COME/IH", head: "MVOGO", teachers: ["ABOMBA", "BATCHOU", "FOGANG", "MAKAM C", "MAMBO", "MEYO", "ONOGO MARIE", "TJIDJO"] },
        { name: "Marketing", head: "ASSOMO", teachers: ["KOUNGA"] },
        { name: "MARE/CMA-MVT", head: "MBOUMBOUO", teachers: ["MBOUDOU", "NGUIMDO"] },
      ],
    },
  ];
  useEffect(() => {
    const sliderTimer = window.setInterval(() => {
      setSpecialityIndex((index) =>
        index === specialities.length - 1 ? 0 : index + 1
      );
    }, 5000);

    return () => window.clearInterval(sliderTimer);
  }, [specialities.length]);

  return (
    <div ref={rootRef}>
<header>
  <div className="nav-row">
    <a className="brand" href="#top">
      <img className="brand-mark" src={logoUrl} alt="LT Akono crest" />
      <div className="brand-text">Lycée Technique d'Akono<small data-fr="LT AKONO · 6e — Tle" data-en="G.T.H.S. AKONO · Form 1 — Upper Sixth">LT AKONO · 6e — Tle</small></div>
    </a>
    <nav className={navOpen ? "links open" : "links"}>
      <a href="#top" onClick={closeMobileMenu} data-fr="Accueil" data-en="Home">Accueil</a>
      <a href="#apropos" onClick={closeMobileMenu} data-fr="À propos" data-en="About">À propos</a>
      <a href="#filieres" onClick={closeMobileMenu} data-fr="Filières" data-en="Programs">Filières</a>
      <a href="#administration" onClick={closeMobileMenu} data-fr="Administration" data-en="Administration">Administration</a>
      <a href="#actualites" onClick={closeMobileMenu} data-fr="Actualités" data-en="News">Actualités</a>
      <a href="#galerie" onClick={closeMobileMenu} data-fr="Galerie" data-en="Gallery">Galerie</a>
      <a href="#contact" onClick={closeMobileMenu} data-fr="Contact" data-en="Contact">Contact</a>
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
      <button
        className={navOpen ? "menu-toggle open" : "menu-toggle"}
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
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
        <a href="#administration" className="btn btn-primary" data-fr="Administration" data-en="Administration">Administration</a>
        <a href="#filieres" className="btn btn-outline" data-fr="Voir les filières" data-en="View Specialities">Voir les filières</a>
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
      <div className="dept-slider" aria-label="Technical specialities">
        <button
          className="dept-slider-arrow prev"
          type="button"
          aria-label="Previous speciality"
          onClick={showPreviousSpeciality}
        >
          ‹
        </button>
        <div className="dept-slider-window">
          <div
            className="dept-track"
            style={{ transform: `translateX(-${specialityIndex * 100}%)` }}
          >
            {specialities.map((speciality) => (
              <div className="dept-card" key={speciality.code}>
                <img className="dept-card-image" src={heroAssemblyUrl} alt="" />
                <div className="dept-card-body">
                  <div className="dept-code">{speciality.code}</div>
                  <h3 data-fr={speciality.fr} data-en={speciality.en}>{speciality.fr}</h3>
                  <p data-fr={speciality.descriptionFr} data-en={speciality.descriptionEn}>{speciality.descriptionFr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="dept-slider-arrow next"
          type="button"
          aria-label="Next speciality"
          onClick={showNextSpeciality}
        >
          ›
        </button>
      </div>
    </div>
  </section>

  <section id="administration" className="section-panel administration-section">
    <div className="wrap">
      <div className="section-head">
        <div>
          <div className="section-num">03</div>
          <h2 className="section-title" data-fr="Administration" data-en="Administration">Administration</h2>
        </div>
        <div className="section-note" data-fr="L'équipe administrative et pédagogique du Lycée Technique d'Akono." data-en="The administrative and educational team of Government Technical High School Akono.">L'équipe administrative et pédagogique du Lycée Technique d'Akono.</div>
      </div>
      <div className="administration-tree">
        <div className="tree-level tree-principal">
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Principal" data-en="Principal">Principal</div>
            <h3>AMBE Gabriel</h3>
          </div>
        </div>
        <div className="tree-connector"></div>
        <div className="tree-level tree-vice-principals">
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Vice-Principal · Section générale" data-en="Vice-Principal · General Section">Vice-Principal · Section générale</div>
            <h3>MANGA</h3>
          </div>
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Vice-Principal · Section STT" data-en="Vice-Principal · STT Section">Vice-Principal · Section STT</div>
            <h3>ONANA Ernest</h3>
          </div>
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Vice-Principal · Section IND" data-en="Vice-Principal · IND Section">Vice-Principal · Section IND</div>
            <h3>DIBOMA</h3>
          </div>
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Vice-Principal · Section IND" data-en="Vice-Principal · IND Section">Vice-Principal · Section IND</div>
            <h3>INACK</h3>
          </div>
        </div>
        <div className="tree-connector"></div>
        <div className="tree-level tree-discipline">
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Surveillant Général" data-en="Senior Discipline Master">Surveillant Général</div>
            <h3>ONAMBELE</h3>
          </div>
          <div className="administrator-card">
            <img className="administrator-photo" src={logoUrl} alt="" />
            <div className="administrator-role" data-fr="Conseiller de discipline" data-en="Discipline Master">Conseiller de discipline</div>
            <h3 data-fr="Nom à ajouter" data-en="Name to be added">Nom à ajouter</h3>
          </div>
          {["EYEMAM", "NGOMBI", "NGUENDA", "NTONGO"].map((name) => (
            <div className="administrator-card" key={name}>
              <img className="administrator-photo" src={logoUrl} alt="" />
              <div className="administrator-role" data-fr="Conseiller d'orientation" data-en="Guidance Counsellor">Conseiller d'orientation</div>
              <h3>{name}</h3>
            </div>
          ))}
        </div>
        <div className="tree-connector"></div>
        <div className="department-groups">
          {departments.map((department) => (
            <div className="department-group" key={department.groupFr}>
              <div
                className="administrator-role"
                data-fr={department.groupFr}
                data-en={department.groupEn}
              >
                {department.groupFr}
              </div>
              <div className="department-list">
                {department.departments.map((departmentItem) => (
                  <div className="department-item" key={departmentItem.name}>
                    <h3 className="department-name">{departmentItem.name}</h3>
                    <img className="administrator-photo" src={logoUrl} alt="" />
                    <strong
                      className="department-head"
                      data-fr={`${departmentItem.head?.toUpperCase() || "NOM À AJOUTER"} (AP)`}
                      data-en={`${departmentItem.head?.toUpperCase() || "NAME TO BE ADDED"} (HOD)`}
                    >
                      {departmentItem.head?.toUpperCase() || "NOM À AJOUTER"} (AP)
                    </strong>
                    <ul className="teacher-list">
                      {departmentItem.teachers.map((teacher) => (
                        <li key={teacher}>{teacher}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
        src="https://maps.google.com/maps?q=3.4970453,11.3348656+(Lyc%C3%A9e+Technique+d%27Akono)&z=18&t=k&output=embed"
        loading="lazy"
        allowFullScreen
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
