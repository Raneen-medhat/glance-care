import React from "react";

interface RatingBadgeProps {
  /** The rating value to display */
  rating: number;
}

/**
 * RatingBadge Component
 *
 * Displays a movie's rating with a star icon
 *
 * @param {RatingBadgeProps} props - Component props
 */
export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => (
  <div
    className="flex items-center gap-2"
    role="status"
    aria-label={`Rating: ${rating} out of 10`}
  >
    <span className="text-yellow-400" aria-hidden="true">
      ★
    </span>
    <span className="text-white font-medium">{rating}</span>
  </div>
);
