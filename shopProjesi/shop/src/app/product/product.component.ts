import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Product } from './product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private myAlertifyService: AlertifyService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute) { }
  title = "Ürün Listesi"
  filterText = ""
  products: Product[] = [];


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productService.getProducts(params["CatID"]).subscribe(data => {
        this.products = data
      })
    })
  }



  addToChart(p: Product) {
    this.myAlertifyService.success(p.name + "   ürünü siparişi oluşturuldu.")
  }

}
