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

    $('#main-nav').stellarNav()
  })
}(jQuery))