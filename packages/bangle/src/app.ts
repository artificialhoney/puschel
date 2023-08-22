const APP_ID = 'xx';
const UPDATE_MILLISECONDS = 1000;
const UPDATE_MILLISECONDS_DRAW = 250;

let acc, bar, hrm;

function transmitUpdatedSensorData() {
  const data = [hrm?.confidence || 0, hrm?.bpm || 0];
  const barData = encodeBarServiceData();
  for (const i in barData) {
    data.push(barData[i]);
  }

  const accData = encodeAccServiceData();
  for (const i in accData) {
    data.push(accData[i]);
  }

  NRF.setAdvertising(
    {
      0x1801: data,
    },
    {
      name: 'XX',
      showName: true,
    }
  );
}

function encodeBarServiceData() {
  const t = toByteArray(Math.round((bar?.temperature || 0) * 100), 2, true);
  const p = toByteArray(Math.round((bar?.pressure || 0) * 1000), 4, false);
  const e = toByteArray(Math.round((bar?.altitude || 0) * 100), 4, true);

  return [
    // Flags
    t[0],
    t[1], // Temperature
    p[0],
    p[1],
    p[2],
    p[3], // Pressure
    e[0],
    e[1],
    e[2],
    e[3], // Elevation
  ];
}

function encodeAccServiceData() {
  const x = toByteArray(Math.round((acc?.x || 0) * 100), 2, true);
  const y = toByteArray(Math.round((acc?.y || 0) * 100), 2, true);
  const z = toByteArray(Math.round((acc?.z || 0) * 100), 2, true);

  return [x[0], x[1], y[0], y[1], z[0], z[1]];
}

function toByteArray(value, numberOfBytes, isSigned) {
  const byteArray = new Array(numberOfBytes);

  if (isSigned && value < 0) {
    value += 1 << (numberOfBytes * 8);
  }

  for (let index = 0; index < numberOfBytes; index++) {
    byteArray[index] = (value >> (index * 8)) & 0xff;
  }

  return byteArray;
}

function enableSensors() {
  Bangle.setBarometerPower(true, APP_ID);
  Bangle.setHRMPower(true, APP_ID);
}

Bangle.on('accel', function (newAcc) {
  acc = newAcc;
});

Bangle.on('pressure', function (newBar) {
  bar = newBar;
});

Bangle.on('HRM', function (newHrm) {
  hrm = newHrm;
});

const R = Bangle.appRect;

let lastScale = false;

const image = require('Storage').read('xx.eggplant.img');

let points = 0;

function draw() {
  g.setColor('#660EFF');
  g.fillRect(R);

  if (!lastScale) {
    lastScale = true;
  } else {
    lastScale = false;
  }

  if (!hrm?.bpm) {
    g.setFont('6x8');
    g.setFontAlign(0, 0);
    g.setColor('#FFFFFF');

    points = points + 1;

    let loading = '';
    let i = 0;
    while (i < 3) {
      loading = loading + (i < points ? '.' : ' ');
      i = i + 1;
    }

    g.drawString('wait' + loading, g.getWidth() / 2, g.getHeight() / 2);

    if (points === 3) {
      points = 0;
    }
    return;
  }
  let scale = hrm.bpm / 60;
  if (lastScale) {
    scale = 0.9 * scale;
  }
  const offset = (176 - 176 * scale) / 2;
  g.drawImage(image!, offset, offset, {
    scale,
  });
}

let interval;
let drawInterval;

function start() {
  enableSensors();
  interval = setInterval(transmitUpdatedSensorData, UPDATE_MILLISECONDS);
  g.reset().fillRect(R);
  drawInterval = setInterval(draw, UPDATE_MILLISECONDS_DRAW);
}

start();
