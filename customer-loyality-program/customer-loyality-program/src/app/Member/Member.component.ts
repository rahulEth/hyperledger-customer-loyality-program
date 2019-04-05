/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MemberService } from './Member.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-member',
  templateUrl: './Member.component.html',
  styleUrls: ['./Member.component.css'],
  providers: [MemberService]
})
export class MemberComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  fistName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  AccountNumber = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  phoneNumber = new FormControl('', Validators.required);
  points = new FormControl('', Validators.required);


  constructor(public serviceMember: MemberService, fb: FormBuilder) {
    this.myForm = fb.group({
      fistName: this.fistName,
      lastName: this.lastName,
      AccountNumber: this.AccountNumber,
      email: this.email,
      phoneNumber: this.phoneNumber,
      points: this.points
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMember.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.clp.biznet.Member',
      'fistName': this.fistName.value,
      'lastName': this.lastName.value,
      'AccountNumber': this.AccountNumber.value,
      'email': this.email.value,
      'phoneNumber': this.phoneNumber.value,
      'points': this.points.value
    };

    this.myForm.setValue({
      'fistName': null,
      'lastName': null,
      'AccountNumber': null,
      'email': null,
      'phoneNumber': null,
      'points': null
    });

    return this.serviceMember.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'fistName': null,
        'lastName': null,
        'AccountNumber': null,
        'email': null,
        'phoneNumber': null,
        'points': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.clp.biznet.Member',
      'fistName': this.fistName.value,
      'lastName': this.lastName.value,
      'email': this.email.value,
      'phoneNumber': this.phoneNumber.value,
      'points': this.points.value
    };

    return this.serviceMember.updateParticipant(form.get('AccountNumber').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.serviceMember.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMember.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'fistName': null,
        'lastName': null,
        'AccountNumber': null,
        'email': null,
        'phoneNumber': null,
        'points': null
      };

      if (result.fistName) {
        formObject.fistName = result.fistName;
      } else {
        formObject.fistName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.AccountNumber) {
        formObject.AccountNumber = result.AccountNumber;
      } else {
        formObject.AccountNumber = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.phoneNumber) {
        formObject.phoneNumber = result.phoneNumber;
      } else {
        formObject.phoneNumber = null;
      }

      if (result.points) {
        formObject.points = result.points;
      } else {
        formObject.points = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'fistName': null,
      'lastName': null,
      'AccountNumber': null,
      'email': null,
      'phoneNumber': null,
      'points': null
    });
  }
}
