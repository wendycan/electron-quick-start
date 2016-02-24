$ = require 'jquery'

Simditor = require 'simditor'

class Blog
  constructor: ->
    @$el = $ '#blog'
    editor = new Simditor({
      textarea: $('#editor')
    })

module.exports = Blog
