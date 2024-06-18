const Appbar = () => {
  return (
    <div className="flex px-4 py-5 justify-between border-gray-400 border-b-2">
      <div>
        <h1 className="text-3xl font-bold">Payments App</h1>
      </div>
      <div className="flex text-lg gap-4 items-center">
        <div className="font-semibold">Hello, User</div>
        <span className="flex items-center justify-center font-semibold rounded-full h-10 w-10  bg-gray-200">U</span>
      </div>
    </div>
  );
};

export default Appbar;
