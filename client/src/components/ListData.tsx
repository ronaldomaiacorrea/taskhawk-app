import { useEffect, useState } from 'react';

interface ListData {
	ok?: string;
	message?: string;
}

const ListData = () => {
	const [data, setData] = useState<ListData | null>(null);

	useEffect(() => {
		fetch('/api/hello')
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => setData(data))
			.catch((error) => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}, []);

	return data && <div>{`${data.ok}  ${data.message}`}</div>;
};

export default ListData;
