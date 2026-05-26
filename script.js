const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-appointment-form]");
const statusEl = document.querySelector("[data-form-status]");
const dateInput = document.querySelector("#visit-date");

if (dateInput) {
  const today = new Date();
  const offsetToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  dateInput.min = offsetToday.toISOString().split("T")[0];
}

if (navToggle && header && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

if (form && statusEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !service || !date) {
      statusEl.textContent = "Please complete the required appointment details.";
      statusEl.classList.add("error");
      return;
    }

    const subject = encodeURIComponent(`Appointment request - ${name}`);
    const body = encodeURIComponent(
      [
        "Appointment request for Rudra Hospital",
        "",
        `Patient name: ${name}`,
        `Phone number: ${phone}`,
        `Service: ${service}`,
        `Preferred date: ${date}`,
        `Message: ${message || "Not provided"}`,
      ].join("\n")
    );

    statusEl.classList.remove("error");
    statusEl.textContent = "Opening your email app with the appointment request.";
    window.location.href = `mailto:rudrahospital6@gmail.com?subject=${subject}&body=${body}`;
  });
}
