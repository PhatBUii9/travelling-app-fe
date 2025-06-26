import React from 'react';
import { render } from '@testing-library/react-native';
import CityCard from './CityCard';

describe('CityCard', () => {
  it('render the city name', () => {
    const { getByText } = render(
      <CityCard city="Rome" country="Italy" imageURL={''} />,
    );
    expect(getByText('Rome')).toBeTruthy();

    expect(getByText('Italy')).toBeTruthy();
  });
});
