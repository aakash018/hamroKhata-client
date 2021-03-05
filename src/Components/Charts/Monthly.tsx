import React from 'react'

import { Line } from 'react-chartjs-2';

interface Props {
    width: number,
    height: number,
    display: boolean
}

const Monthly: React.FC<Props> = ({ width, height, display }) => {

    if (!display) return null

    const state = {
        labels: ['January', 'February', 'March', 'April', 'May', 'January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Expenditure',
                fill: false,
                lineTension: 0.5,
                backgroundColor: '#f64569',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 50, 60, 40, 65, 59, 80, 50, 60, 40]
            }
        ]
    }

    return (
        <>
            <Line data={state} options={{
                title: {
                    display: true,
                    text: 'Monthly Expenditure',
                    fontFamily: "Poppins",
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'right'
                },
                responsive: false,
                animation: { duration: 1500 }
            }} width={width} height={height} />
        </>
    )
}

export default Monthly

