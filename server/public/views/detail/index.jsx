
import React from 'react';
import Header from '../components/header'
import {ListOfCategories} from '../components/ListOfCategories/index'
import Numeral from 'numeral'

export default class Detail extends React.Component {

    constructor(props)
    {
        super(props)
        
        this.state = {
            condition: "",
            description: "",
            id: 0,
            picture: "",
            price: {
                amount: 0,
                decimal: 0,
                currency: ''
            },
            sold_quantity: 0,
            title: ""
        }

        this.handlerClick = this.handlerClick.bind(this)
    }

    componentDidMount()
    {
        window.fetch('http://localhost:3000/api/items/' + this.props.params.id)
        .then(res => res.json())
        .then(response => {
            this.setState({...response.item},()=>{
                console.log(this.state)
            })
        })
    }

    handlerClick(textoBusqueda) {
        
        if(textoBusqueda != "")
            window.location.replace('/resultados?q='+textoBusqueda)
    }

    render()
    {
        return(
            <div className="container">
                <Header handlerClick={this.handlerClick}></Header>
                
                <ListOfCategories refresh={this.state.title} />

                <div className="product-container">
                    <figure>
                        <img alt="producto" src={this.state.picture}></img>
                    </figure>
                    <section className="price">
                        <span className="estado">{this.state.condition === 'new' ? 'Nuevo' : 'Usado' } | {this.state.sold_quantity} vendidos</span>
                        <header>
                            <h1>{this.state.title}</h1>
                        </header>
                        <span className="precio">
                            {Numeral(this.state.price.amount).format('0,0')} {this.state.price.currency}
                        </span>
                        <div className="buy">
                            <button>Comprar</button>
                        </div>
                        
                    </section>
                </div>
                <div className="description">
                    <div>
                        <span className="title">Descripción</span>
                        <p className="description-child">
                        {this.state.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }


}