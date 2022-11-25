module.exports = {
    routes: [
      {
        method: 'PUT',
        path: '/posts/:id/like',
        handler: 'api::post.post.likePostAction',
        config: {
            // policies: [{name: 'check-role', config: {userRole: "Adminstrator"}}]
        }
      }
    ]
  }