(function (angular) {
    'use strict';

    logger.$inject = ['$log', 'resource'];
    angular
        .module('services.module')
        .factory('logger', logger);


    function logger($log, res) {
        var service = {
            showToasts: true,

            error: error
            , info: info
            , success: success
            , warning: warning
            , danger: danger
            // straight to console; bypass toastr
            , log: $log.log

            , successCallback: successCallback
            , errorCallback: errorCallback
            , emptyMessageCallback: emptyMessageCallback

        };

        return service;
        ///////////////////// loggers

        function error(message, data, title) {
            toastr.error(message || "", title);
            $log.error('Error: ' + message || "", data || title);
        }

        function danger(message, data, title) {
            toastr.error(message, title);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
        }


        ///////////////////// callback functions
        
        function successCallback(response) {
            success(res.SUCCESS_REQUEST);
            return response.data.results || response.data;
        }


        function errorCallback(response) {
            if (response.status && response.status != -1) {
                var infolog = {
                    message: formatMessageLog(response.data),
                    content: response.data,
                    title: response.status + " - " + response.statusText,
                    type: "error"
                };

                service[infolog.type](infolog.message, info.content, infolog.title);

            } else
                error(response.message, null, res.UNAVAILABLE_SERVER);
        }
        function emptyMessageCallback(response) {
            return response.data.results || response.data;
        }

        function formatMessageLog(data) {
           if (!data)
                return "";

            var message = (typeof data === 'string') ? "" :
            data.message || data.errors[0].errorMessage;

            if (data.errors && data.errors.length> 1)
            message += " +(" + data.errors.length - 1 + ")";

            return message;

        }

    }
}(window.angular));
