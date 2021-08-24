import Image from 'next/image'
import Link from 'next/link'

export default function CardNFL({ image, title, description, handleClick, item, buttonText}) {
  return (
  <div className="card text-dark text-center m-3" style={{width: '18rem'}}>
    <Image src={image} className="card-img-top" alt="image" height='177px' width='159px'/>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <button className="btn btn-primary" onClick={() => handleClick(item)}>{buttonText}</button>
    </div>
  </div>
  );
}