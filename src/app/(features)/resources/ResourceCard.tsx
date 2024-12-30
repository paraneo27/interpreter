export default function ResourceCard({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div className="p-4 bg-white rounded shadow hover:shadow-lg transition">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    );
  }
  