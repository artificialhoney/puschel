import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { MdStarBorder } from 'react-icons/md';

const StarRating = (props: {
  disabled?: boolean;
  error?: FieldError;
  value?: number;
  onChange?: (rating: number) => void;
}) => {
  const { disabled, error, onChange } = props;
  const [rating, setRating] = useState((props.value || 0) * 5);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    onChange && onChange(rating / 5);
  }, [rating]);

  return (
    <div
      className={`flex w-full outline-none ${
        error
          ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
          : 'border-gray-200 dark:!border-white/10 dark:text-white'
      }`}
    >
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            disabled={disabled}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            className={`${
              index <= (hover || rating)
                ? 'text-brand-500 dark:text-brand-400'
                : 'text-gray-600 dark:text-gray-500'
            }`}
          >
            <MdStarBorder />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
