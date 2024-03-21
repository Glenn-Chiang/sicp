function make_protected_account(balance, initial_password) {
  function withdraw(amount) {
    if (balance >= amount) {
        balance = balance - amount;
        return balance;
    } else {
        return "Insufficient funds";
    }
  }
  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }
  
  function call_the_cops(_) {
    return "Called the cops";
  }
  
  let incorrect_attempts = 0;
  const max_consecutive_attempts = 5;

  function make_dispatch(password) {
      function dispatch(entered_password, m) {
          if (entered_password !== password) {
                if (incorrect_attempts === max_consecutive_attempts) {
                    return call_the_cops;
                }
                incorrect_attempts = incorrect_attempts + 1;
                return x => "Incorrect password";
          } else {
            incorrect_attempts = 0;            
            return m === "withdraw"
                ? withdraw
                : m === "deposit"
                ? deposit
                : m === "make joint"
                ? make_dispatch
                : error(m, "unknown request -- make_account");
          }
      }
      return dispatch; 
  }

return make_dispatch(initial_password);
}

function make_joint(account, password, new_password) {
  return account(password, "make joint")(new_password);
}

const peter_acc = make_protected_account(100, "open sesame");
const paul_acc = make_joint(peter_acc, "open sesame", "rosebud");
paul_acc("rosebud", "withdraw")(20);
peter_acc("open sesame", "withdraw")(10);
paul_acc("rosebud", "withdraw")(0);


function make_f(init) {
  return x => {
      init = x - init;
      return init;
  };
}

const f = make_f(1/2);
f(0) + f(1);

















