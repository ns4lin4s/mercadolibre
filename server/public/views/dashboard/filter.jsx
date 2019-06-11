import React from 'react';
import {BootstrapTable, TableHeaderColumn, SearchField} from 'react-bootstrap-table';
import moment from 'moment';

export default class Filter extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render()
    {

        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true  // enable click to select
        };

        const options = {
            
            // searchPosition: 'left',
            paginationPosition: 'top' ,
            //searchField: this.createCustomSearchField,
            //expandRowBgColor: 'rgb(255, 255, 255)',
            //expandBy: 'column',
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
            text: 'Todos', value: 38
            } ],
            sizePerPage: 10,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: '<',
            nextPage: '>',
            firstPage: '<<',
            lastPage: '>>'
        }

        const comunas = [
            {
                "id": 1,
                "name": "Alhue",
                "available": 5
            },
            {
                "id": 2,
                "name": "Buin",
                "available": 3
            },
            {
                "id": 3,
                "name": "Calera de Tango",
                "available": 4
            },
            {
                "id": 4,
                "name": "Cerrillos",
                "available": 4
            },
            {
                "id": 5,
                "name": "Cerro Navia",
                "available": 4
            },
            {
                "id": 6,
                "name": "Colina",
                "available": 4
            },
            {
                "id": 7,
                "name": "Conchalí",
                "available": 4
            },
            {
                "id": 7,
                "name": "Curacaví",
                "available": 4
            },
            {
                "id": 8,
                "name": "El Bosque",
                "available": 4
            },
            {
                "id": 8,
                "name": "El Monte",
                "available": 4
            },
            {
                "id": 9,
                "name": "Estación Central",
                "available": 4
            },
            {
                "id": 10,
                "name": "Huechuraba",
                "available": 4
            },
            {
                "id": 11,
                "name": "Independencia",
                "available": 4
            },
            {
                "id": 12,
                "name": "Isla de Maipo",
                "available": 4
            },
            {
                "id": 13,
                "name": "La Cisterna",
                "available": 4
            },
            {
                "id": 14,
                "name": "La Florida",
                "available": 4
            },
            {
                "id": 15,
                "name": "La Granja",
                "available": 4
            },
            {
                "id": 16,
                "name": "La Pintana",
                "available": 4
            },
            {
                "id": 17,
                "name": "La Reina",
                "available": 4
            },
            {
                "id": 18,
                "name": "Lampa",
                "available": 4
            },
            {
                "id": 19,
                "name": "Las Condes",
                "available": 4
            },
            {
                "id": 20,
                "name": "Lo Barnechea",
                "available": 4
            },
            {
                "id": 21,
                "name": "Lo Espejo",
                "available": 4
            },
            {
                "id": 22,
                "name": "Lo Prado",
                "available": 4
            },
            {
                "id": 23,
                "name": "Macul",
                "available": 4
            },
            {
                "id": 24,
                "name": "Maipú",
                "available": 4
            },
            {
                "id": 25,
                "name": "María Pinto",
                "available": 4
            },
            {
                "id": 26,
                "name": "Melipilla",
                "available": 4
            },
            {
                "id": 27,
                "name": "Ñuñoa",
                "available": 4
            },
            {
                "id": 28,
                "name": "P. Aguirre Cerda",
                "available": 4
            },
            {
                "id": 29,
                "name": "Padre Hurtado",
                "available": 4
            },
            {
                "id": 30,
                "name": "Paine",
                "available": 4
            },
            {
                "id": 31,
                "name": "Peñaflor",
                "available": 4
            },
            {
                "id": 32,
                "name": "Peñalolen",
                "available": 4
            },
            {
                "id": 33,
                "name": "Pirque",
                "available": 4
            },
            {
                "id": 34,
                "name": "Providencia",
                "available": 4
            },
            {
                "id": 35,
                "name": "Pudahuel",
                "available": 4
            },
            {
                "id": 36,
                "name": "Puente Alto",
                "available": 4
            },
            {
                "id": 37,
                "name": "Quilicura",
                "available": 4
            },
            {
                "id": 38,
                "name": "Quinta Normal",
                "available": 4
            }
        ]

        return (
            <div className="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Filtros</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">

                        <BootstrapTable pagination={true}  ignoreSinglePage data={ comunas } selectRow={ selectRowProp } options={options}>
                            <TableHeaderColumn hidden dataField='id' isKey>Product ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>Comunas</TableHeaderColumn>
                            <TableHeaderColumn dataField='available'>Disponibles</TableHeaderColumn>
                        </BootstrapTable>
                    
                    </div>
                </div>
            </div>
        )
    }

}