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

        this.buildChart = this.buildChart.bind(this)

        this.handleChange = this.handleChange.bind(this)

        //BarChar & LineChart
        let data = []
        
        for(let i = 1; i <= 60; i++ )
        {
          data.push({ name: i.toString(), disponibles: 0, ocupadas: 0 })
        }

        this.state.data = data
        console.log(this.state.data )

        
    }

    loadGraph(){
      
      

      //recorre las estaciones
      let promise = new Promise((resolve,reject)=> {

        this.state.stations.forEach(station => {
          //recorre el historial
          station.expand.forEach(element => {
              
              //verifica si contiene la frase: hace x minutos
              let match = moment(element.date).fromNow().match(/hace (\d+|un) (minutos|minuto)/g)
  
              //en el caso de que realice el match entra a este if
              if(match != null && match.length > 0)
              {
                  let minutes_ago = 0
                  //extrae el numero y lo resta con 60min
                  if(match[0].match(/\d+/g) != null)
                      minutes_ago = (60 - parseInt(match[0].match(/\d+/g)[0], 10))
                  else
                      minutes_ago = (60 - 1)
                  
                  for(let i = 1; i <= 60; i++)
                  {
                    if(typeof data[i] !== 'undefined')
                    {
                      console.log(data[i].name)
                      debugger
                      if(parseInt(data[i].name ,10) == minutes_ago)
                      {
                        data[i].name = data[i].name
                        data[i].disponibles += element.available_bikes
                        data[i].ocupadas += element.busy_bikes
                      }
                    }
                  }
              }
                  
              //console.log(moment(element.date).fromNow())
          });
        })

        return resolve(data)

      }) 
      
      promise.then((data)=>{console.log(data); }) 
    
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
          console.log(output)
          this.setState({ selectedOption });

          let arr = this.mapStation(output.stations,output.stations_history)
          
          let totalLibres = 0
          let totalUsadas = 0

          arr.forEach(element => {
            totalLibres += element.totalLibres
            totalUsadas += element.totalUsadas
          });

          //BarChar & LineChart
          let data = []
            
          for(let i = 1; i <= 60; i++ )
          {
            data.push({ name: i.toString(), disponibles: 0, ocupadas: 0 })
          }

          this.setState({stations:arr, totalLibres, totalUsadas,data},()=>{
            output.graphs.forEach((e)=>{
              self.buildChart(e)
            })
          })

          

      })     
    }

    render() {

      return (
      <React.Fragment>

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
            <div className="row">
            <div className="col-xl-1 col-lg-1">
                </div>
                <div className="col-xl-10 col-lg-120">
              <div class="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              </div>
              </div>
              <div className="col-xl-1 col-lg-1">
                </div>
                </div>
              <div className="row">
                <div className="col-xl-1 col-lg-1">
                </div>
                <div className="col-xl-10 col-lg-120">
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
                <div className="col-xl-1 col-lg-1">
                </div>
              </div>
                    
              <div className="row">
                <div className="col-xl-1 col-lg-1">
                </div>
                <div className="col-xl-5 col-lg-5">
                  <LineChartStation data={this.state.data}></LineChartStation>

                  <BarChartStation data={this.state.data} ></BarChartStation>

                  <PieChartStation totalLibres={this.state.totalLibres} totalUsadas={this.state.totalUsadas}></PieChartStation>
                  
                </div>

                <div className="col-xl-5 col-lg-5">
                  <StationTable 
                      stations={this.state.stations} 
                      totalLibres={this.state.totalLibres} 
                      totalUsadas={this.state.totalUsadas}>
                    </StationTable>
                </div>
                <div className="col-xl-1 col-lg-1">
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
        
      </React.Fragment>
      )
    }

    buildChart(element)
    {
      //verifica si contiene la frase: hace x minutos
      let match = moment(element.date).fromNow().match(/hace (\d+|un) (minutos|minuto)/g)
  
      //en el caso de que realice el match entra a este if
      if(match != null && match.length > 0)
      {
          let minutes_ago = 0
          //extrae el numero y lo resta con 60min
          if(match[0].match(/\d+/g) != null)
              minutes_ago = (60 - parseInt(match[0].match(/\d+/g)[0], 10))
          else
              minutes_ago = (60 - 1)
          
          
          
          this.setState(state => {
            // const filter = state.data.filter(e => {
            //   return parseInt(e.name, 10) == minutes_ago
            // })
            const data = state.data.map((item, j) => {
              
              if (parseInt(item.name, 10) == minutes_ago) 
              {
                console.log("======================")
                console.log("minutes:" + minutes_ago)
                item.disponibles += element.available_bikes
                item.ocupadas += element.busy_bikes
                console.log("======================")
                return item
              } 
              else 
              {
                return item;
              }
            });
      
            return {
              data
            };
          });



          // for(let i = 0; i <= this.state.data.length; i++)
          // {
          //   if(this.state.data[i].name == minutes_ago)
          //   {

              

          //     // let temp = this.state.data[i]
          //     // this.setState({data: })
          //     // let tmp = [...this.state.data];
          //     // tmp[i]['name'] = res.data.length
          //     // this.setState({contributors: tmp})

          //     // this.state.data.forEach(element => {
              
          //     // });
          //   }
          // }
          

          // let found = this.state.data.find(e=>{
          //   return parseInt(e.name, 10) == minutes_ago
          // })

          // if(found != null)
          // {
          //   console.log(found)
          //   found.disponibles += element.available_bikes
          //   found.usadas += element.busy_bikes
          // }
      }
    }

    componentDidMount()
    {
      this.props.graphs.forEach(element => {

        this.buildChart(element)

        // let logs = station.expand.filter((e)=>{
          
        //   return e.date > date && e.date < Date.now()
        // })

        //recorre el historial
        // station.expand.forEach(element => {

          

        //   //verifica si contiene la frase: hace x minutos
        //   let match = moment(element.date).fromNow().match(/hace (\d+|un) (minutos|minuto)/g)
  
        //   //en el caso de que realice el match entra a este if
        //   if(match != null && match.length > 0)
        //   {
        //       let minutes_ago = 0
        //       //extrae el numero y lo resta con 60min
        //       if(match[0].match(/\d+/g) != null)
        //           minutes_ago = (60 - parseInt(match[0].match(/\d+/g)[0], 10))
        //       else
        //           minutes_ago = (60 - 1)
              
        //       console.log("estoy aca")
        //       // for(let i = 1; i <= 60; i++)
        //       // {
        //       //   if(typeof data[i] !== 'undefined')
        //       //   {
        //       //     console.log(data[i].name)
        //       //     debugger
        //       //     if(parseInt(data[i].name ,10) == minutes_ago)
        //       //     {
        //       //       data[i].name = data[i].name
        //       //       data[i].disponibles += element.available_bikes
        //       //       data[i].usadas += element.busy_bikes
        //       //     }
        //       //   }
        //       // }
        //   }
        // })
      })
    }
}
