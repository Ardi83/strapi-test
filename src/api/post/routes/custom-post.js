module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/posts/example',
        handler: 'api::post.post.exampleAction',
        config: {
            // policies: [{name: 'check-role', config: {userRole: "Adminstrator"}}]
        }
      },
      {
        method: 'POST',
        path: '/posts/queue',
        handler: 'api::post.post.reciveMessage',
        config: {
            // policies: [{name: 'check-role', config: {userRole: "Adminstrator"}}]
        }
      }
    ]
  }