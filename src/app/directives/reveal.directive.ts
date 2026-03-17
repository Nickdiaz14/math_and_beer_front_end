import { Directive, OnInit, ElementRef, Renderer2 } from "@angular/core";

@Directive({ selector: '[appReveal]' })
export class RevealDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'reveal');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.el.nativeElement, 'active');
        observer.unobserve(this.el.nativeElement);
      }
    }, { threshold: 0.15 });
    observer.observe(this.el.nativeElement);
  }
}
