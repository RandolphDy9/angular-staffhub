import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as lottie from 'lottie-web';

@Component({
  selector: 'app-lottie-animation',
  template: '<div id="lottie-container"></div>',
})
export class LottieAnimationComponent implements AfterViewInit {
  ngAfterViewInit() {
    const animationContainer = document.getElementById('lottie-container');
    const animation = (lottie as any).loadAnimation({
      container: animationContainer,
      renderer: 'svg', // You can choose the renderer ('svg', 'canvas', 'html')
      loop: true,
      autoplay: true,
      path: '/assets/lottie/employee.json' // Path to your animation JSON file
    });
  }
}
