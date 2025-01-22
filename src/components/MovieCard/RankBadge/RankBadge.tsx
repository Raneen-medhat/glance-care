import React from "react";

interface RankBadgeProps {
  rank: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rank }) => (
  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700/50 text-gray-400 font-medium">
    #{rank}
  </div>
);
