import { Message } from 'primereact/message';

export interface EmptyDataProps {
	message: string;
}

const EmptyData = ({ message }: EmptyDataProps) => {
	return (
		<Message text={message} className="dark:text-white bg-inherit font-bold" />
	);
};

export default EmptyData;
