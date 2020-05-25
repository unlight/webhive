import h from 'vhtml';
import dayjs from 'dayjs';

const dayTitle = (date: Date) => dayjs(date).format('ddd, D MMM, YYYY');
/**
 * Shows day title between entries.
 * Thu, 7th Mar, 2019
 */
export function DayTitle({ previousDate, currentDate }) {
    const current: Date = new Date(currentDate);
    if (!previousDate) {
        return <h4>{dayTitle(current)}</h4>;
    }
    const previous: Date = new Date(previousDate);
    if (
        current.getDay() !== previous.getDay() ||
        current.getMonth() !== previous.getMonth() ||
        current.getFullYear() !== previous.getFullYear()
    ) {
        return <h4>{dayTitle(current)}</h4>;
    }
}
