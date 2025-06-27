const MenuItem = ({ icon: Icon, label, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-md text-sm transition-colors cursor-pointer ${
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "hover:bg-gray-100 dark:hover:bg-zinc-800"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};

export default MenuItem;
