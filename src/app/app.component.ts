import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ],
})
export class AppComponent {
  name: any = ''
  wedding_from : any = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params: any) => {

      if (params.type) {
        this.wedding_from = (params.type).toLowerCase()
         localStorage.setItem('invitation_from', (params.type).toLowerCase()) // wedding or reception
      } else {
        const weddingType = localStorage.getItem('invitation_from');
        if (weddingType) {
          this.wedding_from = weddingType;
        }
      }
      if (params.name) {
        this.name = params.name;
        localStorage.setItem('invitation_name', params.name);
        this.router.navigate([ 'home' ], { queryParams: {} });
      }

      else {
        const storedName = localStorage.getItem('invitation_name');
        if (storedName) {
          this.name = storedName;
        }
      }
    });
  }
}
