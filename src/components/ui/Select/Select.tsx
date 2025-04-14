import { FC } from 'react'
import ReactSelect from 'react-select'
import ValueType from 'react-select'
import makeAnimated from 'react-select/animated'


import styles from './Select.module.scss'
import { IOption, ISelect } from './Select.interface'

const animatedComponents = makeAnimated()
const customStyles = {
	control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#1c60c5' : '#cbd5e1',
     // Focus border color  
     borderWidth: '2px',
	  background: '#e7e7e7',
	  borderRadius: '12px',
	  minHeight: '45px', // Similar to min-h-[45px]
	  height: '15%', // Adjust this based on your needs
	  color: '#4a5568', // Text color equivalent to text-gray-700
	  width: '100%', // Full width
	  padding: '0 1vw', // Padding similar to px-[1vw]
	  fontSize: '18px', // Equivalent to text-lg
	  transition: 'border-color 0.3s, box-shadow 0.3s',
	  boxShadow: state.isFocused ? '0 0 0 3px rgba(28, 96, 197, 0.3)' : 'none', // Box shadow on focus
	  '&:hover': {
		boxShadow: '0 0 0 3px rgba(28, 96, 197, 0.3)', // Hover box shadow
	  },
  }),
  
	menu: (provided: any) => ({
	  ...provided,
	  // Add any additional menu styles here if needed
	}),
  };

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading,
}) => {


	const onChange = (newValue: any) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
                       styles={customStyles}
				
					placeholder={''}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			
		</div>
	)
}

export default Select