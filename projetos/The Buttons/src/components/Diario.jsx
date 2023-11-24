import ListGroup from 'react-bootstrap/ListGroup';


function Diario() {
  return (
    <ListGroup className='today-task'>
      {/*temas afazeres*/}

      <ListGroup.Item className='today-task-one-1'><h4>SEGUNDA 25/03</h4></ListGroup.Item>
      <ListGroup.Item className='today-task-one'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAACVBMVEX0iIT0iob0jIjPATZaAAABAElEQVR4nO3PAREAMAgAIbV/6OVg9zRgbv92s/O3bchr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvoa+hr6Gvo27n92z0D6AOFtywFzwAAAABJRU5ErkJggg==" alt="gr" className='corr'/><h5>Curso</h5></ListGroup.Item>
      <ListGroup.Item className='today-task-one'><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEUAps4j+8kCAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII=" alt="gr" className='corr'/><h5>Academia</h5></ListGroup.Item>
      <ListGroup.Item className='today-task-one'><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0PDw8PDQ0NDQ0NDw8PDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQULEg8PEisZExkrKysrKystLSsrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAAAQIFAwT/xAAcEAEBAQEBAAMBAAAAAAAAAAAAARECQdHh8DH/xAAWAQEBAQAAAAAAAAAAAAAAAAAABgT/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDugNaGFQAAgIFQFQAAAIAAAAAAioCBUoIlqsglZq1mgiKzQXRkB0BFAEUEAAQAAAAAAABQEABAASsrUBNZrVYoIzVqAiVUoIAD7xAFEAU1AAAAAAUAAAABBQGRalBmpVrNBmpVrNBEolAZpWbQUQB0AABAFAAAAVFAAAAAVIoIlUBGa0zQSsVqoDCNVmglYrVrFBEqpQZU0B0AAAAUQBQAAAVAAVAFVFBEqoCIqUGalWs0GazWqxQZqVazQGaqUEVlQdARQFQBRFAWIAogCgAAAsVABBAEVmgjNWs9UGaxWqzQSsrUoJWa1axQBAHREUFEUARQUSAKIoKIAoAKIAIqUEqCAnTHTVYoM1FrIJWWqxaBWatZoCIA6QgCqyoKrKgohoKIAqoAogCmoAqVagIlVmgzWa1WKCMrWaCVmrWaCVmrWbQQNAdEZ1dBVZNBpWdNBrTWQGhNNBVZUFEAaQAAQBKtZoM1mtVmgzWatZoJWK1WaDNYrVYoGiAOiayoNaayoKIQGlZNBoZUGhlYCqyA0MqCiACUS0GazVqUGazVrNBKxWqxQZrFrXTPQIJoDojKgqs6A0IAqsqCxWTQa1dZAaEUFEJQWmpaloGpogFZq1m0ErFarOglrFaYoM1jpqs0GRAHQEAaENBoQBV1lQUiANarOkoNGoQFVnU0GtZTVBYIAlZrTIMstVkGazWqzQYrFb6efQICA6AiA0Mmg0usgNCANGs6ugurrJoNQtZ00F0TS0FVk0GhNAKzVZoM1KtZoIzatZoJXn03XnQTRMUH3CaaAIAq6zoDRrOqCyrrOmg1prOloLpKmkoNSkrMv0A1qsxdBdEAXWfg1KCVKrNBGemmegYrFb6YoMqAPsAASgAACgAla5/oAk9QADwAa79/enIAsSgC/awASIAM1KgAz14oDz6Y6QAAB//Z" alt="gr" className='corr'/><h5>Mercado</h5></ListGroup.Item>
      <ListGroup.Item className='today-task-one'><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0ICg0ICA0NBwcIDw0HBwcHCA8ICQcNFREWFhURHx8YHSggGBolGxMfITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0ODw0NDzcZHxkrKysrKy0rKysrKysrKy0rKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAABAAIGBQf/xAAXEAEBAQEAAAAAAAAAAAAAAAAAAREC/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECBAYF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD50YMMe1fTMSShSQIhqAiEoSlgqWFSAYVCokkoTIoYCMSgJrBjSqGoMMUJBURwNSAZFihWCkakDUVVhBUTUDUB4BBc2MJFAiCCMUIJRKKEgimERpRJICkYojEQR5Bi4EwQxVJiUBNQGKJqAgSI1GsEYkKVFDFCUQeAknMwYkgKRBSFIEZElCsRiqSDARSBHEVFCoVgpDiiUMikMUFJgMA4ooYoZDiiAyHBGmhFRCqRqQQxQkEHgGAxzMJIwEYoVEkQUSIpMUShMBgIwGKFIxRQo4AjUBVTCI1ASRxQwxQ4AagMUMKKqoQVDDFCoUiDn0onKwmpBDAUhSiqikBMghUMhxRAikocMgMAqJRQkGKHDiIqIIEiNKIhqLBYZEYqnFihBYQYoZCiopCiDnionKwjFhUSiQphBgGFYYokiojBCBMBXAqJQCYpDIqpoGAjA1AUIMaDCoosWNRKEEYoYomoDAJEKhMDQOdILlYKEKhWJQVNQGATAYoikoZDihIJYiosMiIpikUKiKQHDII1FEZA1FDIsUKxYoQ0ooYoYBIhUUjQhAmAxRz0KxOVhQgikFSAYVIcURgShMDUgKGCEgUlIqmNAxQxI4oGhjQJoYYsE1AVDCIYLE0IVDCpDgKJHFDDFDIBSOKOdWIuVhJQirDIoVClEBWIqKERpRFGAsUiMFTUBUKRiiwyBqAcUiMUJwNRVxKIxRNYGoCaZaURgMUMhUQrREK4OcURxyMIxGQCQVEkQMSMUKSxYFQ4sUMMEakFRiSiagwwCjixcFGoJDDDCoUqmGCGKFqCQgjFC0JqAgVEZFimFQg5tFORhY1AlGkkBSShMKBQpLAkJVahiQFJKNGJASE0NQxIUrElDGokDUSQGFJoaiSAxqJLFMKQP//Z" alt="gr" className='corr'/><h5>Aula de Espanhol</h5></ListGroup.Item>
      <ListGroup.Item className='today-task-one'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgiXU4_x5FEx72dYP6bZBVTP0EFFqV5Ps-g&usqp=CAU" alt="gr" className='corr'/><h5>Jantar</h5></ListGroup.Item>
    </ListGroup>
  );
}

export default Diario;