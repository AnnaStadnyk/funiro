export let listCart = [];

export function checkCart() {
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("FuniroListCart="))
        ?.split("=")[1];
    if (cookieValue) {
        listCart = JSON.parse(cookieValue);
    }
}
