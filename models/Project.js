const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  {
    versionKey: false,
  },
  { collection: 'projects' }
);

projectSchema.set('collection', 'projects');

// Find All
projectSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// Find One by projectid
projectSchema.statics.findOneByProjectid = function (projectid) {
  return this.findOne({ _id: parseInt(projectid) });
};

// Create new project document
projectSchema.statics.create = function (payload) {
  // this === Model
  const project = new this(payload);
  // return Promise
  return project.save();
};

// Update by projectid
projectSchema.statics.updateByProjectid = function (projectid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ _id: parseInt(projectid) }, payload, { new: true });
};

// Delete by projectid
projectSchema.statics.deleteByProjectid = function (projectid) {
  return this.remove({ _id: parseInt(projectid) });
};

module.exports = mongoose.model('project', projectSchema);
