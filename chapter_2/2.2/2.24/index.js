function right_split(painter, n) {
  if (n === 0) {
      return painter;
  }
  const half = right_split(painter, n - 1);
  return beside(painter, below(half, half));    
}

function up_split(painter, n) {
  if (n == 0) {
      return painter;
  }
  const half = up_split(painter, n - 1);
  return below(painter, beside(half, half));    
}

function split(f1, f2) {
  function splitter(painter, n) {
      if (n === 0) {
          return painter;
      }
      const half = splitter(painter, n - 1);
      return f1(painter, f2(half, half));
  }
  return splitter;
}

function corner_split(painter, n) {
  if (n == 0) {
      return painter;
  }
  const up = up_split(painter, n - 1);
  const right = right_split(painter, n - 1);
  const top_left = beside(up, up);
  const bottom_right = below(right, right);
  const corner = corner_split(painter, n - 1);
  return below(beside(painter, bottom_right), beside(top_left, corner));
}

function square_limit(painter, n) {
  const quarter = corner_split(painter, n);
  const half = below(flip_vert(quarter), quarter);
  return beside(flip_horiz(half), half);
}

function flipped_pairs(painter) {
  const flipped_pair = beside(painter, flip_vert(painter));
  return below(flipped_pair, flipped_pair);
}

function square_of_four(tl, tr, bl, br) {
  return painter => {
      const top = beside(tl(painter), tr(painter));
      const bottom = beside(painter(bl), painter(br));
      return below(bottom, top);
  };
}

function flipped_pairs(painter) {
  return square_of_four(identity, flip_vert, identity, flip_vert)(painter);
}

function square_limit(painter, n) {
  const corner = corner_split(painter, n);
  return square_of_four(flip_horiz, identity, rotate180, flip_vert)(corner);
}


function make_vect(x, y) {
  return pair(x, y);
}

function xcor_vect(v) {
  return head(v);
}

function ycor_vect(v) {
  return tail(v);
}

function add_vect(v1, v2) {
  return make_vect(xcor_vect(v1) + xcor_vect(v2), ycor_vect(v1) + ycor_vect(v2));
}

function sub_vect(v1, v2) {
  return make_vect(xcor_vect(v1) - xcor_vect(v2), ycor_vect(v1) - ycor_vect(v2));
}

function scale_vect(s, v) {
  return make_vect(xcor_vect(v) * s, ycor_vect(v) * s);
}

function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);    
}

// Exercise 2.47: 1
function origin_frame(frame) {
  return list_ref(frame, 0);
}

function edge1_frame(frame) {
  return list_ref(frame, 1);
}

function edge2_frame(frame) {
  return list_ref(frame, 2);
}

// Exercise 2.47: 2
function origin_frame(frame) {
  return head(frame);
}

function edge1_frame(frame) {
  return head(tail(frame));
}

function edge2_frame(frame) {
  return tail(tail(frame));
}


function make_segment(v_start, v_end) {
  return pair(v_start, v_end);
}

function start_segment(segment) {
  return head(segment);
}

function end_segment(segment) {
  return tail(segment);
}

// Exercise 2.49
const bottom_left = make_vect(0, 0);
const bottom_right = make_vect(0, 1);
const top_left = make_vect(0, 1);
const top_right = make_vect(1, 1);

// Exercise 2.49: 1
const bottom_line = make_segment(bottom_left, bottom_right);
const left_line = make_segment(top_left, bottom_left);
const top_line = make_segment(top_left, top_right);
const right_line = make_segment(top_right, bottom_right);
const outline_painter = segments_to_painter(bottom_line, left_line, top_line, right_line);

// Exercise 2.49: 2
const diagonal_down = make_segment(top_left, bottom_right);
const diagonal_up = make_segment(bottom_left, top_right);
const x_painter = segments_to_painter(diagonal_up, diagonal_down);

// Exercise 2.49: 3
const top_mid = make_vect(0.5, 1);
const bottom_mid = make_vect(0.5, 0);
const left_mid = make_vect(0, 0.5);
const right_mid = make_vect(1, 0.5);
const diamond_painter = segments_to_painter(
      make_segment(left_mid, top_mid),
      make_segment(left_mid, bottom_mid),
      make_segment(top_mid, right_mid),
      make_segment(bottom_mid, right_mid)
  );


function frame_coord_map(frame) {
  return v => add_vect(origin_frame(frame),
                       add_vect(scale_vect(xcor_vect(v), edge1_frame(frame)),
                                scale_vect(ycor_vect(v), edge2_frame(frame))));
}

function segments_to_painter(segments) {
  return frame => 
              for_each(segment => 
                          draw_line(
                              frame_coord_map(frame)(start_segment(segment)),
                              frame_coord_map(frame)(end_segment(segment))
                      ), segments);
}

function transform_painter(painter, origin, corner1, corner2) {
  return frame => {
      const m = frame_coord_map(frame);
      const new_origin = m(origin);
      const new_edge1 = sub_vect(m(corner1), new_origin);
      const new_edge2 = sub_vect(m(corner2), new_origin);
      const new_frame = make_frame(new_origin, new_edge1, new_edge2);
      return painter(new_frame);          
  };
}

function flip_vert(painter) {
  return transform_painter(painter, make_vect(0, 1), make_vect(1, 1), make_vect(0, 0));
}

function flip_horiz(painter) {
  return transform_painter(painter, make_vect(1, 0), make_vect(0, 0), make_vect(1, 1));
}

function shrink_to_upper_right(painter) {
  return transform_painter(painter, make_vect(0.5, 0.5), make_vect(1, 0.5), make_vect(0.5, 1));
}

function rotate90(painter) {
  return transform_painter(painter, 
      make_vect(1, 0), 
      make_vect(1, 1), 
      make_vect(0, 0));
}

function rotate180(painter) {
  return transform_painter(painter,
      make_vect(1, 1),
      make_vect(0, 1),
      make_vect(1, 0)); 
}

function rotate270(painter) {
  return transform_painter(painter, 
      make_vect(0, 1),
      make_vect(0, 0),
      make_vect(1, 1));
}

function beside(painter1, painter2) {
  const split_point = make_vect(0.5, 0);
  const paint_left = transform_painter(painter1, 
                                       make_vect(0, 0), 
                                       split_point, 
                                       make_vect(0, 1));
  const paint_right = transform_painter(painter2, 
                                        split_point, 
                                        make_vect(1, 0),
                                        make_vect(0.5, 1));
  return frame => {
      paint_left(frame);
      paint_right(frame);
  };
}

function below(painter1, painter2) {
  const split_point = make_vect(0, 0.5);
  const paint_top = transform_painter(painter2, 
                                      split_point,
                                      make_vect(1, 0.5),
                                      make_vect(0, 1));
  const paint_bottom = transform_painter(painter1, 
                                        make_vect(0, 0),
                                        make_vect(1, 0),
                                        split_point);
  return frame => {
      paint_top(frame);
      paint_bottom(frame);
  }
}

function below(painter1, painter2) {
  return rotate90(beside(rotate270(painter1), rotate270(painter2)));
}
