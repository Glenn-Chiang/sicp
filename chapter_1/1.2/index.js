// SICP JS 1.2.6

function square(x) {
  return x * x;
}

function next(n) {
  return n === 2 ? 3 : n + 2
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
    ? n
    : divides(test_divisor, n)
      ? test_divisor
      : find_divisor(n, next(test_divisor));
}

function divides(a, b) {
  return b % a === 0;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}


function randrange(start, end) {
  return start + Math.floor(Math.random() * end)
}


function fast_is_prime(n, times) {
  return times === 0
  ? true
  : fermat(n)
  ? fast_is_prime(n, times - 1)
  : false
}

function timed_prime_test(n) {
  console.log(n);
  return start_prime_test(n, Date.now());
}

function start_prime_test(n, start_time) {
  return fast_is_prime(n, Math.floor(Math.log(n)))
  ? report_prime(Date.now() - start_time)
  : true;
}

function report_prime(elapsed_time) {
  console.log(" *** ");
  console.log(elapsed_time);
}

function search_for_primes(n, count) {
  if (count === 0) return
  
  return n % 2 === 0
  ? search_for_primes(n + 1, count)
  : timed_prime_test(n)
  ? search_for_primes(n + 2, count)
  : search_for_primes(n + 2, count - 1)
}

function fermat(a, n) {
  return expmod(a,n,n) === a
}

function expmod(base, exp, m) {
  return exp === 0 
  ? 1 
  : exp % 2 === 0
  ? square(expmod(base, exp / 2, m)) % m 
  : (base * expmod(base, exp - 1, m)) % m
}

function miller_rabin(n) {
  const a = randrange(1, n-1)
  return expmod(a, n-1, n) === a
}

function carmi(n) {
  function iter(a, n) {
    return a === n
    ? true
    : fermat(a, n)
    ? iter(a + 1, n)
    : false
  }

  return iter(1, n)
}

carmichael_nums = [561, 1105, 1729, 2465, 2821, 6601]
for (num of carmichael_nums) {
  console.log(num, carmi(num))
}