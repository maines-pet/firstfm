export function convertMiliSecToMinSec(duration) {
  const min = Math.floor(duration / (1000 * 60))
  const sec = (duration / 1000) % 60
  return min + 'm' + sec.toString().padStart(2, '0') + 's'
}