import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Selector } from './Selector';

const mockOptions = [{ value: 1, label: '1' }];

const value = 1;

test('Отрисовывает большой селектор', () => {
  render(
    <Selector
      options={mockOptions}
      value={value}
      size='big'
      onSelect={() => console.log(value)}
      placeholder='test'
    />
  );

  expect(screen.getByTestId('selector__button')).toHaveClass('max-w-60');
});

test('Отрисовывает маленький селектор', () => {
  render(
    <Selector
      options={mockOptions}
      value={value}
      size='small'
      onSelect={() => console.log(value)}
      placeholder='test'
    />
  );

  expect(screen.getByTestId('selector__button')).toHaveClass('sm:w-23.5');
});

test('Отрисовывает placeholder', () => {
  render(
    <Selector
      options={mockOptions}
      value={null}
      size='small'
      onSelect={() => console.log(value)}
      placeholder='test'
    />
  );

  expect(screen.getByText('test')).toBeInTheDocument();
});
