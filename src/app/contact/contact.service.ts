import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';
import { Contact } from './contact';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactService {
  subject$ = new BehaviorSubject<string>(undefined);
  contacts$: FirebaseListObservable<Contact[]>;
  contact$: FirebaseObjectObservable<Contact>;

  constructor(private db: AngularFireDatabase) {
    this.contact$ = this.db.object(`contact`);
    this.contacts$ = this.db.list(`contacts`);
  }
  getContact(contactKey: string) {
    return this.db.object(`contacts/${contactKey}`)
      .catch(this.errorHandler);
  }
  getContacts() {
    return this.subject$
      .switchMap(companyKey => companyKey === undefined
        ? this.contacts$
        : this.db.list(`companyContacts/${companyKey}`)
        .catch(this.errorHandler));

  }
  // observables of observables
  companyContactsJoin(companyKey) {
    return this.db.list(`companyContacts/${companyKey}`)
      .map(contactKeys => contactKeys
        .map(contact => this.db.object(`contacts/${contact.$key}`)))
      .switchMap(contactObsArray => contactObsArray.length >= 1
        ? Observable.combineLatest(contactObsArray)
        : Observable.of([]))
      .catch(this.errorHandler);
  }

  saveContact(contact: Contact) {
    return this.contacts$.push(contact)
      .then(_ => console.log('success'))
      .catch(error => Observable.throw(error));
  }

  editContact(contact: Contact) {
    const updateContact = {};

    updateContact[`contacts/${contact.$key}`] = contact;

    Object.keys(contact.contactCompanies).forEach(companyKey => {
      updateContact[`companyContacts/${companyKey}/${contact.$key}`] = {name: contact.name};
    });
    return this.db.object('/').update(updateContact)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  removeContact(contact) {
    const removeContact = {};

    removeContact[`contacts/${contact.$key}`] = null;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      removeContact[`companyContacts/${companyKey}/${contact.$key}`] = null;
    });
    return this.db.object('/').update(removeContact)
      // return this.contacts$.remove(contact.$key)
      .then(_ => console.log('success'))
      .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}
