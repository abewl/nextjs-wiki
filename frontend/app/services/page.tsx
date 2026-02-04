import PropertyCard from "../../components/PropertyCard";

const PropertiesPage = () => {
  const properties = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    title: `Property ${i + 1}`,
    description: `A beautiful property located in a prime area. This is property number ${i + 1}.`,
    price: `$${(i + 1) * 100000}`,
    imageUrl: ``,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            description={property.description}
            price={property.price}
            imageUrl={property.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
