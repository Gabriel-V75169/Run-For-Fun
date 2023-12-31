const mongoose = require('mongoose');

const { Schema } = mongoose;

const raceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  distance: {
    type: Schema.Types.ObjectId,
    ref: 'Distance',
    required: true
  }
});

const Race = mongoose.model('Race', raceSchema);

module.exports = Race;
