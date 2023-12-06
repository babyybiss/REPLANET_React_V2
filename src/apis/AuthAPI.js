import axios from 'axios';
import Swal from 'sweetalert2';
const fetchAuth = async (fetchData) => {
    const method = fetchData.method;
    const url = fetchData.url;
    const data = fetchData.data;
    const header = fetchData.header;
    try {
        const response = (method === 'get' && (await axios.get(url, header))) ||
            (method === 'post' && (await axios.post(url, data, header))) ||
            (method === 'put' && (await axios.put(url, data, header))) ||
            (method === 'delete' && (await axios.delete(url, header)));
        if (response && response.data.error) {
            console.log(response.data.error);
            return null;
        }
        if (!response) {
            console.log("응답 오류");
            return null;
        }
        return response;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            const serverError = err;
            if (serverError && serverError.response) {
                console.log(serverError.response.data);
                Swal.fire({
                    icon: "error",
                    iconColor: "#DB524E",
                    title: `${serverError.response.data.message}`,
                    text: '문제가 지속될 경우 고객센터로 문의 바랍니다.',
                    showCancelButton: false,
                    confirmButtonColor: '#1D7151',
                    confirmButtonText: '확인'
                })
                return null;
            }
        }
        console.log(err);
        Swal.fire("기타 오류");
        return null;
    }
};
const GET = (url, header) => {
    const response = fetchAuth({ method: 'get', url, header });
    return response;
};
const POST = (url, data, header) => {
    const response = fetchAuth({ method: 'post', url, data, header });
    return response;
};
const PUT = async (url, data, header) => {
    const response = fetchAuth({ method: 'put', url, data, header });
    return response;
};
const DELETE = async (url, header) => {
    const response = fetchAuth({ method: 'delete', url, header });
    return response;
};
export { GET, POST, PUT, DELETE };
