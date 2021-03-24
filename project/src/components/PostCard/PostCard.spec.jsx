import { render, screen } from '@testing-library/react';
import { PostCard } from ".";
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {
        
        render(<PostCard {...props} />);

        expect(screen.getByRole('img', { name: /title/i })).toHaveAttribute('src', props.cover);
        expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
        expect(screen.getByText('body1')).toBeInTheDocument();

        // const {debug} = render(<PostCard {...mock} />);
        // debug(); debugando o componente
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard {...props} />);  
        expect(container.firstChild).toMatchSnapshot();
    });
});