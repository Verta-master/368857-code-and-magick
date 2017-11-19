'use strict';

window.renderStatistics = function (ctx, names, times) {
  var histogramHeight = 150;
  var barWidth = 40;
  var indent = 50;
  var colorActivePlayer = 'rgba(255, 0, 0, 1)';
  var max = -1;
  var maxIndex = -1;
  var initialX = 120;
  var initialY = 100;
  var lineHeight = 15;

  //cloud's shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.lineTo(275, 120);
  ctx.bezierCurveTo(320, 10, 320, 10, 365, 20);
  ctx.lineTo(530, 20);
  ctx.lineTo(530, 110);
  ctx.bezierCurveTo(540, 155, 540, 155, 530, 200);
  ctx.lineTo(530, 290);
  ctx.lineTo(365, 290);
  ctx.bezierCurveTo(320, 300, 320, 300, 275, 290);
  ctx.lineTo(110, 290);
  ctx.lineTo(110, 200);
  ctx.bezierCurveTo(100, 155, 100, 155, 110, 110);
  ctx.lineTo(110, 20);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  //white cloud
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.lineTo(265, 10);
  ctx.bezierCurveTo(310, 0, 310, 0, 355, 10);
  ctx.lineTo(520, 10);
  ctx.lineTo(520, 100);
  ctx.bezierCurveTo(530, 145, 530, 145, 520, 190);
  ctx.lineTo(520, 280);
  ctx.lineTo(355, 280);
  ctx.bezierCurveTo(310, 290, 310, 290, 265, 280);
  ctx.lineTo(100, 280);
  ctx.lineTo(100, 190);
  ctx.bezierCurveTo(90, 145, 90, 145, 100, 100);
  ctx.lineTo(100, 10);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  //Message on the cloud
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', 310, 40);
  ctx.fillText('Список результатов:', 310, 60);
  ctx.textAlign = 'left';

  //Histogram
  for (var i = 0 ; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var step = histogramHeight / max;

  function getColorPlayer(player) {
    if (player === 'Вы') {
      return colorActivePlayer;
    } else {
      var opacityRandom = Math.random();
      var colorPlayer = 'rgba(0, 0, 255, ' + opacityRandom + ')';
      return colorPlayer;
    }
  }

  for(var i = 0; i < times.length; i++) {
    ctx.fillStyle = getColorPlayer(names[i]);
    ctx.fillRect(initialX + (barWidth + indent) * i, histogramHeight - times[i] * step + initialY, barWidth, times[i] * step);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(names[i], initialX + (barWidth + indent) * i, histogramHeight + lineHeight + initialY);
    ctx.fillText(Math.round(times[i]), initialX + (barWidth + indent) * i, histogramHeight - times[i] * step + initialY - lineHeight);
  }
};
