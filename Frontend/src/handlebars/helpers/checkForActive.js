export default function (id, hashid, options) {
  if (id === hashid) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
