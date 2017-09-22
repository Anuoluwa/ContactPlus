import { Component } from '@angular/core';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private db: AngularFireDatabase) {
    const observable = this.db.object('connected')
     observable
     .take(1).
     subscribe(
       next => console.log('next', next),
       error => console.log('error', error),
       () => console.log('completed')
       );

  }
}
