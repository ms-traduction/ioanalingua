const menuToggle = document.querySelector(".menu-toggle");
const headerRight = document.querySelector(".header-right");

menuToggle?.addEventListener("click", () => {
  const isOpen = headerRight.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    headerRight?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const quickContact = document.querySelector(".quick-contact");
const quickContactToggle = document.querySelector(".quick-contact-toggle");
const quickContactMenu = document.querySelector(".quick-contact-menu");

function setQuickContactOpen(isOpen) {
  quickContact?.classList.toggle("is-open", isOpen);
  quickContactToggle?.setAttribute("aria-expanded", String(isOpen));
  quickContactToggle?.setAttribute("aria-label", isOpen ? "Fermer les options de contact" : "Ouvrir les options de contact");
  quickContactMenu?.setAttribute("aria-hidden", String(!isOpen));
  if (quickContactMenu) {
    quickContactMenu.inert = !isOpen;
    quickContactMenu.querySelectorAll("a").forEach((link) => {
      link.tabIndex = isOpen ? 0 : -1;
    });
  }
}

quickContactToggle?.addEventListener("click", () => {
  setQuickContactOpen(quickContactToggle.getAttribute("aria-expanded") !== "true");
});

document.addEventListener("click", (event) => {
  if (quickContact && !quickContact.contains(event.target)) {
    setQuickContactOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && quickContactToggle?.getAttribute("aria-expanded") === "true") {
    setQuickContactOpen(false);
    quickContactToggle.focus();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
