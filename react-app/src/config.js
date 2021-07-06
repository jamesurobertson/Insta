import { toast } from "react-toastify";

export function showErrors(errors) {
    errors.forEach((error) => {
        toast.info(error, {
            position: 'top-right',
            autoClose: 5000,
            closeOnClick: true,
        });
    });
}


