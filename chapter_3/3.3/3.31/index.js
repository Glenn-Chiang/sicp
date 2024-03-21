// function pair(x, y) {
//     const fresh = get_new_pair();
//     set_head(fresh, x);
//     set_tail(fresh, y);
//     return fresh;
// }

function last_pair(x) {
  return is_null(tail(x))
      ? x
      : last_pair(tail(x));
}

function append_mutator(x, y) {
  set_tail(last_pair(x), y);
  return x;
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

// reverse?
function mystery(x) {
  function loop(x, y) {
      if (is_null(x)) {
          return y;
      } else {
          const temp = tail(x);
          set_tail(x, y);
          return loop(temp, x);
      }
  }
  return loop(x, null);
}

const v = list(1, 2, 3, 4);
const w = mystery(v);
w;

function is_element_of_set(x, set) {
  return is_null(set)
      ? false
      : x === head(set)
      ? true
      : is_element_of_set(x, tail(set));
}

// const list2 = list(2);
// is_element_of(list2, list(1, list2, 3));

function count_pairs_naive(x) {
  return ! is_pair(x)
      ? 0
      : count_pairs_naive(head(x)) + count_pairs_naive(tail(x)) + 1;
}

function count_pairs(struct) {
  let counted_pairs = null;
  
  function count(x) {
      if (!is_pair(x)) {
          return 0;
      } else if (is_element_of_set(x, counted_pairs)) {
          return count(head(x)) + count(tail(x));
      } else {
          counted_pairs = pair(x, counted_pairs);
          return 1 + count(head(x)) + count(tail(x));            
      }
  }
  return count(struct);
}


const one = pair("a", "b");
const three = pair(one, one);
const four = pair(three, "c");
const seven = pair(three, three);
count_pairs(four);

function is_cycle(L) {
  let visited = null;
  
  function recur(x) {
      if (is_null(x)) {
          return false;
      } 
      if (is_element_of_set(x, visited)) {
          return true;
      }
      visited = pair(x, visited);
      return recur(tail(x));
  
      
  }
  return recur(L);
}

const normal_list = list(1, 2, 3);
const cyclic_list = make_cycle(list(1, 2, 3));
is_cycle(normal_list);
is_cycle(cyclic_list);
