import { useTranslation } from "react-i18next"
import classes from './table.module.scss';
import { useAppSelector } from "src/store/hooks";
import { selectSensorReports } from "src/store/slices/analizeSlice";

interface Props {

}

const HeaderMakeReport: React.FC<Props> = (props) => {
	const { t } = useTranslation()
	const reportData = useAppSelector(selectSensorReports)

	return (
		<div id={'analytics-header'} className="flex overflow-auto text-black">
			<div className="flex flex-wrap m-1 bg-white w-[80vw] h-[40vw]  min-w-[80vw] min-h-[40vw] ">
				<h1 className="text-xl w-full justify-center text-center ">{t('report')}</h1>
				<section>
					<ul className="flex">
						<li className="mx-2">company/location:</li>
						<li>Monitorex / Tehran  ......</li>
					</ul>

					<ul className="flex">
						<li className="mx-2">Report Date time:</li>
						<li>{new Date().toLocaleString()}</li>
					</ul>
				</section>
				<section>
					<ul className="flex">
						<li className="mx-2">Group Name:</li>
						<li>GP1 </li>
					</ul>

					<ul className="flex">
						<li className="mx-2">Report By:</li>
						<li>Mehran Rastgar</li>
					</ul>
				</section>
				<section className="flex w-full">
					<ul className="flex">
						<li className="mx-2">Start Time Of the Report:</li>
						<li>{new Date().toLocaleString()}</li>
					</ul>

					<ul className="flex">
						<li className="mx-2">End Time Of the Report:</li>
						<li>{new Date().toLocaleString()}</li>
					</ul>
				</section>
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

						</tbody>
					</table>
				</section>

			</div></div>
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