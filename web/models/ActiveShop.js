import mongoose from "../database/index.js";

const ActiveShopSchema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  scope: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ActiveShop = mongoose.model("ActiveShop", ActiveShopSchema);

export default ActiveShop;
