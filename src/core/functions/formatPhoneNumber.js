export const formatPhoneNumber = (phone) => {

    let formattedNumber;

    const numericInput =  phone.replace(/\D/g, "");
    const phoneNumberLength = numericInput?.length;

    if(phoneNumberLength === 8){
    formattedNumber = numericInput.replace(/(\d{2})(\d{3})(\d{3})/, '$1-$2$3');
    }else if(phoneNumberLength === 9){
        formattedNumber = numericInput.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2$3');
    } else if(phoneNumberLength === 10){
        formattedNumber = numericInput.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1-$2$3$4');
    }else{
        formattedNumber = numericInput.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1-$2$3$4');
    }


    return formattedNumber;
}