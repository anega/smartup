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

    // Accordion section functionality
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

    // Dynamically get screen width
    var isMobileWidth
    $(window).resize(function () {
      var viewportWidth = $(window).width()
      isMobileWidth = viewportWidth > 768 ? 90 : 0
    })

    // Section background image parallax
    if (isMobileWidth !== 0) {
      $(window).scroll(function (e) {
        parallax()
      })
    }

    function parallax () {
      var scrolled = $(window).scrollTop(),
        bannerSection = $('#banner'),
        babiesSection = $('#for-babies'),
        childrenSection = $('#for-children'),
        elementOffset = childrenSection.offset().top,
        distance = (elementOffset - scrolled)
        bannerSection.find('.rocket-l').css('transform', 'translate3d(0, ' + scrolled * -6 + 'px, 0)')
      bannerSection.find('.rocket-m').css('transform', 'translate3d(0, ' + scrolled * -3.5 + 'px, 0)')
      bannerSection.find('.rocket-s').css('transform', 'translate3d(0, ' + scrolled * -1.5 + 'px, 0)')
      babiesSection.find('.star-l').css('transform', 'rotate(' + scrolled * 0.4 + 'deg)')
      babiesSection.find('.star-m').css('transform', 'rotate(' + scrolled * 2 + 'deg)')
      babiesSection.find('.star-s').css('transform', 'rotate(' + scrolled * 6 + 'deg)')

      if (distance < 700) {
        childrenSection.find('.shuttle-l').css('transform', 'translate3d(' + -distance + 'px, ' + distance * 1.5 + 'px, 0)')
        childrenSection.find('.shuttle-m').css('transform', 'translate3d(' + distance * -1.5 + 'px, ' + distance * 1.5 + 'px, 0)')
        childrenSection.find('.shuttle-s').css('transform', 'translate3d(' + -distance + 'px, ' + distance * 1.5 + 'px, 0)')
      }
    }

    // Select all links with hashes
    // hook a click event on the body and use event delegation
    document.body.addEventListener('click', function (event) {
      var node = event.target
      var location = window.location

      // ignore non-links elements being clicked
      if (node.nodeName !== 'A') {
        return
      }

      // ignore cmd+click etc
      if (event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey) {
        return
      }

      // only hook local URLs to the page
      if (node.origin !== location.origin ||
        node.pathname !== location.pathname) {
        return
      }

      event.preventDefault()

      // make sure to support the back button…though we'll find
      // this will break later, so we'll come back to this
      window.history.pushState(null, null, node.hash)

      // target is where we're going to scroll *to*
      var target = document.querySelector(node.hash)

      // capture where were are right now
      var fromY = window.scrollY
      var coords = {x: 0, y: fromY}
      var y = target.offsetTop
      y -= 90 // offset for the padding-top
      var running = true

      // create a tweening object that we can use in the `scrollTo`
      var tween = new TWEEN.Tween(coords) // where we are
        .to({x: 0, y: y}, 700) // where we're going
        .easing(TWEEN.Easing.Quadratic.Out) // ease…
        .onUpdate(function () {
          // do the actual scroll
          window.scrollTo(this.x, this.y)
          // if we've reached the end, manually stop
          // rescheduling the update
          if (this.y === y) {
            running = false
          }
        })
        .start()

      requestAnimationFrame(animate)

      function animate (time) {
        if (running) {
          requestAnimationFrame(animate)
          TWEEN.update(time)
        }
      }
    })

    // Init mobile menu
    $('#main-nav').stellarNav()
  })
}(jQuery))