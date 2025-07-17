// Loading spinner component

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
