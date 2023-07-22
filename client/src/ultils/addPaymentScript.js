// AddPaymentScript.js (outside the component)
const addPaymentScript = async ({ data, setSdkReady }) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
        setSdkReady(true);
    };
    document.body.appendChild(script);
};

export default addPaymentScript;
