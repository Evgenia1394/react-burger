export const checkResponse = (res: Response): boolean | Promise<Response> => {
    if (res.ok) {
        return res.json();
    } else {
        return false;
    }
}
