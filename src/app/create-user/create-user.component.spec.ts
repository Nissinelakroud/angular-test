import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core'; 



describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateUserComponent, 
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule , TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: UserService,
          useValue: { 
            postUser: () => of({}), 
            updateUser: () => of({}),
            getUser: () => of({}),
          }
        },
        {
          provide: TranslateService,
          // Utilisez le mock pour la traduction
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require firstName and email fields', () => {
    const firstNameControl = component.userForm.get('firstName');
    const lastNameControl = component.userForm.get('lastName');
    const emailControl = component.userForm.get('email');
    lastNameControl?.setValue('');
    firstNameControl?.setValue('');
    emailControl?.setValue('');
    expect(lastNameControl?.valid).toBeFalsy();
    expect(firstNameControl?.valid).toBeFalsy();
    expect(emailControl?.valid).toBeFalsy(); 

    lastNameControl?.setValue('nissrin');
    firstNameControl?.setValue('nisso');
    emailControl?.setValue('nisso@example.com');
    expect(lastNameControl?.valid).toBeTruthy();
    expect(firstNameControl?.valid).toBeTruthy();
    expect(emailControl?.valid).toBeTruthy();
  });  

  it('should call updateUser when updating user', () => {
    const updateUserSpy = jest.spyOn(component['userService'], 'updateUser');
    component.userForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      address: '456 Main St',
      email: 'jane@example.com',
      telephone: '0987654321',
      ville: 'casablanca'
    });

    component['route'].snapshot.params['id'] = 1;
    component.submit();
    expect(updateUserSpy).toHaveBeenCalled();
  });

  it('should navigate to the user list on cancel', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');
    component.cancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/list']);
  });

  it('should call postUser when creating a new user', () => {
    const postUserSpy = jest.spyOn(component['userService'], 'postUser');
    component.userForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      email: 'john@example.com',
      telephone: '1234567890',
      ville: 'rabat'
    });
    component.submit();
    expect(postUserSpy).toHaveBeenCalled();
  });
});
