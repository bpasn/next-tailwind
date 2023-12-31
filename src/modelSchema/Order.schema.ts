import { IOrders } from "@/models/orders";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<IOrders>({
    user: { type: mongoose.Schema.Types.String, ref: "User", require: true },
    orderItems: [
        {
            slug: { type: String, required: true },
            brand: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
},
    {
        timestamps: true
    }
)

const OrderModel: mongoose.Model<IOrders> = mongoose.models.Orders || mongoose.model<IOrders>("Orders", orderSchema)

export default OrderModel;