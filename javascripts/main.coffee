Nav = require './nav'
Main_menu = require './main_menu'
Blogs = require './blogs'
Blog = require './blog'

window.init = (remote) ->
  nav = new Nav(remote)
  blog = new Blog
