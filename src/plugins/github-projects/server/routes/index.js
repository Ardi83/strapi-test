module.exports = [
  {
    method: 'GET',
    path: '/repos', // http://localhost:1337/gihub-projects/repos
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
];
