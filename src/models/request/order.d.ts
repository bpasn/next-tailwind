interface IRequestOrder {
    orderItems: ICartItem[];
    shippingAddress: ShippingForm;
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}