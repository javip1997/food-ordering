import HeroSlider from "../components/HeroSlider";
import MenuPreview from "./MenuPreview";

export default function Home() {
  return (
    <div className="w-full">
      {/* Full-width slider */}
      <HeroSlider />

      {/* Categories section */}
      {/* <section className="w-full py-8 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-4 px-4">Categories</h2>
        <MenuPreview showCategoriesOnly />
      </section> */}

      {/* Popular products section */}
      <section className="w-full py-8">
        <h2 className="text-3xl font-bold mb-4 px-4">Popular Near You</h2>
        <MenuPreview limit={8} />
      </section>
    </div>
  );
}
