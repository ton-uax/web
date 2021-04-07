import { render } from '@testing-library/react';
import React from 'react';
import Demo2 from './Demo2';

describe('Demo2', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<Demo2 {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Demo2')).toBeTruthy();
    });
});
