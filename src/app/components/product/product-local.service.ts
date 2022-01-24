import { Product, ProductLocal } from "./product.model"
import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

const INITIAL_STORAGE: ProductLocal = {
    products: [
        {
            id: 1,
            name: "Notebook",
            price: 4899.99
        },
        {
            id: 2,
            name: "Computador",
            price: 6599.99
        },
        {
            id: 3,
            name: "SmartPhone",
            price: 2999.99
        },
        {
            id: 4,
            name: "Tablet",
            price: 1299.99
        },
        {
            id: 5,
            name: "Relógio",
            price: 499.99
        }
    ],
    count: 5
}

@Injectable({
    providedIn: "root"
})
export class ProductLocalService {
    private storage: Storage = window.localStorage

    constructor(private snakBar: MatSnackBar) {}

    getStorage(): ProductLocal {
        const data = this.storage.getItem("@brunohubner:angular_crud")
        const resp: ProductLocal = data ? JSON.parse(data) : INITIAL_STORAGE
        return resp
    }

    setStorage(products: Product[], count: number) {
        this.storage.setItem(
            "@brunohubner:angular_crud",
            JSON.stringify({ products, count })
        )
    }

    getCount(): number {
        return this.getStorage().count
    }

    showMessage(msg: string, isError: boolean = false): void {
        this.snakBar.open(msg, "X", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"]
        })
    }

    create(product: Product): Product {
        if (product.name.trim().length < 3 || product.price === null) {
            this.showMessage("Prencha todos os campos!", true)
            return product
        }
        const storage = this.getStorage()
        const products = storage.products
        const count = storage.count + 1

        products.push({
            id: count,
            name: product.name,
            price: product.price
        })

        this.setStorage(products, count)
        this.showMessage("Produto atualizado com sucesso!")
        return product
    }

    read(): Product[] {
        return this.getStorage().products
    }

    readById(id: string): Product {
        const storage = this.getStorage()
        const newProduct = storage.products.filter(p => {
            if (!!p.id) return String(p.id) == id
            return false
        })[0]

        return newProduct
    }

    update(product: Product): Product {
        if (product.name.trim().length < 3 || product.price === null) {
            this.showMessage("Prencha todos os campos!", true)
            return product
        }
        const products = this.getStorage().products
        let newProducts = products.filter(p => p.id !== product.id)

        newProducts.push(product)
        newProducts = newProducts.sort((a: Product, b: Product) => {
            if (!!a.id && !!b.id) return a.id - b.id
            return 0
        })
        this.setStorage(newProducts, this.getCount())
        this.showMessage("Produto atualizado com sucesso!")

        return product
    }

    delete(id: string): Product {
        const storage = this.getStorage()
        const newProducts = storage.products.filter(p => {
            if (!!p.id) return String(p.id) !== id
            return false
        })
        this.setStorage(newProducts, storage.count)
        return { name: "", price: 0 }
    }
}
