function create_circle (id, temp, allow_temp, name) {
    var palette = ['#AAF78B', '#FFE853', '#EE6352'];
        var value1 = temp;
    
        var chart = new JSC.chart(id, {
            legend_visible: false,
            palette: {
                pointValue: '%yValue',
                ranges: [
                    { value: [0, 70], color: palette[0] },
                    { value: [70, 145], color: palette[1] },
                    { value: [145, 300], color: palette[2] }
                ]
            },
            xAxis: [
                {
                    id: 'xAx1',
                    scale: { range: [0, 1] }
                },
                {
                    id: 'xAx2',
                    spacingPercentage: 0.4,
                    defaultTick_gridLine_color: '#ECEFF1'
                }
            ],
            yAxis: [
                {
                    id: 'yAx2',
                    defaultTick: {
                        padding: 13,
                        label_visible: false
                        // enabled:false 
                    },
                    line: {
                        width: 15,
                        // breaks_gap:.03, 
                        color: 'smartPalette'
                    },
                    scale: { range: [0, 300], interval: 10 }
                }
            ],
            defaultTooltip_enabled: false,
            defaultSeries: {
                type: 'gauge marker',
                opacity: 1,
                shape: {
                    size: '100%',
                    padding: 0,
                    label: {
                        text: temp+'°C',
                        align: 'center',
                        verticalAlign: 'middle',
                        offset: '0,10',
                        style: { fontSize: '25px' }
                    }
                }
            },
            defaultPoint: {
                marker: {
                    type: 'circle',
                    outline: { width: 8 }
                }
            },
            series: [
                {
                    yAxis: 'yAx2',
                    xAxis: 'xAx1',
                    defaultPoint: {
                        marker: {
                            outline: { color: 'white' },
                            fill: 'none',
                            size: 20
                        }
                    },
                    points: [{ x: 0, y: value1 }]
                }
            ]
        });

}
// var palette = ['#AAF78B', '#FFE853', '#EE6352'];
// 	var value1 = 50;

// 	var chart = new JSC.chart('chartDiv', {
// 		legend_visible: false,
// 		palette: {
// 			pointValue: '%yValue',
// 			ranges: [
// 				{ value: [0, 30], color: palette[0] },
// 				{ value: [30, 70], color: palette[1] },
// 				{ value: [70, 100], color: palette[2] }
// 			]
// 		},
// 		xAxis: [
// 			{
// 				id: 'xAx1',
// 				scale: { range: [0, 1] }
// 			},
// 			{
// 				id: 'xAx2',
// 				spacingPercentage: 0.4,
// 				defaultTick_gridLine_color: '#ECEFF1'
// 			}
// 		],
// 		yAxis: [
// 			{
// 				id: 'yAx2',
// 				defaultTick: {
// 					padding: 13,
// 					label_visible: false
// 					// enabled:false 
// 				},
// 				line: {
// 					width: 15,
// 					// breaks_gap:.03, 
// 					color: 'smartPalette'
// 				},
// 				scale: { range: [0, 100], interval: 10 }
// 			}
// 		],
// 		defaultTooltip_enabled: false,
// 		defaultSeries: {
// 			type: 'gauge marker',
// 			opacity: 1,
// 			shape: {
// 				size: '86%',
// 				padding: 0,
// 				label: {
// 					text: 'text°C',
// 					align: 'center',
// 					verticalAlign: 'middle',
// 					offset: '0,10',
// 					style: { fontSize: '30px' }
// 				}
// 			}
// 		},
// 		defaultPoint: {
// 			marker: {
// 				type: 'circle',
// 				outline: { width: 8 }
// 			}
// 		},
// 		series: [
// 			{
// 				yAxis: 'yAx2',
// 				xAxis: 'xAx1',
// 				defaultPoint: {
// 					marker: {
// 						outline: { color: 'white' },
// 						fill: 'none',
// 						size: 20
// 					}
// 				},
// 				points: [{ x: 0, y: value1 }]
// 			}
// 		]
// 	});