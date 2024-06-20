import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  BtnSaveUpdateText: string = "Save";
  productForm!: FormGroup;
  products: any[] = [];
  surveyData: any[] = []; 
  constructor(public fb:FormBuilder,private productservice:ProductService) {
    
   }

  ngOnInit(): void {
    this.setblankUOMdetails();
    this.GetProduct();
  }
 
  setblankUOMdetails(){
  this.productForm=this.fb.group({
    id:[],
    Name:["", Validators.required],
    Category:["",Validators.required],
    Price:["",Validators.required]
  })
}
SubmitForm(){
  if (this.productForm.invalid) {
    Swal.fire('Please fill in all required fields!');
    return;
  }
  var type=this.productForm.value.id==null?'Add':'Update'
    this.productservice.addProduct(this.productForm.value,type).subscribe(data =>{
      if(type =='Add'){
        Swal.fire("Record saved successfuly!");
      }
      else{
        Swal.fire("Record Updated successfuly!");
      }
      this.BtnSaveUpdateText = "Save";
      this.GetProduct();
      this.productForm.reset();
    })
  }

  GetProduct(){
    console.log("cliks");
    console.log(this.productForm.value);
    this.productservice.getProduct().subscribe(data =>{
      console.log(data);
      this.products=data;
       this.updateChart();
    })
  }
  DeleteProduct(id:any){
    console.log("cliks");
    console.log(this.productForm.value);
    this.productservice.deleteProduct(id).subscribe(data =>{
      Swal.fire("Record Deleted successfuly!");
      this.GetProduct();
    })
  }
  getProductById(id:any){
    console.log("cliks");
    console.log(this.productForm.value);
    this.productservice.updateProduct(id).subscribe(data =>{
     this.productForm.patchValue({
      id:data.id,
      Name:data.Name,
      Category:data.Category,
      Price:data.Price,
     })
    })
    this.BtnSaveUpdateText = "Update";
  }


  updateChart() {
    this.surveyData = this.products.map(data => ({
      name: data.Name,
      value: data.Price
    }));
  }
}
