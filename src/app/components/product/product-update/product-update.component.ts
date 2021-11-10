import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductLocalService } from '../product-local.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: "",
    price: null
  }

  constructor(
    private productService: ProductLocalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    this.product = this.productService.readById(String(id))
  }

  updateProduct(): void {
    this.productService.update(this.product)
    this.router.navigate(["products"])
  }

  cancel(): void {
    this.router.navigate(["products"])
  }
}
