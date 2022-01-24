import { ProductLocalService } from "./../product-local.service"
import { Product } from "./../product.model"
import { Router } from "@angular/router"
import { Component, OnInit } from "@angular/core"

@Component({
    selector: "app-product-create",
    templateUrl: "./product-create.component.html",
    styleUrls: ["./product-create.component.css"]
})
export class ProductCreateComponent implements OnInit {
    product: Product = {
        name: "",
        price: null
    }

    constructor(
        private productService: ProductLocalService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    createProduct(): void {
        this.productService.create(this.product)
        this.router.navigate(["products"])
    }

    cancel(): void {
        this.router.navigate(["products"])
    }
}
