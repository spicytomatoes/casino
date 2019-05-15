import database from "../firebase/firebase";

export const addMoney = amount => ({
  type: "ADD_MONEY",
  amount
});
export const startAddMoney = amount => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/money`)
      .once("value")
      .then(snapshot => {
        const newMoney = snapshot.val() + amount;
        database.ref(`users/${uid}/money`).set(newMoney);
        dispatch(addMoney(amount));
      });
  };
};

export const deductMoney = amount => ({
  type: "DEDUCT_MONEY",
  amount
});
export const startDeductMoney = amount => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/money`)
      .once("value")
      .then(snapshot => {
        const newMoney = snapshot.val() - amount;
        database.ref(`users/${uid}/money`).set(newMoney);
        dispatch(deductMoney(amount));
      });
  };
};

export const setMoney = amount => ({
  type: "SET_MONEY",
  amount
});
export const startSetMoney = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/money`)
      .once("value")
      .then(snapshot => {
        let money;
        if (snapshot.val() || snapshot.val() === 0) {
          money = snapshot.val();
        } else {
          money = 1000;
        }
        database.ref(`users/${uid}/money`).set(money);
        dispatch(setMoney(money));
      });
  };
};
export const startSetCounter = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/counter`)
      .once("value")
      .then(snapshot => {
        let counter;
        if (snapshot.val() || snapshot.val() === 0) {
          counter = snapshot.val();
        } else {
          counter = 0;
        }
        database.ref(`users/${uid}/counter`).set(counter);
      });
  };
};
export const startAddCounter = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log("shame!");
    return database
      .ref(`users/${uid}/counter`)
      .once("value")
      .then(snapshot => {
        const newCount = snapshot.val() + 1;
        database.ref(`users/${uid}/counter`).set(newCount);
      });
  };
};
