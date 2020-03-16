console.log('[parent1] Script loaded');

// dynamically load an iframe on page load
// $disFrame = document.createElement('iframe');
// $disFrame.setAttribute('id', 'writeIFrame');
// $disFrame.setAttribute('src', 'http://spufflez.com/index.html');
// $disFrame.width = '400px';
// $disFrame.height = '400px';
// document.body.appendChild($disFrame);

// auto spawn a popup on page load
// popup = window.open('https://spufflez.com/index.html', 'Spufflez','height=200,width=150');
// popup.window.createIDBWrite();
// popup.window.createIDBRead();

// function displayIframe() {
//     const display = document.getElementById('storageOptionsIFrame').style.display;
//     if (display === 'none'){
//         document.getElementById('storageOptionsIFrame').style.display = 'block'
//     }else{
//         document.getElementById('storageOptionsIFrame').style.display = 'none'
//     }
// }
// document.getElementById('reveal-frame').onclick = displayIframe;


function displayPopup(){
    popup = window.open('http://spufflesss.com/index.html', 'Spufflez','height=400,width=700');
    // popup.window.localStorage
}
document.getElementById('triggerPopup').onclick = displayPopup;

// console.log('[DEBUG] loading the popup to auto write a cookie');
// popup = window.open('http://spufflezzz.com/index.html?x=4&b=2', 'Spufflez','height=400,width=700');
// console.log('[DEBUG] closing the popup: ', popup.location);
// popup.close();

// postRobot.on('setDataFromChild', function prGetData(event) {
//     if (event.data.name) {
//         // if (event.data.cookieOnly) {
//         //     return {
//         //         value: getCookie(event.data.name),
//         //     };
//         // }
//         console.log('[DEBUG]checking local storage in efodi.github.io storedData Manager: ', checkStorageThenCookie(event.data.name));
//         return {
//             value: checkStorageThenCookie(event.data.name),
//         };
//     }
//
//     throw new Error('name is required in all getCookie calls');
// });
