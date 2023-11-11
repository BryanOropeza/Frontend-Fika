import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  //SLIDER CONFIGURATION------------------
  slides = [
    { img: "../../../assets/slider1.png" },
    { img: "../../../assets/slider2.png" },
    { img: "../../../assets/slider3.png" },
    { img: "../../../assets/slider4.png" }
  ];
  slideConfig = {
    "slidesToShow": 1, "slidesToScroll": 1,
    "inifite": true,
    "arrows": false,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "dots": true,
    fade: true,
    cssEase: 'linear',
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() { }

  ngOnInit() { }
}
