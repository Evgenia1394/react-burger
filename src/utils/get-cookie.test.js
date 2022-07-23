import getCookie from "./get-cookie";

jest.spyOn(window, 'cookie')

describe('Получение параметров из куки', () => {
    it('Получение значение из куки', () => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: 'bar=42'
        })
        const result = '42';
        expect(getCookie('bar')).toBe('42')
    })
    it('Получение undefined на несуществующий name', () => {
        Object.defineProperty(document, 'cookie', {
            writable: true,
            value: 'bar=42'
        })
        expect(getCookie('foo')).toBe(undefined)
    })
})
