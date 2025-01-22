import React from "react";
import Header from "./components/Header";
import OscarStats from "./components/OscarStats";
import TopPerformers from "./components/TopPerformers";
import MovieSearch from "./components/MovieSearch";
import OscarStatistics from "./components/OscarStatistics";
import { moviesData } from "./data/movies";
import { MovieProvider } from "./context/MovieContext";

// Sidebar component for better organization
const Sidebar: React.FC = () => {
  return (
    <div className="lg:w-[35%] space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-200 mb-6">
            Movie Search & Details
          </h2>
          <MovieSearch />
        </div>
      </div>
    </div>
  );
};

// Main content component for better organization
const MainContent: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-[2000px] mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />

          <div className="lg:w-[65%] space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
              <h2 className="text-lg font-medium text-gray-200 mb-6">
                Oscar Statistics
              </h2>
              <OscarStatistics />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-200">
                    Awards & Recognition
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                    Oscar Statistics
                  </span>
                </div>
                <OscarStats />
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-200">
                    Top Performers
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                    Rating Based
                  </span>
                </div>
                <TopPerformers />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Main App component
function App() {
  return (
    <MovieProvider initialMovies={moviesData}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <MainContent />
      </div>
    </MovieProvider>
  );
}

export default App;
