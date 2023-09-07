
interface ProductProps {
    _id: string
    title: string
    description: string
    oldPrice: number
    price: number
    brand: string
    image: string
    isNew: boolean
    category: string
}

interface StoreProduct extends ProductProps {
    quantity: number
}

interface StoreUser {
    name: string;
    email: string;
    image: string;
}


interface StateProps {
    next: IInitialState
}

interface MenuItem {
    name: string;
    icons?: string;
    link?: string;
    title?: boolean;
    subtitle?: boolean;
    child?: MenuItem[],
    linkParent?: string;
}