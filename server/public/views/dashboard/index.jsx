import React from 'react';
import Menu from '../components/menu'
import Footer from '../components/footer'
import StationTable from './table'
import LineChartStation from './lineChartStation'
import BarChartStation from './barChartStation'
import PieChartStation from './pieChartStation'
import Select from 'react-select';
import moment from 'moment';

export default class Dashboard extends React.Component {

    constructor(props)
    {
        super(props)
        
        moment.locale('es')

        this.state = {
            selectedOption: null,
            optionsFilter: [],
            stations: [],
            totalUsadas: 0,
            totalLibres: 0,
            data: []
         }

        this.state.stations = this.mapStation(props.stations,props.stations_history)

        this.state.stations.forEach(element => {
          this.state.optionsFilter.push({label: element.name, value: element.id })
          this.state.totalLibres += element.totalLibres
          this.state.totalUsadas += element.totalUsadas
        });

        //BarChar & LineChart
        
        for(let i = 1; i <= 60; i++ )
        {
          this.state.data.push({ name: i.toString(), disponibles: 0, usadas: 0 })
        }

        this.state.stations.forEach(station => {
            
            station.expand.forEach(element => {
                //hace \d+ (minutos|minuto)
                
                let match = moment(element.date).fromNow().match(/hace (\d+|un) (minutos|minuto)/g)

                if(match != null && match.length > 0)
                {
                    let minutes_ago = 0

                    if(match[0].match(/\d+/g) != null)
                        minutes_ago = (60 - parseInt(match[0].match(/\d+/g)[0], 10))
                    else
                        minutes_ago = (60 - 1)
                    
                    let foundElement = this.state.data.find(element => {
                        return parseInt(element.name ,10) == minutes_ago 
                    })

                    if(foundElement != null)
                    {
                        foundElement.disponibles += element.available_bikes
                        foundElement.usadas += element.busy_bikes
                    }
                }
                    
                //console.log(moment(element.date).fromNow())
            });
        });

        this.handleChange = this.handleChange.bind(this)
    }

    mapStation(stations, history){
      
      let arr = stations.map((obj, id) => {
          
        let log= history.filter((e)=>{
          
            return e.name == obj.name
        })
        
        let totalLibres = 0
        let totalUsadas = 0 

        log.forEach(element => {
          totalLibres += element.available_bikes
          totalUsadas += element.busy_bikes
        });

        return { expand: log, id: obj.id, name: obj.name, totalLibres, totalUsadas }

      })
      
      return arr
    }    

    handleChange(selectedOption)
    {
      const self = this
      
      fetch('http://localhost:3000/station/' + selectedOption.value, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(output => {
          this.setState({ selectedOption });

          let arr = self.mapStation(output.stations,output.stations_history)
          this.setState({ stations : arr }) 
          
          let totalLibres = 0
          let totalUsadas = 0

          arr.forEach(element => {
            totalLibres += element.totalLibres
            totalUsadas += element.totalUsadas
          });

          this.setState({totalLibres, totalUsadas})
      })     
    }

    render() {

      return (
      <React.Fragment>
        <Menu></Menu>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>

              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <div className="topbar-divider d-none d-sm-block"></div>
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Nelson Salinas</span>
                    <img className="img-profile rounded-circle" src="https://media.licdn.com/dms/image/C4E03AQHdzqhc2W7bpw/profile-displayphoto-shrink_200_200/0?e=1560384000&v=beta&t=JbLwuGeVX60UWJ3Fbe54OsqhagIWV5mV1RoOy71ljjQ" />
                  </a>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="card shadow mb-4">
                    <div className="card-body" >
                        <div style={{width:500 + 'px'}}>
                          <Select
                            placeholder="Filtrar por estación"
                            value={ this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.optionsFilter}
                            />
                        </div>
                    </div>
                  </div>  
                </div>
              </div>
                    
              <div className="row">
                <StationTable 
                  stations={this.state.stations} 
                  totalLibres={this.state.totalLibres} 
                  totalUsadas={this.state.totalUsadas}>
                </StationTable>

                <div className="col-xl-5 col-lg-5">
                  <LineChartStation data={this.state.data}></LineChartStation>

                  <BarChartStation data={this.state.data} ></BarChartStation>

                  <PieChartStation totalLibres={this.state.totalLibres} totalUsadas={this.state.totalUsadas}></PieChartStation>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
        
      </React.Fragment>
      )
    }
}
