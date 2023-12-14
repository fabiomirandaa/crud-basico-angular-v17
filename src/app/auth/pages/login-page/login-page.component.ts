import { Component } from '@angular/core';
import { LoginCardComponent } from "../../components/login-card/login-card.component";

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss',
    imports: [LoginCardComponent]
})
export class LoginPageComponent {

}
