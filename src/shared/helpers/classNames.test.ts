import { classNames } from './classNames';

describe('classNames test', () => {
  it('Возвращает строку из одного класса', () => {
    expect(classNames('bg-green-500')).toBe('bg-green-500');
  });

  it('Возвращает строку из двух классов', () => {
    expect(classNames('p-1', 'm-1')).toBe('p-1 m-1');
  });

  it('Игнорирует falsy значения', () => {
    expect(classNames('p-1', null, undefined, 'm-1')).toBe('p-1 m-1');
  });

  it('Возвращает пустую строку', () => {
    expect(classNames('')).toBe('');
  });
});
