import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserManagerService } from './services/user-manager.service';
import { UserCrudService } from './services/user-crud.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserCrudService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        UserManagerService,
        UserCrudService
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserCrudService);

    component.userFormGroup = new FormGroup({
      firstName: new FormControl('Dante'),
      lastName: new FormControl('Sparda'),
      email: new FormControl('xzy@gmail.com'),
      password: new FormControl('xlllaallAH999Dante')
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('on initialization', () => {
    it('should detect value changes on the form', fakeAsync(() => {
      component.ngOnInit();
      component.userFormGroup.get('firstName').setValue('Virgil');
      component.userFormGroup.get('firstName').updateValueAndValidity({ emitEvent: true });
      tick();
      fixture.detectChanges()
      expect(component.userFormGroup.get('firstName').value).toBe('Virgil');
    }));
  });

  describe('submitForm', () => {
    it('should call post method from user crud service', () => {
      spyOn(service, 'postData').and.returnValue(of({}));
      component.submitForm();
      expect(service.postData).toHaveBeenCalled();
    });
  });
});
