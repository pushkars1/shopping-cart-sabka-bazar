export default function (index, options) {
  if (index % 2 == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
