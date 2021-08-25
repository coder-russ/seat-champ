

export default function Footer({ title, description }) {
  return (
    <div className='container-fluid'>
      <div className='row bg-white justify-content-center' style={{height: '35vh'}}>
        <div className='col-8 align-self-center'>
          <h1 className="text-center" style={{color:'black'}}>{title}</h1>
          <p className="text-center fs-4" style={{color:'black'}}>{description}</p>
        </div>
      </div>
    </div>
  );
}