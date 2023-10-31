import {useEffect, useState} from 'react';

function usePhoneNumberFormatter(phone) {

    const [formattedPhoneNo, setFormattedPhoneNo] = useState("")

    useEffect(() => {
       if(phone){
           const numericInput = phone.replace(/\D/g, "");
           const formattedNumber = numericInput.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');

           setFormattedPhoneNo(formattedNumber)
       }
    }, [phone]);

    return formattedPhoneNo
}

export default usePhoneNumberFormatter;
