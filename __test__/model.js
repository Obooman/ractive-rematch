export default {
  state: {
    string: "string",
    number: 0,
    obj: {
      one: "one",
      two: [1, "two"]
    }
  },
  reducers: {
    updateStr(state, payload) {
      return {
        ...state,
        string: payload
      };
    }
  }
};
