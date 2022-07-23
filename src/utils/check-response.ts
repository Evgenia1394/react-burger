export const checkResponse = (res: Response):  Promise<{success: boolean, message: string} | boolean> | boolean  => {
    if (res.ok) {
        return res.json();
    } else {
        return false;
    }
}

