export function generateGradient(colours) {
  const gradientColours = [...colours];

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let gradient = ctx.createLinearGradient(0, 0, 350, 0);

  const colourStopSize = 1 / gradientColours.length;
  for (let i = 0; i < gradientColours.length; i++) {
    gradient.addColorStop(i * colourStopSize, gradientColours[i]);
  }

  //Fill with gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
