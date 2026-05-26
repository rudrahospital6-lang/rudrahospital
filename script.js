const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const appointmentForm = document.querySelector("[data-appointment-form]");
const appointmentStatus = document.querySelector("[data-form-status]");
const inquiryForm = document.querySelector("[data-inquiry-form]");
const inquiryStatus = document.querySelector("[data-inquiry-status]");
const feedbackForm = document.querySelector("[data-feedback-form]");
const feedbackStatus = document.querySelector("[data-feedback-status]");
const dateInput = document.querySelector("#visit-date");
const themeToggle = document.querySelector("[data-theme-toggle]");
const serviceShortcutButtons = document.querySelectorAll("[data-service-shortcut]");
const serviceInput = document.querySelector("#department");
const patientNameInput = document.querySelector("#patient-name");
const hospitalWhatsApp = "918866290011";
const themeStorageKey = "rudra-hospital-theme";

function formValue(formElement, name) {
  return String(new FormData(formElement).get(name) || "").trim();
}

function updateStatus(statusElement, message, isError = false) {
  if (!statusElement) return;
  statusElement.textContent = message;
  statusElement.classList.toggle("error", isError);
}

function openWhatsApp(message) {
  window.location.href = `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;
}

function setTheme(theme, shouldSave = true) {
  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  if (!shouldSave) return;
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    return;
  }
}

try {
  const savedTheme = localStorage.getItem(themeStorageKey);
  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme, false);
  } else {
    setTheme("light", false);
  }
} catch {
  setTheme("light", false);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });
}

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

serviceShortcutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.serviceShortcut || "";

    if (serviceInput && service) {
      serviceInput.value = service;
    }

    document.querySelector("#appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
    updateStatus(appointmentStatus, `${service || "Selected service"} is ready in the appointment form.`);

    window.setTimeout(() => {
      patientNameInput?.focus({ preventScroll: true });
    }, 500);
  });
});

if (appointmentForm && appointmentStatus) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = formValue(appointmentForm, "name");
    const phone = formValue(appointmentForm, "phone");
    const service = formValue(appointmentForm, "service");
    const date = formValue(appointmentForm, "date");
    const message = formValue(appointmentForm, "message");

    if (!name || !phone || !service || !date) {
      updateStatus(appointmentStatus, "Please complete the required appointment details.", true);
      return;
    }

    const appointmentText = [
      "Hello Rudra Hospital, I want to request an appointment.",
      "",
      `Patient name: ${name}`,
      `Phone number: ${phone}`,
      `Service: ${service}`,
      `Preferred date: ${date}`,
      `Message: ${message || "Not provided"}`,
    ].join("\n");

    updateStatus(appointmentStatus, "Opening WhatsApp with your appointment request.");
    openWhatsApp(appointmentText);
  });
}

if (inquiryForm && inquiryStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = formValue(inquiryForm, "name");
    const phone = formValue(inquiryForm, "phone");
    const type = formValue(inquiryForm, "type");
    const time = formValue(inquiryForm, "time");
    const message = formValue(inquiryForm, "message");

    if (!name || !phone || !type || !message) {
      updateStatus(inquiryStatus, "Please complete the required inquiry details.", true);
      return;
    }

    const inquiryText = [
      "Hello Rudra Hospital, I have a patient inquiry.",
      "",
      `Name: ${name}`,
      `Phone number: ${phone}`,
      `Inquiry type: ${type}`,
      `Preferred contact time: ${time || "Not provided"}`,
      `Question / requirement: ${message}`,
    ].join("\n");

    updateStatus(inquiryStatus, "Opening WhatsApp with your inquiry.");
    openWhatsApp(inquiryText);
  });
}

if (feedbackForm && feedbackStatus) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = formValue(feedbackForm, "name");
    const phone = formValue(feedbackForm, "phone");
    const rating = formValue(feedbackForm, "rating");
    const visitType = formValue(feedbackForm, "visitType");
    const message = formValue(feedbackForm, "message");

    if (!name || !rating || !visitType || !message) {
      updateStatus(feedbackStatus, "Please complete the required feedback details.", true);
      return;
    }

    const feedbackText = [
      "Hello Rudra Hospital, I want to share feedback.",
      "",
      `Name: ${name}`,
      `Phone number: ${phone || "Not provided"}`,
      `Rating: ${rating}`,
      `Visit type: ${visitType}`,
      `Feedback: ${message}`,
    ].join("\n");

    updateStatus(feedbackStatus, "Opening WhatsApp with your feedback.");
    openWhatsApp(feedbackText);
  });
}
