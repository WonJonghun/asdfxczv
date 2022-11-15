function creat_chart(id, data, labels, limit_temp) {
    const ctx = document.getElementById(id).getContext('2d');

    var data = {
        datasets: [{
            //y축 data
            data: data,
            //기본 borderColor가 없으면 그라데이션이 됨. 난 단색으로 하고싶어서 넣어줌
            // borderColor: '#6fba2c',
            //얼마나 부드러울 것이냐. 낮을 수록 꺾은선 됨
            // tension:0.4
        }],
        //date나 시간 같은 x축
        labels: labels,
    };

    //차트만들기
    lineChart = new Chart(ctx, {
        type: 'line',
        //여기서 색을 넣어주는것
        plugins: [{
            afterLayout: chart => {
                let ctx = chart.ctx;
                ctx.save();
                let yAxis = chart.scales.y;

                //기준값을 넣어준다
                let ymaxValue = yAxis.getPixelForValue(limit_temp);
                let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);


                //기준선 넘었을 때 색상은 #dc0e0e (빨간색)
                gradient.addColorStop(0, 'red');
                //   let offset = 1 / yAxis.bottom * ymaxValue;//0~1

                // console.log( 'yAxis.top',yAxis.top)
                // console.log( 'yAxis.bottom',yAxis.bottom)
                // console.log( '계산 기준 ',yAxis.bottom - yAxis.top)
                // console.log( ' ymaxValue ', ymaxValue)


                let offset = ymaxValue / yAxis.bottom;//0~1
                offset = Math.abs(offset)
                if (offset > 1) { offset = 1 }
                // console.log(offset)
                gradient.addColorStop(offset, 'yellow');
                //기준값 아래의 색상은 #6fba2c (연두색)
                gradient.addColorStop(1, '#6fba2c');
                chart.data.datasets[0].borderColor = gradient;
                ctx.restore();


            }
        }],
        //위에서 설정한 data값 가져옴      
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: limit_temp,
                            yMax: limit_temp,
                            borderDash: [6, 6],
                            borderDashOffset: 0,
                            borderWidth: 3,
                            borderColor: 'rgb(255, 99, 132, 0.43)',
                            borderWidth: 2,
                        },
                        label: {
                            content: limit_temp + '°C',
                            display: true,
                            position: 'start',
                            backgroundColor: 'rgb(255, 99, 132, 0.43)',
                        }
                    },
                }
            },
            clip: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback(value) {
                            if (value % 1 === 0) {
                                return value;
                            }
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        drawBorder: false
                    }
                }
            }
        }
    });
}//function

function creat_chart2(id, data1, data2, labels, limit_temp, month) {
    const ctx = document.getElementById(id).getContext('2d');

    var data = {
        datasets: [
            {
            //y축 data
            label: month[0],
            data: data1,
            //기본 borderColor가 없으면 그라데이션이 됨. 난 단색으로 하고싶어서 넣어줌
            // borderColor: '#6fba2c',
            //얼마나 부드러울 것이냐. 낮을 수록 꺾은선 됨
            // tension:0.4
            },
            {
                borderColor:"rgb(196,196,196,0.8)",
                label: month[1],
                data: data2,
            }
        ],
        //date나 시간 같은 x축
        labels: labels,
    };

    //차트만들기
    lineChart = new Chart(ctx, {
        type: 'line',
        //여기서 색을 넣어주는것
        plugins: [{
            afterLayout: chart => {
                let ctx = chart.ctx;
                ctx.save();
                let yAxis = chart.scales.y;

                //기준값을 넣어준다
                let ymaxValue = yAxis.getPixelForValue(limit_temp);
                let gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);


                //기준선 넘었을 때 색상은 #dc0e0e (빨간색)
                gradient.addColorStop(0, 'red');
                //   let offset = 1 / yAxis.bottom * ymaxValue;//0~1

                // console.log( 'yAxis.top',yAxis.top)
                // console.log( 'yAxis.bottom',yAxis.bottom)
                // console.log( '계산 기준 ',yAxis.bottom - yAxis.top)
                // console.log( ' ymaxValue ', ymaxValue)


                let offset = ymaxValue / yAxis.bottom;//0~1
                offset = Math.abs(offset)
                if (offset > 1) { offset = 1 }
                // console.log(offset)
                gradient.addColorStop(offset, 'yellow');
                //기준값 아래의 색상은 #6fba2c (연두색)
                gradient.addColorStop(1, '#6fba2c');
                chart.data.datasets[0].borderColor = gradient;
                ctx.restore();


            }
        }],
        //위에서 설정한 data값 가져옴      
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line',
                            yMin: limit_temp,
                            yMax: limit_temp,
                            borderDash: [6, 6],
                            borderDashOffset: 0,
                            borderWidth: 3,
                            borderColor: 'rgb(255, 99, 132, 0.43)',
                            borderWidth: 2,
                        },
                        label: {
                            content: limit_temp + '°C',
                            display: true,
                            position: 'start',
                            backgroundColor: 'rgb(255, 99, 132, 0.43)',
                        }
                    },
                }
            },
            clip: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback(value) {
                            if (value % 1 === 0) {
                                return value;
                            }
                        }
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        drawBorder: false
                    }
                }
            }
        }
    });
}//function
