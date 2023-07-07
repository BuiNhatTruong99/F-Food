import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ type, message, promise }) {
    if (type === undefined) {
        // If type is a promise
        // const resolveAfterSec = new Promise((resolve) => setTimeout(resolve, 1500));
        return toast.promise(promise, {
            pending: 'Promise is pending',
            success: `${message}`,
            error: 'Promise rejected 🤯',
        });
    } else {
        // If type is a regular string like 'success', 'error', etc.
        return toast[type](message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }
}

export default Toast;
