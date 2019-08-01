
import React, { Fragment, useEffect, useState } from 'react'
import Header from '../components/header'
import {ListOfItems} from '../components/ListOfItems/index'
import {ListOfCategories} from '../components/ListOfCategories/index'

export default class Result extends React.Component {

    constructor(props)
    {
        super(props)
        
        let q = (props.q != '') ? props.q : ''
        
        if(window != undefined && window.location.search != null && window.location.search.length > 0)
        {
            q = (window.location.search.indexOf("q=") == -1) ?
                q :  decodeURIComponent(window.location.search.replace("?q=",""))
        }
        
        this.state = {
            text: q
        }
        this.handlerClick = this.handlerClick.bind(this)
    }

    handlerClick(textoBusqueda) {
        
        if(textoBusqueda != "")
            this.setState({text: textoBusqueda })
    }

    render()
    {
        
        return (
            <div className="container-result">
                <Header handlerClick={this.handlerClick}></Header>
                <ListOfCategories refresh={this.state.text} />
                <div className="result-container">
                    <ListOfItems refresh={this.state.text} />
                </div>
            </div>
        )
    }
}