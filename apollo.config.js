module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "nuber-eats-challenge",
      url: "https://uber-eats-challenge-backend.herokuapp.com/graphql",
    },
  },
};
