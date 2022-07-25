import React from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const Wrapper = styled.div``;

const Gauge = ({ id = "gauge", height = "150", width = "150" }) => {
    var data = {
        datasets: [
            {
                data: [70, 10],
                backgroundColor: ["#0d3e99", "#ddd"],
                display: true,
                border: "1px solid #D1D6DC",
                borderColor: "#D1D6DC",
                circumference: 66 * Math.PI,
                rotation: 81.5 * Math.PI
            }
        ]
    };

    return (
        <>
            <Wrapper>
                <Doughnut
                    id={id}
                    height={height}
                    width={width}
                    data={data}
                    options={{
                        responsive: true,
                        cutoutPercentage: 100,
                        // onClick: (evt, element) => {
                        //   if (element.length > 0) {
                        //     var ind = element[0].index;
                        //     console.log(ind);
                        //   }
                        // }
                    }}
                />
            </Wrapper>
        </>
    );
};

export default Gauge;
