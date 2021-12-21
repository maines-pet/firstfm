export function convertMiliSecToMinSec(duration) {
  const min = Math.floor(duration / (1000 * 60))
  const sec = (duration / 1000) % 60
  return min.toString().padStart(2, 0) + ':' + sec.toString().padStart(2, '0')
}