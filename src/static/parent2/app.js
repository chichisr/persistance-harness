console.log('[parent2] Script loaded');

const $inlineIframe = sr_$.rmp.THEIframe(`http://${sr_$.rmp.THEURL}`);

// Append inline iframe
const $inline = document.getElementById('Inline');
$inline.appendChild($inlineIframe);
