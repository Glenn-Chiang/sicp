function average(a, b) {
  return (a + b) / 2
}

function fixed_point(f, initial_guess) {
  const tolerance = 0.00001
  
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance
  }
  function try_with(guess) {
    const next = f(guess)
    return close_enough(guess, next)
      ? next
      : try_with(next)
  }
  return try_with(initial_guess)
}

function iterative_improve(good_enough, improve) {
  function iter(guess) {
    return good_enough(guess)
      ? guess
      : iter(improve(guess))
  }
  return iter
}

function fixed_point_iter(f, initial_guess) {
  return iterative_improve(x => Math.abs(x - f(x)) < 0.00001, x => f(x))(initial_guess)
}

function sqrt_iter(x, initial_guess) {
  function good_enough(guess) {
    return Math.abs(square(guess) - x) < 0.001
  }
  function improve(guess) {
    return average(guess, x / guess)
  }
  return iterative_improve(good_enough, improve)(initial_guess)
}

console.log(sqrt_iter(100, 1))

const dx = 0.00001

function deriv(g) {
  return x => (g(x + dx) - g(x)) / dx
}

function newton_transform(g) {
  return x => x - g(x) / deriv(g)(x)
}

function newtons_method(g, guess) {
  return fixed_point(newton_transform(g), guess)
}

function fixed_point_transform(g, transform, guess) {
  return fixed_point(transform(g), guess)
}

function average_damp(f) {
  return x => (x + f(x)) / 2
}

function sqrt_newton(x) {
  return newtons_method(y => square(y) - x, 1)
}

function exp(base, power) {
  return power === 0 ? 1 : base * exp(base, power - 1)
}

function n_root(x, n) {
  return fixed_point(repeated(average_damp, Math.floor(Math.log(n) / Math.log(2)))(y => x / exp(y, n - 1)), 1)
}

function sqrt(x) {
  return fixed_point(average_damp(y => x / y), 1)
}

function sqrt_newton(x) {
  return fixed_point_transform(y => square(y) - x, newton_transform, 1)
}

function square(x) {
  return x * x
}

function cube(x) {
  return x * x * x
}

function cubic(a, b, c) {
  return x => cube(x) + a * square(x) + b * x + c
}

function inc(x) {
  return x + 1
}

function double(f) {
  return x => f(f(x))
}

function compose(f, g) {
  return x => f(g(x))
}

function repeated(f, n) {
  return n === 1
    ? f
    : compose(f, repeated(f, n - 1))
}

function smooth(f) {
  return x => (f(x - dx) + f(x) + f(x + dx)) / 3
}

function n_fold_smooth(f, n) {
  return repeated(smooth, n)(f)
}

