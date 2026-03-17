import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService, User } from "./games.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-games',
  imports: [FormsModule, CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games implements OnInit {
  message: string = ""
  uuid: string | null = ""
  nickname: string = ""
  username: string = ""

  constructor(private UsersService: UsersService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.asignUuid();
    this.getUsername();
  }

  getUsername(): void {
    this.UsersService.getUser(this.uuid || "").subscribe({
      next: (data: any) => {
        console.log(data)
        if (data) {
          this.username = data.name
          this.cdr.detectChanges()
        } else {
          this.username = ""
          this.cdr.detectChanges()
        }
      }
    })
  }

  asignUuid(): void {
    this.uuid = localStorage.getItem("UserId");
    if (!this.uuid) {
      this.uuid = crypto.randomUUID(); // Método nativo de navegadores modernos
      localStorage.setItem("UserId", this.uuid);
    }
  }

  sendName(): void {
    console.log(this.nickname, this.uuid)
    this.UsersService.createUser({ username: this.nickname, UUID_id: this.uuid || "" }).subscribe({
      next: (data: User) => {
        if (data.created) {
          console.log(data)
          this.getUsername();
          this.cdr.detectChanges();
        } else {
          console.log(data)
          this.message = data.observation
          this.nickname = ""
          this.cdr.detectChanges();
        }
      }
    })
  }

  private navegarAHome(id: string): void {
    this.router.navigate(['/']);
  }
}