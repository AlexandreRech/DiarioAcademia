(function (angular) {
    angular.module('directives.module')
             .directive('nddChartKnob', nddChartKnob);

    function nddChartKnob() {
        //Usage:
        //<ndd-chart-knob name="displayNameChart" color="#ccc" data="vm.entities.length"><ndd-chart-knob>

        return {
            restrict: "E",
            link: link,
            scope: {
                name: "@",
                data: '@',
                color: '@',
                security: "@"
            },
            templateUrl: 'app/directives/ndd-chart-knob/ndd-chart-knob.html'
        };

        function link(scope, element, attrs) {
            chartAlunos(0, scope.color, element); // initialize

            attrs.$observe('data', function (newValue, oldValue) {
                if (newValue == "" || !newValue)
                    return;
                chartAlunos(newValue, scope.color, element);
            });
        }

        function chartAlunos(count, color, element) {
            if (count != 0 && !count)
                return;
            $(document).ready(function () {
                var input = element.find('input');

                $(input).each(function () {
                    var elm = $(this);
                    elm.knob({
                        'min': 0,
                        "skin": "tron",
                        "readOnly": true,
                        "thickness": .02,
                        'dynamicDraw': true,
                        "displayInput": true,
                        "lineCap": "round",
                        "fgColor": color || "62C4FF",
                        angleArc: "360",
                        angleOffset: "0"
                    });

                    $({ value: 0 }).delay(1000).animate({ value: count }, {
                        duration: 1000,
                        easing: 'swing',
                        progress: function () {
                            elm.val(Math.ceil(this.value)).trigger('change');
                        }
                    });

                    $(input).trigger('configure', {
                        max: count
                    });

                    element.find('strong').attr({ 'style': 'color: ' + color });
                });

            });
        }

    }

})(window.angular);