import { FC } from 'react'
import ReactSelect from 'react-select'
import ValueType from 'react-select'
import makeAnimated from 'react-select/animated'


import styles from './SelectForFilter.module.scss'
import { IOption, ISelect } from './SelectForFilter.interface'

const animatedComponents = makeAnimated()
const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: '60px',
      backgroundColor: '#EAEAEA',
      border: '1px solid #ABABAB',
      borderRadius: '16px',

     
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '24px', // Adjust the font size as needed
      }),
      multiValue: (provided) => ({
        ...provided,
        fontSize: '24x', // Adjust the font size for the multi-value container
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        fontSize: '24px', // Adjust the font size for the label within the multi-value container
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        fontSize: '24px', // Adjust the font size for the remove button within the multi-value container
      }),
      
    // Add more styles for other components as needed
  };
  const DynamicSelect: FC<ISelect> = ({
    placeholder,
    error,
    isMulti,
    options,
    field,
    isLoading,
    onSelectChange,
  }) => {
    const onChange = (newValue: ValueType<IOption, boolean>, { action }: ActionMeta<IOption>) => {
      if (action !== 'input-change') {
        field.onChange(
          isMulti
            ? (newValue as IOption[]).map((item: IOption) => item.value)
            : (newValue as IOption).value
        );
        onSelectChange && onSelectChange(newValue); // Вызов нового prop при изменении
      }
    };
  
    const getValue = () => {
      if (field.value) {
        
        return isMulti
          ? options.filter((option) => field.value.indexOf(option.value) >= 0)
          : options.find((option) => option.value === field.value);
      } else {
        return isMulti ? [] : ('' as any);
      }
    };
  
    return (
      <div className={styles.selectContainer}>
        <label>
          <span>{placeholder}</span>
          <ReactSelect
            classNamePrefix="custom-select"
            placeholder={'Введите нужный стиль'}
            options={options}
            value={getValue()}
            onChange={onChange}
            isMulti={isMulti}
            components={animatedComponents}
            isLoading={isLoading}
            styles={customStyles}
          />
        </label>
        {error && <div>{error.message}</div>}
      </div>
    );
  };
  
  export default DynamicSelect;

