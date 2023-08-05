import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  carouselItems: any[] = [];

  currentIndex = 0;
  timer: any;

  constructor(public sharedService: SharedService) { }

  get carouselInnerStyles() {
    return {
      transform: `translateX(-${this.currentIndex * 100}%)`
    };
  }

  ngOnInit() {
    this.carouselItems = [
      '../../../../assets/uploads/2571.jpg',
      '../../../../assets/uploads/3823995_2789.jpg',
      '../../../../assets/uploads/black_friday_facebook_banner_18.jpg'
    ]

    this.startCarousel()
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.timer = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopCarousel() {
    clearInterval(this.timer);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.stopCarousel();
    this.startCarousel();
  }
}
