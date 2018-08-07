import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furnitures.service';
import { Furniture } from './furniture.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  public all :Array<Furniture> = [];
  constructor(
    private furnitureService :FurnitureService,
    private toastr :ToastrService
  ) { }

  ngOnInit() {
    this.furnitureService.listAll().subscribe(
      (data) => {
        this.all = data;
        console.log(data)
      },
      (error) => {
        this.toastr.error('An error occured!', 'Error');
        // console.log(error);
      }
    )
  }

}
