import { ShippingForm } from "@/utils/slice/cartSlice";


interface IOrders {
    user: string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingForm;
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

interface IOrderItem {
    _id?: string;
    brand: string;
    slug: string;
    name: string;
    quantity: number;
    image: string;
    price: number
}