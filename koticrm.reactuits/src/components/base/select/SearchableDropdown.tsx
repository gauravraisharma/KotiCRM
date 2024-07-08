import { useField } from 'formik';
import Select from 'react-select';

interface Option {
    id: string;
    value: string;
    label: string;
}

type OptionsType = Option[] | string[];

interface Props {
    name: string;
    options: OptionsType;
}

const customStyles = {
    option: (provided:any, state:any) => ({
        ...provided,
        borderBottom: '1px solid #ccc',
        color: state.isSelected ? '#fff' : '#333',
        backgroundColor: state.isSelected ? '#007bff' : '#fff',
    }),
};

const SearchableDropdown = ({ name, options }: Props) => {
    const [field, , helpers] = useField(name);
    const isObjectOptions = Array.isArray(options) && options.length > 0 && typeof options[0] === 'object';
    const renderOptionLabel = (option: Option | string) => {
        if (isObjectOptions && typeof option !== 'string') {
            const labelArray = option.label.split(" ");
            return (
                <>
                    {labelArray.map(label => (
                        <div style={{ fontSize: "15px" }}>{label}</div>
                    ))}
                </>
            );
        } else if (typeof option === 'string') {
            return <div>{option}</div>;
        }
    };

    const selectOptions = options.map((option, index) => ({
        key: index,
        value: typeof option === 'object' ? option.id : option,
        label: renderOptionLabel(option)
    }));

    const handleChange = (selectedOption: Option | string) => {
        helpers.setValue(selectedOption);
    };

    return (
        <Select
            {...field}
            onChange={handleChange}
            options={selectOptions}
            styles={customStyles}
            placeholder="Select"
            isSearchable
            isClearable
        />
    );
};

export default SearchableDropdown;