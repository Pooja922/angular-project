import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader:Leader;
  errMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit() {
    //this.dish = this.dishservice.getFeaturedDish();
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,errmess => this.errMess = <any>errmess);
    //this.promotion = this.promotionservice.getFeaturedPromotion();
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion);
    //this.leader = this.leaderservice.getFeaturedLeader();
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader);
  }

}