import { TestBed } from '@angular/core/testing';

import { ChatScreenService } from './chat-screen.service';

describe('ChatScreenService', () => {
  let service: ChatScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
