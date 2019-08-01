import React from 'react'
import Numeral from 'numeral'
import { Link } from 'react-router';

export const Item = ({ id, title, picture, condition,price,free_shipping }) => (
    
    <React.Fragment>
        <div className="item">
            {<Link to={`/detalle/${id}`}>
                <figure>
                    <img src={picture} alt={title}/>
                </figure>
            </Link>}
        </div>
        <div className="detail">
            
                <p className="price">{Numeral(price.amount).format('0,0')} {price.currency}</p>
                <p className="title">{title}</p>
                <p className="detail_2">{condition === 'new ' ? 'nuevo' : 'usado'}</p>
                
                
        </div>
        <div className="city">
            <span>{free_shipping ? 'Envío gratis' : ''}</span>
        </div>
    </React.Fragment>
)

