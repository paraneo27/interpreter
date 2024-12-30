import ResourceCard from './ResourceCard';

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Recursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResourceCard
          title="Libro: Psicología y Alquimia"
          description="Explora el trabajo de Jung sobre los sueños y su conexión con la alquimia."
        />
        <ResourceCard
          title="Video: La Interpretación de los Sueños"
          description="Conferencia de Fritz Perls sobre la importancia de los sueños."
        />
        <ResourceCard
          title="Artículo: Jodorowsky y los Sueños"
          description="Cómo los sueños influyen segun la psicomagia."
        />
      </div>
    </div>
  );
}
