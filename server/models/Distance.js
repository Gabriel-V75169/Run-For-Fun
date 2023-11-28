const mongoose = require('mongoose');

const { Schema } = mongoose;

const distanceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Distance = mongoose.model('Distance', distanceSchema);

module.exports = Distance;
