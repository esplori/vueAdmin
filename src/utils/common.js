export function getCurrDate(val) {
  let currVal = val
  if (!currVal) {
    currVal = new Date().getTime();
  }
  return new Date(currVal).getFullYear() + "-" +
    ((new Date(currVal).getMonth() + 1) < 10 ? '0' + (new Date(currVal).getMonth() + 1) : new Date(currVal).getMonth() + 1) + '-' +
    (new Date(currVal).getDate() < 10 ? '0' + new Date(currVal).getDate() : new Date(currVal).getDate()) + ' ' +
    (new Date(currVal).getHours() < 10 ? '0' + new Date(currVal).getHours() : new Date(currVal).getHours()) + ':' +
    (new Date(currVal).getMinutes() < 10 ? '0' + new Date(currVal).getMinutes() : new Date(currVal).getMinutes()) + ':' +
    (new Date(currVal).getSeconds() < 10 ? '0' + new Date(currVal).getSeconds() : new Date(currVal).getSeconds())
}
export function randomStr(type) {
  if (type === "numLetter") {
    return parseFloat((Math.random()*100).toString().replace(".",'')).toString(32)
  } else {
    return (Math.random()*100).toString().replace(".",'')
  }
  
}
