function attach_tag(type_tag, contents) {
  return is_number(contents)
      ? pair("javascript_number", contents)
      : pair(type_tag, contents);
}

function type_tag(datum) {
  return is_number(datum)
      ? "javascript_number"
      : is_pair(datum)
      ? head(datum)
      : error(datum, "bad tagged datum -- type_tag");
}

function contents(datum) {
  return is_number(datum)
      ? datum
      : is_pair(datum)
      ? tail(datum)
      : error(datum, "bad tagged datum -- contents");
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  return ! is_undefined(fun)
         ? apply_in_underlying_javascript(fun, map(contents, args))
         : error(list(op, type_tags),
                 "no method for these types -- apply_generic");
}

function is_equal(x, y) {
  return apply_generic("is_equal", list(x, y));
}

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", list(x));
}








