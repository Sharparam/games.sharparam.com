(function() {
    var d = document;
    var c = {
        COCOS2D_DEBUG: 2,
        box2d: false,
        showFPS: true,
        frameRate: 60,
        tag: 'gameCanvas',
        engineDir: '/js/cocos2d/',
        appFiles: ['js/MyFirstApp.js']
    };
    window.addEventListener('DOMContentLoaded', function() {
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        d.body.appendChild(s);
        d.ccConfig = c;
        s.id = 'cocos2d-html5';
    });
})();
