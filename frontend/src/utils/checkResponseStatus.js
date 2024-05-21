
export default function isResponseOK(res) {
    if (res.status >= 200 && res.status <= 299) {
        return res.data;
    } else {
        throw Error(res.statusText);
    }
}