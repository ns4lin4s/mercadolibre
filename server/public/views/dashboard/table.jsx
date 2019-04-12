import React from 'react';
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';
import moment from 'moment';

export default class StationTable extends React.Component {

    constructor(props)
    {
        super(props)

        moment.locale('es')
    }

    createCustomSearchField(props) {
        return (
          <SearchField
            className='find_by_station'
            defaultValue=""
            placeholder="Búsqueda rápida.."/>
        );
      }
  
    isExpandableRow(row) {
        return true;
    }

      expandColumnComponent({ isExpandableRow, isExpanded }) {
        let content = '';
    
        if (isExpandableRow) {
          content = (isExpanded ? '(-)' : '(+)' );
        } else {
          content = ' ';
        }
        return (
          <div> { content } </div>
        );
      }
  
      expandComponent(row) {
        
  
        let arr = row.expand.map((obj,i) => {
          return { date:  moment(obj.date).fromNow() , id: obj.id, available_bikes: obj.available_bikes, busy_bikes: obj.busy_bikes}
        })
  
        let options = {
                hideSizePerPage: true,
                pageStartIndex: 1, 
                paginationSize: 3, 
                prePage: '<', 
                nextPage: '>', 
                firstPage: '<<', 
                //paginationPosition: 'top' ,
                lastPage: '>>', 
                sizePerPage: 10,
                sizePerPageList: [ {
                  text: '10', value: 10
                }, {
                  text: '20', value: 20
                }, {
                  text: 'Todos', value: arr.length
                } ]
        }
        
        return (
          <BootstrapTable data={ arr } ignoreSinglePage  pagination={true}  options={options}>
            <TableHeaderColumn dataField='id' hidden isKey={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn width='40' dataField='available_bikes'>Disponibles</TableHeaderColumn>
            <TableHeaderColumn width='40' dataField='busy_bikes'>Ocupadas</TableHeaderColumn>
            <TableHeaderColumn width='90' dataField='date'>Última actualización</TableHeaderColumn>
          </BootstrapTable>
        );
      }


      render()
      {

        const options = {
            totalUsadas: this.props.totalUsadas,
            totalLibres: this.props.totalLibres,
            searchPosition: 'left',
            paginationPosition: 'top' ,
            searchField: this.createCustomSearchField,
            expandRowBgColor: 'rgb(255, 255, 255)',
            expandBy: 'column',
            sortIndicator: true,
            defaultSortName: 'name',
            defaultSortOrder: 'asc',
            page: 1,
            sizePerPageList: [ {
            text: '10', value: 10
            }, {
            text: '20', value: 20
            }
            , {
                text: '50', value: 50
            }
            , {
            text: 'Todos', value: this.props.stations.length
            } ],
            sizePerPage: 10,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>'
        }

          return (
          
            <div className="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Estaciones</h6>
                </div>
                <div className="card-body">
                <div className="table-responsive">
                    
                    <BootstrapTable 
                    ref='table'
                    search={ true }
                    ignoreSinglePage
                    multiColumnSearch={ true }
                    data={this.props.stations} 
                    expandableRow={ this.isExpandableRow }
                    expandComponent={ this.expandComponent }
                    expandColumnOptions={ {
                        expandColumnVisible: true,
                        expandColumnComponent: this.expandColumnComponent,
                        columnWidth: 50
                    } }
                    pagination={true}  
                    options={options}>
                        <TableHeaderColumn hidden isKey dataField='id'></TableHeaderColumn>
                        <TableHeaderColumn width='180'  dataField='name' dataSort>Ordenar</TableHeaderColumn>
                        <TableHeaderColumn width='70' dataField='totalLibres' dataSort>Total Libres</TableHeaderColumn>
                        <TableHeaderColumn width='80' dataField='totalUsadas' dataSort>Total Ocupadas</TableHeaderColumn>
                        
                    </BootstrapTable>

                    </div>
                </div>
            </div>
        )
      }

}