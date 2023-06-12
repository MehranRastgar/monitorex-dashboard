import { Datum, SensorsReportType } from "src/store/slices/analizeSlice";

export const Granolarity: number[] = [1, 2, 5, 10, 20, 50];

// export default class Chart {
// 	private multiAxis: boolean = true
// 	private justPoint: boolean = false
// 	private chartMode: 'spline' | 'line' = 'line'
// 	private lineAccesible: 'dashDot' | 'line' = 'line'
// 	private divideBy: number = 100
// 	private continues: boolean = false

// 	constructor() {
// 	}
// 	makeData(data: Datum[]) {
// 		const localOffset = new Date().getTimezoneOffset();

// 		// Convert the offset to seconds and invert the sign
// 		const offsetSeconds = localOffset * -60 * 1000;
// 		const arr: any[] = [];
// 		data.map((item, index) => {
// 			if (item?.x !== undefined && index % Granolarity[this.divideBy] === 0)
// 				if (item?.y !== undefined || this.continues)
// 					arr.push([
// 						new Date(item?.x).getTime() + offsetSeconds,
// 						item?.y ?? null,
// 					]);
// 		});

// 		//console.log("len of array", arr.length);
// 		return arr;
// 	}
// 	makeMultiAxis() {
// 		const arr: any[] = [];
// 	}
// 	//make a function to get date and time

// 	sumOfdata(data: SensorsReportType[]) {
// 		const arrSeries: any[] = [];
// 		const arrAxisY: any[] = [];
// 		data?.map((sens, index) => {
// 			if (sens?.data !== undefined) {
// 				if (this.multiAxis === true) {
// 					arrSeries.push(
// 						{
// 							lineWidth: this.justPoint ? 0 : 2,
// 							marker: {
// 								enabled: this.justPoint,
// 								radius: 2,
// 							},
// 							id: sens.sensor?._id,
// 							type: this.chartMode,
// 							yAxis: index,
// 							name: sens.device.title + "-" + sens.sensor?.title,
// 							dashStyle: this.lineAccesible ? "dashDot" : "line",
// 							// pointInterval: 6e4, // one hour
// 							// relativeXValue: true,
// 							data: [...this.makeData(sens?.data)],
// 						}
// 						// {
// 						//   type: "column",
// 						//   id: sens.sensor?._id,
// 						//   name: "sensor-" + sens.sensor?.title,
// 						//   data: [...makeData(sens?.data)],
// 						//   yAxis: 1,
// 						// }
// 					);
// 					arrAxisY.push({
// 						// Primary yAxis
// 						labels: {
// 							format: "{value}" + sens.sensor?.unit,
// 							// style: {
// 							//   color: `{series.color}`,
// 							// },
// 						},
// 						title: {
// 							text: sens.device.title + "-" + sens.sensor?.title,
// 							// style: {
// 							//   color: `{series.color}`,
// 							// },
// 						},
// 						opposite: false,
// 					});
// 				} else {
// 					arrSeries.push({
// 						lineWidth: this.justPoint ? 0 : 1,
// 						marker: {
// 							enabled: this.justPoint,
// 							radius: 2,
// 						},
// 						id: sens.sensor?._id,
// 						type: this.chartMode,
// 						name: sens?.device?.title + ":" + sens?.sensor?.title,
// 						dashStyle: this.lineAccesible ? "dashDot" : "line",

// 						// pointInterval: 6e4, // one hour
// 						// relativeXValue: true,
// 						data: [...this.makeData(sens?.data)],
// 					});
// 				}
// 			}
// 		});

// 		const makedData = {
// 			chartOptions: {
// 				exporting: {
// 					enabled: false,
// 				},
// 				colors: [
// 					"var(--chart-color-1)",
// 					"var(--chart-color-2)",
// 					"var(--chart-color-3)",
// 					"blue",
// 					"green",
// 					"cyan",
// 					"yellow",
// 					"var(--text-color)",
// 				],
// 				chart: {
// 					alignTicks: true,
// 					backgroundColor: "var(--chart-bgc)",
// 				},
// 				legend: {
// 					itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
// 					itemHoverStyle: { color: "var(--dev-bgc-selected)" },
// 					itemStyle: { color: "var(--text-color)" },
// 					enabled: true,
// 					align: "left",
// 					alignColumns: true,
// 					backgroundColor: "var(--chart-bgc)",
// 					floating: false,
// 				},
// 				// tooltip: {
// 				//   shared: true,
// 				// },
// 				tooltip: {
// 					// snap: 1 / 24,
// 					// stickOnContact: true,
// 					valueSuffix: "",
// 					pointFormat:
// 						'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
// 					valueDecimals: 1,
// 					split: true,
// 					useHTML: true,
// 					headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
// 					// pointFormat:
// 					//   '<tr><td style="color: {series.color}">{series.name} </td>' +
// 					//   '<td style="text-align: right"><b>{point.y} {series.name}</b></td></tr>',
// 					footerFormat: "</table>",
// 					xDateFormat: "%Y-%m-%d %H:%M:%S",
// 					shared: true,
// 				},
// 				plotOptions: {
// 					series: {
// 						showInLegend: true,
// 						accessibility: {
// 							exposeAsGroupOnly: true,
// 						},
// 					},
// 				},
// 				rangeSelector: {
// 					enabled: false,

// 					buttons: [
// 						{
// 							type: "hour",
// 							count: 6,
// 							text: "6h",
// 						},
// 						{
// 							type: "hour",
// 							count: 12,
// 							text: "12h",
// 						},
// 						{
// 							type: "day",
// 							count: 1,
// 							text: "1d",
// 						},
// 						{
// 							type: "day",
// 							count: 7,
// 							text: "7d",
// 						},
// 						{
// 							type: "day",
// 							count: 14,
// 							text: "14d",
// 						},
// 						{
// 							type: "month",
// 							count: 1,
// 							text: "1m",
// 						},
// 						{
// 							type: "month",
// 							count: 3,
// 							text: "3m",
// 						},
// 						{
// 							type: "all",
// 							text: "All",
// 						},
// 					],
// 					selected: 7,
// 				},
// 				title: {
// 					text: "Report Sensors",
// 					floating: false,
// 					align: "center",
// 					x: -30,
// 					y: 30,
// 				},
// 				scrollbar: {
// 					barBackgroundColor: "gray",
// 					barBorderRadius: 7,
// 					barBorderWidth: 0,
// 					buttonBackgroundColor: "gray",
// 					buttonBorderWidth: 0,
// 					buttonBorderRadius: 7,
// 					trackBackgroundColor: "none",
// 					trackBorderWidth: 1,
// 					trackBorderRadius: 8,
// 					trackBorderColor: "#CCC",
// 					enabled: false,
// 				},
// 				series: [...arrSeries],
// 				yAxis: [...arrAxisY],
// 			},
// 		}
// 		return {
// 			chartOptions: {
// 				...testchart,
// 				series: [...arrSeries],
// 				yAxis: [...arrAxisY]
// 			},

// 		}
// 	}



// }


export default class HighchartsData {
	private series: { name: string; data: Datum[] }[] = [];
	private categories: string[] = [];
	private yAxisTitles: string[] = [];
	private chartTitle = 'nothing';

	constructor(private reportData: SensorsReportType[]) {
		this.processData();
	}

	private processData() {
		this.reportData.forEach((report) => {
			const { data = [], sensor = {} } = report;
			const { title = '', unit = '' } = sensor;

			this.yAxisTitles.push(unit);
			this.categories = Array.from(new Set([...this.categories, ...data.map((d) => d.x)]));

			this.series.push({
				name: title,
				type: 'spline',

				data: this?.categories?.map((x) => {
					const datum = data?.find((d) => d.x === x);
					return datum?.y ? datum?.y : null;
				}),
			});
		});

		this.categories.sort();
		this.chartTitle = this.yAxisTitles.join(', ');
	}

	public getChartData() {
		return {
			chart: {
				zoomType: 'xy',
				backgroundColor: "var(--bgc)",
			},
			colors: [
				"var(--chart-color-1)",
				"var(--chart-color-2)",
				"var(--chart-color-3)",
				"blue",
				"green",
				"cyan",
				"yellow",
				"var(--text-color)",
			],
			title: {
				text: this.chartTitle,
			},
			xAxis: {
				categories: this.categories,
				// type: 'datetime',
				// dateTimeLabelFormats: { // don't display the year
				// 	month: '%e. %b',
				// 	year: '%b'
				// },
				// title: {
				// 	text: 'Date'
				// }
			},
			yAxis: this.yAxisTitles.map((title) => ({
				title: {
					text: title,
				},
			})),
			tooltip: {
				shared: true
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				x: 80,
				verticalAlign: 'top',
				y: 55,
				floating: true,
				backgroundColor:

					'rgba(255,255,255,0.25)'
			},
			series: this.series,
		};
	}
}



// export default class HighchartsData {
// 	private data: Datum[] = [];
// 	private categories: string[] = [];
// 	private yAxisTitle = '';
// 	private chartTitle = '';

// 	constructor(private reportData: SensorsReportType) {
// 		this.processData();
// 	}

// 	private processData() {
// 		const { data = [], sensor = {} } = this.reportData;
// 		const { title = '', unit = '' } = sensor;

// 		this.yAxisTitle = unit;
// 		this.chartTitle = title;

// 		data.forEach((d) => {
// 			if (d.x && d.y) {
// 				this.categories.push(d.x);
// 				this.data.push(d);
// 			}
// 		});
// 	}

// 	public getChartData() {
// 		return {
// 			title: {
// 				text: this.chartTitle,
// 			},
// 			xAxis: {
// 				categories: this.categories,
// 			},
// 			yAxis: {
// 				title: {
// 					text: this.yAxisTitle,
// 				},
// 			},
// 			series: [
// 				{
// 					name: this.yAxisTitle,
// 					data: this.data.map(({ y }) => y),
// 				},
// 			],
// 		};
// 	}
// }

// export {HighchartsData};














const testchart = {
	chart: {
		zoomType: 'xy',
		backgroundColor: "var(--bgc)",
	},
	colors: [
		"var(--chart-color-1)",
		"var(--chart-color-2)",
		"var(--chart-color-3)",
		"blue",
		"green",
		"cyan",
		"yellow",
		"var(--text-color)",
	],
	title: {
		text: 'Environment Monitoring',
		align: 'left'
	},
	subtitle: {
		text: 'Source: Monitorex.ir',
		align: 'left'
	},
	xAxis: [
		{
			type: 'datetime',
			dateTimeLabelFormats: { // don't display the year
				month: '%e. %b',
				year: '%b'
			},
			title: {
				text: 'Date'
			}
		}
		// 	{
		// 	date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		// 		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		// 	crosshair: true
		// }
	],
	yAxis: [{ // Primary yAxis
		labels: {
			format: '{value}°C',
			style: {
				color: 'blue'
			}
		},
		title: {
			text: 'Temperature',
			style: {
				color: 'yellow'
			}
		},
		opposite: true

	}, { // Secondary yAxis
		gridLineWidth: 0,
		title: {
			text: 'Rainfall',
			style: {
				color: 'green'
			}
		},
		labels: {
			format: '{value} mm',
			style: {
				color: 'black'
			}
		}

	}, { // Tertiary yAxis
		gridLineWidth: 0,
		title: {
			text: 'Sea-Level Pressure',
			style: {
				color: 'blue'
			}
		},
		labels: {
			format: '{value} mb',
			style: {
				color: 'brown'
			}
		},
		opposite: true
	}],
	tooltip: {
		shared: true
	},
	legend: {
		layout: 'vertical',
		align: 'left',
		x: 80,
		verticalAlign: 'top',
		y: 55,
		floating: true,
		backgroundColor:

			'rgba(255,255,255,0.25)'
	},
	// series: [{
	// 	name: 'Rainfall',
	// 	type: 'column',
	// 	yAxis: 1,
	// 	data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
	// 	tooltip: {
	// 		valueSuffix: ' mm'
	// 	}

	// }, {
	// 	name: 'Sea-Level Pressure',
	// 	type: 'spline',
	// 	yAxis: 2,
	// 	data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
	// 	marker: {
	// 		enabled: false
	// 	},
	// 	dashStyle: 'shortdot',
	// 	tooltip: {
	// 		valueSuffix: ' mb'
	// 	}

	// }, {
	// 	name: 'Temperature',
	// 	type: 'spline',
	// 	data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
	// 	tooltip: {
	// 		valueSuffix: ' °C'
	// 	}
	// }],
	series: [
		{
			name: 'Winter 2019-2020',
			yAxis: 1,
			data: [
				[Date.UTC(1970, 9, 24), 0],
				[Date.UTC(1970, 9, 27), 0.12],
				[Date.UTC(1970, 9, 30), 0.09],
				[Date.UTC(1970, 10, 3), 0.13],
				[Date.UTC(1970, 10, 6), 0.12],
				[Date.UTC(1970, 10, 9), 0.13],
				[Date.UTC(1970, 10, 12), 0.13],
				[Date.UTC(1970, 10, 15), 0.16],
				[Date.UTC(1970, 10, 18), 0.19],
				[Date.UTC(1970, 10, 21), 0.25],
				[Date.UTC(1970, 10, 24), 0.26],
				[Date.UTC(1970, 10, 27), 0.24],
				[Date.UTC(1970, 10, 30), 0.25],
				[Date.UTC(1970, 11, 3), 0.26],
				[Date.UTC(1970, 11, 6), 0.36],
				[Date.UTC(1970, 11, 9), 0.43],
				[Date.UTC(1970, 11, 12), 0.32],
				[Date.UTC(1970, 11, 15), 0.48],
				[Date.UTC(1970, 11, 18), 0.5],
				[Date.UTC(1970, 11, 21), 0.44],
				[Date.UTC(1970, 11, 24), 0.43],
				[Date.UTC(1970, 11, 27), 0.45],
				[Date.UTC(1970, 11, 30), 0.4],
				[Date.UTC(1971, 0, 3), 0.39],
				[Date.UTC(1971, 0, 6), 0.56],
				[Date.UTC(1971, 0, 9), 0.57],
				[Date.UTC(1971, 0, 12), 0.68],
				[Date.UTC(1971, 0, 15), 0.93],
				[Date.UTC(1971, 0, 18), 1.11],
				[Date.UTC(1971, 0, 21), 1.01],
				[Date.UTC(1971, 0, 24), 0.99],
				[Date.UTC(1971, 0, 27), 1.17],
				[Date.UTC(1971, 0, 30), 1.24],
				[Date.UTC(1971, 1, 3), 1.41],
				[Date.UTC(1971, 1, 6), 1.47],
				[Date.UTC(1971, 1, 9), 1.4],
				[Date.UTC(1971, 1, 12), 1.92],
				[Date.UTC(1971, 1, 15), 2.03],
				[Date.UTC(1971, 1, 18), 2.46],
				[Date.UTC(1971, 1, 21), 2.53],
				[Date.UTC(1971, 1, 24), 2.73],
				[Date.UTC(1971, 1, 27), 2.67],
				[Date.UTC(1971, 2, 3), 2.65],
				[Date.UTC(1971, 2, 6), 2.62],
				[Date.UTC(1971, 2, 9), 2.79],
				[Date.UTC(1971, 2, 13), 2.93],
				[Date.UTC(1971, 2, 20), 3.09],
				[Date.UTC(1971, 2, 27), 2.76],
				[Date.UTC(1971, 2, 30), 2.73],
				[Date.UTC(1971, 3, 4), 2.9],
				[Date.UTC(1971, 3, 9), 2.77],
				[Date.UTC(1971, 3, 12), 2.78],
				[Date.UTC(1971, 3, 15), 2.76],
				[Date.UTC(1971, 3, 18), 2.76],
				[Date.UTC(1971, 3, 21), 2.7],
				[Date.UTC(1971, 3, 24), 2.61],
				[Date.UTC(1971, 3, 27), 2.52],
				[Date.UTC(1971, 3, 30), 2.53],
				[Date.UTC(1971, 4, 3), 2.55],
				[Date.UTC(1971, 4, 6), 2.52],
				[Date.UTC(1971, 4, 9), 2.44],
				[Date.UTC(1971, 4, 12), 2.43],
				[Date.UTC(1971, 4, 15), 2.43],
				[Date.UTC(1971, 4, 18), 2.48],
				[Date.UTC(1971, 4, 21), 2.41],
				[Date.UTC(1971, 4, 24), 2.16],
				[Date.UTC(1971, 4, 27), 2.01],
				[Date.UTC(1971, 4, 30), 1.88],
				[Date.UTC(1971, 5, 2), 1.62],
				[Date.UTC(1971, 5, 6), 1.43],
				[Date.UTC(1971, 5, 9), 1.3],
				[Date.UTC(1971, 5, 12), 1.11],
				[Date.UTC(1971, 5, 15), 0.84],
				[Date.UTC(1971, 5, 18), 0.54],
				[Date.UTC(1971, 5, 21), 0.19],
				[Date.UTC(1971, 5, 23), 0]
			]
		}, {
			name: 'Winter 2020-2021',
			yAxis: 2,
			data: [
				[Date.UTC(1970, 10, 14), 0],
				[Date.UTC(1970, 11, 6), 0.35],
				[Date.UTC(1970, 11, 13), 0.35],
				[Date.UTC(1970, 11, 20), 0.33],
				[Date.UTC(1970, 11, 30), 0.53],
				[Date.UTC(1971, 0, 13), 0.62],
				[Date.UTC(1971, 0, 20), 0.6],
				[Date.UTC(1971, 1, 2), 0.69],
				[Date.UTC(1971, 1, 18), 0.67],
				[Date.UTC(1971, 1, 21), 0.65],
				[Date.UTC(1971, 1, 24), 0.66],
				[Date.UTC(1971, 1, 27), 0.66],
				[Date.UTC(1971, 2, 3), 0.61],
				[Date.UTC(1971, 2, 6), 0.6],
				[Date.UTC(1971, 2, 9), 0.69],
				[Date.UTC(1971, 2, 12), 0.66],
				[Date.UTC(1971, 2, 15), 0.75],
				[Date.UTC(1971, 2, 18), 0.76],
				[Date.UTC(1971, 2, 21), 0.75],
				[Date.UTC(1971, 2, 24), 0.69],
				[Date.UTC(1971, 2, 27), 0.82],
				[Date.UTC(1971, 2, 30), 0.86],
				[Date.UTC(1971, 3, 3), 0.81],
				[Date.UTC(1971, 3, 6), 1],
				[Date.UTC(1971, 3, 9), 1.15],
				[Date.UTC(1971, 3, 10), 1.35],
				[Date.UTC(1971, 3, 12), 1.26],
				[Date.UTC(1971, 3, 15), 1.18],
				[Date.UTC(1971, 3, 18), 1.14],
				[Date.UTC(1971, 3, 21), 1.04],
				[Date.UTC(1971, 3, 24), 1.06],
				[Date.UTC(1971, 3, 27), 1.05],
				[Date.UTC(1971, 3, 30), 1.03],
				[Date.UTC(1971, 4, 3), 1.01],
				[Date.UTC(1971, 4, 6), 0.98],
				[Date.UTC(1971, 4, 9), 0.94],
				[Date.UTC(1971, 4, 12), 0.8],
				[Date.UTC(1971, 4, 15), 0.61],
				[Date.UTC(1971, 4, 18), 0.43],
				[Date.UTC(1971, 4, 21), 0.29],
				[Date.UTC(1971, 4, 24), 0.1],
				[Date.UTC(1971, 4, 26), 0]
			]
		}, {
			name: 'Winter 2021-2022',
			data: [
				[Date.UTC(1970, 10, 5), 0],
				[Date.UTC(1970, 10, 12), 0.1],
				[Date.UTC(1970, 10, 21), 0.15],
				[Date.UTC(1970, 10, 22), 0.19],
				[Date.UTC(1970, 10, 27), 0.17],
				[Date.UTC(1970, 10, 30), 0.27],
				[Date.UTC(1970, 11, 2), 0.25],
				[Date.UTC(1970, 11, 4), 0.27],
				[Date.UTC(1970, 11, 5), 0.26],
				[Date.UTC(1970, 11, 6), 0.25],
				[Date.UTC(1970, 11, 7), 0.26],
				[Date.UTC(1970, 11, 8), 0.26],
				[Date.UTC(1970, 11, 9), 0.25],
				[Date.UTC(1970, 11, 10), 0.25],
				[Date.UTC(1970, 11, 11), 0.25],
				[Date.UTC(1970, 11, 12), 0.26],
				[Date.UTC(1970, 11, 22), 0.22],
				[Date.UTC(1970, 11, 23), 0.22],
				[Date.UTC(1970, 11, 24), 0.22],
				[Date.UTC(1970, 11, 25), 0.24],
				[Date.UTC(1970, 11, 26), 0.24],
				[Date.UTC(1970, 11, 27), 0.24],
				[Date.UTC(1970, 11, 28), 0.24],
				[Date.UTC(1970, 11, 29), 0.24],
				[Date.UTC(1970, 11, 30), 0.22],
				[Date.UTC(1970, 11, 31), 0.18],
				[Date.UTC(1971, 0, 1), 0.17],
				[Date.UTC(1971, 0, 2), 0.23],
				[Date.UTC(1971, 0, 9), 0.5],
				[Date.UTC(1971, 0, 10), 0.5],
				[Date.UTC(1971, 0, 11), 0.53],
				[Date.UTC(1971, 0, 12), 0.48],
				[Date.UTC(1971, 0, 13), 0.4],
				[Date.UTC(1971, 0, 17), 0.36],
				[Date.UTC(1971, 0, 22), 0.69],
				[Date.UTC(1971, 0, 23), 0.62],
				[Date.UTC(1971, 0, 29), 0.72],
				[Date.UTC(1971, 1, 2), 0.95],
				[Date.UTC(1971, 1, 10), 1.73],
				[Date.UTC(1971, 1, 15), 1.76],
				[Date.UTC(1971, 1, 26), 2.18],
				[Date.UTC(1971, 2, 2), 2.22],
				[Date.UTC(1971, 2, 6), 2.13],
				[Date.UTC(1971, 2, 8), 2.11],
				[Date.UTC(1971, 2, 9), 2.12],
				[Date.UTC(1971, 2, 10), 2.11],
				[Date.UTC(1971, 2, 11), 2.09],
				[Date.UTC(1971, 2, 12), 2.08],
				[Date.UTC(1971, 2, 13), 2.08],
				[Date.UTC(1971, 2, 14), 2.07],
				[Date.UTC(1971, 2, 15), 2.08],
				[Date.UTC(1971, 2, 17), 2.12],
				[Date.UTC(1971, 2, 18), 2.19],
				[Date.UTC(1971, 2, 21), 2.11],
				[Date.UTC(1971, 2, 24), 2.1],
				[Date.UTC(1971, 2, 27), 1.89],
				[Date.UTC(1971, 2, 30), 1.92],
				[Date.UTC(1971, 3, 3), 1.9],
				[Date.UTC(1971, 3, 6), 1.95],
				[Date.UTC(1971, 3, 9), 1.94],
				[Date.UTC(1971, 3, 12), 2],
				[Date.UTC(1971, 3, 15), 1.9],
				[Date.UTC(1971, 3, 18), 1.84],
				[Date.UTC(1971, 3, 21), 1.75],
				[Date.UTC(1971, 3, 24), 1.69],
				[Date.UTC(1971, 3, 27), 1.64],
				[Date.UTC(1971, 3, 30), 1.64],
				[Date.UTC(1971, 4, 3), 1.58],
				[Date.UTC(1971, 4, 6), 1.52],
				[Date.UTC(1971, 4, 9), 1.43],
				[Date.UTC(1971, 4, 12), 1.42],
				[Date.UTC(1971, 4, 15), 1.37],
				[Date.UTC(1971, 4, 18), 1.26],
				[Date.UTC(1971, 4, 21), 1.11],
				[Date.UTC(1971, 4, 24), 0.92],
				[Date.UTC(1971, 4, 27), 0.75],
				[Date.UTC(1971, 4, 30), 0.55],
				[Date.UTC(1971, 5, 3), 0.35],
				[Date.UTC(1971, 5, 6), 0.21],
				[Date.UTC(1971, 5, 9), 0]
			]
		}
	],
	responsive: {
		// rules: [{
		// 	condition: {
		// 		maxWidth: 1600,

		// 	},
		// 	chartOptions: {
		// 		legend: {
		// 			floating: false,
		// 			layout: 'horizontal',
		// 			align: 'center',
		// 			verticalAlign: 'bottom',
		// 			x: 0,
		// 			y: 0
		// 		},
		// 		yAxis: [{
		// 			labels: {
		// 				align: 'center',
		// 				x: 0,
		// 				y: -6
		// 			},
		// 			showLastLabel: false
		// 		}, {
		// 			labels: {
		// 				align: 'left',
		// 				x: 0,
		// 				y: -6
		// 			},
		// 			showLastLabel: false
		// 		}, {
		// 			visible: false
		// 		}]
		// 	}
		// }]
	},
}