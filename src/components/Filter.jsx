import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PropTypes from 'prop-types';

export const Filter = ({ filterChange, value }) => {
  return (
    <>
      <p>Finde contacts by name</p>
      <InputGroup
        className="mb-3"
        style={{ maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type="text"
          name="filter"
          value={value}
          onChange={filterChange}
        />
      </InputGroup>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
};
