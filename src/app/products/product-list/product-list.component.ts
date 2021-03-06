import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product list';   
    products: IProduct[];
    productWidth: string = '50';
    productHeight: string = '50';
    showImage: boolean = false;
    filteredProducts: IProduct[];
    errorMessage: string;
    
    _listFilter: string;

    constructor(private productService: ProductService) {}

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter(product => product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }
    
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      this.productService.getProducts().subscribe(
        products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error => this.errorMessage = <any>error
      );
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product list: ${message}`;
    }
}