function make_leaf(symbol, weight) {
  return list("leaf", symbol, weight);
}

function is_leaf(x) {
  return head(x) === "leaf";
}

function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

function make_code_tree(left, right) {
  return list("code_tree", left, right,
              append(symbols(left), symbols(right)),
              weight(left) + weight(right));
}

function left_branch(tree) { return head(tail(tree)); }

function right_branch(tree) { return head(tail(tail(tree))); }

function symbols(tree) {
  return is_leaf(tree)
      ? list(symbol_leaf(tree))
      : head(tail(tail(tail(tree))));
}

function weight(tree) {
  return is_leaf(tree) 
      ? weight_leaf(tree)
      : head(tail(tail(tail(tail(tree)))));
}

function choose_branch(bit, branch) {
  return bit === 0
      ? left_branch(branch)
      : bit === 1
      ? right_branch(branch)
      : error("bad bit -- choose_branch");
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
      if (is_null(bits)) {
          return null;
      } else {
          const next_branch = choose_branch(head(bits), current_branch);
          return is_leaf(next_branch)
              ? pair(symbol_leaf(next_branch), 
                     decode_1(tail(bits), tree))
              : decode_1(tail(bits), next_branch);
      }
  }
  return decode_1(bits, tree);
}

function is_element_of_set(x, set) {
  return is_null(set)
      ? false
      : x === head(set)
      ? true
      : is_element_of_set(x, tail(set));
}

function encode_symbol(symbol, tree) {
  return is_leaf(tree) && symbol_leaf(tree) === symbol
      ? null
      : is_element_of_set(symbol, symbols(left_branch(tree)))
      ? pair(0, encode_symbol(symbol, left_branch(tree)))
      : is_element_of_set(symbol, symbols(right_branch(tree)))
      ? pair(1, encode_symbol(symbol, right_branch(tree)))
      : error("symbol not in tree -- encode_symbol");
}

function encode(message, tree) {
  return is_null(message)
      ? null
      : append(encode_symbol(head(message), tree), 
               encode(tail(message), tree));
}

function adjoin_set(x, set) {
  return is_null(set)
      ? list(x)
      : weight(x) < weight(head(set))
      ? pair(x, set)
      : pair(head(set), adjoin_set(x, tail(set)));
}

function make_leaf_set(pairs) {
  if (is_null(pairs)) {
      return null;
  } else {
      const first_pair = head(pairs);
      return adjoin_set(make_leaf(head(first_pair), head(tail(first_pair))), 
                        make_leaf_set(tail(pairs)));
  }
}

// Exercise 2.67
const sample_tree = make_code_tree(make_leaf("A", 4),
                                 make_code_tree(make_leaf("B", 2),
                                                make_code_tree(
                                                    make_leaf("D", 1),
                                                    make_leaf("C", 1))));
const sample_bits = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);
const sample_message = list("A", "D", "A", "B", "B", "C", "A");

decode(sample_bits, sample_tree);
encode(sample_message, sample_tree);


function generate_huffman_tree(pairs) {
  return successive_merge(make_leaf_set(pairs));
}

function successive_merge(leaves) {
  return length(leaves) === 1
      ? head(leaves)
      : successive_merge(
           adjoin_set(make_code_tree(head(leaves), head(tail(leaves))),
                      tail(tail(leaves))));
}

// Exercise 2.70
const rock_symbols = list(
      list("A", 2),
      list("BOOM", 1),
      list("GET", 2),
      list("JOB", 2),
      list("NA", 16),
      list("SHA", 3),
      list("YIP", 9),
      list("WAH", 1)
);

const rock_tree = generate_huffman_tree(rock_symbols);
const rock_message = list("GET", "A", "JOB","SHA","NA","NA","NA","NA","NA","NA","NA","NA","GET","A","JOB","SHA","NA","NA","NA","NA","NA","NA","NA","NA","WAH","YIP","YIP","YIP","YIP","YIP","YIP","YIP","YIP","YIP","SHA","BOOM");
const rock_bits = encode(rock_message, rock_tree);
length(rock_bits);
