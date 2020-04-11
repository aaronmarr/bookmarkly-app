'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PageController.home').middleware(['guest']);

Route.on('/signup').render('auth.signup').middleware(['guest']);;
Route.on('/login').render('auth.login').middleware(['guest']);;


Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.get('/logout', async ({ auth, response }) => {
  await auth.logout();
  return response.redirect('/');
});

Route.post('/login', 'UserController.login').validator('LoginUser').as('login');

// TODO this should be a grouped route?
Route.get('/bookmarks', 'BookmarkController.index').as('bookmarks.index').middleware(['isAuth']);
Route.get('/bookmarks/delete/:id', 'BookmarkController.delete').middleware(['isAuth']);
Route.get('/bookmarks/edit/:id', 'BookmarkController.edit').as('bookmarks.edit').middleware(['isAuth']);
Route.get('/bookmarks/new', 'BookmarkController.create').as('bookmarks.create').middleware(['isAuth']);
Route.post('/bookmarks/store', 'BookmarkController.store').validator('CreateBookmark').middleware(['isAuth']);
Route.post('/bookmarks/update/:id', 'BookmarkController.update').validator('CreateBookmark').middleware(['isAuth']);