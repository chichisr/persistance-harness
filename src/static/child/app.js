function writeSSOToken(dbMain, value) {
    var tx = dbMain.transaction(['sr-ssotoken'], 'readwrite');
    var store = tx.objectStore('sr-ssotoken');

    var ssoEntry = { token: value, timestamp: Date.now() };
    store.add(ssoEntry);
    
    
    tx.oncomplete = function() {
        console.log('[DEBUG child:app] ssoEntry written to the sso store');
    };
  
    tx.onerror = function(event) {
        console.log('[DEBUG child:app] error writting ssoEntry in the sso store' + event.target.errorCode);
    };
}

function readSSOToken(dbMain) {
    console.log('readSSOToken');
    
    var tx = dbMain.transaction(['sr-ssotoken'], 'readwrite');
    var store = tx.objectStore('sr-ssotoken');

    // gets only the first entry
    var request = store.get(1);
    
    request.onsuccess = function(event) {
        var ssoEntry = event.target.result;
        console.log('readSSOToken: ssoEntry = ', ssoEntry);
    };
  
    request.onerror = function(event) {
        console.log('error calling get to retrieve ssoEntry in the sso store' + event.target.errorCode);
    };
}

function dbInitialize() {
    var db;
    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    var request = indexedDB.open('srStore', 3);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      db.createObjectStore('sr-ssotoken', { autoIncrement: true });  
    };

    request.onerror = function(event) {
        console.log('[child:app:dbInitialize#onerror] got error code = ', request.errorCode);
    };

    request.onsuccess = function(event) {
        console.log('[DEBUG] child:app.js dbInitialize called');
        
        db = event.target.result;

        // uncomment below to write the sso token to indexedDB
        writeSSOToken(db, 'foo-bar-1234');
        
        // uncomment below to read the sso token to indexedDB
        // readSSOToken(db);
    };
}

console.log('[child:home] Script loaded too soon');

dbInitialize();