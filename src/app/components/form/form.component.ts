import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FromDto, ILanguage } from 'src/models/form.dto';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';
import { map, startWith,filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject} from 'rxjs';
import { Area, Outlet } from 'src/app/areas';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



export class FormComponent implements OnInit {


    AREAS: Area[] = []

  myControl = new FormControl();
  mycontro=new FormControl();

 

  me=[];
   
  public areas: Area[] =this.AREAS;
  public areaCtrl: FormControl = new FormControl();
  public areaFilterCtrl: FormControl = new FormControl();
  public filteredAreas: ReplaySubject<Area[]> = new ReplaySubject<Area[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;
  
  protected _onDestroy = new Subject<void>();

  OUTLETS:Outlet[]= [
   
]

  
  sortedOutlets = []; 
  pushOutlets(event:any){
   console.log( this.PaplFormGroup.controls['area'].value.areaName)
    this.sortedOutlets = this.PaplFormGroup.controls['area'].value.outlets;
    console.log(this.sortedOutlets)
    this.sortedOutlets.map(x => this.OUTLETS.push({outletName:x}))
    
    
  }





 

  



protected outlets: Outlet[] = this.OUTLETS;
public outletCtrl: FormControl = new FormControl();
public outletFilterCtrl: FormControl = new FormControl();
public filteredOutlets: ReplaySubject<Outlet[]> = new ReplaySubject<Outlet[]>(1);




  
 

  public filterAreas() {
    if (!this.areas) {
      return;
    }

  let search = this.areaFilterCtrl.value;
  if (!search) {
    this.filteredAreas.next(this.areas.slice());
    return;
  }else {
    search = search.toLowerCase();
  }

  this.filteredAreas.next(
    this.areas.filter(area => area.areaName.toLowerCase().indexOf(search) > -1 )
  );

  }


  public filterOutlets() {
    if (!this.outlets) {
      return;
    }
    let search = this.outletFilterCtrl.value;
    if (!search) {
      this.filteredOutlets.next(this.outlets.slice());
      return;
    }else {
      search = search.toLowerCase();
    }
  
    this.filteredOutlets.next(
      this.outlets.filter(outlet => outlet.outletName.toLowerCase().indexOf(search) > -1)
    )
  }


  



 

  
 filteredOptions: Observable<string[]>;
 filteredOption: Observable<string[]>;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder,) {
    this.PaplFormGroup = this.formBuilder.group({
      outlet:[''],
      area: [''],
      phoneNumber: [''],
      couponCode: this.params,
    });
  }
 
  params = this.route.snapshot.params.uuid;
  PaplFormGroup: FormGroup;
  latitude = 0;
  longitude = 0;
  language: ILanguage = ILanguage.english;

  addresses: Observable<string[]> = this.userService.getAllAddresses();

  





  ngOnInit(): void {
    this.userService.checkUuid(this.params).subscribe(data => {
      if (data.status === true){
        this.router.navigate([`/form-registered/${this.language}`]);
      }
    });
    
    
    this.userService.getAllData().subscribe(x=> {

         this.me=x
         this.me.map(x=>this.AREAS.push(x));
      }, err =>
      {
        console.log(err)
      
      })


    


   this.filteredAreas.next(this.areas.slice());

   this.areaFilterCtrl.valueChanges
   .pipe(takeUntil(this._onDestroy))
   .subscribe(()=>{
     this.filterAreas();
   })
   

   this.outletFilterCtrl.valueChanges
   .pipe(takeUntil(this._onDestroy))
   .subscribe(()=> {
     this.filterOutlets();
   } );


   }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.outlets.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // private _filter2(value: string): string[] {
  //   const filterValue2 = value.toLowerCase();
  //   return this.addresses.filter(option => option.toLowerCase().includes(filterValue2));
  // }


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

  changeLang(value) {
    this.language = value;
  }

  submitForm(value: any) {
    console.log(value);
    // console.log("area",value.area.areaName,"outletName",value.outlet.outletName);
    // console.log(this.getForm('area').value.areaName,this.getForm('outlet').value.outletName);
    const outlet=this.getForm('outlet').value.outletName
    const areaName=this.getForm('area').value.areaName
    // Form Validation Checking
    if (outlet!== '' && areaName !== '' && this.getForm('phoneNumber').value !== '') {
            
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
      const submitData :any = {
        couponCode:value.couponCode,
        outletName:value.outlet.outletName,
        area:value.area.areaName,
        phoneNumber: value.phoneNumber.toString(),
        latitude: this.latitude,
        longitude: this.longitude,
      };

      // QR Code Submit API
      this.userService.formSubmit(submitData).subscribe(data => {
        // Success Message
        console.log("hi",data.value);
        if (data.status === 1) {
          localStorage.setItem('key',JSON.stringify(data))
          value= localStorage.getItem('key');
          let value2=JSON.parse(value);
          // Swal.fire(
          //   'Success.!!',
          //   'Form submitted successfully',
          //   'success'
          // );
          this.PaplFormGroup.reset();
          this.PaplFormGroup.patchValue({
            area: '',
            outletName: '',
            phoneNumber: '',
          });
         
  //         Swal.fire({
  //           imageUrl: "/assets/giphy.gif",
  //           text:data.message,
  //           html:`<table id="table" border=1>
  //           <thead>
  //               <tr>
  //                   <th>Number Of Scan</th>
  //                   <th>Cashback</th>
  //               </tr>
  //           </thead>
  //           <tbody>
  //               <tr>
  //                   <td>${value2.value[0].cashback} </td>
  //                   <td>{{area.cashback}}</td>
  //               </tr>
  //   </tbody>
  //   </table>`,
  //           width:600,
  //           backdrop: `
  //           rgba(0,0,0,0)
  //          url("/assets/c.gif")
  //          center
  //          repeat
  // `
  //           })
  
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
function x(x: any, arg1: (string: any) => { x: any; }): string {
  throw new Error('Function not implemented.');
}

