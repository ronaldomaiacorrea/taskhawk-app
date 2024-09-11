interface CardTitleProps {
	title: string;
}

const CardTitle = ({ title }: CardTitleProps) => {
	return <div className="pb-0">{title}</div>;
};

export default CardTitle;
