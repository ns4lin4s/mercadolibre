import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';
import numeral from 'numeral'

export default class PieChartStation extends React.Component {

    constructor(props)
    {
        super(props)
    }

    render() {

        const data = [
            { name: 'disponibles (' +  numeral(this.props.totalLibres).format('0,0')+ ')', value: this.props.totalLibres },
            { name: 'ocupadas (' +  numeral(this.props.totalUsadas).format('0,0')+ ')', value: this.props.totalUsadas }
        ];
          
          const COLORS = ['#82ca9d', '#8884d8'];
          
          const RADIAN = Math.PI / 180;
          const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index,
          }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
          
            return (
              <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          };

        return (
            <div className="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Bicicletas ocupadas vs disponibles - Total: {numeral(this.props.totalLibres + this.props.totalUsadas).format('0,0')}</h6>
                </div>
                <div className="card-body">
                <PieChart width={400} height={400}>
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                    </Pie>
                </PieChart>
                    {/* <PieChart width={400} height={250}>
                        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                        <Pie data={data01} startAngle={180} endAngle={0}  dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8"  />
                        <Pie data={data02} startAngle={180} endAngle={0}  dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#858796" label />
                    </PieChart> */}
                </div>
            </div>
        )
    }

}

