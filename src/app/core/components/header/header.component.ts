import {Component, inject} from '@angular/core';
import {AuthenticationService} from '../../../featrues/authentication/service/authentication.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authenticationService = inject(AuthenticationService);


}
