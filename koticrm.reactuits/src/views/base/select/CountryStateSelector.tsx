// import { ChangeEvent, useState } from 'react';

// import Countries from '../../../constants/country-state/countries+states.json';
// import { Country, State } from '../../../models/Country-State/CountryState';
// import { CCol, CRow } from '@coreui/react';
// import { ErrorMessage, Field } from 'formik';

// interface Props {
//     countryName: string;
//     stateName: string;
// }

// const CountryStateSelector = ({ countryName, stateName }: Props) => {
//     const countries: Country[] = Countries;
//     const [selectedCountry, setSelectedCountry] = useState<string>("");
//     const [states, setStates] = useState<State[]>([]);

//     const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
//         const selectedCountry = e.target.value;
//         setSelectedCountry(selectedCountry);

//         const selectedCountryObject = countries.find(country => country.name === selectedCountry);

//         console.log(selectedCountryObject);

//         if (selectedCountryObject) {
//             setStates(selectedCountryObject.states);
//         } else {
//             setStates([]);
//         }
//     }

//     console.log(selectedCountry);

//     return (
//         <>
            
//         </>
//     );
// };

// export default CountryStateSelector;