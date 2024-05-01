import dayjs from 'dayjs';

const calendar = {
	selected: new Date(),
	start: dayjs('2022-07-01').toDate(),
	end: dayjs().add(10, 'year').toDate(),
	format: 'MM/DD/YYYY'
};

export { calendar };
