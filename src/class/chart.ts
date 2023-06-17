import { Datum, SensorsReportType } from "src/store/slices/analizeSlice";
import moment from 'moment-jalaali';

import Highcharts from "highcharts";
import { GridColDef } from "@mui/x-data-grid";
interface ChartTooltipOptions extends Highcharts.TooltipOptions {
	points?: any;
	x?: any;
}





export const Granolarity: number[] = [1, 2, 5, 10, 20, 50];

export interface ChartSettingsType {
	chartMode: 'spline' | 'line' | 'column';
	multiAxis: boolean;
	justPoint: boolean;
	grid?: boolean;
	lineAccesibility?: LineAccesibleType;
	lineStyleUseDifferent: boolean;
	divideBy: number;
	continues: boolean;
	lineDiameter?: number
	bgColor?: string[];
	lineColors?: string[];
	textColor?: string[];
}
type LineAccesibleType = 'Dash' | 'DashDot' | 'Dot' | 'LongDash' | 'LongDashDot' | 'LongDashDotDot' | 'ShortDash' | 'ShortDashDot' | 'ShortDashDotDot' | 'ShortDot' | 'Solid'


export default class HighchartsData {
	private chartTheme: object = {}
	private lineStylesArray: LineAccesibleType[] = ['Solid', 'Dot', 'Dash', 'DashDot', 'LongDash', 'LongDashDot', 'LongDashDotDot', 'ShortDash', 'ShortDashDot', 'ShortDashDotDot', 'ShortDot',]
	private chartSettings: ChartSettingsType = {
		chartMode: 'line',
		multiAxis: true,
		continues: false,
		lineAccesibility: 'Solid',
		lineStyleUseDifferent: false,
		divideBy: 1,
		justPoint: false,
		lineColors: [],
		bgColor: [],
		textColor: [],
		lineDiameter: 2
	}

	private series: { name: string; data: Datum[] }[] = [];
	private categories: string[] = [];
	private yAxisTitles: string[] = [];
	private chartTitle = 'nothing';
	public dateJalali: boolean = true
	private multiAxis: boolean = true
	private justPoint: boolean = false
	private chartMode: 'spline' | 'line' = 'line'
	private lineAccesible: 'dashDot' | 'line' = 'line'
	private divideBy: number = 1
	private continues: boolean = true
	private chartBGC: string = "var(--bgc)"

	constructor(private reportData: SensorsReportType[]) {
		// this.processData();
	}
	//=============================================================================================
	public settingsDefault(): ChartSettingsType {
		const chartSettings: ChartSettingsType = {
			chartMode: 'line',
			multiAxis: true,
			continues: false,
			lineAccesibility: 'Solid',
			lineStyleUseDifferent: false,
			divideBy: 1,
			justPoint: false,
			lineColors: [],
			bgColor: [],
			textColor: [],
			lineDiameter: 2
		}
		this.chartSettings = chartSettings
		return chartSettings
	}
	//=============================================================================================
	public setSettings(setting: ChartSettingsType) {
		this.chartSettings = {
			...
			{
				chartMode: 'line',
				multiAxis: true,
				continues: false,
				lineAccesibility: 'Solid',
				lineStyleUseDifferent: false,
				divideBy: 1,
				justPoint: false,
				lineColors: [],
				bgColor: []
			}, ...setting
		}
	}
	//=============================================================================================
	public removeCustomTheme() {
		this.chartSettings = {
			...this.chartSettings,
			bgColor: undefined,
			textColor: undefined,
			lineColors: undefined,
		}
	}
	//=============================================================================================
	myXAxisFormater = (color: string) => {
		return function (props: any): any {
			const vals = props.value;
			const val = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', vals);
			return `<b style="color:${color}"'>${val}</b>`
		}
	}
	//=============================================================================================
	getTooltipFormatter = (color?: string, textColor?: string) => {
		return function (this: ChartTooltipOptions): any {
			interface ChartTooltipOptions extends Highcharts.TooltipOptions {
				points?: any;
				x?: any;
			}
			const weekDays = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه',]
			const val = Highcharts.dateFormat(`%Y-%m-%d %H:%M:%S`, (this as ChartTooltipOptions).x);
			const weekd = weekDays?.[(parseInt(Highcharts.dateFormat(`%w`, (this as ChartTooltipOptions).x)))]
			return [`<b><div style="background:red;color:${textColor};fontSize: 1.2em">` + val + ' - ' + weekd + '</div></b>'].concat(
				(this as ChartTooltipOptions).points !== undefined ?
					(this as ChartTooltipOptions)?.points?.map(function (point: any) {
						return point.series.name + ': ' + (
							`<b><div style="backgroundColor:${color};color:${textColor};fontSize: 1.2em">` +
							point.y.toFixed(2)) + '</div></b>'
					}) : []
			);
		}
	}
	//=============================================================================================
	// private processDataAlt() {
	// 	console.time('how many processData')
	// 	this.reportData.forEach((report) => {
	// 		const { data = [], sensor = {} } = report;
	// 		const { title = '', unit = '' } = sensor;

	// 		this.yAxisTitles.push(unit);
	// 		this.categories = Array.from(new Set([...this.categories, ...data.map((d) => d.x)]));

	// 		this.series.push({
	// 			name: title,
	// 			type: 'spline',

	// 			data: this?.categories?.map((x) => {
	// 				const datum = data?.find((d) => d.x === x);
	// 				return datum?.y ? datum?.y : null;
	// 			}),
	// 		});
	// 	});

	// 	this.categories.sort();
	// 	this.chartTitle = this.yAxisTitles.join(', ');
	// 	console.timeEnd('how many processData')
	// }
	// private processData() {
	// 	console.time('how many processData')
	// 	this.reportData.forEach((report) => {
	// 		const { data = [], sensor = {} } = report;
	// 		const { title = '', unit = '' } = sensor;

	// 		this.yAxisTitles.push(unit);
	// 		this.categories = Array.from(new Set([...this.categories, ...data.map((d) => d.x)]));

	// 		this.series.push({
	// 			name: title,
	// 			type: 'spline',
	// 			data: this?.categories?.map((x) => {
	// 				const datum = data?.find((d) => d.x === x);
	// 				return datum?.y ? datum?.y : null;
	// 			}),
	// 		});
	// 	});

	// 	this.categories.sort();
	// 	this.chartTitle = this.yAxisTitles.join(', ');
	// 	console.timeEnd('how many processData')
	// }
	//=============================================================================================
	public getChartData() {
		console.log('how many getChartData', this.chartSettings)

		const CHartdata = {
			chart: {
				zoomType: 'xy',
				backgroundColor: "var(--bgc)",
			},
			colors: [
				'#c3188d', '#a81f1f', '#0c17ac', '#096b95', '#ffff'
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

					'red'
			},
			series: this.series,
		};
		console.log(CHartdata)
		return CHartdata
	}
	//=============================================================================================
	private makeData(data: Datum[]) {
		const localOffset = new Date().getTimezoneOffset();
		const offsetSeconds = localOffset * -60 * 1000;

		const arr: any[] = [];

		data.map((item, index) => {
			if (item?.x !== undefined && index % Granolarity[this.divideBy] === 0)
				if (item?.y !== undefined || !this?.chartSettings?.continues)
					arr.push([
						this.dateJalali ? new Date(moment(item?.x).format('jYYYY-jMM-jDD HH:mm:ss')).getTime() + offsetSeconds : new Date(item?.x).getTime() + offsetSeconds,
						item?.y ?? null,
					]);
		});
		return arr;
	}
	//=============================================================================================
	makeMultiAxis() {
		const arr: any[] = [];
	}
	//=============================================================================================
	//make a function to get date and time
	public sumOfdata(data: SensorsReportType[]) {
		console.time('how many sumOfdata')

		const arrSeries: any[] = [];
		let arrAxisY: any[] = [];
		data?.map((sens, index) => {
			if (sens?.data !== undefined) {
				console.log('sens?.data !== undefined')
				if (this.chartSettings.multiAxis === true) {

					if (!(arrAxisY.findIndex(item => item?.unit === sens?.sensor?.unit) >= 0))
						arrAxisY.push({
							gridLineDashStyle: (() => {
								if (this.chartSettings.grid)
									return 'longdash'
								else return 'none'
							})(),
							gridLineWidth: (() => {
								if (this.chartSettings.grid)
									return 1
								else return 0
							})(),
							unit: sens.sensor?.unit,
							// Primary yAxis
							labels: {
								format: "{value}" + ' ' + sens.sensor?.unit,
								style: (() => {
									if (this.chartSettings && this.chartSettings.lineColors && this.chartSettings.lineColors[index]) {
										return {
											color: this.chartSettings.lineColors[index],
											fontSize: '1.2em',
											fontFamily: 'cursive'
										};
									} else {
										return {

										};
									}
								})(),
							},
							title: {
								text: sens.sensor?.type,
								style: (() => {
									if (this.chartSettings && this.chartSettings.lineColors && this.chartSettings.lineColors[index]) {
										return {
											fontSize: '1.2em',
											fontFamily: 'cursive',
											color: this.chartSettings.lineColors[index],
										};
									} else {
										return {
											fontSize: '1.2em',
										};
									}
								})(),
							},
							opposite: index % 2 === 1 ? true : false,
						});
					arrSeries.push(
						{
							lineWidth: this.chartSettings.justPoint ? 0 : this.chartSettings?.lineDiameter ?? 2,
							marker: {
								enabled: this.chartSettings.justPoint,
								radius: 3,
							},
							id: sens.sensor?._id,
							type: this.chartSettings.chartMode,
							yAxis: arrAxisY.findIndex(item => item?.unit === sens?.sensor?.unit),
							name: sens.device.title + "-" + sens.sensor?.title + '-' + sens.sensor?.unit,
							dashStyle: this.chartSettings.lineStyleUseDifferent ? this.lineStylesArray[index] : undefined,
							// pointInterval: 6e4, // one hour
							// relativeXValue: true,
							data: [...this.makeData(sens?.data)],
							// tooltip: {
							// 	pointFormat: '<span style="color:{point.color}">●</span>' +
							// 		'<b> {series.name} </b>' +
							// 		'Open: {point.open} ' +
							// 		'High: {point.high} ' +
							// 		'Low: {point.low} ' +
							// 		'Close: {point.close}'
							// }
						}
					);
				} else {
					arrAxisY = [...[{
						unit: sens.sensor?.unit,
						// Primary yAxis
						gridLineDashStyle: (() => {
							if (this.chartSettings.grid)
								return 'longdash'
							else return 'none'
						})(),
						gridLineWidth: (() => {
							if (this.chartSettings.grid)
								return 1
							else return 0
						})(),
						labels: {
							format: "{value}" + sens.sensor?.unit,

							style: {
								fontFamily: 'cursive',
								font: '1.2em',
								color: `{series.color}`,
							},
						},
						title: {
							text: sens.sensor?.type,
							style: {
								color: `{series.color}`,
								fontSize: '1.2em',
								fontFamily: 'cursive',
							},
						},
						opposite: false,
					}]];
					arrSeries.push({
						lineWidth: this.chartSettings.justPoint ? 0 : this.chartSettings?.lineDiameter ?? 2,
						marker: {
							enabled: this.chartSettings.justPoint,
							radius: 2,
						},
						id: sens.sensor?._id,
						type: this.chartSettings.chartMode,
						name: sens?.device?.title + ":" + sens?.sensor?.title + '-' + sens.sensor?.unit,
						dashStyle: this.chartSettings.lineStyleUseDifferent ? this.lineStylesArray[index] : undefined,

						data: [...this.makeData(sens?.data)],
					});
				}
			}
		});

		// const makedData = {
		// 	chartOptions: {
		// 		exporting: {
		// 			enabled: false,
		// 		},
		// 		colors: [
		// 			"var(--chart-color-1)",
		// 			"var(--chart-color-2)",
		// 			"var(--chart-color-3)",
		// 			"blue",
		// 			"green",
		// 			"cyan",
		// 			"yellow",
		// 			"var(--text-color)",
		// 		],
		// 		chart: {
		// 			alignTicks: true,
		// 			backgroundColor: "var(--chart-bgc)",
		// 		},
		// 		legend: {
		// 			itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
		// 			itemHoverStyle: { color: "var(--dev-bgc-selected)" },
		// 			itemStyle: { color: "var(--text-color)" },
		// 			enabled: true,
		// 			align: "left",
		// 			alignColumns: true,
		// 			backgroundColor: "var(--chart-bgc)",
		// 			floating: false,
		// 		},
		// 		// tooltip: {
		// 		//   shared: true,
		// 		// },
		// 		tooltip: {
		// 			// snap: 1 / 24,
		// 			// stickOnContact: true,
		// 			valueSuffix: "",
		// 			// pointFormat:
		// 			// 	'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
		// 			// pointFormat: '<b>{point.y}</b> at {point.jalali:%Y-%m-%d %H:%M:%S}',
		// 			valueDecimals: 1,
		// 			split: true,
		// 			useHTML: true,
		// 			headerFormat: '<table><tr><th colspan="2" style="color: {series.name}">{point.jalali:%Y-%m-%d %H:%M:%S}</th></tr>',
		// 			pointFormat:
		// 				'<tr><td style="color: {series.color}">{series.name} </td>' +
		// 				'<b>{point.y}</b> at {point.jalali:%Y-%m-%d %H:%M:%S}' +
		// 				'<td style="text-align: right"><b>{point.y} {series.name}</b></td></tr>',
		// 			footerFormat: "</table>",
		// 			xDateFormat: "%Y-%m-%d %H:%M:%S",
		// 			shared: true,
		// 		},
		// 		plotOptions: {
		// 			series: {
		// 				showInLegend: true,
		// 				accessibility: {
		// 					exposeAsGroupOnly: true,
		// 				},
		// 			},
		// 		},
		// 		rangeSelector: {
		// 			enabled: false,

		// 			buttons: [
		// 				{
		// 					type: "hour",
		// 					count: 6,
		// 					text: "6h",
		// 				},
		// 				{
		// 					type: "hour",
		// 					count: 12,
		// 					text: "12h",
		// 				},
		// 				{
		// 					type: "day",
		// 					count: 1,
		// 					text: "1d",
		// 				},
		// 				{
		// 					type: "day",
		// 					count: 7,
		// 					text: "7d",
		// 				},
		// 				{
		// 					type: "day",
		// 					count: 14,
		// 					text: "14d",
		// 				},
		// 				{
		// 					type: "month",
		// 					count: 1,
		// 					text: "1m",
		// 				},
		// 				{
		// 					type: "month",
		// 					count: 3,
		// 					text: "3m",
		// 				},
		// 				{
		// 					type: "all",
		// 					text: "All",
		// 				},
		// 			],
		// 			selected: 7,
		// 		},
		// 		title: {
		// 			text: "Report Sensors",
		// 			floating: false,
		// 			align: "center",
		// 			x: -30,
		// 			y: 30,
		// 		},
		// 		scrollbar: {
		// 			barBackgroundColor: "gray",
		// 			barBorderRadius: 7,
		// 			barBorderWidth: 0,
		// 			buttonBackgroundColor: "gray",
		// 			buttonBorderWidth: 0,
		// 			buttonBorderRadius: 7,
		// 			trackBackgroundColor: "none",
		// 			trackBorderWidth: 1,
		// 			trackBorderRadius: 8,
		// 			trackBorderColor: "#CCC",
		// 			enabled: false,
		// 		},
		// 		series: [...arrSeries],
		// 		yAxis: [...arrAxisY],
		// 	},
		// }
		console.timeEnd('how many sumOfdata')

		// const options = { year: 'numeric', day: 'numeric', month: 'long' };
		const num = arrSeries[0].data.length
		const starttime = new Date(moment(arrSeries[0].data[0][0]).toISOString())
		const endtime = new Date(moment(arrSeries[0].data?.[num - 1]?.[0]).toISOString())

		// const gregorianDate = new Date(2023, 5, 13); // Note: month is zero-indexed
		// const jalaliDate = moment(gregorianDate).format('jYYYY-jMM-jDD HH:mm:ss');

		// this.categories = Array.from(new Set([arrSeries?.[0]?.data?.map((x: number[]) => moment(new Date(x?.[0]), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))]))
		// console.log('categories', new Date(jalaliDate).getTime())
		let dataTO: any = {
			chartOptions: {
				...this.testchart,
				// xAxis: {
				// 	categories: [...this.categories],
				// },
				accessibility: {
					enabled: true
				},
				chart: {
					backgroundImage: undefined,
					backgroundColor: (() => {
						if (this.chartSettings?.bgColor?.[0]) {
							return this.chartSettings?.bgColor?.[0]
							// fontSize: '1.2em',


						} else {
							return {
								// fontSize: '1.2em',
							};
						}
					})(),
					zoomType: 'x',
					zooming: {
						mouseWheel: true
					},
					panning: true,
					panKey: 'shift',
					scrollablePlotArea: {
						minWidth: 600,
						scrollPositionX: 1
					}
				},

				colors:
					this.chartSettings?.lineColors?.length ? [...this.chartSettings?.lineColors] : [
						"var(--chart-color-1)",
						"var(--chart-color-2)",
						"var(--chart-color-3)",
						"blue",
						"green",
						"cyan",
						"yellow",
						"var(--text-color)",]
				,
				legend: {
					itemHiddenStyle: { color: "var(--dev-bgc-disable)" },
					itemHoverStyle: { color: "var(--dev-bgc-selected)" },
					itemStyle: { color: this.chartSettings?.textColor?.[0] ?? "var(--text-color)" },
					enabled: true,
					align: "left",
					alignColumns: true,
					backgroundColor: this.chartSettings?.bgColor?.[0] ?? "var(--bgc)",
					floating: false,
				},
				series: [...arrSeries],
				yAxis: [...arrAxisY],
				title: {
					text: 'Environment Monitoring' + ' - ' + starttime.toLocaleString() + ' -to ' + endtime.toLocaleString(),
					style: {
						color: this.chartSettings?.textColor?.[0] ?? 'var(--text-color)',
					},
					align: 'left',
				},
				xAxis:
				{
					// minorTickInterval: 'auto',
					// startOnTick: false,
					// endOnTick: false,
					type: 'datetime',
					labels: {
						formatter: this.myXAxisFormater(this.chartSettings?.textColor?.[0] ?? 'var(--text-color)')
					}
				},
				subtitle: {
					text: 'Source: Monitorex.ir',
					align: 'left',
					style: {
						color: this.chartSettings?.textColor?.[0] ?? 'var(--text-color)',
					},
				},
				tooltip: {
					style: {
						color: this.chartSettings?.textColor?.[0] ?? 'var(--text-color)',
					},
					backgroundColor: this.chartSettings?.bgColor?.[0] ?? 'var(--bgc)',
					formatter: this.getTooltipFormatter(this.chartSettings?.bgColor?.[0], this.chartSettings?.textColor?.[0]),
					split: true
				},

			},

		}
		// if (this.chartSettings.multiAxis)
		// 	dataTO['chartOptions']['yAxis'] = [...arrAxisY]

		return dataTO
	}
	public testchart = {
		chart: {
			backgroundColor: this.chartSettings?.bgColor?.[0],
			zoomType: 'x',
			zooming: {
				mouseWheel: true
			},
			panning: true,
			panKey: 'shift'

		},
		boost: {
			pixelRatio: 10,
			seriesThreshold: 50,
			enabled: true
			// useGPUTranslations: true,
			// usePreallocated: true,
		},

		navigator: {
			enabled: false
		},
		rangeSelector: {
			enabled: false

		},
		scrollbar: {
			enabled: false

		},
		colors:
			this.chartSettings?.lineColors?.length ? [...this.chartSettings?.lineColors] : [
				"var(--chart-color-1)",
				"var(--chart-color-2)",
				"var(--chart-color-3)",
				"blue",
				"green",
				"cyan",
				"yellow",
				"var(--text-color)",]
		,
		title: {
			text: 'Environment Monitoring',
			style: {
				color: this.chartSettings?.textColor?.[0] ?? 'cyan',
			},
			align: 'left',
		},
		subtitle: {
			text: 'Source: Monitorex.ir',
			align: 'left',
			style: {
				color: this.chartSettings?.textColor?.[0] ?? 'cyan',
			},
		},

		xAxis:
		{
			type: 'datetime',
			labels: {

				formatter: function (props: any): any {
					// eslint-disable-next-line no-use-before-define
					// this.chartSettings?.textColor?.[0]
					const vals = props.value;
					const val = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', vals);
					return val
				}
			}
		}
		//=============================================================================================
		// {
		// 	date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		// 		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		// 	crosshair: true
		// }
		,
		// yAxis: [],

		// tooltip: {

		// 	// snap: 1 / 24,
		// 	// stickOnContact: true,
		// 	backgroundColor: {
		// 		linearGradient: {
		// 			x1: 0,
		// 			y1: 0,
		// 			x2: 0,
		// 			y2: 1
		// 		},
		// 		stops: [
		// 			[0, 'white'],
		// 			[1, '#EEE']
		// 		]
		// 	},
		// 	borderColor: 'gray',
		// 	borderWidth: 1,
		// 	valueDecimals: 1,
		// 	headerFormat: '<table><tr><th colspan="2" >{point.key}{millisecond}</th></tr>',
		// 	dateTimeLabelFormats: {
		// 		millisecond: '%H:%M:%S.%L',
		// 		second: '%H:%M:%S',
		// 		minute: '%H:%M',
		// 		hour: '%H:%M',
		// 		day: '%e. %b',
		// 		week: '%e. %b',
		// 		month: '%b \'%y',
		// 		year: '%Y'
		// 	},

		// },
		// tooltip: {

		// 	formatter: this.getTooltipFormatter(this.chartSettings?.bgColor?.[0], this.chartSettings?.textColor?.[0]),
		// 	split: true
		// },
		// tooltip: {
		// 	// snap: 1 / 24,
		// 	// stickOnContact: true,
		// 	// formatter: function (): any {
		// 	// 	return '<b>' + new Date(this.x) + '</b><br>' + this.y;
		// 	// },
		// 	backgroundColor: {
		// 		linearGradient: {
		// 			x1: 0,
		// 			y1: 0,
		// 			x2: 0,
		// 			y2: 1
		// 		},
		// 		stops: [
		// 			[0, 'white'],
		// 			[1, '#EEE']
		// 		]
		// 	},
		// 	borderColor: 'gray',
		// 	borderWidth: 1,
		// 	valueSuffix: "",
		// 	// pointFormat:
		// 	// 	'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
		// 	// pointFormat: '<b>{point.y}</b> at {point.jalali:%Y-%m-%d %H:%M:%S}',
		// 	// backgroundColor: this.chartSettings.bgColor,
		// 	valueDecimals: 1,
		// 	split: true,
		// 	useHTML: true,
		// 	headerFormat: '<tr><td >{point.x}{point.key} </td>',
		// 	pointFormat:
		// 		'<tr><td style="color: {series.color}">{series.name} :{point.y} {series.unit}</td>' +
		// 		'{point.jalali:%Y-%m-%d %H:%M:%S}'

		// 	,
		// 	footerFormat: "</table>",
		// 	xDateFormat: "%Y-%m-%d %H:%M:%S",
		// 	shared: false,
		// 	crosshairs: true
		// },
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
		exporting: {
			enabled: false,
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 1600,

				},
				chartOptions: {
					legend: {
						floating: false,
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom',
						x: 0,
						y: 0,
						labels: {
							font: {
								size: 20,
								color: "red",
							},
						},
					},

					// yAxis: [{
					// 	labels: {
					// 		align: 'center',
					// 		x: 0,
					// 		y: -6
					// 	},
					// 	showLastLabel: false
					// }, {
					// 	labels: {
					// 		align: 'left',
					// 		x: 0,
					// 		y: -6
					// 	},
					// 	showLastLabel: false
					// }, {
					// 	visible: false
					// }]
				}
			}]
		},
	}

	//=============================================================================================
	private makeColumns() {

	}
	//=============================================================================================
	private makeDataTable(dataR: SensorsReportType[] | undefined) {
		const arr: object[] = [];
		const columnsMakes: GridColDef[] = [
			{
				field: "index",
				headerName: "row",
				width: 80,
			},
		];
		if (dataR === undefined) {
			return;
		}

		// dataR?.findInex[0]?.data?.length
		dataR?.[0]?.data?.map((sensorxy, index) => {
			if (index % 1 === 0) {
				const obj = Object.create({
					index: index,
				});
				dataR?.map((ite, ind) => {
					obj[ite._id ?? "noname"] =
						ite.data?.[index]?.y ?? "no data";
					const date = new Date(ite?.data?.[index]?.x ?? "");
					obj["date"] = this.dateJalali ? new Date(moment(ite?.data?.[index]?.x).format('jYYYY-jMM-jDD HH:mm:ss')).toLocaleDateString() : date.toLocaleDateString();
					obj["time"] = date.toLocaleTimeString();
				});
				arr.push(obj);
			}
		});
		columnsMakes.push({
			field: "date",
			headerName: "date",
			width: 150,
		});
		columnsMakes.push({
			field: "time",
			headerName: "time",
			width: 150,
		});
		dataR?.map((item, index) => {
			if (item?.data !== undefined && item?.data?.length > 0) {
				columnsMakes.push({
					field: item?.sensor?.title?.toString() ?? "noname",
					headerName: item?.sensor?.title?.toString(),
					width: 150,
				});
			}
		});
		console.log(arr)
		return arr ?? []
		// setCulu(columnsMakes);
	}
	//=============================================================================================

	public makeDataForTable(dataOfReport: SensorsReportType[]): {
		data: object[];
		columns: {
			Header: string,
			id?: string,
			accessor: string
		}[];
	} {
		console.log(dataOfReport)
		let data: any[] = []
		const columns: {
			Header: string,
			id?: string,
			accessor: any
		}[] = [
				{
					Header: 'N',
					id: 'index',
					accessor: (_row: any, i: number) => i + 1,
				}
			]
		dataOfReport?.map((eachsens, index) => {
			columns.push(
				{
					Header: eachsens?.sensor?.title ?? 'unnamed',
					accessor: eachsens?._id ?? index.toString()
				}
			)
		})
		columns.push({
			Header: 'date',
			accessor: 'date'
		})
		columns.push({
			Header: 'time',
			accessor: 'time'
		})

		return {
			data: [...this.makeDataTable(dataOfReport ?? []) ?? []],
			columns: columns
		}
	}
	//=============================================================================================

}
//=============================================================================================
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

















// formatter: function (props: any): any {
// 	// The first returned item is the header, subsequent items are the
// 	// pointsnew Date(this.x - offsetSeconds)
// 	const localOffset = new Date().getTimezoneOffset();
// 	const offsetSeconds = localOffset * -60 * 1000;
// 	const val = Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x);
// 	return ['<b>' + val + '</b>'].concat(
// 		this.points ?
// 			this.points.map(function (point: any) {
// 				return point.series.name + ': ' + (point.y.toFixed(2));
// 			}) : []
// 	);
// },
// split: true