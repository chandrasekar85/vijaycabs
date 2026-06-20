const WHATSAPP_NUMBER = "918610013293";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const bookingForm = document.querySelector("[data-booking-form]");
const tripTabs = document.querySelectorAll("[data-trip]");
const tripInput = document.querySelector("[data-trip-input]");
const daysField = document.querySelector("[data-days-field]");

tripTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const trip = tab.getAttribute("data-trip") || "One Way";

    tripTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    if (tripInput instanceof HTMLInputElement) {
      tripInput.value = trip;
    }

    if (daysField instanceof HTMLElement) {
      const needsDays = trip === "Round Trip";
      daysField.hidden = !needsDays;
      const daysSelect = daysField.querySelector("select");
      if (daysSelect) {
        daysSelect.required = needsDays;
        if (!needsDays) daysSelect.value = "";
      }
    }
  });
});

if (bookingForm instanceof HTMLFormElement) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const data = new FormData(bookingForm);
    const details = [
      "New cab booking request",
      `Trip Type: ${data.get("tripType")}`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Pickup: ${data.get("pickup")}`,
      `Drop: ${data.get("drop")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time")}`,
      `Cab: ${data.get("cab")}`,
    ];

    if (data.get("days")) {
      details.push(`No. of Days: ${data.get("days")}`);
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(details.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
