function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (! is_undefined(fun)) {
      return apply(fun, map(contents, args));
  } else {
      if (length(args) === 2) {
          const type1 = head(type_tags);
          const type2 = head(tail(type_tags));
          
          if (type1 === type2) {
              return error(list(op, type_tags)),
                  "no method for these types";
          }
          
          const a1 = head(args);
          const a2 = head(tail(args));
          const t1_to_t2 = get_coercion(type1, type2);
          const t2_to_t1 = get_coercion(type2, type1);
          return ! is_undefined(t1_to_t2)
                ? apply_generic(op, list(t1_to_t2(a1), a2))
                : ! is_undefined(t2_to_t1)
                ? apply_generic(op, list(a1, t2_to_t1(a2)))
                : error(list(op, type_tags),
                        "no method for these types");
      } else {
          return error(list(op, type_tags),
                       "no method for these types");
      }
  }
}

// check whether all type tags can be coerced to target type
function can_coerce_to(type_tags, target_type) {
  return accumulate((type_tag, res) => res && (
                      type_tag === target_type || !is_undefined(get_coercion(type_tag, target_type))), 
                    true, type_tags);
}

// get the first type tag that all the other tags can be coerced to
function get_coerced_type(type_tags) {
  return is_null(type_tags)
      ? undefined
      : can_coerce_to(type_tags, head(type_tags))
      ? head(type_tags)
      : get_coerced_type(tail(type_tags));
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (!is_undefined(fun)) {
      return apply(fun, map(contents, args));
  } else {
      const target_type = get_coerced_type(type_tags);
      if (is_undefined(target_type)) {
          return error(list(op, type_tags), "no method for these types -- apply_generic");
      } else {
          const coerced_args = map(arg => type_tag(arg) === target_type
                            ? arg
                            : get_coercion(type_tag(arg), target_type)(arg),
                    args);
          return apply_generic(op, coerced_args);
      }
  }
}


function integer_to_rational(integer) {
  return make_rat(integer, 1);
}

function rational_to_real(rational) {
  return make_real((x, y) => x / y, numer(rational), denom(rational));
}

function real_to_complex(real_num) {
  return make_complex_from_real_imag(real_num, 0);
}

function install_raise() {
  put("raise", list("javascript_number"), integer_to_rational);
  put("raise", list("rational"), rational_to_real);
  put("raise", list("real"), real_to_complex);
}

function raise(x) {
  return apply_generic("raise", list(x));
}


function complex_to_real(x) {
  return imag_part(x) === 0
      ? real_part(x)
      : x;
}

function real_to_rational(x) {
  
}

function rational_to_integer(x) {
  return numer(x) === denom(x)
      ? 1
      : numer(x) === 0
      ? 0
      : denom(x) === 1
      ? numer(x)
      : x;
}

function install_project() {
  put("project", list("real"), real_to_rational);
  put("project", list("complex"), complex_to_real);
}

function project(x) {
  return apply_generic("project", list(x));
}

function drop(x) {
  return equal(x, raise(project(x)))
      ? drop(raise(project(x)))
      : x;
}

const type_tower = list("complex", "real", "rational", "javascript_number");

function higher_type(type1, type2, type_tower) {
  return is_null(type_tower)
      ? error("invalid types")
      : type1 === head(type_tower)
      ? type1
      : type2 === head(type_tower)
      ? type2
      : higher_type(type1, type2, tail(type_tower));
}

function highest_type(type_tags) {
  return accumulate((type, highest_so_far) => higher_type(type, highest_so_far, type_tower),
                    "javascript_number", type_tags);
}

// Repeatedly raise the type of the arg until it matches target_type
function raise_to_type(arg, target_type) {
  return type_tag(arg) === target_type
      ? arg
      : raise_to_type(raise(arg), target_type);
}

// Raise the types of all args to the highest type among them
function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  if (!is_undefined(fun)) {
      return apply(fun, map(contents, args));
  } else {
      const target_type = highest_type(type_tags);
      const raised_args = map(arg => drop(raise_to_type(arg, target_type)), args);
      return apply_generic(op, raised_args);
  }
}


// Exercise 2.86

function square_rational(x) {
  return make_rat(square(numer(x)), square(denom(x)));
}
put("square", list("rational"), square_rational);

function sqrt_rational(x) {
  return make_rat(math_sqrt(numer(x)), math_sqrt(denom(x)));
}
put("sqrt", list("rational"), sqrt_rational);

function sin_rational(x) {
  return math_sin(rational_to_real(x));
}
put("sine", list("rational"), sin_rational);

function cos_rational(x) {
  return math_cos(rational_to_real(x));
}
put("cosine", list("rational"), cos_rational);

// square, sqrt, sine and cosine functions for real and complex numbers


function square(x) {
  return apply_generic("square", list(x))(x);
}

function sqrt(x) {
  return apply_generic("sqrt", list(x))(x);
}

function sine(x) {
  return apply_generic("sine", list(x))(x);
}

function cosine(x) {
  return apply_generic("cosine", list(x))(x);
}

