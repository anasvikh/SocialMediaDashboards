export interface IFollowerCitiesData {
	name: string;
	period: string;
	values: Value[];
	title: string;
	description: string;
	id: string;
}

export interface Value {
	value: Value;
	end_time: string;
}

export interface IChartValue {
    name: string;
	value: number;
}



