import { Product } from "./../product.model"
import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { ProductLocalService } from "../product-local.service"

@Component({
    selector: "app-product-delete",
    templateUrl: "./product-delete.component.html",
    styleUrls: ["./product-delete.component.css"]
})
export class ProductDeleteComponent implements OnInit {
    product: Product = {
        name: "",
        price: null
    }

    constructor(
        private productService: ProductLocalService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id")
        this.product = this.productService.readById(String(id))
    }

    deleteProduct(): void {
        this.productService.delete(String(this.product.id))
        this.productService.showMessage("Produto excluido com sucesso!")
        this.router.navigate(["products"])
    }

    cancel(): void {
        this.router.navigate(["products"])
    }
}
