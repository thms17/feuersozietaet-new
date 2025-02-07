import gsap from 'gsap';

const formContainer = document.querySelector("[zahn-formular='formular']");
const steps = [...formContainer.querySelectorAll('[form-step]')];
const submitBtn = document.querySelector("[formular='submit-btn']");
const backBtn = document.querySelector("[formular='back-btn']");
let currentStepIndex = 0;
let isAnimating = false; // Verhindert doppelte Klicks

function showStep(index) {
  steps.forEach((step, i) => {
    step.style.display = i === index ? 'block' : 'none';
  });
  gsap.fromTo(steps[index], { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5 });

  // Submit-Button nur im letzten Step anzeigen
  if (index === steps.length - 1) {
    gsap.to(submitBtn, { opacity: 1, duration: 0.5 });
  } else {
    gsap.to(submitBtn, { opacity: 0, duration: 0.3 });
  }

  // Back-Button nur anzeigen, wenn wir nicht im ersten Step sind
  if (index > 0) {
    gsap.to(backBtn, { opacity: 1, duration: 0.5 });
  } else {
    gsap.to(backBtn, { opacity: 0, duration: 0.3 });
  }
}

// **Vorwärts-Navigation**
formContainer.addEventListener('click', (event) => {
  if (isAnimating) return;
  isAnimating = true;

  const radioContainer = event.target.closest("[formular='radio']");
  if (!radioContainer) {
    isAnimating = false;
    return;
  }

  const radioInput = radioContainer.querySelector("input[type='radio']");
  if (!radioInput) {
    isAnimating = false;
    return;
  }

  radioInput.checked = true;

  if (currentStepIndex < steps.length - 1) {
    gsap.to(steps[currentStepIndex], {
      opacity: 0,
      x: -50,
      duration: 0.5,
      onComplete: () => {
        currentStepIndex++;
        showStep(currentStepIndex);
        isAnimating = false;
      },
    });
  } else {
    isAnimating = false;
  }
});

// **Rückwärts-Navigation (Back-Button)**
backBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Verhindert unerwünschte Formulareffekte

  if (isAnimating || currentStepIndex === 0) return; // Stoppt, wenn bereits animiert wird oder im ersten Step

  isAnimating = true; // Sperre aktivieren

  gsap.to(steps[currentStepIndex], {
    opacity: 0,
    x: 50, // Nach rechts animieren
    duration: 0.5,
    onComplete: () => {
      currentStepIndex--;
      showStep(currentStepIndex);
      isAnimating = false; // Sperre wieder aufheben
    },
  });
});

// **Starte mit Step 1**
showStep(currentStepIndex);
