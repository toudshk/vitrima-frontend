import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import formStyles from '@/components/shared/admin/adminForm.module.scss'
import MainButton from '@/components/ui/Button/MainButton'
import UploadField from '@/components/ui/Form-elements/upload-fields/UploadFields'
import SkeletonLoader from '@/components/ui/skeleton-loader/skeletonLoader'
import Field from '@/components/ui/Form-elements/Field'
import generateSlug from '@/utils/generateSlug'
import SlugField from '@/components/ui/Form-elements/slug-field/SlugField'
import { IWorkEditInput } from '@/app/add-work/edit-work.interface'
import { useWorkEdit } from './useWorkEdit'


const DynamicSelect = dynamic(() => import('@/components/ui/Select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IWorkEditInput>({
		mode: 'onChange',
	})

	const { onSubmit, isLoading } = useWorkEdit(setValue)

	return (
		
			<>
			{isLoading ? (
				<SkeletonLoader count={5} />
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Название обязательно',
							})}
							placeholder="Title"
							error={errors.title}
						/>
						<SlugField
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
							register={register}
							error={errors.slug}
						/>
						<Field
							{...register('price', {
								required: 'Цена обязательна',
							})}
							placeholder="Title"
							error={errors.title}
						/>
                        <Field
							{...register('description')}
							placeholder="Описание"
							error={errors.description}
						/>
						
						
					<Controller
							name="tags"
							control={control}
							
							render={({ field, fieldState: { error } }) => (
								<DynamicSelect
									error={error}
									field={field}
									placeholder="Теги"
									options={tags || []}
									isLoading={isActorsLoading}
									isMulti
								/>
							)}
						/>

						<Controller
							name="image"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									placeholder="Фотография"
									error={error}
									folder="images"
									image={value}
									onChange={onChange}
								/>
							)}
							rules={{
								required: 'Poster is required!',
							}}
						/>


						
					</div>

					<MainButton>Update</MainButton>
				</form>
			)}
		</>
	)
}

export default MovieEdit
