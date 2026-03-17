import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements OnInit {
  private speed = 100; // La misma velocidad que tenías en tu JS

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting();
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.el.nativeElement);
  }

  private startCounting() {
    const target = +this.el.nativeElement.innerText.replace(/\D/g, '');
    let count = 0;
    const inc = target / this.speed;

    const updateCount = () => {
      count += inc;
      if (count < target) {
        this.renderer.setProperty(this.el.nativeElement, 'innerText', Math.ceil(count));
        requestAnimationFrame(updateCount);
      } else {
        this.renderer.setProperty(this.el.nativeElement, 'innerText', target);
      }
    };

    updateCount();
  }
}