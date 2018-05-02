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

    // Section background image parallax
    var ypos, image
    $(window).scroll(function parallax () {
      ypos = window.pageYOffset
      image = $('.section-bg')
      image.css('transform', 'translate3d(0, ' + ypos * 0.2 + 'px, 0)')
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
    var sectionOffsetTop
    $(window).resize(function () {
      var viewportWidth = $(window).width()
      sectionOffsetTop = viewportWidth > 768 ? 90 : 0
    })

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