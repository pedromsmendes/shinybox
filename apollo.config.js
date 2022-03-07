module.exports = {
  client: {
    excludes: ['**/*.generated.*'],
    service: {
      name: 'esapi',
      url: 'http://localhost:3000/gql',
    },
  },
};
