export const fetchAPIData = async function (
  url,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    const res = await fetch(`http://localhost:6767${url}`, {
      method,
      headers,
      body,
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
