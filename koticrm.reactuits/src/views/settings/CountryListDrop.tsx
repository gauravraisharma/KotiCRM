import { cilCaretBottom, cilCaretTop, cilSearch, cilX } from '@coreui/icons';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import CIcon from '@coreui/icons-react';
import './SearchDropdown.scss';

interface Option {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Props {
    name: string;
    options: Option[];
}

const SearchDropdown = (props: Props) => {
    const { options, name } = props;
    const formik = useFormikContext();
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState<Option | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const handleListClick = (option: Option) => {
        if (!selected || option.id !== selected.id) {
            setSelected(option);
            setOpen(false);
            formik.setFieldValue(name, option.id);
            setInputValue('');
        }
    }

    return (
        <div className="select-main">
            <div
                onClick={() => setOpen(prev => !prev)}
                className={`select-secondary ${!selected && "text-grey-700"}`}
            >
                {selected ? selected.firstName.length > 25 ? selected.firstName.substring(0, 25) + "..." : selected.firstName : "Select"}
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
                    (option.firstName.toLowerCase().includes(inputValue) || option.email.toLowerCase().includes(inputValue)) && (
                        <li
                            key={option.id}
                            onClick={() => handleListClick(option)}
                            className={option.id === selected?.id ? "selected-option" : ""}
                        >
                            <div>
                                <span>{option.firstName}</span>
                            </div>
                            <div>
                                <span>{option.email}</span>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default SearchDropdown;