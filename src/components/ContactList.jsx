import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export const ContactList = ({ array, clbDelete }) => {
  return (
    <ListGroup as="ul">
      {array.map((el, i) => (
        <ListGroup.Item as="li" key={i + 1}>
          <p>
            {el.name}: {el.number}
          </p>
          <Button
            variant="secondary"
            type="button"
            name={el.id}
            onClick={() => clbDelete(el.id)}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

ContactList.propTypes = {
  array: PropTypes.array.isRequired,
};
