
interface ProductProps {
    _id: number
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


interface StateProps {
    next: IInitialState
}