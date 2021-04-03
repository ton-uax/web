import { render } from '@testing-library/react';
import React from 'react';
import SmallWallet from './SmallWallet';

describe('SmallWallet', () => {
    const defaultProps = {};

    it('should render', () => {
        const props = { ...defaultProps };
        const { asFragment, queryByText } = render(<SmallWallet {...props} />);

        expect(asFragment()).toMatchSnapshot();
        expect(queryByText('SmallWallet')).toBeTruthy();
    });
});
