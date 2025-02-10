document.querySelectorAll('[data-group-name]').forEach((group) => {
  const groupName = group.getAttribute('data-group-name'); // Holt den Gruppennamen aus dem Attribut
  if (!groupName) return; // Falls kein Name definiert ist, nichts tun

  group.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.setAttribute('data-name', groupName); // Setzt das `name`-Attribut der Radio-Buttons
    radio.setAttribute('name', groupName); // Setzt das `name`-Attribut der Radio-Buttons
  });
});

document.querySelectorAll("input[type='radio']").forEach((radio) => {
  const label = radio.closest('label'); // Finde das zugehörige Label
  if (!label) return; // Falls kein Label gefunden wird, abbrechen

  const labelText = label.textContent.trim(); // Hole den Text des Labels und entferne Leerzeichen
  if (labelText) {
    radio.setAttribute('value', labelText); // Setze den Choice-Value auf den Label-Text
  }
});
