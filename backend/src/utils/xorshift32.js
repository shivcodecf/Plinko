export class XorShift32 {
  constructor(seed) {
    this.state = seed >>> 0;

    if (this.state === 0) {
      this.state = 1;
    }
  }

  nextInt() {
    let x = this.state;

    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;

    this.state = x >>> 0;

    return this.state;
  }

  random() {
    return this.nextInt() / 4294967296;
  }
}