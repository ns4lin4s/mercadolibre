
import React from 'react';
import Header from '../components/header'

export default class Home extends React.Component {

    constructor(props)
    {
        super(props)

        this.handlerClick = this.handlerClick.bind(this)
    }

    handlerClick(textoBusqueda) {
        
        if(textoBusqueda != "")
            window.location.replace('/resultados?q='+ textoBusqueda)
    }

    render()
    {
        return(
            <div className="container">
                <Header handlerClick={this.handlerClick}></Header>
            </div>
        )
    }


}