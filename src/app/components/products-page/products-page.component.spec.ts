import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpDataService } from 'src/app/services/http-data.service';

import { ProductsPageComponent } from './products-page.component';

fdescribe('ProductsPageComponent', () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;

  beforeEach(async () => {
    //2 DoneForTesting

    const datServiceSPy = jasmine.createSpyObj<HttpDataService>(['getData']);
    datServiceSPy.getData.and.returnValue(of())
    await TestBed.configureTestingModule({
      declarations: [ ProductsPageComponent ],
      // 1 Done For Testing
      // imports:[HttpClientTestingModule,FormsModule]

      //2 DoneForTesting
      providers:[{HttpDataService,useValue:datServiceSPy}],
      schemas:[NO_ERRORS_SCHEMA]
    }) 
    .compileComponents();   

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have links', () => {
    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(3);
  });
  
 it('should have data', () => {
    expect(component.allData.length).toBe(3);
  });

});
