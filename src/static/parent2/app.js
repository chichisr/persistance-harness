console.log('[parent2] Script loaded');

// const $inlineIframe = sr_$.rmp.THEIframe(`http://${sr_$.rmp.THEURL}`);
//
// // Append inline iframe
// const $inline = document.getElementById('Inline');
// $inline.appendChild($inlineIframe);

// $disFrame = document.createElement('iframe');
// $disFrame.setAttribute('id', 'readIFrame');
// $disFrame.setAttribute('src', 'spufflez.com/read.html');
// $disFrame.width = '200px';
// $disFrame.height = '200px';
// document.body.appendChild($disFrame);

function displayPopup(){
    popup = window.open('http://spufflesss.com/index.html', 'Spufflez','height=400,width=700');
    // popup.window.localStorage
}
document.getElementById('triggerPopup').onclick = displayPopup;
