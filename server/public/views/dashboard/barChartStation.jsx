
import React from 'react';
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class BarChartStation extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render()
    {
        return (
            <div className="card shadow mb-4 ">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Gráfico de barras</h6>
                </div>
            <div className="card-body">
                <BarChart
                    width={750}
                    height={300}
                    data={this.props.data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush startIndex={50} dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="ocupadas" fill="#8884d8" />
                    <Bar dataKey="disponibles" fill="#82ca9d" />
                </BarChart>
            </div>
      
      </div>
        )
    }

}