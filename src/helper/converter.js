function convertTimer(timer) {
  const min = '0' + Math.floor(timer / 60);
  const sec = '0' + Math.floor(timer - min * 60);
  const finalTime = min.substr(-2) + ':' + sec.substr(-2);

  return finalTime;
}

export { convertTimer };
