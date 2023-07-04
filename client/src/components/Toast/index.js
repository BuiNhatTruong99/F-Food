import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast({ type, message }) {
    console.log(type, message);
    if (type === undefined) {
        // If type is a promise
        const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 2000));
        return toast.promise(resolveAfter3Sec, {
            pending: 'Promise is pending',
            success: 'Promise resolved 👌',
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
