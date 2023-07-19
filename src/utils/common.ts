class Common {
  getHTTP(port: number) {
    const W = window.location;
    return `${W.protocol}//${W.hostname}:${port}`;
  }
}

const common = new Common();
export default common;
