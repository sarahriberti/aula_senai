import Form from 'react-bootstrap/Form';

function Cor1() {
  return (
    <>
      <Form.Label htmlFor="exampleColorInput"></Form.Label>
      <Form.Control
        type="color"
        defaultValue="#563d7c"
      />
    </>
  );
}

export default Cor1;