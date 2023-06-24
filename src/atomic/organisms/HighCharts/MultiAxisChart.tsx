import { useEffect, useRef, useState } from "react";
// import Highcharts from "highcharts";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official"
import HighchartsExporting from "highcharts/modules/exporting";
import { useAppSelector } from "src/store/hooks";
import { selectChartOptions } from "src/store/slices/chartSlice";
import classes from "./multiChart.module.scss";
import avocado from 'highcharts/themes/avocado';
import brandLight from 'highcharts/themes/brand-light';
import brandDark from 'highcharts/themes/brand-dark';
import darkBlue from 'highcharts/themes/dark-blue';
import darkGreen from 'highcharts/themes/dark-green';
import darkUnica from 'highcharts/themes/dark-unica';
import gray from 'highcharts/themes/gray';
import { SensorsReportType, selectEndDate, selectSensorReports, selectStartDate, selectStatusReportApi, selectTableColumns, selectTableDatas } from "src/store/slices/analizeSlice";
import HighchartsData, { ChartSettingsType } from "src/class/chart";
import { selectCalendarMode } from "src/store/slices/themeSlice";
import { LoadingTwo } from "src/components/loader/default";
import ThemeButton from "src/atomic/atoms/ThemeButton/ThemeButton";
import { Icon } from "@iconify/react";
import classNames from 'classnames';
import MultiChartSettings from "./MultiChartSettings";
import { Modal } from "@mui/material";
import { selectOwnUser } from "src/store/slices/userSlice";
import moment from "moment-jalaali";
import { randomNumberBetween } from "@mui/x-data-grid/utils/utils";
import dynamic from "next/dynamic";


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import "jspdf-autotable";
if (typeof Highcharts === "object") {
	HighchartsExporting(Highcharts);
}


// if (typeof Highcharts === "object") {
// 	darkUnica(Highcharts);
// }
const customTheme = {
	colors: ['#ffff', '#F44336', '#2196F3', '#FFC107', '#9C27B0'],
	chart: {
		backgroundColor: 'transparent',
		style: {
			fontFamily: 'Arial, sans-serif',
			fontSize: '14px',
		},
	},
	xAxis: {
		gridLineWidth: 1,
		gridLineColor: '#EDEDED',
		lineColor: '#EDEDED',
		tickColor: '#EDEDED',
		labels: {
			style: {
				color: '#666666',
			},
		},
	},
	yAxis: {
		gridLineColor: '#EDEDED',
		lineColor: '#EDEDED',
		tickColor: '#EDEDED',
		title: {
			style: {
				color: '#666666',
			},
		},
		labels: {
			style: {
				color: '#666666',
			},
		},
	},
	legend: {
		itemStyle: {
			color: '#666666',
			fontWeight: 'normal',
		},
	},
	tooltip: {
		backgroundColor: '#FFFFFF',
		borderColor: '#CCCCCC',
		borderRadius: 5,
		borderWidth: 1,
		shadow: false,
		style: {
			color: '#666666',
		},
	},
};

const reportData: SensorsReportType = {
	_id: '...',
	data: [
		{ x: '2023-06-10', y: 20 },
		{ x: '2023-06-11', y: 25 },
		{ x: '2023-06-12', y: 30 },
	],
	sensor: {
		title: 'Temperature Sensor',
		type: 'temperature',
		unit: '°C',
	},
	device: {
		_id: '...',
		type: 'device',
	},
};
interface Props {
	chartSettings: object
}
// const myChart = new Chart()
const MultiAxisChart: React.FC<Props> = (props) => {
	const chartOption = useAppSelector(selectChartOptions)
	// const chartRef = useRef<any>(null);
	const userData = useAppSelector(selectOwnUser)

	const selectDataOFChart = useAppSelector(selectSensorReports);
	const statusReportApi = useAppSelector(selectStatusReportApi);
	const [state, setState] = useState<any>();
	const [settingsModal, setSettingsModal] = useState<boolean>(false);
	const selectLocale = useAppSelector(selectCalendarMode)
	const startDate = useAppSelector(selectStartDate)
	const endDate = useAppSelector(selectEndDate)
	const [chartSettings, setChartSettings] = useState<any>();

	// const selectColumns = useAppSelector(selectTableColumns)
	// const selectDatas = useAppSelector(selectTableDatas)

	// const [key, setKey] = useState<any>(0); // use key to force chart to update
	// const [theme, setTheme] = useState<any>('darkGreen');

	// const themes: any = {
	// 	default: null,
	// 	avocado,
	// 	brandLight,
	// 	brandDark,
	// 	darkBlue,
	// 	darkGreen,
	// 	darkUnica,
	// 	gray,
	// };

	// const handleThemeChange = (newTheme: any) => {
	// 	if (themes[newTheme]) {
	// 		(themes[newTheme])?.(Highcharts)
	// 		// Highcharts.setOptions(themes[newTheme]);
	// 		setKey(key + 1 + randomNumberBetween(50, 1, 100)); // force chart to update by changing its key
	// 		setTheme(newTheme);
	// 	}
	// };

	// useEffect(() => {
	// 	const chart = chartRef?.current?.chart;

	// 	const resizeHandler = () => {
	// 		chart.reflow();
	// 	};

	// 	window.addEventListener('resize', resizeHandler);

	// 	return () => {
	// 		window.removeEventListener('resize', resizeHandler);
	// 	};
	// }, []);



	function getdata(chartsettings?: ChartSettingsType) {
		if (selectDataOFChart?.length) {
			setState({})
			const chartData = new HighchartsData([])
			chartData.settingsDefault()
			console.log(chartsettings)
			if (chartsettings !== undefined) chartData.setSettings(chartsettings)

			// chartData.removeCustomTheme();
			chartData.dateJalali = selectLocale === 'fa'
			// const chartData = new HighchartsData(selectDataOFChart).getChartData();
			chartData.startDate = startDate ?? ''
			chartData.endDate = endDate ?? ''
			setState(chartData.sumOfdata(selectDataOFChart))
			setChartSettings(chartData.chartSettings)

		} else { setState(undefined) }
	}


	const chartRef = useRef<HTMLDivElement>(null);

	function handleGeneratePDF() {
		const chart = chartRef.current;

		if (chart) {
			html2canvas(chart).then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const doc: any = new jsPDF('landscape', 'pt', 'a4');
				// doc.
				const imgWidth = doc.internal.pageSize.getWidth();
				const imgHeight = canvas.height * imgWidth / canvas.width;
				doc?.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
				doc.save('chart.pdf');
			});
		}
	}
	function handleGeneratePNG() {
		const chart = chartRef.current;

		if (chart) {
			const pixelRatio = window.devicePixelRatio || 1;
			const canvasWidth = chart.offsetWidth * pixelRatio;
			const canvasHeight = chart.offsetHeight * pixelRatio;
			html2canvas(chart, { scale: pixelRatio }).then((canvas) => {
				const imgData = canvas.toDataURL('image/png');
				const img = new Image();
				img.src = imgData;
				img.onload = () => {
					const pngCanvas = document.createElement('canvas');
					pngCanvas.width = canvasWidth;
					pngCanvas.height = canvasHeight;
					const ctx = pngCanvas.getContext('2d');
					if (ctx) {
						ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
						const pngData = pngCanvas.toDataURL('image/png');
						const downloadLink = document.createElement('a');
						downloadLink.href = pngData;
						downloadLink.download = 'form-and-table.png';
						downloadLink.click();
					}
				};
			});
		}
	}
	// const chartRef = useRef<typeof HighchartsReact>(null);

	// useEffect(() => {
	// 	// Convert the UTC timestamps to Jalali dates for the tooltip format
	// 	if (chartRef.current) {
	// 		Highcharts.Point.prototype.jalali = function () {
	// 			return moment(this.x).format('jYYYY-jMM-jDD HH:mm:ss');
	// 		};

	// 		const chart = chartRef.current.chart;
	// 		chart.update({
	// 			tooltip: {
	// 				pointFormat: '<b>{point.y}</b> at {point.jalali:%Y-%m-%d %H:%M:%S}'
	// 			}
	// 		});
	// 	}
	// }, [chartRef]);

	// const addCustomButton = (chart: any) => {
	// 	chart.renderer.button('Custom Button', 10, 10, () => {
	// 		alert('Custom button clicked!');
	// 	}, null, null, null, null, classNames('my-custom-button-class', 'hover:rotate-90')).add();
	// };
	useEffect(() => {
		console.log('how many time')
		getdata(userData?.chartSettings as ChartSettingsType)

	}, [selectDataOFChart, selectLocale, userData?.chartSettings]);

	return <section className={`flex mt-5 flex-wrap w-full `}>
		<Modal
			open={settingsModal}
			onClose={() => setSettingsModal(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex w-full justify-center items-center "
		>
			<MultiChartSettings closeFunction={setSettingsModal} />
		</Modal>
		<div className="absolute -translate-y-[40px] w-fit justify-start z-[80] scale-75">
			<ThemeButton onClick={() => {
				setSettingsModal(val => !val)
			}} className=" -mx-2  hover:rotate-180 w-fit justify-center items-center flex">
				<div className="w-[30px] rounded-full h-[30px] flex justify-center items-center bg-white text-black">
					<Icon icon="ic:outline-settings" width="30" color="black" /></div>
			</ThemeButton>
			{Highcharts && customTheme && state?.chartOptions && statusReportApi === 'success' &&
				<>
					<button
						className='hover:rotate-12 mx-2 w-[32px] h-[32px] text-[#f13232]'
						onClick={() => {
							handleGeneratePDF();
						}}
					>
						<Icon icon="uiw:file-pdf" height="32" />
						{/* {t(props?.downloadAsExcel)} */}
					</button>
					<button
						className='hover:rotate-12 mx-2 w-[32px] h-[32px] text-[#32f185]'
						onClick={() => {
							handleGeneratePNG();
						}}
					>
						<Icon icon="teenyicons:png-outline" height="32" />
						{/* {t(props?.downloadAsExcel)} */}
					</button></>}
		</div>
		<figure id='chart-analytics' ref={chartRef}
			key={JSON.stringify(chartSettings)}
			className={`flex justify-center w-[100vw]  ${chartSettings?.xAxisRotation > 35 || chartSettings?.xAxisRotation < -35 ? ' xl:h-[50vw] h-[60vw]' : ' xl:h-[40vw] h-[50vw]'}`}>
			<div className="" style={{ width: '1px', height: '100%', position: 'inherit' }}></div>
			{Highcharts && customTheme && state?.chartOptions && statusReportApi === 'success' &&
				<HighchartsReact
					highcharts={Highcharts}
					options={state?.chartOptions}
					constructorType={"stockChart"}
					// callback={addCustomButton}
					key={JSON.stringify(userData?.chartSettings)}
					containerProps={{ className: 'w-[100%] ' }}
				// ref={chartRef}
				/>}
			{statusReportApi === 'loading' && <div className="flex flex-wrap text-2xl w-full h-full justify-center"><LoadingTwo />
				<h1 className="flex w-full justify-center">loading...</h1></div>}
			{state === undefined && statusReportApi !== 'loading' && statusReportApi !== 'success' && <div className="flex flex-wrap text-2xl items-center w-full h-full justify-center">
				<h1 className="flex w-full h-full justify-center">No Data</h1></div>}
		</figure >
	</section>
}

export default MultiAxisChart;


const theme = {
	colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
		'#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, '#2a2a2b'],
				[1, '#3e3e40']
			]
		},
		style: {
			fontFamily: '\'Unica One\', sans-serif'
		},
		plotBorderColor: '#606063'
	},
	title: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase',
			fontSize: '20px'
		}
	},
	subtitle: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3'

			}
		}
	},
	yAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#F0F0F0'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'white'
		}
	},
	legend: {
		itemStyle: {
			color: '#E0E0E3'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#606063'
		}
	},
	credits: {
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#505053'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#505053',
			stroke: '#000000',
			style: {
				color: '#CCC'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#505053'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};


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

	},],
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
	// 	type: 'spline',
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
			yAxis: 1,
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