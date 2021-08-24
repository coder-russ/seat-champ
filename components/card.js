import Image from 'next/image'
import Link from 'next/link'

export default function Card({ image, title, description, buttonLink, buttonText}) {
  return (
  <div className="card text-dark text-center m-3" style={{width: '18rem'}}>
    <Image src={image} className="card-img-top" alt="image"/>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <Link href={buttonLink}>
        <a className="btn btn-primary">{buttonText}</a>
      </Link>
    </div>
  </div>
  );
}