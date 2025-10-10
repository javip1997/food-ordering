import { useSelector } from "react-redux";

export default function Footer() {
  const { dark } = useSelector((s) => s.theme);

  return (
    <footer
      className={`py-4 ${
        dark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} FoodieApp. All rights reserved.
      </div>
    </footer>
  );
}
