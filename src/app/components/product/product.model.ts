export interface Product {
    id?: number
    name: string
    price: number | null
}

export interface ProductLocal {
    products: Product[]
    count: number
}
