export const CheckResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return false;
    }
}
