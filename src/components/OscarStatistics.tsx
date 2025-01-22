import React from "react";
import { useMovies } from "../context/MovieContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OscarStatistics: React.FC = () => {
  const { movies } = useMovies();

  // Process data for the charts
  const yearlyStats = movies.reduce(
    (
      acc: {
        [key: string]: { year: string; wins: number; nominations: number };
      },
      movie
    ) => {
      const year = movie.year.toString();
      if (!acc[year]) {
        acc[year] = { year, wins: 0, nominations: 0 };
      }
      acc[year].wins += movie.awards.oscars;
      acc[year].nominations += movie.awards.nominations;
      return acc;
    },
    {}
  );

  const chartData = Object.values(yearlyStats).sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  // Calculate total statistics
  const totalStats = movies.reduce(
    (acc, movie) => ({
      totalWins: acc.totalWins + movie.awards.oscars,
      totalNominations: acc.totalNominations + movie.awards.nominations,
      moviesWithOscars:
        acc.moviesWithOscars + (movie.awards.oscars > 0 ? 1 : 0),
      successRate: ((acc.totalWins / acc.totalNominations) * 100).toFixed(1),
    }),
    { totalWins: 0, totalNominations: 0, moviesWithOscars: 0, successRate: "0" }
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Oscar Wins</div>
            <div className="text-indigo-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h7zm0 2H3v12h7V4z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalStats.totalWins}
          </div>
          <div className="text-xs text-gray-400 mt-1">Total Academy Awards</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Nominations</div>
            <div className="text-purple-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalStats.totalNominations}
          </div>
          <div className="text-xs text-gray-400 mt-1">Total Nominations</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4 border border-pink-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Success Rate</div>
            <div className="text-pink-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalStats.successRate}%
          </div>
          <div className="text-xs text-gray-400 mt-1">Win Rate</div>
        </div>

        <div className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-xl p-4 border border-rose-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Oscar Films</div>
            <div className="text-rose-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {totalStats.moviesWithOscars}
          </div>
          <div className="text-xs text-gray-400 mt-1">Award-Winning Films</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-medium text-white mb-6">
          Oscar Performance Trends
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="year"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#F3F4F6",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                itemStyle={{ color: "#F3F4F6" }}
                labelStyle={{ color: "#F3F4F6", marginBottom: "0.5rem" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "1rem",
                }}
              />
              <Bar
                dataKey="wins"
                name="Oscar Wins"
                fill="#818CF8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="nominations"
                name="Nominations"
                fill="#4B5563"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OscarStatistics;
