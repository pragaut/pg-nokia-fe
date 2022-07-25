import React from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

const Wrapper = styled.div``;

const LineChart = ({ id = "line", height = "110", width = "150" }) => {
    const data = {
        labels: [" ", " ", " ", " ", " ", " ", " "],
        datasets: [
            {
                label: "",
                data: [30, 40, 45, 47, 45, 40, 30],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: " ",
                data: [35, 35, 35, 35, 35, 35, 35],
                fill: false,
                borderColor: "#0d3e99"
            }
        ]
    };

    return (
        <>
            <Wrapper>
                <Line
                    id={id}
                    height={height}
                    width={width}
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

export default LineChart;
