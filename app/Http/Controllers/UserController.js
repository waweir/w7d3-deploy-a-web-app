'use strict'

const Database = use('Database')
const View = use('View')

class UserController {

  * index(request, response) {
    const users = yield Database.select('*').from('users')
    yield response.sendView('displayUsers', {
      users: users
    })
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = UserController
