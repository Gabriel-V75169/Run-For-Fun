const { User, Race, Distance, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51MmUhiJWBUm8M1eN7zGH87OtGnQPi1BiZMFgpcHzpEQa86sUDL0pGs6mV9fuddjdJrEImyvK5tJCqexf4DBJOo5000BOOUZLm7"
);

const resolvers = {
  Query: {
    distances: async () => {
      return await Distance.find();
    },
    race: async (parent, { distance, name }) => {
      const params = {};

      if (distance) {
        params.distance = distance;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Race.find(params).populate("distance");
    },
    race: async (parent, { _id }) => {
      return await Race.findById(_id).populate("distance");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.races",
          populate: "distance",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.races",
          populate: "distance",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ races: args.races });
      const line_items = [];

      const { races } = await order.populate("races");

      for (let i = 0; i < races.length; i++) {
        const race = await stripe.races.create({
          name: races[i].name,
          description: races[i].description,
          images: [`${url}/images/${races[i].image}`],
        });

        const price = await stripe.prices.create({
          race: race.id,
          unit_amount: races[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { races }, context) => {
      if (context.user) {
        const order = new Order({ races });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateRace: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Race.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
