const {pair, head, tail} = require('../pair')

function make_segment(start, end) {
  return pair(start, end)
}

function start_segment(segment) {
  return head(segment)
}

function end_segment(segment) {
  return tail(segment)
}

function make_point(x, y) {
    return pair(x, y)
}

function x_point(point) {
  return head(point)
}

function y_point(point) {
  return tail(point)
}

function print_point(point) {
  console.log(`(${x_point(point).toString()}, ${y_point(point).toString()})`)
}

function midpoint_segment(segment) {
  const start_point = start_segment(segment)
  const end_point = end_segment(segment)
  const x_mid = (x_point(start_point) + x_point(end_point)) / 2
  const y_mid = (y_point(start_point) + y_point(end_point)) / 2
  return make_point(x_mid, y_mid)
}

// Top-left point and bottom-right point
function make_rectangle(top_left, bottom_right) {
  return pair(top_left, bottom_right)
}

function top_left(rectangle) {
  return head(rectangle)
}

function bottom_right(rectangle) {
  return tail(rectangle)
}

function x_length(rectangle) {
  const top_left_point = top_left(rectangle)
  const bottom_right_point = bottom_right(rectangle)
  return Math.abs(x_point(top_left_point) - x_point(bottom_right_point))
}

function y_length(rectangle) {
  const top_left_point = top_left(rectangle)
  const bottom_right_point = bottom_right(rectangle)
  return Math.abs(x_point(top_left_point) - x_point(bottom_right_point))
}

function perimeter(rectangle) {
  return 2 * (x_length(rectangle) + y_length(rectangle))
}

function area(rectangle) {
  return x_length(rectangle) * y_length(rectangle)
}

