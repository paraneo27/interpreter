import DreamyBackground from './(components)/DreamyBackground';
import Navbar from './(components)/Navbar';

export default function Home() {
  return (
    <div className="relative">
      <DreamyBackground />
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">¡Bienvenido a Interpreter!</h1>
        <p className="text-lg">
          Explora las maravillas de la interpretación de sueños y descubre lo que el tarot tiene para ti.
        </p>
      </div>
    </div>
  );
}
