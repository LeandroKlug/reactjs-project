import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

describe('<TextInput />', () => {
    it('should have a value of searchValue', () => {
        const fn = jest.fn();
        
        render(<TextInput handleChange={fn} searchValue={'testando'} />);

        const input = screen.getByPlaceholderText(/Digite a pesquisa/i);

        expect(input.value).toBe('testando');
    });

    it('should call handleChange on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} />);

        const input = screen.getByPlaceholderText(/Digite a pesquisa/i);
        const value = 'passando o valor';

        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
        
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const {container} = render(<TextInput handleChange={fn} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
