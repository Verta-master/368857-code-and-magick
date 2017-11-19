'use strict';

window.renderStatistics = function (ctx, names, times) {
  var histogramData = {
    histogramHeight: 150,
    barWidth: 40,
    indent: 50,
    initialX: 120,
    initialY: 100,
    lineHeight: 15
  };
  var cloudData = {
    startX: 100,
    startY: 10,
    width: 420,
    height: 270,
    arcSize: 10,
    shadowShift: 10
  };
  var thirdX = Math.round(cloudData.startX + cloudData.width / 3);
  var thirdY = Math.round(cloudData.startY + cloudData.height / 3);
  var halfX = Math.round(cloudData.startX + cloudData.width / 2);
  var halfY = Math.round(cloudData.startY + cloudData.height / 2);

  // cloud's shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(cloudData.startX + cloudData.shadowShift, cloudData.startY + cloudData.shadowShift);
  ctx.lineTo(thirdX + cloudData.shadowShift, cloudData.startY + cloudData.shadowShift);
  ctx.bezierCurveTo(
      halfX + cloudData.shadowShift, cloudData.startY - cloudData.arcSize + cloudData.shadowShift,
      halfX + cloudData.shadowShift, cloudData.startY - cloudData.arcSize + cloudData.shadowShift,
      thirdX * 2 - cloudData.startX + cloudData.shadowShift, cloudData.startY + cloudData.shadowShift
  );
  ctx.lineTo(cloudData.startX + cloudData.width + cloudData.shadowShift, cloudData.startY + cloudData.shadowShift);
  ctx.lineTo(cloudData.startX + cloudData.width + cloudData.shadowShift, thirdY + cloudData.shadowShift);
  ctx.bezierCurveTo(
      cloudData.startX + cloudData.width + cloudData.arcSize + cloudData.shadowShift, halfY + cloudData.shadowShift,
      cloudData.startX + cloudData.width + cloudData.arcSize + cloudData.shadowShift, halfY + cloudData.shadowShift,
      cloudData.startX + cloudData.width + cloudData.shadowShift, thirdY * 2 - cloudData.startY + cloudData.shadowShift
  );
  ctx.lineTo(cloudData.startX + cloudData.width + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.shadowShift);
  ctx.lineTo(thirdX * 2 - cloudData.startX + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.shadowShift);
  ctx.bezierCurveTo(
      halfX + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.arcSize + cloudData.shadowShift,
      halfX + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.arcSize + cloudData.shadowShift,
      thirdX + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.shadowShift
  );
  ctx.lineTo(cloudData.startX + cloudData.shadowShift, cloudData.startY + cloudData.height + cloudData.shadowShift);
  ctx.lineTo(cloudData.startX + cloudData.shadowShift, thirdY * 2 - cloudData.startY + cloudData.shadowShift);
  ctx.bezierCurveTo(
      cloudData.startX - cloudData.arcSize + cloudData.shadowShift, halfY + cloudData.shadowShift,
      cloudData.startX - cloudData.arcSize + cloudData.shadowShift, halfY + cloudData.shadowShift,
      cloudData.startX + cloudData.shadowShift, thirdY + cloudData.shadowShift
  );
  ctx.lineTo(cloudData.startX + cloudData.shadowShift, cloudData.startY + cloudData.shadowShift);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // white cloud
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.beginPath();
  ctx.moveTo(cloudData.startX, cloudData.startY);
  ctx.lineTo(thirdX, cloudData.startY);
  ctx.bezierCurveTo(
      halfX, cloudData.startY - cloudData.arcSize,
      halfX, cloudData.startY - cloudData.arcSize,
      thirdX * 2 - cloudData.startX, cloudData.startY
  );
  ctx.lineTo(cloudData.startX + cloudData.width, cloudData.startY);
  ctx.lineTo(cloudData.startX + cloudData.width, thirdY);
  ctx.bezierCurveTo(
      cloudData.startX + cloudData.width + cloudData.arcSize, halfY,
      cloudData.startX + cloudData.width + cloudData.arcSize, halfY,
      cloudData.startX + cloudData.width, thirdY * 2 - cloudData.startY
  );
  ctx.lineTo(cloudData.startX + cloudData.width, cloudData.startY + cloudData.height);
  ctx.lineTo(thirdX * 2 - cloudData.startX, cloudData.startY + cloudData.height);
  ctx.bezierCurveTo(
      halfX, cloudData.startY + cloudData.height + cloudData.arcSize,
      halfX, cloudData.startY + cloudData.height + cloudData.arcSize,
      thirdX, cloudData.startY + cloudData.height
  );
  ctx.lineTo(cloudData.startX, cloudData.startY + cloudData.height);
  ctx.lineTo(cloudData.startX, thirdY * 2 - cloudData.startY);
  ctx.bezierCurveTo(
      cloudData.startX - cloudData.arcSize, halfY,
      cloudData.startX - cloudData.arcSize, halfY,
      cloudData.startX, thirdY
  );
  ctx.lineTo(cloudData.startX, cloudData.startY);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Message on the cloud
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', 310, 40);
  ctx.fillText('Список результатов:', 310, 60);
  ctx.textAlign = 'left';

  // Useful functions
  function getMaxFromArray(customArray) {
    var max = -1;
    customArray.forEach(function (item) {
      if (item > max) {
        max = item;
      }
    });
    return max;
  }

  function getColorPlayer(player) {
    return player === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
  }

  // Histogram
  var step = histogramData.histogramHeight / getMaxFromArray(times);
  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = getColorPlayer(names[i]);
    ctx.fillRect(
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight - times[i] * step + histogramData.initialY,
        histogramData.barWidth,
        times[i] * step
    );
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(
        names[i],
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight + histogramData.lineHeight + histogramData.initialY
    );
    ctx.fillText(
        Math.round(times[i]),
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight - times[i] * step + histogramData.initialY - histogramData.lineHeight
    );
  }
};
