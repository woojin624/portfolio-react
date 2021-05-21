const mongoose = require('mongoose');

const gameRankSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    rank: { type: Array, required: true },
  },
  {
    versionKey: false,
  },
  { collection: 'games' }
);

gameRankSchema.set('collection', 'games');

// Find All
gameRankSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// Find One by projectid
gameRankSchema.statics.findOneByGameName = function (gameName) {
  return this.findOne(gameName);
};

// Update by gamerank
gameRankSchema.statics.updateByGameName = function (gameName, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate(gameName, payload, { new: true });
};

module.exports = mongoose.model('games', gameRankSchema);
