import { useTranslation } from "react-i18next"
import classes from './table.module.scss';
import { useAppSelector } from "src/store/hooks";
import { selectEndDate, selectGranularity, selectGroupNumber, selectSelectedGroup, selectSensorReports, selectStartDate } from "src/store/slices/analizeSlice";
import { selectOwnUser, selectUserGroups } from "src/store/slices/userSlice";
import { Icon } from "@iconify/react";
import html2canvas from "html2canvas";
import JsPDF from "jspdf"
// import Papa from "papaparse";
import domtoimage from 'dom-to-image';
import { selectCalendarMode } from "src/store/slices/themeSlice";
import moment from 'moment-jalaali';
import moment2 from 'moment';
import { useContext } from "react";
import langContextObj from "../../../store/langContext";

interface Props {

}

const HeaderMakeReport: React.FC<Props> = (props) => {
	const { t } = useTranslation()
	const reportData = useAppSelector(selectSensorReports)
	const startTime = useAppSelector(selectStartDate)
	const endTime = useAppSelector(selectEndDate)
	const user = useAppSelector(selectOwnUser)
	const granularity = useAppSelector(selectGranularity)
	const selectedGroup = useAppSelector(selectSelectedGroup)
	const jalaliIs = useAppSelector(selectCalendarMode)
	const langCtx = useContext(langContextObj);

	async function handleGeneratePNG() {
		// const chart = chartRef.current;
		const refd = document.getElementById('analytics-header') as HTMLDivElement
		const dataUrl = await domtoimage.toPng(refd)
		var img = new Image()
		img.src = dataUrl
		document.body.appendChild(img)

	}
	function exportData() {
		html2canvas(document.getElementById('analytics-header') as HTMLDivElement).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const doc: any = new JsPDF('l', 'pt', 'a4');
			const imgWidth = doc.internal.pageSize.getWidth();
			const imgHeight = canvas.height * imgWidth / canvas.width;
			doc?.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
			doc.save(`${new Date().toLocaleString()}.pdf`);

		})

	}



	return (
		<div className="flex  w-full items-start justify-center  min-w-[800px] min-h-[550px] text-black ">
			{/* <div>
				<button
					className='text-[#f13232] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
					onClick={() => {
						handleGeneratePNG();
					}}
				>
					<Icon icon="uiw:file-pdf" height="32" />
				</button>
			</div> */}
			{user?._id &&
				<div id={'analytics-header '}
					style={{
						fontFamily: `${langCtx.lang === 'fa' ? 'Vazir' : 'Roboto'}`,
						fontWeight: '800'

					}}
					className={"flex font-(var(--fontFamily)) flex-wrap p-3 border border-black bg-white min-w-[800px] w-[800px] min-h-[550px] h-[550px] justify-center items-start "}>
					<div className="h-fit ">
						<h1 className="flex text-xl w-full justify-center text-center p-2 px-1 m-0 h-fit border-black border-b">{t('report')}</h1>
						<div className="flex flex-wrap h-fit">
							<section className="flex justify-start flex-wrap w-full">
								<Field text={`${t("companyInfo")} :`} val={`${process.env.NEXT_PUBLIC_COMPANY_NAME} / ${process.env.NEXT_PUBLIC_COMPANY_ADDRESS}	`} />
								<Field text={`${t("user")} :`} val={`${user?.username ?? ''} ${user?.family ?? ''} ${user?.name ?? ''} `} />
								<div className="flex w-full flex-wrap">
									<div className="flex w-1/3">
										<ul className="flex justify-start py-2 px-1 w-full border border-black">
											<li className="flex flex-nowrap  mx-2 w-full font-[700]">
												<div>{`${t("ReportTime")} : `}</div>
												<div>
													{jalaliIs === 'fa' ? (moment(new Date().toISOString()).format('HH:mm:ss - jYYYY/jMM/jDD')) : moment2().format('HH:mm:ss - YYYY/MM/DD')}
												</div>
											</li>
										</ul>
									</div>
									<div className="flex w-1/3">
										<ul className="flex justify-start p-2 px-1 w-full border border-black">
											<li className="flex  mx-2 justify-start w-auto font-[700]">{`${t("start")} : `}{jalaliIs === 'fa' ? (moment(startTime).format('HH:mm:ss - jYYYY/jMM/jDD')) : moment2(startTime).format('HH:mm:ss - YYYY/MM/DD')}</li>
										</ul>
									</div>
									<div className="flex w-1/3">
										<ul className="flex justify-start p-2 px-1 w-full border border-black">
											<li className="flex  mx-2 justify-start w-auto font-[700]">{`${t("end")} : `}{jalaliIs === 'fa' ? (moment(endTime).format('HH:mm:ss - jYYYY/jMM/jDD')) : moment2(endTime).format('HH:mm:ss - YYYY/MM/DD')}</li>
										</ul>
									</div>
								</div>
								<div className="flex w-1/3">
									<ul className="flex justify-start p-2 px-1 w-full border border-black">
										<li className="flex mx-2 justify-start w-auto font-[700]">{`${t("GroupName")} : ${selectedGroup?.groupTitle ?? 'none'}`}</li>
									</ul>
								</div>
								<div className="flex w-2/3">
									<ul className="flex justify-start p-2 px-1 w-full border border-black">
										<li className="flex mx-2 justify-start w-auto font-[700]">{`${t("viewOfEvery")} : ${granularity?.toString()} ${t("point")} ${t("once")}`}</li>
									</ul>
								</div>
							</section>
						</div>
						<section className="flex m-0 w-full">
							<table className={classes.table} >
								<thead>
									<tr
									>
										{reportData?.map((itemHeader, indexHeader) =>
											<th
												key={indexHeader}
												className=" border  p-1"
											>
												{itemHeader.device?.title} : {itemHeader.sensor?.title}
											</th>
										)}
										<th
											className=" border  w-[120px]"
										>
											ITEM NAME(s)
										</th>
									</tr>
								</thead>
								<tbody
									className="justify-center overflow-y-auto  "
								>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.sensor?.unit}
											</td>)}
										<td

											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											UNIT
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.sensor?.type}
											</td>)}
										<td

											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											TYPE
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.min?.toString()}


											</td>)}
										<td

											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											MIN
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.max?.toString()}

											</td>)}
										<td

											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											MAX
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.average?.toFixed(2)}

											</td>)}
										<td
											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											AVERAGE
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader?.data?.length && itemHeader?.data?.length > 0 ? ((itemHeader?.data?.length) / (granularity ?? 1)).toFixed(0) : 0}

											</td>)}
										<td
											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											Records
										</td>
									</tr>
									<tr
										className={''}
									>
										{reportData?.map((itemHeader, indexBody) =>
											<td
												key={indexBody}
												onClick={() => { }}
												className={
													'p-1 border '
												}
											>
												{itemHeader.device?.address?.multiPort},
												{itemHeader.device?.address?.sMultiPort}

											</td>)}
										<td
											onClick={() => { }}
											className={
												'p-1 border '
											}
										>
											Address
										</td>
									</tr>

								</tbody>
							</table>
						</section>
					</div>

				</div>}

		</div>

	)
}

export default HeaderMakeReport;




interface FieldProps {
	text: string
	val: string
}

const Field: React.FC<FieldProps> = (props) => {

	return (
		<div className="flex text-justify justify-start p-2 px-1 w-full border border-black">
			<div className="flex mx-2 justify-start w-auto font-[700]">{props?.text}</div>
			<div className="flex mx-2 w-auto">{(props?.val)}</div>
		</div>

	)
}

