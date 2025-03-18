import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <Card className="mb-3">
      <Card.Body>
        {!visible && (
          <Button onClick={toggleVisibility} variant="primary">
            {props.buttonLabel}
          </Button>
        )}
        {visible && (
          <>
            {props.children}
            <Button onClick={toggleVisibility} variant="secondary" className="mt-2">
              Cancel
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
