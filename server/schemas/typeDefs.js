const typeDefs = `
  type Distance {
    _id: ID
    name: String
  }

  type Race {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    distance: Distance
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    race: [Race]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    ageRange: String 
    orders: [Order]
    racePreference: String
    raceTimes: Int
  }

  type Checkout {
    session: ID
  }

  # when they sign up [implemetent security of the password [... utils/auth.js]
  type Auth {
    token: ID
    user: User
  }

  type Query { 
    distance: [Distance]
    race(distance: ID, name: String): [Race]
    race(_id: ID!): Race
    user: User
    order(_id: ID!): Order
    checkout(race: [ID]!): Checkout
  }

  type Mutation { 
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, ageRange: String!): Auth
    
    addOrder(race: [ID]!): Order
    
    updateUser(firstName: String, lastName: String, email: String, password: String, ageRange: String): User
    
    # updateRace(_id: ID!, quantity: Int!): Race
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs; 

