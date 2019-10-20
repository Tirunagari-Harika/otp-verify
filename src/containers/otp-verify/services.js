import axios from "axios";

const BASE_URL = window.location.origin;

const axiosInstance = axios.create({
    baseURL:BASE_URL
});

const submitOtp = () => "assets/json/otp/submitOtp.json";

const resendOtp = () => "assets/json/otp/triggerOtp.json";

export default ({
    axiosInstance,
    submitOtp,
    resendOtp
})
