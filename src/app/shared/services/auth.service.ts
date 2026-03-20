import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUuid(): string {
    let uuid = localStorage.getItem("UserId");
    if (!uuid) {
      uuid = crypto.randomUUID(); // Método nativo de navegadores modernos
      localStorage.setItem("UserId", uuid);
    }
    return uuid;
  }
}
