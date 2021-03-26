import P from 'prop-types'
import './styles.css'

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className='text-input'
      onChange={handleChange}
      value={searchValue}
      type='search'
      placeholder='Digite a pesquisa'
    />
  )
}

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
}
