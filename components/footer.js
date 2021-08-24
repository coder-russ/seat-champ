

export default function Footer({ title, description }) {
  return (
    <div className='row bg-white' style={{height:'20em'}}>
      <div className='col-2'></div>
      <div className='col-8 align-self-center'>
        <h1 className="text-center" style={{color:'black'}}>{title}</h1>
        <p className="text-center fs-4" style={{color:'black'}}>{description}</p>
      </div>
    </div>
  );
}