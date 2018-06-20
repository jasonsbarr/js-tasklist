/**
 * Core app code
 */

(function(window) {
    'use strict';

    // Set storage protocol
    let driver = 'LocalStorage';
    let Store = new App.Drivers[driver]();

    // expose module to window
    App.Store = Store;
    window.App = App;

})(window);
