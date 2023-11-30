const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  races: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Race'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;