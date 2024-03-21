function monte_carlo(trials, experiment) {
  function iter(trials_remaining, trials_passed) {
      return trials_remaining === 0
          ? trials_passed / trials
          : experiment()
          ? iter(trials_remaining - 1, trials_passed + 1)
          : iter(trials_remaining - 1, trials_passed);
  }
  return iter(trials, 0);
}

function random_in_range(low, high) {
  return low + math_random() * (high - low);
}


function estimate_integral(P, x1, x2, y1, y2, trials) {
  function test_point() {
      const random_x = random_in_range(x1, x2);
      const random_y = random_in_range(y1, y2);
      return P(random_x, random_y);
  }
  const area_of_rectangle = (x2 - x1) * (y2 - y1);
  return monte_carlo(trials, test_point) * area_of_rectangle;
}

function square(x) {
  return x * x;
}

function inside_unit_circle(x, y) {
  return square(x) + square(y) <= 1;
}

estimate_integral(inside_unit_circle, -1, 1, -1, 1, 10000);


function rand(op) {
  let x = random_init;
  
  if (op === "generate") {
      x = rand_update(x);
      return x;
  } else if (op === "reset") {
      return new_val => {
          x = new_val;
      };
  } else {
      return error(op, "unknown operation -- rand");
  }
}

