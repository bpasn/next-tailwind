import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: { type: Schema.Types.String, required: true },
        slug: { type: Schema.Types.String, required: true, unique: true },
        category: { type: Schema.Types.String, required: true },
        image: { type: Schema.Types.String, required: true },
        price: { type: Schema.Types.Number, required: true },
        brand: { type: Schema.Types.String, required: true },
        rating: { type: Schema.Types.Number, required: true },
        numReviews: { type: Schema.Types.Number, required: true, default: 0 },
        countInStock: { type: Schema.Types.Number, required: true, default: 0 },
        description: { type: Schema.Types.String, required: true },
        isFeatured: { type: Schema.Types.Boolean, required: true, default: false },
        banner: { type: Schema.Types.String, required: false }


    }, {
    timestamps: true
}
);

const ProductModel:mongoose.Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel