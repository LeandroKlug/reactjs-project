import {searchValue, handleChange} from '../../templates/Home';
import './styles.css';

export const TextInput = ({ searchValue, handleChange }) => {
    return(
        <input
            className='text-input'
            onChange={handleChange} 
            value={searchValue}
            type="search"
            placeholder='Digite a pesquisa'
        />
    );
}