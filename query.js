const express = require("express"); // create our web server
const graphqlHTTP = require("express-graphql"); // bind together graphql and express
const { buildSchema } = require("graphql"); // core lib that enables us to leverage graphql
const { getProducts, addProduct, deleteProduct } = require("./data/products");

const cors = require("cors");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Product {
    name: String,
		id: Int,
		price: String,
		vendorInfo: String
  },
  type Query {
    hello: String,
    sayHi(name: String): String,
    products: [Product],
    product(id: Int!): Product,
    add2Nums(num1: Int!, num2: Int): Int
  },
  type Mutation {
		createProduct(name: String!, price: String!, vendorInfo: String!): String,
		removeProduct(id: Int!): String
  }
`);

const add2NumsFunction = (num1, num2) => {
  return num1 + num2;
};

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return "Hello world!";
  },
  add2Nums: (args) => {
    const { num1, num2 } = args;
    console.log("args", args);
    return add2NumsFunction(num1, num2);
  },
  sayHi: (args) => {
    const { name } = args;
    console.log(args);
    return `Hi ${name}`;
  },
  products: () => {
    return getProducts();
  },
  product: ({ id }) => {
    const products = getProducts();
    return products.find((p) => p.id === id);
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
