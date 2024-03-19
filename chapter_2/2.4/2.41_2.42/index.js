function square(x) {
  return x * x;
}

function add_complex(z1, z2) {
  return make_from_real_imag(real_part(z1) + real_part(z2),
                             imag_part(z1) + imag_part(z2));
}
function sub_complex(z1, z2) {
  return make_from_real_imag(real_part(z1) - real_part(z2),
                             imag_part(z1) - imag_part(z2));
}
function mul_complex(z1, z2) {
  return make_from_mag_ang(magnitude(z1) * magnitude(z2),
                           angle(z1) + angle(z2));
}
function div_complex(z1, z2) {
  return make_from_mag_ang(magnitude(z1) / magnitude(z2),
                           angle(z1) - angle(z2));
}

// Rectangular form
function make_from_real_imag_rectangular(x, y) {
  return attach_tag("rectangular", pair(x, y));
}

function make_from_mag_ang_rectangular(r, a) {
  return attach_tag("rectangular", pair(r * math_cos(a), r * math_sin(a)));
}

function real_part_rectangular(z) { return head(z); }

function imag_part_rectangular(z) { return tail(z); }

function magnitude_rectangular(z) {
  return math_sqrt(square(real_part(z)) + square(imag_part(z)));
}

function angle_rectangular(z) {
  return math_atan2(imag_part(z), real_part(z));
}


// Polar form
function make_from_mag_ang_polar(r, a) {
  return attach_tag("polar", pair(r, a));
}

function make_from_real_imag_polar(x, y) {
  return attach_tag("polar", pair(math_sqrt(square(x) + square(y)), math_atan2(y, x)));
}

function magnitude_polar(z) {
  return head(z);
}

function angle_polar(z) {
  return tail(z);
}

function real_part_polar(z) {
  return magnitude(z) * math_cos(angle(z));
}

function imag_part_polar(z) {
  return magnitude(z) * math_sign(angle(z));
}


// Type tags
function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}
function type_tag(datum) {
  return is_pair(datum)
         ? head(datum)
         : error(datum, "bad tagged datum -- type_tag");
}
function contents(datum) {
  return is_pair(datum)
         ? tail(datum)
         : error(datum, "bad tagged datum -- contents");
}

function is_rectangular(z) {
  return type_tag(z) === "rectangular";
}
function is_polar(z) {
  return type_tag(z) === "polar";
}

function real_part(z) {
    return is_rectangular(z)
        ? real_part_rectangular(contents(z))
        : is_polar(z)
        ? real_part_polar(contents(z))
        : error(z, "unknown type -- real_part");
}

function imag_part(z) {
    return is_rectangular(z)
        ? imag_part_rectangular(contents(z))
        : is_polar(z)
        ? imag_part_polar(contents(z))
        : error(z, "unknown type -- imag_part");
}

function magnitude(z) {
    return is_rectangular(z)
        ? magnitude_rectangular(contents(z))
        : is_polar(z)
        ? magnitude_polar(contents(z))
        : error(z, "unknown type -- magnitude");
}

function angle(z) {
    return is_rectangular(z)
        ? angle_rectangular(contents(z))
        : is_polar(z)
        ? angle_polar(contents(z))
        : error(z, "unknown type -- angle");
}

function make_from_real_imag(x, y) {
    return make_from_real_imag_rectangular(x, y);
}

function make_from_mag_ang(r, a) {
    return make_from_mag_ang_polar(r, a);
}
