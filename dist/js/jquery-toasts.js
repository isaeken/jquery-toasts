"use strict";

/**
 *     @author İsa Eken <hello@isaeken.com.tr>
 *     @website https://isaeken.com.tr
 *     @github https://github.com/isaeken
 *     @name jquery.toast
 */

/**
 * throw an error if jquery is not initialized
 */
if (!window.jQuery) {
  throw 'jquery-toasts is requires jquery!';
}

(function ($) {
  /**
   * toast container
   * @type {jQuery.fn.init|jQuery|HTMLElement}
   */
  var container = $('<div id="isaeken-jquery-toast-container" class="toast-container"></div>');
  /**
   * initialize the toasts container
   * @returns {initializeToasts}
   */

  function initializeToasts() {
    // get the document body
    var body = $('body'); // do not any think if container is exists

    if (body.find('#isaeken-jquery-toast-container').length > 0) return; // add container to document body

    body.prepend(container); // return self for chained functions

    return this;
  }
  /**
   * Create toast function
   * @param content
   * @param {int} timeout
   * @param {function} click
   * @param {function} closed
   * @param {function} mouseEnter
   * @param {function} mouseLeave
   * @returns {jQuery}
   */


  $.toast = function (content) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var click = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var closed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var mouseEnter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
    var mouseLeave = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {};
    // initialize toasts
    initializeToasts(); // create a toast element

    var $toast = $('<div class="toast"></div>'); // set toast defaults

    $toast.attr('isaeken-jquery-toast', 'true').hide().html(content); // add toast to container

    container.append($toast); // find close button if exists

    $toast.find('.close').click(function () {
      $toast.toastClose();
    }); // create close timeout && create closed event

    var closeTimeoutHandle = window.setTimeout(function () {
      $toast.toastClose(function () {
        closed();
      });
    }, timeout); // add events to toast

    $toast.on('click', function () {
      click();
    }).on('mouseenter', function () {
      // reset timeout
      window.clearTimeout(closeTimeoutHandle);
      mouseEnter();
    }).on('mouseleave', function () {
      // start time to close
      closeTimeoutHandle = window.setTimeout(function () {
        $toast.toastClose(function () {
          closed();
        });
      }, timeout);
      mouseLeave();
    }); // show toast

    $toast.slideDown('fast'); // return self for chained functions

    return this;
  }; // toast close function


  $.fn.toastClose = function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    // do not any think if its not a toast
    if (!$(this)[0].hasAttribute('isaeken-jquery-toast')) {
      return;
    } // close toast


    $(this).slideUp('fast'); // check if callback is a function

    if (typeof callback === 'function') {
      // execute callback function
      callback();
    } // return self for chained functions


    return this;
  }; // add toasts plugin to jquery


  $.fn.toast = function () {
    return this;
  };

  window.jQuery = $;
})(jQuery); // on document is ready


$(document).ready(function () {
  // get all elements has data-toast attribute
  $('[data-toast]').each(function () {
    // on element click
    $(this).click(function () {
      // get content of toast
      var content = $(this).data('toast');
      var timeout = 3000; // get toast timeout

      if ($(this).data('timeout') !== undefined) {
        timeout = $(this).data('timeout');
      } // create toast


      $.toast(content, timeout);
    });
  });
});