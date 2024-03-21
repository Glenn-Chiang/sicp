function make_account(balance) {
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
  function dispatch(m) {
      return m === "withdraw"
          ? withdraw
          : m === "deposit"
          ? deposit
          : error(m, "unknown request -- make_account");
  }
  return dispatch;
}

// Exercise 3.3: Password-protected accounts
function make_protected_account(balance, password) {
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
              : error(m, "unknown request -- make_account");
      }
  }
  return dispatch;
}

const acc = make_protected_account(100, "secret");
acc("wrong", "deposit")(40);
acc("wrong", "deposit")(40);
acc("wrong", "deposit")(40);
acc("wrong", "deposit")(40);
// acc("secret", "withdraw")(40);
acc("wrong", "deposit")(40);
acc("wrong", "deposit")(40);

function make_accumulator(sum) {
  return x => {
      sum = sum + x;
      return sum;
  };
}

// Exercise 3.1
// const a = make_accumulator(5);
// a(10);
// a(10);


function make_monitored(f) {
  let count = 0;
  function mf(arg) {
      if (arg === "how many calls") {
          return count;
      } else if (arg === "reset count") {
          count = 0;
      } else {
          count = count + 1;
          return f(arg);
      }
  }
  return mf;
}

// Exercise 3.2
// const s = make_monitored(math_sqrt);
// s(100);
// s(20);
// s("how many calls");
// s("reset count");
// s(100);
// s("how many calls");

