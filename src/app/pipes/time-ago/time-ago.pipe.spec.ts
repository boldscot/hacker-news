import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a few seconds ago', () => {
    expect(pipe.transform(getUnixPastTimeMinutes())).toContain('seconds ago');
  });

  it('should return a minute ago', () => {
    expect(pipe.transform(getUnixPastTimeMinutes(1))).toContain('a minute ago');
  });

  it('should return 5 minutes ago', () => {
    expect(pipe.transform(getUnixPastTimeMinutes(5))).toContain('5 minutes ago');
  });

  it('should return 45 minutes ago', () => {
    expect(pipe.transform(getUnixPastTimeMinutes(40))).toContain('40 minutes ago');
  });

  it('should return 2 hours ago', () => {
    expect(pipe.transform(getUnixPastTimeHours(2))).toContain('2 hours ago');
  });

  it('should return 6 hours ago', () => {
    expect(pipe.transform(getUnixPastTimeHours(6))).toContain('6 hours ago');
  });

  it('should return 20 hours ago', () => {
    expect(pipe.transform(getUnixPastTimeHours(20))).toContain('20 hours ago');
  });

  it('should return 1 day ago', () => {
    expect(pipe.transform(getUnixPastTimeDays(1))).toContain('a day ago');
  });

  it('should return 10 day ago', () => {
    expect(pipe.transform(getUnixPastTimeDays(10))).toContain('10 days ago');
  });

  it('should return 25 day ago', () => {
    expect(pipe.transform(getUnixPastTimeDays(25))).toContain('25 days ago');
  });
});

function getUnixPastTimeMinutes(minutesAgo?: number) {
  if (minutesAgo)
    return Math.floor(Date.now()/1000)-(minutesAgo*60*1000);

    return Math.floor(Date.now()/1000);
}

function getUnixPastTimeHours(hoursAgo: number) {
  return Math.floor(Date.now()/1000)-(hoursAgo*60*60*1000);
}

function getUnixPastTimeDays(daysAgo: number) {
  return Math.floor(Date.now()/1000)-(daysAgo*24*60*60*1000);
}
