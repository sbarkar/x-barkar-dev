import { formatToDate } from '@/utils/dates';

test('formatToDate: Expected to be able to format a date', () => {
  const date = new Date(Date.UTC(2020, 11, 16, 3, 0, 0));

  expect(formatToDate(date)).toBe('Wednesday, December 16, 2020');
});
