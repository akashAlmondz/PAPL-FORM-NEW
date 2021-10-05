import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILanguage } from 'src/models/form.dto';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';
import { map, startWith, filter } from 'rxjs/operators';
import { Observable} from 'rxjs';
import {options} from './data';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  outlets: string[] = [];
  addresses: string[] = [];
  outletFilteredOption: Observable<string[]>;
  addressFilteredOption: Observable<string[]>;
  params = this.route.snapshot.params.uuid;
  PaplFormGroup: FormGroup;
  latitude = 0;
  longitude = 0;
  language: ILanguage = ILanguage.english;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder, ) {
    this.PaplFormGroup = this.formBuilder.group({
      outletName: [''],
      address: [''],
      phoneNumber: [''],
      couponCode: this.params,
    });
  }

  ngOnInit(): void {
    this.userService.checkUuid(this.params).subscribe(data => {
      if (data.status === true){
        this.router.navigate([`/form-registered/${this.language}`]);
      }
    });

    this.userService.getAllOutlets().subscribe(data => {
      this.outlets = data;
    }, err => {
      console.log(err);
    });

    this.userService.getAllAddresses().subscribe(res => {
      this.addresses = res;
    }, err => {
      console.log(err);
    });

    this.outletFilteredOption = this.getForm('outletName').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.addressFilteredOption = this.getForm('address').valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.outlets.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue2 = value.toLowerCase();
    return this.addresses.filter(option => option.toLowerCase().includes(filterValue2));
  }


  // phoneNumberValidation(control: AbstractControl) {
  //   if (control.value && control.value.toString().length !== 10) {
  //     return { phonevalidation: true };
  //   }
  //   else {
  //     return null;
  //   }
  // }

  getForm(control): AbstractControl | null {
    return this.PaplFormGroup.get(control);
  }

  // changeLang(value) {
  //   this.language = value;
  // }

  submitForm(value: any) {

    // Form Validation Checking
    if (this.getForm('outletName').value !== '' && this.getForm('address').value !== '' && this.getForm('phoneNumber').value !== '') {

      // Geolocation got successfully
      // if (navigator.geolocation.getCurrentPosition) {
      //   navigator.geolocation.getCurrentPosition(position => {

      //     // Creating Data Object with changes in FormGroup
      //     let submitData = {
      //       ...value,
      //       phoneNumber: value.phoneNumber.toString(),
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude
      //     }

      //     // QR Code Submit API
      //     this.formService.formSubmit(submitData).subscribe(data => {
      //       // Success Message
      //       if(data.status === 1) {
      //         Swal.fire(
      //           'Success.!!',
      //           'Form submitted successfully',
      //           'success'
      //         );
      //         this.PaplFormGroup.reset();
      //       }
      //       else if(data.status === 2) {
      //       // Failure Message For QR Code Data
      //         this.router.navigate(['/form-registered']);
      //       }
      //       else if(data.status === 0) {
      //         Swal.fire({
      //           icon: 'error',
      //           title: "Coupon Code doesn't exist..!!",
      //           text: 'Please try with a different coupon',
      //         });
      //       }
      //     }, err => {

      //       // Failure Message For QR Code Data
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Please try again..',
      //         text: err.error.message ? err.error.message : 'Something went wrong!',
      //       });
      //     })
      //   });
      // }

      // Geolocation not received
      // else {

      // Creating Data Object with changes in FormGroup
      const submitData = {
        ...value,
        phoneNumber: value.phoneNumber.toString(),
        latitude: this.latitude,
        longitude: this.longitude
      };

      // QR Code Submit API
      this.userService.formSubmit(submitData).subscribe(data => {
        // Success Message
        if (data.status === 1) {
          // Swal.fire(
          //   'Success.!!',
          //   'Form submitted successfully',
          //   'success'
          // );
          this.PaplFormGroup.reset();
          this.PaplFormGroup.patchValue({
            outletName: '',
            address: '',
            phoneNumber: '',
          });
          this.router.navigate([`/form-registered/${this.language}`]);
        }
        else if (data.status === 2) {
          // Failure Message For QR Code Data
          this.router.navigate([`/form-registered/${this.language}`]);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Coupon Code doesn\'t exist..!!',
            text: 'Please try with a different coupon',
          });
        }
      }, err => {

        // Failure Message For QR Code Data
        Swal.fire({
          icon: 'error',
          title: 'Please try again..',
          text: 'Something went wrong!',
        });
      });
      // }
    }

    // If Form Validation Failed
    else {
      Object.keys(this.PaplFormGroup.controls).forEach(field => { // {1}
        const control = this.PaplFormGroup.get(field);            // {2}
        if (control) {
          control.markAsTouched({ onlySelf: true });
        }       // {3}
      });
    }

  }

}
