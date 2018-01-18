/*
* This small JS-Lib loads the
*  @author Valentin Klein
*/

/**
 * apparena sdk shim
 */
!(function (root) {

    root.apparena = root.apparena || {};

    /**
     * Contains all apparena API classes and functions.
     * @name apparena
     * @namespace
     *
     * Contains all apparena API classes and functions.
     */
    var apparena = root.apparena;

    // If jQuery has been included, grab a reference to it.
    if (typeof(root.$) !== 'undefined') {
        apparena.$ = root.$;
    }

    // Set the cdn for apparena to get frame-js from.
    apparena.name = 'AppArena';
    apparena.serverURL = 'http://jssdk/';

    /**
     * Call this method first to create an iFrame an load frame.js.
     */
    apparena.Initialize = function () {
        if (!apparena._bot() && !apparena._oldBrowser()) {
            apparena._initialize();
        }
    };

    /** Check if is Bot **/
    apparena._bot = function () {
        var botRegEx = /bot|googlebot|crawler|spider|robot|crawling/i;
        return navigator && navigator.userAgent && botRegEx.test(navigator.userAgent);
    };

    /** Check if is too old Browser **/
    apparena._oldBrowser = function () {
        return navigator && navigator.userAgent && /MSIE 9\.0/.test(navigator.userAgent) && window.addEventListener && !window.atob;
    };

    /**
     * Check if valid Browser
     */
    apparena.validBrowser = function () {
        return apparena._noBot() && apparena._noOldBrowser();
    };

    /**
     * This method is for apparena's own private use.
     * @private
     */
    apparena._initialize = function () {
        var frame = apparena._createFrame(apparena._getFrameSrc());
    };

    /**
     * Get Frame Src
     * @private
     */
    apparena._getFrameSrc = function () {
        return apparena.serverURL + 'frame.js';
    };

    /**
     * Create Iframe for loading FrameJS-SDK
     * @param src
     * @returns {HTMLIFrameElement}
     * @private
     */
    apparena._createFrame = function (src) {
        var frame = document.createElement('iframe');
        frame.id = 'apparena-frame';
        frame.style.display = 'none';
        document.body.appendChild(frame);
        frame.contentWindow.document.open('text/html', 'replace');
        frame.contentWindow.document.write('\n    <!doctype html>\n    <head></head>\n    <body>\n    </body>\n    </html>');
        frame.contentWindow.document.close();
        var script = apparena._createFrameScript(src);
        frame.contentWindow.document.head.appendChild(script);
        return frame;
    };

    /**
     * Create FrameJS-SDK Script Tag
     * @param src
     * @private
     */
    apparena._createFrameScript = function (src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = src;
        return script;
    };

    apparena.Initialize();

}(this));