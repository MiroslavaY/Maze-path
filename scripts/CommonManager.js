'use strict';

var CommonManager = {

    loadCustomMaze: function (filename) {

        if (filename !== null) {
            maze = null;
            this.loadScript(filename);

            return true;
        }
        return false;
    },

    loadScript: function (filename) {

        var head = document.head || document.getElementsByTagName('head')[0];
        var script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = filename;
        head.insertBefore(script, head.firstChild);
    }
};