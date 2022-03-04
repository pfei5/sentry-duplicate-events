import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public constructor(private httpClient: HttpClient) {}

  public triggerHttpError() {
    this.httpClient.get('https://httpbin.org/status/500').subscribe();
  }
}
