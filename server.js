const express = require("express"); // create our web server
const graphqlHTTP = require("express-graphql"); // bind together graphql and express
const { buildSchema } = require("graphql"); // core lib that enables us to leverage graphql

const cors = require("cors");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(``);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(1234);
console.log("Running a GraphQL API server at localhost:1234/graphql");
