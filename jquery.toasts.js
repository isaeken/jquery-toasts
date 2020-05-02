/**
 *     @author İsa Eken <hello@isaeken.com.tr>
 *     @website https://isaeken.com.tr
 *     @github https://github.com/isaeken
 *     @name jquery.toast
 */

if (!window.jQuery) console.error('Toasts required jQuery.')
else
{
    (function ($) {

        // debug mode
        var debug = true;
        function log(content) {
            if (debug) console.log(content)
        }

        // container
        var $toast_container = null;
        function checkToastContainer() {
            log('check container is exists')
            if ($toast_container == null) {
                log('container is not exists create one')
                var $container = $('<div></div>')
                $container.addClass('toast-container')
                $container.attr('id', 'isaekenjquerytoasts' + Math.random(Math.random() * 101))
                $('body').append($container)
                $toast_container = $container
            }
            log('ok')
        }

        // create toast function
        $.toast = function (
                content,
                timeout = 5000,
                _click = function () { },
                _closed = function () { },
                _mouse_enter = function () { },
                _mouse_leave = function () { },
            ) {
            log('create new toast')

            // Check if container exists
            checkToastContainer()

            // create toast
            var $toast = $('<div class="toast"></div>')

            // set toast attributes
            $toast.attr('isaeken-jquery-toast', 'true')

            // hide toast
            $toast.hide()

            // set toast content
            $toast.html(content);

            // add toast to container
            $toast_container.append($toast)

            // create click event
            $toast.click(function () {
                log('toast clicked')
                _click()
                log('toast click functions completed')
            })

            // find close button if exists
            $toast.find('.close').click(function () {
                $toast.toastClose()
            })

            // create close timeout && create closed event
            var closeTimeoutHandle = window.setTimeout(function () { $toast.toastClose(_closed()) }, timeout)

            $toast
                // stop timer if mouse enter && create mouse enter event
                .mouseenter(function () {
                    log('toast mouse entered')
                    window.clearTimeout(closeTimeoutHandle);
                    _mouse_enter()
                    log('toast mouse enter functions completed')
                })
                // start timer if mouse leave && create mouse leave event && create closed event
                .mouseleave(function () {
                    log('toast mouse leaved')
                    closeTimeoutHandle = window.setTimeout(function () { $toast.toastClose(_closed()) }, timeout);
                    _mouse_leave()
                    log('toast mouse leave functions completed')
                })

            // show toast
            $toast.slideDown('fast')

            // end
            return this;
        };

        // toast close function
        $.fn.toastClose = function (_event = function () { }) {
            console.log('closing toast')
            var $toast = $(this)
            if (!$(this).attr('isaeken-jquery-toast') === 'true') return;
            $toast.slideUp('fast')
            _event()
            console.log('toast close functions completed')
        }

        $.fn.toast = function () {
            log('hello world')
            return this;
        };
    }) (jQuery)

    // on document is ready
    $(document).ready(() => {
        // get all elements has toast attr
        $('[toast]').each(function () {
            // on element click
            $(this).click(function () {
                // get content of toast
                var $content = $(this).attr('toast')

                // get toast timeout
                if ($(this).attr('toast-timeout') !== undefined) var $timeout = $(this).attr('toast-timeout');
                else $timeout = 5000;

                // create toast
                $.toast($content, $timeout)
            })
        });
    });
}
