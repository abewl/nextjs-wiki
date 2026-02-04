interface PropertyCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
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

export default PropertyCard;
