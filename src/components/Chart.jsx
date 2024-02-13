import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const generateRandomData = (numDataPoints = 5) => {
	return Array.from({ length: numDataPoints }, () => ({
		name: `Data ${Math.floor(Math.random() * 100)}`,
		height: Math.floor(Math.random() * 300),
	}));
};

const Chart = () => {
	const [data, setData] = useState(generateRandomData());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setData(generateRandomData());
		}, 6000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<BarChart width={600} height={300} data={data}>
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="height" fill="#2980b9" />
		</BarChart>
	);
};

export default Chart;
