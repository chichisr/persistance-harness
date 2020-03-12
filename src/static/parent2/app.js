console.log('[parent2] Script loaded');

// const $inlineIframe = sr_$.rmp.THEIframe(`http://${sr_$.rmp.THEURL}`);

const $inlineIframe = sr_$.rmp.THEIframe('http://baz.com/read.html');
// Append inline iframe
const $inline = document.getElementById('Inline');
$inline.appendChild($inlineIframe);
