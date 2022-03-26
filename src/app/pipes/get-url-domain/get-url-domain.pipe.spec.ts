import { GetUrlDomainPipe } from './get-url-domain.pipe';

describe('GetUrlDomainPipe', () => {
  const pipe = new GetUrlDomainPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return google.com', () => {
    expect(pipe.transform('https://www.google.com')).toEqual('google.com');
  });

  it('should return hacker-news.firebaseio.com', () => {
    expect(pipe.transform('https://hacker-news.firebaseio.com/v0//item/30810410.json'))
      .toEqual('hacker-news.firebaseio.com');
  });

  it('should return fake-domain.ie', () => {
    expect(pipe.transform('http://fake-domain.ie/v0/'))
      .toEqual('fake-domain.ie');
  });

  it('should return thewitcher.com', () => {
    expect(pipe.transform('https://www.thewitcher.com/en/news'))
      .toEqual('thewitcher.com');
  });
})
