import { TimeAgoPipe } from './time-ago.pipe';

fdescribe('TimeAgoPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();

    console.log(pipe.transform(1648251680))
  });
});
