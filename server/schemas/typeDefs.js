const typeDefs = `
  type WelcomePage {
    popularRunPackages: [RunPackage]
    whatAreVirtualRuns: String
  }

  type Dashboard {
    popularRunPackages: [RunPackage]
  }

  type UserProfile {
    id: ID
    firstName: String
    lastName: String
    email: String
    completedRaces: [String]
    orderHistory: [Order]
    raceTimes: [String]
  }

  type RunPackage {
    id: ID
    name: String
    distance: Float
    price: Float
  }

  type Order {
    id: ID
    date: String
    products: [Product]
  }

  type Product {
    id: ID
    name: String
    description: String
    price: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    welcomePage: WelcomePage
    dashboard: Dashboard
    userProfile: UserProfile
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;
