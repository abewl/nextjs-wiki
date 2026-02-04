import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const UICard: React.FC<CardProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 320px) 100vw, 384px"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
          {price}
        </span>
      </div>
    </div>
  );
};

export default UICard;
