import { render } from '@testing-library/react';
import React from 'react';
import Demo1 from './Demo1';

describe('Demo1', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<Demo1 {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Demo1')).toBeTruthy();
    });
});
