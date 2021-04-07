import { render } from '@testing-library/react';
import React from 'react';
import Message from './Message';

describe('Message', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = {...defaultProps};
        const { asFragment, queryByText } = render(<Message {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('Message')).toBeTruthy();
    });
});
