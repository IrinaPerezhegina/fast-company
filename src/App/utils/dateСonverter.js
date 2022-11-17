export function dateСonverter(date) {
    const count = Date.now();
    if ((count - Number(date)) / 60000 <= 1) {
        return "1 минуту назад";
    } else if ((count - Number(date)) / 60000 <= 5) {
        return "5 минут назад";
    } else if ((count - Number(date)) / 60000 <= 10) {
        return "10 минут назад";
    } else if ((count - Number(date)) / 60000 <= 30) {
        return "30 минут назад";
    } else if ((count - Number(date)) / 86400000 <= 1) {
        return `${new Date(Number(date)).getHours()}:${new Date(
            Number(date)
        ).getMinutes()}`;
    } else if ((count - Number(date)) / 31536000000 <= 1) {
        return `${new Date(Number(date)).getDay()}.${
            new Date(1633576399367).getMonth() + 1
        }`;
    } else {
        return `${new Date(Number(date)).getDay()}.${
            new Date(Number(date)).getMonth() + 1
        }.${new Date(Number(date)).getFullYear()}`;
    }
}
