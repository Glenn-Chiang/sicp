function map(f, sequence) {
  return is_null(sequence)
      ? null
      : pair(f(head(sequence)), map(f, tail(sequence)));
}

function filter(predicate, sequence) {
  return is_null(sequence)
      ? null
      : predicate(head(sequence))
      ? pair(head(sequence), filter(predicate, tail(sequence)))
      : filter(predicate, tail(sequence));
}

function accumulate(operation, initial, sequence) {
  return is_null(sequence)
      ? initial
      : operation(head(sequence), accumulate(operation, initial, tail(sequence)));
}

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
      ? null
      : pair(accumulate(op, init, map(seq => head(seq), seqs)),
             accumulate_n(op, init, map(seq => tail(seq), seqs)));
}

// Exercise 2.36
// accumulate_n((x, y) => x + y, 0, list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12)));

function enumerate_interval(low, high) {
  return low > high
      ? null
      : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
      ? null
      : !is_pair(tree)
      ? list(tree)
      : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function map_acc(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
}

function append_acc(seq1, seq2) {
  return accumulate(pair, seq2, seq1);
}

function length(sequence) {
  return accumulate((item, length) => length + 1, 0, sequence);
}

// Exercise 2.33
// map_acc(x => x * x, list(1, 2, 3, 4));
// append_acc(list(1,2,3), list(4,5,6));
// length(list(1,2,3,5,100));

function horner_eval(x, coefficient_sequence) {
  return accumulate((this_coeff, higher_terms) => this_coeff + x * higher_terms, 
                      0, 
                      coefficient_sequence);
}

// function count_leaves(tree) {
//     return is_null(tree)
//         ? 0
//         : !is_pair(tree)
//         ? 1
//         : count_leaves(head(tree)) + count_leaves(tail(tree));
// }

function count_leaves(tree) {
  return accumulate((x, total) => total + x, 
                    0, 
                    map(x => is_null(x) ? 0 : is_pair(x) ? count_leaves(x) : 1, tree)
  );
}

// Exercise 2.35
// count_leaves(list(list(1,2,3), list(4,5,60)));

function plus(x, y) {
  return x + y;
}

function times(x, y) {
  return x * y;
}

function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}

function matrix_times_vector(m, v) {
  return map(row => dot_product(row, v), m);
}

function transpose(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(n, m) {
  const cols = transpose(n);
  return map(row => matrix_times_vector(cols, row), m);
}

const matrix = list(list(1, 2, 3, 4),
   list(4, 5, 6, 6),
   list(6, 7, 8, 9));


function fold_left(op, initial, sequence) {
  function iter(result, rest) {
      return is_null(rest)
          ? result
          : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

function fold_right(op, init, sequence) {
  return accumulate(op, init, sequence);
}

function reverse(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse_left(sequence) {
  return fold_left((x, y) => append(list(y), x), null, sequence);
}

// Flatten a sequence of sequences
function flatten(seq) {
  return accumulate(append, null, seq);
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function unique_pairs(n) {
  return flatmap(i => map(j => list(i, j), enumerate_interval(1, i - 1)), enumerate_interval(1, n));
}

// unique_pairs(4);

function unique_triplets(n) {
  return flatmap(i => flatmap(j => map(k => list(i, j, k),
                                       enumerate_interval(1, j - 1)),
                              enumerate_interval(1, i - 1)),
                 enumerate_interval(1, n));
}

unique_triplets(4);

function sum_list(items) {
  return accumulate((x, y) => x + y, 0, items);
}

function triplets_of_sum(n, s) {
  return filter(triplet => sum_list(triplet) === s, unique_triplets(n));
}

triplets_of_sum(4, 6);

function is_prime_sum(pair) {
return is_prime(head(pair) + head(tail(pair)));
}

function make_pair_sum(pair) {
return list(head(pair), head(tail(pair)),
        head(pair) + head(tail(pair)));
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)));
}

prime_sum_pairs(6);

function permutations(seq) {
  return is_null(seq)
      ? list(null)
      : flatmap(x => map(p => pair(x, p), 
                         permutations(remove(x, seq))),
                seq);
}

function remove(item, sequence) {
  return filter(x => x !== item, sequence);
}

function queens(board_size) {
  function queen_cols(k) {
      return k === 0
          ? list(empty_board)
          : filter(positions => is_safe(k, positions),
              flatmap(rest_of_queens => map(new_row => 
                                              adjoin_position(new_row, k, rest_of_queens),
                                              enumerate_interval(1, board_size)),
                      queen_cols(k - 1)
                  ));
  }
  return queen_cols(board_size);
}

function make_position(row, col) {
  return pair(row, col);
}

function adjoin_position(row, col, positions) {
  return pair(make_position(row, col), positions);
}

const empty_board = null;

function is_safe(k, positions) {
  const new_position = head(positions);
  const new_row = head(new_position);
  const new_col = tail(new_position);
  return accumulate((pos, safe_so_far) => {
      const row = head(pos);
      const col = tail(pos);
      return safe_so_far && 
          row !== new_row &&
          row + col !== new_row + new_col && // southwest diagonal of new pos
          row - col !== new_row - new_col ; // northwest diagonal of new pos                        
  }, true, tail(positions));
}

