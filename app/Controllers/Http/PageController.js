'use strict'

class PageController {
  async home({ request, response, auth, view}) {
    return view.render('pages.home');
  }
}

module.exports = PageController
