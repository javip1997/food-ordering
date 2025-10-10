export default function About() {
  return (
     <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center transition-colors duration-300"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')",
      }}
    >

      <div className="relative max-w-4xl mx-auto p-6 md:p-12 text-white min-h-screen flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About FoodieApp</h1>
        <p className="text-lg md:text-xl leading-relaxed mb-4">
          FoodieApp is your ultimate destination for discovering and ordering delicious dishes from the best local restaurants. We believe in fresh, quality food delivered right to your doorstep.
        </p>
        <p className="text-lg md:text-xl leading-relaxed">
          Our mission is to connect food lovers with amazing culinary experiences while supporting local businesses. Whether it’s a quick snack, a gourmet meal, or healthy options, FoodieApp has you covered.
        </p>
      </div>
    </div>
  );
}
