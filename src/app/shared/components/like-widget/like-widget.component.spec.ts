import { LikeWidgetModule } from './like-widget.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from './../../services/unique-id/unique-id.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    //component = new LikeWidgetComponent(new UniqueIdService());
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges(); // Faz disparar os métodos dos ciclos de vida do component, ngOnInit .. e etc
    expect(component.id).toBeTruthy();
  })

  it('should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges(); // Faz disparar os métodos dos ciclos de vida do component, ngOnInit .. e etc
    expect(component.id).toBe(someId);
  })

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, () => {
    fixture.detectChanges(); // Faz disparar os métodos dos ciclos de vida do component, ngOnInit .. e etc
    component.liked.subscribe(() => {
      expect(true).toBeTrue(); // Liked é uma @Output recebera o valor após disparado pelo Like
    })
    component.like();
  })

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called with SPY`, () => {
    spyOn(component.liked, 'emit');
    fixture.detectChanges(); // Faz disparar os métodos dos ciclos de vida do component, ngOnInit .. e etc
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  })
});
