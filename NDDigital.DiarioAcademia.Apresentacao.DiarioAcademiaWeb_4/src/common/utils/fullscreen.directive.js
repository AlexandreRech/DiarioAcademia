/* @ngInject */
module.exports = function toggleFullscreen(Browser) {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element) {
        // Not supported under IE
        if (Browser.msie) {
            element.addClass('hide');
        }
        else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {

                    screenfull.toggle();

                    // Switch icon indicator
                    if (screenfull.isFullscreen)
                        $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                    else
                        $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                    $.error('Fullscreen not enabled');
                }
            });
        }
    }
}
