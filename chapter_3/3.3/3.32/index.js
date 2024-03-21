function front_ptr(queue) { return head(queue); }

function rear_ptr(queue) { return tail(queue); }

function set_front_ptr(queue, item) { set_head(queue, item); }

function set_rear_ptr(queue, item) { set_tail(queue, item); }

function is_empty_queue(queue) {
    return is_null(front_ptr(queue));
}

function make_queue() {
    return pair(null, null);
}

function front_queue(queue) {
    return is_empty_queue(queue) 
        ? error(queue, "front_queue called with an empty queue")
        : head(front_ptr(queue));
}

function insert_queue(queue, item) {
    const new_pair = pair(item, null);
    if (is_empty_queue(queue)) {
        set_front_ptr(queue, new_pair);
        set_rear_ptr(queue, new_pair);
    } else {
        set_tail(rear_ptr(queue), new_pair);
        set_rear_ptr(queue, new_pair);
    }
    return queue;
}

function delete_queue(queue) {
    if (is_empty_queue(queue)) {
        error(queue, "delete_queue called with an empty queue");
    } else {
        set_front_ptr(queue, tail(front_ptr(queue)));    
        return queue;
    }
}

const q1 = make_queue();
insert_queue(q1, "a");

function print_queue(queue) {
    return head(queue);
}

print_queue(q1);


// Exercise 3.22: message-passing representation of queue
function make_queue() {
    let front_ptr = null;
    let rear_ptr = null;
    
    function set_front_ptr(item) {
        front_ptr = item;
    }
    
    function set_rear_ptr(item) {
        rear_ptr = item;
    }
    
    function is_empty_queue() {
        return is_null(front_ptr);
    }
    
    function front_queue() {
        return head(front_ptr);
    }
    
    function insert_queue(item) {
        const new_pair = pair(item, null);
        if (is_empty_queue()) {
            set_front_ptr(new_pair);
            set_rear_ptr(new_pair);
        } else {
            set_tail(rear_ptr, new_pair);
            set_rear_ptr(new_pair);
        }
        return queue;
    }
    
    function delete_queue() {
        set_front_ptr(tail(front_ptr));
    }
    
    function dispatch(m) {
        return m === "front_ptr"
            ? front_ptr
            : m === "rear_ptr"
            ? rear_ptr
            : m === "set_front_ptr"
            ? item => set_front_ptr(item)
            : m === "set_rear_ptr"
            ? item => set_rear_ptr(item)
            : m === "is_empty_queue"
            ? is_empty_queue()
            : m === "front_queue"
            ? front_queue()
            : m === "insert_queue"
            ? item => insert_queue(item)
            : m === "delete_queue"
            ? delete_queue()
            : error(m, "unknown method");
    }
    return dispatch;
}



function make_deque() {
  return pair(null, null);
}

function front_deque(deque) {
  return front_queue(deque);
}

function rear_deque(deque) {
  return is_empty_queue(queue)
      ? error(deque, "rear_deque called with empty deque")
      : head(rear_ptr(deque));
}

function front_insert_deque(deque, item) {
  const new_pair = pair(item, null);
  if (is_empty_queue(deque)) {
      set_front_ptr(deque, item);
      set_rear_ptr(deque, item);
  } else {
      set_tail(new_pair, front_ptr(deque));
      set_front_ptr(deque, new_pair);
  }
  return deque;
}

function front_delete_deque(deque) {
  return delete_queue(deque);
}

function rear_insert_deque(deque, item) {
  return insert_queue(deque, item);
}

function rear_delete_deque(deque) {
  if (is_empty_queue(deque)) {
      error(deque, "rear_delete_deque called with empty deque");
  } else {
      set_rear_ptr(deque, )
  }
}