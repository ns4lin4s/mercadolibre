
import React from 'react';
import { Link} from 'react-router';

export default class Header extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {value:''}

        this.onChange = this.onChange.bind(this);

        this.onKeypress = this.onKeypress.bind(this);
        
    }

    onChange(e){
        console.log(e)
        this.setState({value: e.target.value});     
     }

     onKeypress(e)
     {
        if(e.key === 'Enter')
            this.props.handlerClick(e.target.value)
        
     }

    render()
    {
        return(
            <div className="header">
                <div className="logo-container">
                    <Link to="/" >
                        <img className="logo" alt="logo" src="/img/logo.png"></img>
                    </Link>
                </div>
                <div className="search">
                    
                    <input autocomplete="false" placeholder="Buscar productos, marcas y más... " type="text" onKeyPress={this.onKeypress} onChange={this.onChange} name="search"  />
                    
                    <div>
                        {
                            window.location.pathname === "/" ?
                            
                                <button onClick={() => this.props.handlerClick(this.state.value)} type="submit">
                                    <div class="icon-search" role="img" aria-label="Buscar"></div>
                                </button>
                            
                            :
                            <button onClick={() => this.props.handlerClick(this.state.value)} type="submit">
                                    <div class="icon-search" role="img" aria-label="Buscar"></div>
                            </button>

                        }
                        
                        
                    </div>
                </div>
                
            </div>
        )
    }
}