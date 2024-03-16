import {pair, head, tail} from '../pair'

function make_interval(x, y) {
  return pair(x, y)
}

function lower_bound(interval) {
  return head(interval)
}

function upper_bound(interval) {
  return tail(interval)
}

function add_interval(x, y) {
  return make_interval(lower_bound(x) + lower_bound(y), upper_bound(x) + upper_bound(y))
}

function sub_interval(x, y) {
  return add_interval(x, make_interval(-upper_bound(y), -lower_bound(y)))
}

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(math_min(p1, p2, p3, p4),
                       math_max(p1, p2, p3, p4));
}

function mul_interval(x, y) {
  const x_lower = lower_bound(x)
  const x_upper = upper_bound(x)
  const y_lower = lower_bound(y)
  const y_upper = upper_bound(y)

  function special_case() {
    const p1 = x_lower * y_lower;
    const p2 = x_lower * y_upper;
    const p3 = x_upper * y_lower;
    const p4 = x_upper * y_upper;
    make_interval(math_min(p1, p2, p3, p4),
                       math_max(p1, p2, p3, p4));
  }

  return x_lower > 0 && x_upper > 0 && y_lower > 0 && y_upper > 0
    ? make_interval(x_lower * y_lower, x_upper * y_upper)
    : x_lower < 0 && x_upper < 0 && y_lower < 0 && y_upper < 0
    ? make_interval(x_upper * y_upper, x_lower * y_lower)
    : x_lower < 0 && x_upper> 0 && y_lower > 0 && y_upper > 0
    ? make_interval(x_lower * y_upper, x_upper * y_upper)
    : x_lower > 0 && x_upper > 0 && y_lower < 0 && y_upper > 0
    ? make_interval(x_upper * y_lower, x_upper * y_upper)
    : x_lower < 0 && x_upper < 0 && y_lower > 0 && y_upper > 0
    ? make_interval(x_lower * y_upper, x_upper * y_lower)
    : x_lower > 0 && x_upper > 0 && y_lower < 0 && y_upper < 0
    ? make_interval(x_upper * y_lower, x_lower * y_upper)
    : x_lower < 0 && x_upper < 0 && y_lower < 0 && y_upper > 0
    ? make_interval(x_lower * y_upper, x_lower * y_lower)
    : x_lower < 0 && x_upper > 0 && y_lower < 0 && y_upper < 0
    ? make_interval(x_upper * y_lower, x_lower * y_lower)
    : x_lower < 0 && x_upper > 0 && y_lower < 0 && y_upper > 0
    ? special_case()
    : Error("lower bound larger than upper bound")
}

function div_interval(x, y) {
  if (lower_bound(y) <= 0 && upper_bound(y) >= 0) {
    throw new Error("division error (interval spans 0)")
  }
  return mul_interval(x, make_interval(1 / upper_bound(y),
                                       1 / lower_bound(y)));
} 

function make_center_percent(center, percent_tolerance) {
  return make_interval(center - center * percent_tolerance / 100, center + center * percent_tolerance / 100)
}

function center(x) {
  return (lower_bound(x) + upper_bound(x)) / 2
}

function percent(x) {
  const lower = lower_bound(x)
  const upper = upper_bound(x)
  const center = (lower + upper) / 2
  return (center - lower) / center * 100

}

function parallel1(r1, r2) {
  return div_interval(mul_interval(r1, r2), add_interval(r1, r2))
}

function parallel2(r1, r2) {
  const one = make_interval(1, 1)
  return div_interval(one, add_interval(div_interval(one, r1), div_interval(one, r2)))
}

