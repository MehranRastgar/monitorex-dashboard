import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectOwnUser, setUsersData, updateUserData } from "src/store/slices/userSlice";
import { UserType } from "src/types/types";
import classes from './formik.module.scss';
import classes2 from './multiChart.module.scss';
import { ChartSettingsType } from "src/class/chart";
import { setChartSettings } from "src/store/slices/chartSlice";
import FormThemeButton from "src/atomic/atoms/ThemeButton/FormThemeButton";
import { Icon } from "@iconify/react";
import closeOutline from '@iconify/icons-zondicons/close-outline';

import Item from "src/atomic/atoms/Item/Item";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
	closeFunction?: any
}
const styleItem = 'flex-wrap m-2 justify-center content'

const MultiChartSettings: React.FC<Props> = (props) => {
	const { t } = useTranslation()
	const userData = useAppSelector(selectOwnUser)
	const dispatch = useAppDispatch()
	const form = useForm<ChartSettingsType>({
		defaultValues: {
			...userData?.chartSettings as ChartSettingsType
		}
	})
	const { register, control, setValue, handleSubmit, formState } = form;
	const { errors } = formState;

	const { fields, append, remove } = useFieldArray<any>(
		{
			name: 'lineColors',
			control
		},
	)

	const bgcolor = useFieldArray<any>(
		{
			name: 'bgColor',
			control
		},
	)
	const textcolor = useFieldArray<any>(
		{
			name: 'textColor',
			control
		},
	)
	const gridcolor = useFieldArray<any>(
		{
			name: 'gridColor',
			control
		},
	)
	const onSubmit = (chartFormData: ChartSettingsType) => {
		if (userData._id !== undefined) {
			dispatch(updateUserData({
				...userData, chartSettings: { ...chartFormData }
			}));
		}
		props?.closeFunction(false)
	};

	useEffect(() => {
	}, []);
	return <div className="flex rtl:font-Vazir-Bold flex-wrap items-start h-full w-full max-h-[500px] max-w-[600px] bg-[var(--bgc)] ">
		<Item>
			<div className="flex w-full h-fit justify-start text-xl">
				<h1 className="flex m-4 rtl:font-Vazir-Bold w-full">{(t('chartSettings'))}</h1>
				<span className="flex m-4 text-red-500 cursor-pointer" onClick={() => { props?.closeFunction(false) }}><Icon width={20} icon={closeOutline} />
				</span>
			</div>
			<form
				className="flex p-1 flex-wrap items-start justify-start h-full rtl:font-Vazir-Bold"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<div className="flex m-2 rounded-md border p-2 border-[var(--border-color)] w-full flex-wrap overflow-y-auto max-h-[350px]">
					<section className="flex flex-wrap mt-2" >
						<div className={styleItem} >
							<label className={classes.label} htmlFor='chartMode'>{t('chart Mode')}</label>
							<select className={classes.inpt}  {...register('chartMode',)} >
								{arrayChartMode.map((op, index) =>
									<option value={op} key={index}>{op}</option>
								)}
							</select>
							<p className='text-red-300 tex-xs'>{errors?.chartMode?.message && '!' + errors?.chartMode?.message}</p>
						</div>
						<div className={styleItem} >
							<label className={classes.label} htmlFor='lineDiameter'>{t('line Diameter')}</label>
							<input className={classes.inpt + ' w-[80px]'} type='number' step="any" {...register('lineDiameter' as const, { required: { value: true, message: t('diameter is required') } })} />
							<p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p>
						</div>
						<div className={styleItem} >
							<label className={classes.label} htmlFor='xAxisRotation'>{t('X axis angle')}</label>
							<input className={classes.inpt + ' w-[80px]'} type='number' step="any" {...register('xAxisRotation')} />
							{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
						</div>
					</section>
					<section className=" flex flex-wrap mt-4" >
						<div className={styleItem}>
							<label className={"flex-wrap w-full text-center mx-2 "} htmlFor='justPoint'>{t('justPoint')}</label>
							<label className="checkBox2">
								<input id="ch1" type="checkbox"  {...register('justPoint')} />
								<div className="transition2"></div>
							</label>
						</div>
						<div className={styleItem}>
							<label className={"flex-wrap w-full text-center mx-2 "} htmlFor='lineStyleUseDifferent'>{t('lineStyleUseDifferent')}</label>
							<label className="checkBox2">
								<input id="ch1" type="checkbox"  {...register('lineStyleUseDifferent')} />
								<div className="transition2"></div>
							</label>
						</div>
						<div className={styleItem}>
							<label className={"flex-wrap w-full text-center mx-2 "} htmlFor='multiAxis'>{t('multiAxis')}</label>
							<label className="checkBox2">
								<input id="ch1" type="checkbox"  {...register('multiAxis')} />
								<div className="transition2"></div>
							</label>
						</div>
						<div className={styleItem}>
							<label className={"flex-wrap w-full text-center mx-2 "} htmlFor='grid'>{t('grid')}</label>
							<label className="checkBox2">
								<input id="ch1" type="checkbox"  {...register('grid')} />
								<div className="transition2"></div>
							</label>
						</div>
						<div className={styleItem} >
							<label className={"flex-wrap w-full text-center mx-2 "} htmlFor='xAxisTimeValue'>{t('X axis time')}</label>
							<label className="checkBox2">
								<input id="ch1" type="checkbox"  {...register('xAxisTimeValue')} />
								<div className="transition2"></div>
							</label>
						</div>
					</section>
					<section className="flex flex-wrap  m-1 p-2 w-full" >
						<h1 className='flex w-full m-1'>line colors</h1>
						<div className={'flex flex-wrap'} >

							{fields?.map((field, index) => {
								return (
									<div className={'flex flex-wrap'} key={field.id}>
										<div className={'flex-wrap mx-2 '} >
											<label className={classes.label} htmlFor={`lineColors.${index}`}>{t('color')}</label>
											<input className={classes.inpt} type='color' {...register(`lineColors.${index}` as const, { required: { value: true, message: t('title is required') } })} />
											<p className='text-red-300 tex-xs'>{errors?.lineColors?.[index]?.message && '!' + errors?.lineColors?.[index]?.message}</p>
											{index > -1 && <button type='button' onClick={() => remove(index)} className='h-fit   text-[red] px-1 m-2 rounded-md text-[8px]'><DeleteIcon /></button>}
										</div></div>)
							}
							)}</div>
						<button type='button' onClick={() => append('#606')} className='h-fit'>{t('Add Color +')}</button>
					</section>
					<section className="flex flex-wrap  m-1 p-2 w-fit" >
						<div className={'flex flex-wrap'} >
							{bgcolor?.fields?.map((field, index) => {
								return (
									<div className={'flex flex-wrap'} key={field.id}>
										<div className={'flex-wrap mx-2 '} >
											<label className={classes.label} htmlFor={`bgColor.${index}`}>{t('bg color')}</label>
											<input className={classes.inpt} type='color' {...register(`bgColor.${index}` as const, { required: { value: true, message: t('bg is required') } })} />
											<p className='text-red-300 tex-xs'>{errors?.bgColor?.[index]?.message && '!' + errors?.bgColor?.[index]?.message}</p>
											{index > -1 && <button type='button' onClick={() => bgcolor.remove(index)} className='h-fit   text-[red] px-1 m-2 rounded-md text-[8px]'><DeleteIcon /></button>}
										</div></div>)
							}
							)}</div>
						{bgcolor?.fields.length === 0 && <button type='button' onClick={() => bgcolor.append('#ffff')} className='h-fit'>{t('Add BG Color +')}</button>}
					</section>
					<section className="flex flex-wrap  m-1 p-2 w-fit" >
						<div className={'flex flex-wrap'} >
							{textcolor?.fields?.map((field, index) => {
								return (
									<div className={'flex flex-wrap'} key={field.id}>
										<div className={'flex-wrap mx-2 '} >
											<label className={classes.label} htmlFor={`textColor.${index}`}>{t('text color')}</label>
											<input className={classes.inpt} type='color' {...register(`textColor.${index}` as const, { required: { value: true, message: t('text Color is required') } })} />
											<p className='text-red-300 tex-xs'>{errors?.textColor?.[index]?.message && '!' + errors?.textColor?.[index]?.message}</p>
											{index > -1 && <button type='button' onClick={() => textcolor.remove(index)} className='h-fit   text-[red] px-1 m-2 rounded-md text-[8px]'><DeleteIcon /></button>}
										</div></div>)
							}
							)}</div>
						{textcolor?.fields.length === 0 && <button type='button' onClick={() => textcolor.append('#ffff')} className='h-fit'>{t('Add text Color +')}</button>}
					</section>
					<section className="flex flex-wrap  m-1 p-2 w-fit" >
						<div className={'flex flex-wrap'} >
							{gridcolor?.fields?.map((field, index) => {
								return (
									<div className={'flex flex-wrap'} key={field.id}>
										<div className={'flex-wrap mx-2 '} >
											<label className={classes.label} htmlFor={`gridColor.${index}`}>{t('grid color')}</label>
											<input className={classes.inpt} type='color' {...register(`gridColor.${index}` as const, { required: { value: true, message: t('text Color is required') } })} />
											<p className='text-red-300 tex-xs'>{errors?.gridColor?.[index]?.message && '!' + errors?.gridColor?.[index]?.message}</p>
											{index > -1 && <button type='button' onClick={() => gridcolor.remove(index)} className='h-fit   text-[red] px-1 m-2 rounded-md text-[8px]'><DeleteIcon />
											</button>}
										</div></div>)
							}
							)}</div>
						{gridcolor?.fields.length === 0 && <button type='button' onClick={() => gridcolor.append('#ffff')} className='h-fit'>{t('Add text Color +')}</button>}
					</section>
				</div>
				<div className="flex w-full justify-around mt-1 h-fit">
					{userData?._id && <FormThemeButton
						className="flex m-2  h-fit" type="submit">
						{t('update')}
					</FormThemeButton>
					}
				</div>
			</form></Item>
	</div>
}
export default MultiChartSettings;


const arrayChartMode = ['spline', 'line']