const dummyData = [
  { name: "test location", latitude: "234.120", longitude: "-112.90" },
];

const axiosResponse = {
  data: dummyData,
  status: 200,
  statusText: "OK",
  config: {},
  headers: {},
};

export default {
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
  },
  get: jest.fn(() => Promise.resolve(axiosResponse)),
};
