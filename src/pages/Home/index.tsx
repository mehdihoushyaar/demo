import { Link } from "@tanstack/react-router";

const HomePage: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold mb-10 text-center">صفحه اصلی</h1>
      <Link to="/filter">
        <button className="bg-primary w-fit py-4 px-16 rounded-lg hover:opacity-60 transition-all duration-300">
          رفتن به جستجوی فیلم ها
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
