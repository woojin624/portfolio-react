const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    number: { type: Number },
    image: { type: String },
    color: { type: String },
    title: { type: String },
    subTitle: { type: String },
    period: { type: String },
    siteLink: { type: String },
    githubLink: { type: String },
    desc: { type: String },
    content: { type: String },
    thumb: { type: String },
    mainImg: { type: String },
    subImg: { type: String },
    thumbImg: { type: String },
    tag: [String],
    people: { type: String },
    workRange: [String],
  },
  {
    versionKey: false,
  },
  { collection: 'projects' }
);

projectSchema.set('collection', 'projects');

// get - Find All
projectSchema.statics.findAll = function () {
  // return promise
  return this.find({});
};

// get one - Find One by projectid
projectSchema.statics.findOneByProjectid = function (projectid) {
  return this.findOne({ _id: parseInt(projectid) });
};

// post - Create new project document
projectSchema.statics.create = function (payload) {
  // this === Model
  const project = new this(payload);
  // return Promise
  return project.save();
};

// put - Update by projectid
projectSchema.statics.updateByProjectid = function (projectid, payload) {
  return this.findOneAndUpdate({ _id: parseInt(projectid) }, payload, { new: true });
};

// delete - Delete by projectid
projectSchema.statics.deleteByProjectid = function (projectid) {
  return this.remove({ _id: parseInt(projectid) });
};

module.exports = mongoose.model('project', projectSchema);
