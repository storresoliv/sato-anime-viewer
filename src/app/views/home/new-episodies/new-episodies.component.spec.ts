import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NewEpisodesComponent } from './new-episodes.component'

describe('NewEpisodesComponent', () => {
  let component: NewEpisodesComponent
  let fixture: ComponentFixture<NewEpisodesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEpisodesComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(NewEpisodesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
