import gsap from 'gsap';

function adjustFormHeight() {
  const formBox = document.querySelector('.form-box');
  const activeStep = document.querySelector("[form-step]:not([style*='display: none'])");

  if (formBox && activeStep) {
    const newHeight = activeStep.scrollHeight;

    gsap.to(formBox, {
      height: newHeight,
      duration: 0.3,
      ease: 'power2.out',
    });
  }
}

// **Höhe anpassen, wenn sich der Step ändert**
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
}
