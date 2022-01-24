import { Product } from "./../product.model"
import { Component, OnInit } from "@angular/core"
import { ProductLocalService } from "../product-local.service"

@Component({
    selector: "app-product-read",
    templateUrl: "./product-read.component.html",
    styleUrls: ["./product-read.component.css"]
})
export class ProductReadComponent implements OnInit {
    products: Product[] = []
    displayedColumns = ["id", "name", "price", "actions"]

    constructor(private productService: ProductLocalService) {}

    ngOnInit(): void {
        this.products = this.productService.read()
    }
}
