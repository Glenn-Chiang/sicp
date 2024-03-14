function display(text) {
  console.log(text)
}

function average(x, y) {
  return (x + y) / 2
}

const tolerance = 0.00001

function close_enough(x, y) {
  return Math.abs(x - y) < tolerance
}

function fixed_point(f, initial_guess) {
  function try_with(guess) {
    display(guess)
    const next = f(guess)
    return close_enough(guess, next) 
      ? next
      : try_with(next)
  }
  return try_with(initial_guess)
}

function fixed_point_average_damped(f, initial_guess) {
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance
  }
  function try_with(guess) {
    display(guess)
    const next = average(guess, f(guess))
    return close_enough(guess, next) 
      ? next
      : try_with(next)
  }
  return try_with(initial_guess)
}

// Exercise 1.36
// fixed_point(x => Math.log(1000) / Math.log(x), 2)
// fixed_point(x => average(x, Math.log(1000) / Math.log(x)), 2)

function cont_frac(n, d, k) {
  function compute(i) {
    return i === k
      ? n(i) / d(i)
      : n(i) / (d(i) + compute(i+1))
  }
  return compute(1)
}

function tac_cf(x, k) {
  return cont_frac(x => x === 1 ? x : -x * x, x => 2 * x - 1, k)
}

function cont_frac_iter(n, d, k) {
  function iter(i, current) {
    return i === 1
      ? n(i) / (d(i) + current)
      : iter(i-1, n(i-1) / (d(i-1) + current))
  }
  return iter(k, 0)
}

// Exercise 1.37
function golden_ratio() {
  golden_ratio = 1.618
  
  k = 1
  do {
    res = cont_frac_iter(i => 1, i => 1, k)
    display(res)
    k++
  } while(!close_enough(res, 1/golden_ratio))
  
  display(k)
}

function euler(k) {
  return cont_frac_iter(i => 1, (i+1) % 3 < 1 ? 2 * (i+1) / 3 : 1, k) + 2
}
