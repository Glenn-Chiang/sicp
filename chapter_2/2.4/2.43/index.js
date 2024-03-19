function deriv(exp, variable) {
  return is_number(exp) 
      ? 0
      : is_variable(exp)
      ? is_same_variable(exp, variable) ? 1 : 0
      : get("deriv", operator(exp))(operands(exp), variable);
}

function operator(exp) { return head(exp); }

function operands(exp) { return tail(exp); }

function attach_tag(contents) {
  return pair(x, contents);
}


function install_deriv_sum() {
  function addend(operands) {
      return head(operands);
  }
  function augend(operands) {
      return head(tail(operands));
  }
  function deriv_sum(operands, variable) {
      return make_sum(deriv(addend(operands), variable), deriv(augend(operands), variable));
  }
  put("deriv", "+", deriv_sum);
  return "done";
}

function install_deriv_product() {
  function multiplier(operands) {
      return head(operands);
  }
  function multiplicand(operands) {
      return head(tail(operands));
  }
  function deriv_product(operands, variable) {
      return make_sum(make_product(multiplier(operands), deriv(multiplicand(operands), variable)), 
                      make_product(multiplicand(operands), deriv(multiplier(operands), variable)));
  }
  put("deriv", "*", deriv_product);
  return "done";
}

function install_deriv_exp() {
  function base(x) { 
      return head(x);
  }
  function exponent(x) { 
      return head(tail(x)); 
  }
  function deriv_exp(operands, variable) {
      return make_product(make_product(exponent(operands), math_pow(base(operands), exponent(operands) - 1)),
                          deriv(base(operands), variable));
  }
  put("deriv", "**", deriv_exp);
  return "done";
}


// Exercise 2.74

function make_file(division_name, records) {
  return pair(division_name, records);
}
function file_division(file) {
  return head(file);
}
function file_records(file) {
  return tail(file);
}

function get_record(file, employee_name) {
  return get("get_record", file_division(file))(employee_name, file_records(file));
}


function make_record(division, employee, info) {
  return list(division, employee_name, info);
}

function record_division(record) {
  return head(record);
}

function record_employee(record) {
  return head(tail(record));
}

function record_info(record) {
  return head(tail(tail(record)));
}

function get_salary(record) {
  return get("salary", record_division(record))(record);
}


function find_employee_record(employee_name, files) {
  if (is_null(files)) {
      return undefined;
  }
  const record = get_record(head(files), employee_name)
  return is_undefined(record)
      ? find_employee_record(employee_name, tail(files))
      : record;
}


// Exercise 2.75: Message passing

function make_from_mag_ang(r, a) {
  function dispatch(op) {
      return op === "real_part"
          ? r * math_cos(a)
          : op === "imag_part"
          ? r * math_sin(a)
          : op === "magnitude"
          ? r
          : op === "angle"
          ? a
          : error(op, "unknown op -- make_from_mag_ang")
  }
  return dispatch;
}
