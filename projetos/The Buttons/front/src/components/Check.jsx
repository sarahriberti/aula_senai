import Form from 'react-bootstrap/Form';

function Check() {
    return (
      <Form className='box'>
        {['checkbox'].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Tarefa Concluída"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
          </div>
        ))}
      </Form>
    );
  }
  
  export default Check;
  
  
  