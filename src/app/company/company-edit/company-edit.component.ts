import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  companyKey: string;
  isNewCompany: boolean;
  company$: FirebaseObjectObservable<Company> | Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService) {
  }

  ngOnInit() {
    this.companyKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    !this.isNewCompany ? this.getCompany() : this.company$ = Observable.of({}) as FirebaseObjectObservable<Company>;
  }
  getCompany() {
  this.company$ = this.companyService.getCompany(this.companyKey);
  }
  saveCompany(company) {
    const save = this.isNewCompany
    ? this.companyService.saveCompany(company)
    : this.companyService.editCompany(company);

    save .then(_ => this.router.navigate([`company-list`]));
  }

  removeCompany(company) {
    this.companyService.removeCompany(company)
    .then(_ => this.router.navigate([`company-list`]));
  }
}
