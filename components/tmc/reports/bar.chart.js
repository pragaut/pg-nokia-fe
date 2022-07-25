import React from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

const Wrapper = styled.div``;

const BarChart = ({ id = "bar", height = "150", width = (props => props.width?props.width:"1000px") }) => {
    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        datasets: [
            {
                label: "Working hours",
                data: [11, 2, 3, 4, 6, 7, 9, 4, 5, 8, 6, 4, 5, 6, 7, 8, 7, 6, 5, 6, 7, 8, 8, 5, 5, 5, 6, 7, 8, 9, 2, 12, 3, 3, 11],
                backgroundColor: "green"
            },
        ]
    };
    
    return (
        <>
            <Wrapper>
                <Bar
                    id={id}
                    height={height}
                    width={width ? width : "1000px"}
                    data={data}
                    options={{
                        responsive: true,
                        // onClick: (evt, element) => {
                        //   if (element.length > 0) {
                        //     var ind = element[0].index;
                        //     console.log(ind);
                        //   }
                        // }
                        legend: {
                            display: false //This will do the task
                        },
                        maintainAspectRatio: true
                    }}
                />
            </Wrapper>
        </>
    );
};

export default BarChart;
