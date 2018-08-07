import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FurnitureService } from '../furnitures.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public id :string = null;
  public make :string = null;
  public model :string = null;
  public price :string = null;
  public year :string = null;
  public description :string = null;
  public image :string = null;
  public material :string = null;
  
  constructor(
    private route :ActivatedRoute,
    private furnitureService :FurnitureService,
    private router :Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data.id;

      this.furnitureService.getDetails(this.id).subscribe(
        (data) => {
          this.model = data.model;
          this.make = data.make;
          this.description = data.description;
          this.image = data.image;
          this.price = data.price;
          this.year = data.year;
          this.material = data.material;

          // console.log(data);
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/furniture/all']);
          // console.log(err)
        }
      )
    })
  }

}
