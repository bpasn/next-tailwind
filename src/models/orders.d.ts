import { ShippingForm } from "@/utils/slice/cartSlice";

interface IOrders {
    user: IUsers,
    orderItems: {
        _id?: string;
        slug?: string;
        name: string;
        quantity: number;
        image: string;
        price: number
    }[],
    shippingAddress: ShippingForm,
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt: Date;
    deliveredAt: Date;
    
}