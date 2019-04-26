import authReducer from "../../reducers/auth";

test("should login with uid", () => {
  const uid = 12345;
  const action = {
    type: "LOGIN",
    uid
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(uid);
});

test("should logout", () => {
  const state = authReducer({ uid: "any" }, { type: "LOGOUT" });
  expect(state).toEqual({});
});
