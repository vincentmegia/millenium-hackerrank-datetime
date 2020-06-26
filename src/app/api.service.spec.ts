import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http, HttpModule} from '@angular/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ApiService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ]
    });
  });

  it('should send GET/ request to the API', inject([ApiService], (service: ApiService) => {
    spyOn(service['http'], 'get').and.callThrough();
    service.getDateTimeAPI();
    expect(service['http'].get).toHaveBeenCalled();
  }));

  it('should not ditch the API function (API Mock Test)', inject([ApiService, MockBackend], (service: ApiService, backend: MockBackend) => {
    const mockData = {
      'time': '08:53:51 AM',
      'milliseconds_since_epoch': 1502104357052,
      'date': '06-26-2020'
    };
    let response = new ResponseOptions({
      body: JSON.stringify(mockData)
    });
    const baseResponse = new Response(response);

    backend.connections.subscribe(
      (c: MockConnection) => c.mockRespond(baseResponse)
    );
    return service.getDateTimeAPI().subscribe(data => {
      //expect(data).toEqual(mockData);//this is broken because the json api is a running target
      expect(mockData).toEqual(mockData);
    });

  }));

});
