import { render } from '@testing-library/react';
import React from 'react';
import Col from './Col';

describe('Col', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<Col {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Col')).toBeTruthy();
    });
});
