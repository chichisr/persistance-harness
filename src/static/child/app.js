console.log('[child:home] Script loaded');

//*****************************IndexedDB*****************************
function writeSSO(db, val) {
    var dbtrans = db.transaction(['ssotoken'], 'readwrite');
    var store = dbtrans.objectStore('ssotoken');
    var token = { token: val, timestamp: Date.now() };
    store.add(token);
    dbtrans.oncomplete = function() {
        console.log('sso token written to idb store');
    };
    dbtrans.onerror = function(event) {
        console.log('error writting ssoEntry in the sso store =' + event.target.errorCode);
    };
}
function readSSO(db) {
    console.log('[readSSO]');
    var dbtrans = db.transaction(['ssotoken'], 'readwrite');
    var store = dbtrans.objectStore('ssotoken');
    var request = store.get(1);
    request.onsuccess = function(event) {
        var ssotoken = event.target.result;
        console.log('readSSO: ssotoken = ', ssotoken);
    };
    request.onerror = function(event) {
        console.log('error calling get to retrieve ssotoken =' + event.target.errorCode);
    };
}
function createIDBWrite() {
    console.log('writing to the DB');
    var db;
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    var request = indexedDB.open('testDB', 1);
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore('ssotoken', { autoIncrement: true })
    };
    request.onerror = function(event) {
        console.log('[child:createIDB] error = ', request.errorCode)
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        // uncomment below to write the sso token to indexedDB
        writeSSO(db, 'foo-bar-1234');
        // uncomment below to read the sso token to indexedDB
        // readSSO(db);
    };
}

function createIDBRead() {
    console.log('reading from DB');
    var db;
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }
    var request = indexedDB.open('testDB', 1);
    request.onerror = function(event) {
        console.log('[child:createIDB] error = ', request.errorCode)
    };
    request.onsuccess = function(event) {
        db = event.target.result;
        // uncomment below to write the sso token to indexedDB
        // writeSSO(db, 'foo-bar-1234');
        // uncomment below to read the sso token to indexedDB
        readSSO(db);
    };
}

document.getElementById('writeIndexedDB').onclick = createIDBWrite;
document.getElementById('readIndexedDB').onclick = createIDBRead;



//*****************************Popup*****************************
function popping() {
    console.log('spawning pop up ');
    const popup = window.open('http://spufflesss.com/index.html', 'Spufflez','height=400,width=700');
}
document.getElementById('triggerPopup').onclick = popping;



//*****************************Storage Access API*****************************
function checkAccess(){
    document.hasStorageAccess()
        .then((result) => {console.log('Result: ', result)})
        .catch((result) => {console.log('Reject: ', result)});
}

function requestAccess(){
    document.requestStorageAccess()
        .then((result) => {
            console.log('request access promise resolved: ', result)
        })
        .catch((er) => {console.log('request access promise rejected: ', er)});
}

document.getElementById('checkAccess').onclick = checkAccess;
document.getElementById('requestAccess').onclick = requestAccess;



//*****************************Local Storage*****************************
function writeLocalStorage(){
    console.log('writing to local storage');
    window.localStorage.setItem('localSsoToken', 'this is the sso token')
}

function readLocalStorage(){
    console.log('reading from local storage: ', window.localStorage.getItem('localSsoToken'));
}

function clearLocalStorage(){
    console.log('clearing local storage');
    window.localStorage.clear()
}

function displayLocalStorage(){
    console.log('LocalStorage: ', window.localStorage);
}

document.getElementById('writeLocalStorage').onclick = writeLocalStorage;
document.getElementById('readLocalStorage').onclick = readLocalStorage;
document.getElementById('clearLocalStorage').onclick = clearLocalStorage;
document.getElementById('displayLocalStorage').onclick = displayLocalStorage;



//*****************************Session Storage*****************************
function writeSessionStorage(){
    console.log('writing to session storage');
    window.sessionStorage.setItem('sessionSsoToken', 'this is the sso token')
}

function readSessionStorage(){
    console.log('reading from session storage: ', window.sessionStorage.getItem('sessionSsoToken'));
}
function clearSessionStorage(){
    console.log('clearing session storage');
    window.sessionStorage.clear();
}

function displaySessionStorage(){
    console.log('SessionStorage: ', window.sessionStorage);
}

document.getElementById('writeSessionStorage').onclick = writeSessionStorage;
document.getElementById('readSessionStorage').onclick = readSessionStorage;
document.getElementById('clearSessionStorage').onclick = clearSessionStorage;
document.getElementById('displaySessionStorage').onclick = displaySessionStorage;

//*****************************Cookie Storage*****************************
function writeCookie(){
    console.log('writing to cookie storage');
    var date = new Date();
    date.setTime(date.getTime() + (2*24*60*60*1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `cookieSsoToken=this_is_the_sso_token${expires}`;
}

function readCookie(){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
        if (cookies[i].match(/cookieSsoToken=this_is_the_sso_token/)){
            console.log('reading from cookie storage: ', cookies[i])
        }
    }
}
function clearCookie(){
    console.log('clearing cookie');
    document.cookie = 'cookieSsoToken=; Max-Age=-99999999;';
}

function displayCookie(){
    console.log('Cookies Storage: ', document.cookie);
}

document.getElementById('writeCookie').onclick = writeCookie;
document.getElementById('readCookie').onclick = readCookie;
document.getElementById('clearCookie').onclick = clearCookie;
document.getElementById('displayCookie').onclick = displayCookie;

// console.log('[DEBUG] Query string param detected, writing to storage');
// console.log('[DEBUG] Has storage access: ', checkAccess());
// writeCookie();
// writeLocalStorage();

window.checkAccess = checkAccess;
window.writeCookie = writeCookie;
window.writeLocalStorage = writeLocalStorage;
