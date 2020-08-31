/**
 * Generic sort method extension. Handles nulls and case variants
 * @param leftValue Left value
 * @param rightValue Right value
 * @param desc Whether it is a descending sort
 */
export const compare = (
  leftValue: any,
  rightValue: any,
  desc: boolean = false
) => {
  if (!leftValue && !rightValue) {
    return 0;
  }
  if (!leftValue) {
    return desc ? 1 : -1;
  }
  if (!rightValue) {
    return desc ? -1 : 1;
  }

  const result = leftValue - rightValue;

  if (isNaN(result)) {
    return desc
      ? rightValue.toString().trim().localeCompare(leftValue.toString().trim())
      : leftValue.toString().localeCompare(rightValue.toString().trim());
  } else {
    return desc ? -result : result;
  }
};
