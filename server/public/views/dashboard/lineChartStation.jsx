
import React from 'react';
import { LineChart, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class LineChartStation extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="card shadow mb-4 ">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Últimos 60 minutos (disponibles vs usadas)</h6>
                </div>
            <div className="card-body">
            <LineChart
                width={500}
                height={300}
                data={this.props.data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usadas" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="disponibles" stroke="#82ca9d" />
                <Brush startIndex={46} dataKey="name" height={30} stroke="#8884d8" />
            </LineChart>
            </div>
      
      </div>
        )
    }

}