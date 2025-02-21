import gsap from 'gsap';

// **Alle Formulare auf der Seite sammeln**
const formContainers = document.querySelectorAll("[zahn-formular='formular']");

formContainers.forEach((formContainer) => {
  const steps = [...formContainer.querySelectorAll('[form-step]')];
  const submitBtn = formContainer.querySelector("[formular='submit-btn']");
  const backBtn = formContainer.querySelector("[formular='back-btn']");
  let currentStepIndex = 0;
  let isAnimating = false;

  function showStep(index, direction = 1) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? 'flex' : 'none';
    });

    gsap.fromTo(
      steps[index],
      { opacity: 0, x: direction === 1 ? 50 : -50 },
      { opacity: 1, x: 0, duration: 0.5, onComplete: adjustFormHeight }
    );

    adjustFormHeight();

    // **Submit-Button nur im letzten Step anzeigen**
    if (index === steps.length - 1) {
      submitBtn.style.display = 'block';
      gsap.to(submitBtn, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(submitBtn, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => (submitBtn.style.display = 'none'),
      });
    }

    // **Back-Button nur anzeigen, wenn nicht im ersten Step**
    if (index > 0) {
      backBtn.style.display = 'block';
      gsap.to(backBtn, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(backBtn, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => (backBtn.style.display = 'none'),
      });
    }
  }

  function adjustFormHeight() {
    const formBox = formContainer.querySelector('.form-box');
    const activeStep = formContainer.querySelector("[form-step]:not([style*='display: none'])");

    if (formBox && activeStep) {
      const newHeight = activeStep.scrollHeight;
      gsap.to(formBox, { height: newHeight, duration: 0.3, ease: 'power2.out' });
    }
  }

  // **Vorwärts-Navigation nur innerhalb des jeweiligen Formulars**
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
          showStep(currentStepIndex, 1);
          isAnimating = false;
        },
      });
    } else {
      isAnimating = false;
    }
  });

  // **Rückwärts-Navigation nur innerhalb des jeweiligen Formulars**
  backBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (isAnimating || currentStepIndex === 0) return;

    isAnimating = true;

    gsap.to(steps[currentStepIndex], {
      opacity: 0,
      x: 50,
      duration: 0.5,
      onComplete: () => {
        currentStepIndex--;
        showStep(currentStepIndex, -1);
        isAnimating = false;
      },
    });
  });

  // **Starte mit Step 1 und verstecke Buttons**
  submitBtn.style.display = 'none';
  backBtn.style.display = 'none';
  showStep(currentStepIndex);
});
