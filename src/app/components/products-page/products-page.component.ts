import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from 'src/app/models/products';
import { HttpDataService } from 'src/app/services/http-data.service';
import * as _ from 'lodash';
import { cloneDeep } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  constructor(private httpDataService: HttpDataService,public sanitizer : DomSanitizer) {
    this.productsData = {} as Products;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllProducts();
    console.log(this.httpDataService,'service');
    
  }
  @ViewChild('productForm', { static: false }) productForm !: NgForm;
  productsData !: Products
  dataSource = new MatTableDataSource();

  displayedColumns: String[] = ['id','firstName', 'lastName', 'description','category','image','actions'];

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  isEditable = false;
allData:any=[];
  getAllProducts() {
    this.httpDataService.getData().subscribe((res: any) => {
      this.dataSource.data = res;
      this.allData=res;
      console.log(this.allData.length,'allData');
      
    }) 
  }
  editMode: boolean = false;
  editItem(element: any) {
    this.editMode = true;
    // this.productsData = _.cloneDeep(element);
    this.productsData = JSON.parse(JSON.stringify(element));

    console.log(this.productsData,'products data');
    
    this.isEditable = true;
    // this.source=this.productsData.image
    // console.log(this.source,'source');
    
  }

  cancelEdit() {
    this.isEditable = false;
    this.productForm.resetForm();
    this.editMode = false;
  }


  deleteItem(id: string) {
    this.httpDataService.deleteItem(id).subscribe((res: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.id !== id ? o : false;
      })
    })
  }

  onSubmit() {
    if (this.productForm.invalid) {
      alert("Please Fill All The Info.")
      return;
    }
    if(this.source==''){
      alert("Please upload product image");
      return;
    }
   this.productsData.image=this.source;
  //  return;
   
    this.dataSource.data.forEach((ele: any) => {
      if (ele?.id == this.productForm.controls['id']?.value) {
        alert("This Id Already Exists.")
        return;
      }
      else {
        this.httpDataService.createItem(this.productsData).subscribe((res) => {
          this.getAllProducts();
          this.productForm.resetForm();
          this.editMode = false;
          this.source='';

        })
      }
    })

  }

  updateItem() {
  //  this.productsData.image=this.source;
  //   this.productForm.controls['image']?.setValue(this.source)
  //   console.log(this.productsData,'products');
  //   console.log(  this.productForm.controls['image']?.setValue(this.source),'img');
    
    // return;
    if(this.source==''){
   this.productForm.value.image = this.productsData.image;
    }
    else{
      this.productForm.value.image=this.source
    }
    this.httpDataService.updateItem(this.productsData.id, this.productForm.value).subscribe((res) => {
      this.getAllProducts();
      this.productForm.resetForm();
      this.source='';
      
      this.editMode = false;
    })
  }

  source: any = '';
  onSelectattchment(event:any) {
    console.log(event.target.file);
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.source='';
        this.source=reader.result;
        // this.productsData.image=this.source;
    };
    
}

}
