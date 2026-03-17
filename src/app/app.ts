import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/ui/navbar/navbar';
import { Contact } from './shared/ui/contact/contact';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
}
