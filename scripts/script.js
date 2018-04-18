(function ($) {
  $(document).ready(function () {
    // Sticky header
    $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
        $('#header').addClass('fixed')
      }
      else {
        $('#header').removeClass('fixed')
      }
    })

    var ypos, image
    $( window ).scroll(function parallax () {
      ypos = window.pageYOffset
      image = $('.section-bg')
      image.css('transform', 'translate3d(0, ' + ypos * 0.2 + 'px, 0)')
    });

    var acc = document.getElementsByClassName('accordion')
    var i

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active')
        var panel = this.nextElementSibling
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null
        }
        else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
      })
    }

    var sectionOffsetTop
    $(window).resize(function () {
      var viewportWidth = $(window).width()
      sectionOffsetTop = viewportWidth > 768 ? 90 : 0
    })

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          // Figure out element to scroll to
          var target = $(this.hash)
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault()
            $('html, body').animate({
              scrollTop: target.offset().top - sectionOffsetTop
            }, 1000, function () {
              // Callback after animation
              // Must change focus!
              // var $target = $(target)
              // $target.focus()
              // if ($target.is(':focus')) { // Checking if the target was
              // focused return false } else { $target.attr('tabindex', '-1')
              // // Adding tabindex for elements not focusable $target.focus()
              // // Set focus again }

            })
          }
        }
      })

    $('#main-nav').stellarNav()
  })
}(jQuery))