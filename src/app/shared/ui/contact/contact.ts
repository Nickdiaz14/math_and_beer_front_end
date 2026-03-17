import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  // Estado inicial del menú
  isActive: boolean = false;

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}