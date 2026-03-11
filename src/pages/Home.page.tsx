import { useAuth } from "@/features/auth";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Home</h1>
        <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-amber-800 bg-amber-100 rounded-full animate-pulse">
          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
          Design in progress
        </div>
        <p className="text-gray-500 max-w-xs text-center">
          "We're making your Crypto Tracker better. <br />
          Check back soon!"
        </p>

        <div>
          {isLoading ? (
            "loading..."
          ) : (
            <div>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/auth">Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
