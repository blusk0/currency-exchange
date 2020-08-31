import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Currency Exchange';

  navLinks = [
    {
      label: 'Home',
      icon: 'home',
      link: '/home',
      parameters: {},
      index: 0,
    },
    {
      label: 'History',
      icon: 'history_edu',
      link: '/history',
      parameters: {},
      index: 1,
    },
  ];
}
