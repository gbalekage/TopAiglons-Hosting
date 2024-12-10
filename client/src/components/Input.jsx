const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-light" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-light/10  bg-opacity-50 rounded-lg text-white focus:outline-none placeholder-gray-600 transition duration-200"
      />
    </div>
  );
};
export default Input;
