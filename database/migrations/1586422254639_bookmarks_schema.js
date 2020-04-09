'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookmarksSchema extends Schema {
  up () {
    this.create('bookmarks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('url')
      table.integer('user_id')
    })
  }

  down () {
    this.drop('bookmarks')
  }
}

module.exports = BookmarksSchema
