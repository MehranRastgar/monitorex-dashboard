import { useTranslation } from "react-i18next"
import classes from './table.module.scss';
import { useAppSelector } from "src/store/hooks";
import { selectEndDate, selectSensorReports, selectStartDate } from "src/store/slices/analizeSlice";
import { selectOwnUser } from "src/store/slices/userSlice";
import { Icon } from "@iconify/react";
import html2canvas from "html2canvas";
import JsPDF from "jspdf"
// import Papa from "papaparse";
import domtoimage from 'dom-to-image';

interface Props {

}

const HeaderMakeReport: React.FC<Props> = (props) => {
	const { t } = useTranslation()
	const reportData = useAppSelector(selectSensorReports)
	const startTime = useAppSelector(selectStartDate)
	const endTime = useAppSelector(selectEndDate)
	const user = useAppSelector(selectOwnUser)


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
			// doc.
			const doc: any = new JsPDF('l', 'pt', 'a4');
			const imgWidth = doc.internal.pageSize.getWidth();
			const imgHeight = canvas.height * imgWidth / canvas.width;
			doc?.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
			doc.save(`${new Date().toLocaleString()}.pdf`);

		})

	}



	return (
		<div className="flex w-full items-start justify-center overflow-auto text-black ">
			<div>
				<button
					className='text-[#f13232] m-1 w-[32px] h-[32px] text-[var(--text-color)]'
					onClick={() => {
						handleGeneratePNG();
					}}
				>
					<Icon icon="uiw:file-pdf" height="32" />
				</button>
			</div>
			{user?._id &&
				<div id={'analytics-header'} className="flex flex-wrap m-1 bg-white w-[800px] h-[600px]  min-w-[800px] min-h-[600px] justify-center items-start">
					<h1 className="text-xl w-full justify-center text-center p-2 m-2 h-fit border-black border-b">{t('report')}</h1>
					<div className="flex flex-wrap h-fit">
						<section className="flex flex-wrap w-full">
							<ul className="flex p-2 w-full">
								<li
									className="mx-2 font-[700]">company/location:</li>
								<li className="flex w-3/4">Monitorex / Tehran  ......</li>
							</ul>

							<ul className="flex p-2">
								<li className="mx-2 font-[700]">Report Date time:</li>
								<li>{new Date().toLocaleString()}</li>
							</ul>
						</section>
						<section className="flex flex-wrap w-full">
							<ul className="flex p-2">
								<li className="mx-2 font-[700]">Group Name:</li>
								<li>GP1 </li>
							</ul>

							<ul className="flex p-2">
								<li className="mx-2 font-[700]">Report By:</li>
								<li>{user.family} {user.name} {user.username}</li>
							</ul>
						</section>
						<section className="flex w-full">
							<ul className="flex p-2">
								<li className="mx-2 font-[700]">Start Time Of the Report:</li>
								<li>{new Date(startTime ?? 0).toLocaleString()}</li>
							</ul>

							<ul className="flex p-2 ">
								<li className="mx-2 font-[700]">End Time Of the Report:</li>
								<li>{new Date(endTime ?? 0).toLocaleString()}</li>
							</ul>
						</section>
					</div>
					<section className="flex m-2 w-full">
						<table className={classes.table} >
							<thead>
								<tr
								>
									{reportData?.map((itemHeader, indexHeader) =>
										<th
											key={indexHeader}
											className=" border  p-1"
										>
											{itemHeader.sensor?.title}
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
											{itemHeader?.data?.length ?? 0}

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

							</tbody>
						</table>
					</section>

				</div>}
		</div>
	)
}

export default HeaderMakeReport;




interface FieldProps {
	input: string
}

const Field: React.FC<FieldProps> = (props) => {



	return (<div className="flex w-1/4 h-fit border border-black p-2">
		<input type='text' value={props.input ?? ''} />

	</div>)
}