import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectOwnUser, setUsersData, updateUserData } from "src/store/slices/userSlice";
import { UserType } from "src/types/types";
import classes from './formik.module.scss';
import { ChartSettingsType } from "src/class/chart";
import { setChartSettings } from "src/store/slices/chartSlice";
import FormThemeButton from "src/atomic/atoms/ThemeButton/FormThemeButton";

interface Props {

}
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
	const onSubmit = (chartFormData: ChartSettingsType) => {
		if (userData._id !== undefined) {
			dispatch(updateUserData({
				...userData, chartSettings: { ...chartFormData }
			}));
		}
	};


	useEffect(() => {
	}, []);
	return <div className="flex flex-wrap items-start h-full w-full max-h-[500px] max-w-[600px] bg-[var(--bgc)] ">
		<div className="w-full h-fit justify-start">
			<h1 className="flex m-2">{(t('chartSettings'))}</h1>
		</div>
		<form
			className="flex flex-wrap items-start justify-start h-full"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<div className="flex m-2 rounded-md border p-2 border-[var(--border-color)] w-full flex-wrap overflow-y-auto max-h-[350px]">
				<section className="flex w-full flex-wrap  m-1 p-2   " >
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='chartMode'>{t('chart Mode')}</label>
						<select className={classes.inpt}  {...register('chartMode',)} >
							{arrayChartMode.map((op, index) =>
								<option value={op} key={index}>{op}</option>
							)}
						</select>
						<p className='text-red-300 tex-xs'>{errors?.chartMode?.message && '!' + errors?.chartMode?.message}</p>
					</div>
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='continues'>{t('continues')}</label>
						<input className={classes.inpt} type='checkbox' {...register('continues')} />
						{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
					</div>
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='justPoint'>{t('justPoint')}</label>
						<input className={classes.inpt} type='checkbox' {...register('justPoint')} />
						{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
					</div>
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='lineStyleUseDifferent'>{t('lineStyleUseDifferent')}</label>
						<input className={classes.inpt} type='checkbox' {...register('lineStyleUseDifferent')} />
						{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
					</div>
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='multiAxis'>{t('multi Axis')}</label>
						<input className={classes.inpt} type='checkbox' {...register('multiAxis')} />
						{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
					</div>
					<div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='lineDiameter'>{t('line Diameter')}</label>
						<input className={classes.inpt + ' w-[80px]'} type='number' step="any" {...register('lineDiameter')} />
						{/* <p className='text-red-300 tex-xs'>{errors?.continues?.message && '!' + errors?.continues?.message}</p> */}
					</div>
					{/* <div className={'flex-wrap mx-2 '} >
						<label className={classes.label} htmlFor='bgColor'>{t('bgColor')}</label>
						<input className={classes.inpt} type='color' {...register('bgColor')} />
						
					</div> */}
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
										{index > -1 && <button type='button' onClick={() => remove(index)} className='h-fit bg-white  text-[red] px-1 m-2 rounded-md text-[8px]'>{t('remove')}</button>}
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
										{index > -1 && <button type='button' onClick={() => bgcolor.remove(index)} className='h-fit bg-white  text-[red] px-1 m-2 rounded-md text-[8px]'>{t('remove')}</button>}
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
										{index > -1 && <button type='button' onClick={() => textcolor.remove(index)} className='h-fit bg-white  text-[red] px-1 m-2 rounded-md text-[8px]'>{t('remove')}</button>}
									</div></div>)
						}
						)}</div>
					{textcolor?.fields.length === 0 && <button type='button' onClick={() => textcolor.append('#ffff')} className='h-fit'>{t('Add text Color +')}</button>}
				</section>
			</div>
			<div className="flex w-full justify-around mt-1 h-fit">
				{userData?._id && <FormThemeButton
					className="flex m-2  h-fit" type="submit">
					{t('update')}
				</FormThemeButton>
				}
			</div>
		</form>
	</div>
}
export default MultiChartSettings;


const arrayChartMode = ['spline', 'line', 'column']