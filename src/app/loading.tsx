export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
        </div>

        {/* Inner ring */}
        <div className="absolute inset-2 border-2 border-cyan-400/20 rounded-full animate-spin direction-reverse">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
