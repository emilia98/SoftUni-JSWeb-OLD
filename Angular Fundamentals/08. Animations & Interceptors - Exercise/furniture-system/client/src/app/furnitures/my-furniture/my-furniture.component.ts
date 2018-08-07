import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furnitures.service';
import { Furniture } from '../all-furniture/furniture.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  public items :Array<Furniture> = [];
  constructor(
    private furnitureService :FurnitureService,
    private toatsr :ToastrService,
    private router :Router
  ) { }

  deleteItem(id) {
    console.log(id);
    
    this.furnitureService.deleteItem(id).subscribe(
      (data) => {
        if(data.success) {
          console.log('here');
          return this.router.navigate(['/furniture/all']);
        }
        this.toatsr.error(data.message ? data.message : 'This item cannot be deleted!', 'Error when Deleting');
        // console.log(data)
      },
      (err) => {
        this.toatsr.error(err.message ? err.message : 'This item cannot be deleted!', 'Error when Deleting');
        // console.log(err);
      }
    )
  }

  ngOnInit() {
    this.furnitureService.getMine().subscribe(data => {
      this.items = data;
    })
  }

}
