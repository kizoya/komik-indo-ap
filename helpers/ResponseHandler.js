const cleanData = (data) => {
  if (typeof data === 'string') return data.replace(/\n+/g, ' ');
  if (Array.isArray(data)) return data.map(cleanData);
  if (data && typeof data === 'object') return Object.fromEntries(Object.entries(data).map(([k, v]) => [k, cleanData(v)]));
  return data;
};


const sendResponse = (res, status, data = null, message = '') => {
  res.status(status ? 200 : 500).json({
    status,
    message,
    data: cleanData(data),
  });
};

module.exports = { sendResponse };
