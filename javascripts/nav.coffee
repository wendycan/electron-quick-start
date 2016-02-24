$ = require 'jquery'

class Nav
  constructor: (remote)->
    @$el = $ '#nav'
    Menu = remote.Menu
    template = [{
      label: '登出',
      click: -> console.log('登出')
    }, {
      type: 'separator'
    }, {
      label: '用户信息',
      click: -> console.log('用户信息')
    }]
    menu = Menu.buildFromTemplate(template)

    @$el.on 'click', '.nav-avator', ->
      menu.popup(remote.getCurrentWindow())

module.exports = Nav
