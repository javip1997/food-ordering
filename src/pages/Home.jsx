import HeroSlider from "../components/HeroSlider"
import MenuPreview from "./MenuPreview"

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Categories</h2>
        <MenuPreview showCategoriesOnly />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Popular Near You</h2>
        <MenuPreview limit={8} />
      </div>
    </div>
  )
}
