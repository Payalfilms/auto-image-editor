/**
 * Payal Films Pro Studio — Auto Image Editor Landing Page Script
 * Interactivity: Before/After Comparison Slider, FAQ Accordion, Modal, UPI Copy
 */

document.addEventListener("DOMContentLoaded", () => {
  initComparisonSlider();
  initFaqAccordion();
});

/* ==========================================================================
   Before / After Interactive Slider
   ========================================================================== */
function initComparisonSlider() {
  const sliderWrapper = document.getElementById("sliderWrapper");
  const afterImg = document.getElementById("afterImg");
  const sliderHandle = document.getElementById("sliderHandle");

  if (!sliderWrapper || !afterImg || !sliderHandle) return;

  let isDragging = false;

  function updateSlider(xPos) {
    const rect = sliderWrapper.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    const rightInset = 100 - percent;
    afterImg.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
    sliderHandle.style.left = `${percent}%`;
  }

  // Mouse events
  sliderWrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch events for mobile phones and tablets
  sliderWrapper.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");

      // Close all other items
      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("active");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-icon").innerHTML = "&plus;";
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        btn.querySelector(".faq-icon").innerHTML = "&minus;";
      }
    });
  });
}

/* ==========================================================================
   Payment & Upgrade Modal
   ========================================================================== */
const PLAN_INFO = {
  silver: {
    title: "Silver Pack Upgrade (₹1,000 / 5,000 Photos)",
    price: "₹1,000"
  },
  gold: {
    title: "Gold Pack Upgrade (₹2,000 / 10,000 Photos - Best Value)",
    price: "₹2,000"
  },
  diamond: {
    title: "Diamond VIP Upgrade (₹3,000 / 1 Year Unlimited)",
    price: "₹3,000"
  }
};

function openPaymentModal(planKey) {
  const modal = document.getElementById("paymentModal");
  const titleEl = document.getElementById("modalPlanTitle");
  if (!modal) return;

  const info = PLAN_INFO[planKey] || { title: "Upgrade License", price: "" };
  if (titleEl) {
    titleEl.textContent = `${info.title}`;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closePaymentModal() {
  const modal = document.getElementById("paymentModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("paymentModal");
  if (e.target === modal) {
    closePaymentModal();
  }
});

/* ==========================================================================
   Copy UPI ID Helper
   ========================================================================== */
function copyUPI() {
  const upi = "payalfilms.airtel@ybl";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(upi).then(() => {
      alert("✅ UPI ID Copied: " + upi + "\n\nAb Google Pay, PhonePe ya Paytm se payment karein.");
    }).catch(() => {
      prompt("Copy UPI ID manually:", upi);
    });
  } else {
    prompt("Copy UPI ID manually:", upi);
  }
}
