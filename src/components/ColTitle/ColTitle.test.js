import { render } from '@testing-library/react';
import React from 'react';
import ColTitle from './ColTitle';

describe('ColTitle', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<ColTitle {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('ColTitle')).toBeTruthy();
    });
});
