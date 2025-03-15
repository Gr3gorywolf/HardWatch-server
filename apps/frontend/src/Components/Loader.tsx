export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212121] text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#4caf50] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
};
