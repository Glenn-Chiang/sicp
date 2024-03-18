function is_variable(x) {
  return is_string(x);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function number_equal(exp, num) {
  return is_number(exp) && exp === num;
}

function make_sum(a1, a2) {
  return is_number(a1) && is_number(a2)
      ? a1 + a2
      : number_equal(a1, 0)
      ? a2
      : number_equal(a2, 0) 
      ? a1
      : list("+", a1, a2);
}

function make_sum_infix(a1, a2) {
  return is_number(a1) && is_number(a2)
      ? a1 + a2
      : number_equal(a1, 0)
      ? a2
      : number_equal(a2, 0) 
      ? a1
      : list(a1, "+", a2);
}

function make_product(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
      ? 0
      : number_equal(m1, 1)
      ? m2
      : number_equal(m2, 1)
      ? m1
      : is_number(m1) && is_number(m2)
      ? m1 * m2
      : list("*", m1, m2);
}

function make_product(m1, m2) {
  return number_equal(m1, 0) || number_equal(m2, 0)
      ? 0
      : number_equal(m1, 1)
      ? m2
      : number_equal(m2, 1)
      ? m1
      : is_number(m1) && is_number(m2)
      ? m1 * m2
      : list(m1, "*", m2);
}

function is_sum(x) {
  return is_pair(x) && head(x) === "+";
}

function addend(sum) {
  return head(tail(sum));
}

function augend(sum) {
  return accumulate(make_sum, 0, tail(tail(sum)));
}

function is_sum_infix(x) {
  return is_pair(x) && head(tail(x)) === "+";
}

function addend_infix(sum) {
  return head(sum);
}

function is_product(x) {
  return is_pair(x) && head(x) === "*";
}

function multiplier(product) {
  return head(tail(product));
}

function multiplicand(product) {
  return accumulate(make_product, 1, tail(tail(product)));
}

function is_product_infix(x) {
  return ispair(x) && head(tail(x)) === "*";
}

function mutliplier_infix(product) {
  return head(product);   
}

function make_exp(base, exponent) {
  return number_equal(exponent, 0)
      ? 1
      : number_equal(exponent, 1)
      ? base
      : list("**", base, exponent);
}

function is_exp(x) {
  return is_pair(x) && head(x) === "**";
}

function base(exp) {
  return head(tail(exp));
}

function exponent(exp) {
  return head(tail(tail(exp)));
}

function deriv(exp, variable) {
  return is_number(exp) 
      ? 0
      : is_variable(exp)
      ? is_same_variable(exp, variable) ? 1 : 0
      : is_sum(exp)
      ? make_sum(deriv(addend(exp), variable), derive(augend(exp), variable))
      : is_product(exp)
      ? make_sum(make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
                 make_product(multiplicand(exp), deriv(multiplier(exp), variable)))
      : is_exp(exp)
      ? make_product(make_product(exponent(exp),
                                  make_exp(base(exp), exponent(exp) - 1)),
                     deriv(base(exp), variable))
      : error(exp, "unknown expression type --deriv");
}