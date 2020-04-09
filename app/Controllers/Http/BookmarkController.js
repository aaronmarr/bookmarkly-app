'use strict'

const Bookmark = use('App/Models/Bookmark')

class BookmarkController {
  async home({view}) {

      // Fetch a bookmark
      const bookmarks = await Bookmark.all();

      return view.render('bookmarks.index', { bookmarks: bookmarks.toJSON() })
  }

  async index({view, auth}) {

    // Fetch all user's bookmarks
    const bookmarks = await auth.user.bookmarks().fetch();
    
    console.log(bookmarks)

    return view.render('bookmarks.index', { bookmarks: bookmarks.toJSON() })
  }

  async create({view, auth}) {

    // Fetch all user's bookmarks
    const bookmarks = await auth.user.bookmarks().fetch();
    
    console.log(bookmarks)

    return view.render('bookmarks.create');
  }

  async store({ request, response, session, auth}) {
    const bookmark = request.all();

    const created = await auth.user.bookmarks().create({
      title: bookmark.title,
      url: bookmark.url,
    });

    console.log(created);

    session.flash({ message: 'Your bookmark has been created!' });

    return response.redirect('back');
  }

  async delete({ response, session, params}) {
      const bookmark = await Bookmark.find(params.id);

      await bookmark.delete();

      session.flash({ message: 'Your bookmark has been removed'});

      return response.redirect('back');
  }

  async edit({ params, view }) {
      const bookmark = await Bookmark.find(params.id);

      return view.render('bookmarks.edit', { bookmark: bookmark });
  }

  async update ({ response, request, session, params }) {
      const bookmark = await Bookmark.find(params.id);

      bookmark.title = request.all().title;
      bookmark.url = request.all().url;

      await bookmark.save();

      session.flash({ message: 'Your bookmark has been updated. '});

      return response.redirect('/bookmarks');
  }
}

module.exports = BookmarkController