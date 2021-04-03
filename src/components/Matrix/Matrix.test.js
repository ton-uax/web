import { render } from '@testing-library/react';
import React from 'react';
import Matrix from './Matrix';

describe('Matrix', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<Matrix {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Matrix')).toBeTruthy();
    });
});
