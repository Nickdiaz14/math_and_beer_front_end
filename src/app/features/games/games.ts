import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService, User } from "./games.service";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-games',
  imports: [FormsModule, CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games implements OnInit {
  messageSig = signal<string>("");
  uuid: string | null = "";
  nickname: string = "";
  username = signal<string>("");

  private usersService = inject(UsersService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.asignUuid();
    this.getUsername();
  }

  getUsername(): void {
    this.usersService.getUser(this.uuid || "").subscribe({
      next: (data: any) => {
        if (data && data.name) {
          this.username.set(data.name);
        } else {
          this.username.set("");
        }
      },
      error: (error: Error) => {
        console.error('Error:', error);
        this.username.set("");
      }
    });
  }

  asignUuid(): void {
    this.uuid = this.authService.getUuid();
  }

  sendName(): void {
    this.usersService.createUser({ username: this.nickname, UUID_id: this.uuid || "" }).subscribe({
      next: (data: User) => {
        if (data.created) {
          this.getUsername();
        } else {
          this.messageSig.set(data.observation);
          this.nickname = "";
        }
      },
      error: (error: Error) => {
          console.error('Error:', error);
      }
    });
  }

  private navegarAHome(id: string): void {
    this.router.navigate(['/']);
  }
}