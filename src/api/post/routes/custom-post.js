module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/posts/example',
        handler: 'api::post.post.exampleAction',
        config: {
            // policies: [{name: 'check-role', config: {userRole: "Adminstrator"}}]
        }
      }
    ]
  }