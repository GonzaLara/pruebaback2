import { Schema, model, Types } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String },
    category: {
      type: String,
      default: "Laptops",
      enum: ["Tablets", "Smartphones", "Laptops", "Smartwatches", "Headphones"],
    },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 10 },
    onsale: { type: Boolean, default: false },
    owner_id: {
      type: Types.ObjectId,
      ref: "users",
      
      index: true,
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("owner_id", "email avatar");
});

const Product = model(collection, schema);
export default Product;
