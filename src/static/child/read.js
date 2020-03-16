console.log('[child:read] Script loaded');

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

function createIDBRead() {
    console.log('calling');
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

document.getElementById('readDB').onclick = createIDBRead;
createIDBRead();
const $div = document.createElement('div');
$div.innerHTML = ssotoken;
document.body.appendChild($div);

