const mongoose = require("mongoose");
const shortid = require("shortid");

const linkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate,
  },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
