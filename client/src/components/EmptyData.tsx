import { Message } from 'primereact/message';

export interface EmptyDataProps {
	message: string;
}

const EmptyData = ({ message }: EmptyDataProps) => {
	return (
		<div className="flex justify-center items-center h-full">
			<Message
				text={message}
				className="dark:text-white bg-inherit font-bold"
			/>
		</div>
	);
};

export default EmptyData;
