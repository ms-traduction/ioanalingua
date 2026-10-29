const siteRoot = new URL(".", document.currentScript.src);

const contactDetails = {
  email: "",
  whatsapp: "",
};

const services = [
  { label: "Traduction", href: "/services/traduction" },
  { label: "Interprétation", href: "/services/interpretation" },
  { label: "Correction", href: "/services/correction" },
  { label: "Création de contenu", href: "/services/creation-de-contenu" },
  { label: "Gestion de projets", href: "/services/gestion-de-projets" },
];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const currentPage = currentPath === "/" ? "/" : currentPath;
    const serviceLinks = services.map(({ label, href }) =>
      `<a href="${href}"${currentPage === href ? ' aria-current="page"' : ""}>${label}</a>`,
    ).join("");

    this.innerHTML = `
      <header class="site-header">
        <a class="brand" href="/" aria-label="Iorana, accueil">
          <img class="brand-mark" src="${new URL("logo.webp", siteRoot)}" alt="">
          <span class="brand-wording">
            <span class="brand-name">Iorana</span>
            <span class="brand-subtitle">LINGUA</span>
          </span>
        </a>
        <div class="header-right">
          <nav class="languages" aria-label="Langue du site">
            <a href="/" lang="fr" aria-current="true">FR</a><span aria-hidden="true">|</span>
            <span lang="en" aria-disabled="true" title="Version anglaise à venir">EN</span><span aria-hidden="true">|</span>
            <span lang="es" aria-disabled="true" title="Versión española próximamente">ES</span>
          </nav>
          <nav class="main-nav" aria-label="Navigation principale">
            <a href="/"${currentPage === "/" ? ' aria-current="page"' : ""}>Accueil</a>
            <a href="/a-propos"${currentPage === "/a-propos" ? ' aria-current="page"' : ""}>À propos</a>
            <details class="nav-services">
              <summary${currentPath.startsWith("/services/") ? ' aria-current="page"' : ""}>Services</summary>
              <div class="services-menu">${serviceLinks}</div>
            </details>
            <a href="/processus"${currentPage === "/processus" ? ' aria-current="page"' : ""}>Processus</a>
            <a href="/faq"${currentPage === "/faq" ? ' aria-current="page"' : ""}>FAQ</a>
            <a href="/contact"${currentPage === "/contact" ? ' aria-current="page"' : ""}>Contact</a>
            <a class="nav-cta" href="/contact">Demander un devis <span aria-hidden="true">→</span></a>
          </nav>
        </div>
        <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="primary-navigation">
          <span aria-hidden="true">☰</span>
        </button>
      </header>
    `;

    const header = this.querySelector(".site-header");
    const menuToggle = this.querySelector(".menu-toggle");
    const headerRight = this.querySelector(".header-right");
    const mainNav = this.querySelector(".main-nav");
    const servicesMenu = this.querySelector(".nav-services");

    mainNav.id = "primary-navigation";

    const setMenuOpen = (isOpen) => {
      headerRight.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    };

    menuToggle.addEventListener("click", () => {
      setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    const servicesSummary = servicesMenu.querySelector("summary");
    servicesSummary.addEventListener("click", (event) => {
      event.preventDefault();
      const desktopPointer = event.detail > 0
        && window.innerWidth > 900
        && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      servicesMenu.open = desktopPointer || !servicesMenu.open;
    });
    servicesMenu.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && window.innerWidth > 900) servicesMenu.open = true;
    });
    servicesMenu.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse"
        && window.innerWidth > 900
        && !servicesMenu.contains(document.activeElement)) {
        servicesMenu.open = false;
      }
    });
    servicesMenu.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!servicesMenu.contains(document.activeElement) && !servicesMenu.matches(":hover")) {
          servicesMenu.open = false;
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && servicesMenu.open) {
        servicesMenu.open = false;
        servicesMenu.querySelector("summary").focus();
      } else if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target) && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-main">
          <section class="footer-brand" aria-label="Identité Iorana">
            <a href="/" aria-label="Iorana, accueil"><img class="footer-brand-logo" src="${new URL("logo.webp", siteRoot)}" alt=""></a>
            <div>
              <div class="footer-brand-title">
                <a class="footer-name" href="/">Iorana</a>
                <span class="footer-brand-subtitle">LINGUA</span>
              </div>
            </div>
          </section>
          <nav class="footer-column" aria-label="Navigation">
            <h2>Navigation</h2>
            <a href="/">Accueil</a>
            <a href="/a-propos">À propos</a>
            <a href="/processus">Processus</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
          </nav>
          <nav class="footer-column" aria-label="Services">
            <h2>Services</h2>
            ${services.map(({ label, href }) => `<a href="${href}">${label}</a>`).join("")}
          </nav>
          <section class="footer-column footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Contact</h2>
            <span data-contact-link="email" data-contact-label="Écrire un e-mail">Adresse e-mail à renseigner</span>
            <span data-contact-link="whatsapp" data-contact-label="Contacter sur WhatsApp">Numéro WhatsApp à renseigner</span>
          </section>
        </div>
        <div class="footer-bottom">
          <p>© <span class="current-year"></span> Iorana — Services linguistiques.</p>
          <div class="footer-legal" aria-label="Informations légales à compléter avant publication">
            <span>Mentions légales à compléter</span>
            <span>Politique de confidentialité à compléter</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

document.querySelectorAll("[data-contact-link]").forEach((element) => {
  const kind = element.dataset.contactLink;
  const value = contactDetails[kind];
  if (!value) {
    element.setAttribute("aria-disabled", "true");
    element.textContent = kind === "email" ? "Adresse e-mail à renseigner" : "Numéro WhatsApp à renseigner";
    return;
  }

  const link = document.createElement("a");
  link.className = element.className;
  link.dataset.contactLink = kind;
  link.dataset.contactLabel = element.dataset.contactLabel;
  link.textContent = element.dataset.contactLabel;

  if (kind === "email") {
    link.href = `mailto:${value}?subject=${encodeURIComponent("Demande de devis — Iorana")}`;
  } else if (kind === "whatsapp") {
    const number = value.replace(/\D/g, "");
    if (!number) {
      element.setAttribute("aria-disabled", "true");
      element.textContent = "Numéro WhatsApp à renseigner";
      return;
    }
    link.href = `https://wa.me/${number}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    return;
  }

  element.replaceWith(link);
});

document.querySelectorAll(".current-year").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});
