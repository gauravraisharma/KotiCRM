import CIcon from '@coreui/icons-react';
import './SearchDropdown.scss';
import { cilCaretBottom, cilCaretTop, cilSearch, cilX } from '@coreui/icons';
import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

interface Option {
	value: string;
	label1: string;
	label2: string;
}

interface Props {
	name: string;
	options: Option[];
}

// Assuming FormValues is the interface representing your form values
interface FormValues {
    [key: string]: any;
    // Define your form fields here
}

const SearchDropdown = (props: Props) => {
	const { options, name } = props;
	const formik = useFormikContext();
	const [inputValue, setInputValue] = useState("");
	const [selected, setSelected] = useState<Option | null>(null);
	const [open, setOpen] = useState<boolean>(false);

	// Inside your component, type formik.values as FormValues
	const formikValues = formik.values as FormValues;

	// Set selected option based on formik values on component mount
    useEffect(() => {
        const selectedOption = options.find(option => option.value === formikValues[name]);
        if (selectedOption) {
            setSelected(selectedOption);
        }
    }, [formikValues[name], options, name]);

	const handleListClick = (option: Option) => {
		setSelected(option);
		setOpen(false);
		formik.setFieldValue(name, option.value);
		setInputValue('');
		// if (!selected || option.value !== selected.value) {
		// 	setSelected(option);
		// 	setOpen(false);
		// 	formik.setFieldValue(name, option.value);
		// 	setInputValue('');
		// }
	}

	return (
		<div className="select-main">
			<div
				onClick={() => setOpen(prev => !prev)}
				className={`select-secondary ${!selected && "text-grey-700"}`}
			>
				{selected ? selected.label1.length > 25 ? selected.label1.substring(0, 25) + "..." : selected.label1 : "Select"}
				<div>
					<span
						onClick={() => setSelected(null)}
						className='me-2'
					>
						<CIcon icon={cilX} size='sm' title='Cancle' />
					</span>
					{
						open ?
							<span><CIcon icon={cilCaretTop} size='sm' title='Up Caret' /></span> :
							<span><CIcon icon={cilCaretBottom} size='sm' title='Down Caret' /></span>
					}
				</div>
			</div>
			<ul className={`select-options ${open ? "open" : "close"}`}>
				<div className='serach-input'>
					<CIcon icon={cilSearch} title='search' size='sm' />
					<input
						type="text"
						value={inputValue}
						onChange={e => setInputValue(e.target.value.toLowerCase())}
						placeholder='Search by Username or Email'
						className=''
					/>
				</div>
				{options.map(option => (
					(option.label1.toLowerCase().includes(inputValue) || option.label2.toLowerCase().includes(inputValue)) && (
						<li
							key={option.value}
							onClick={() => handleListClick(option)}
							className={option.value === selected?.value ? "selected-option" : ""}
						>
							<div>
								<span>{option.label1}</span>
							</div>
							<div>
								<span>{option.label2}</span>
							</div>
						</li>
					)
				))}
			</ul>
		</div>
	);
};

export default SearchDropdown;