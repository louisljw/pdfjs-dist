var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false,
});
var app = {};

var option;

var formatTooltip = (params) => {
  return `<div>${params.seriesName}: ${params.value}</div>`;
};

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      symbol: 'circle',
      symbolSize: [18, 18],
    },
  ],
  format: (params, ticket, callback) => {
    setTimeout(() => {
      callback(ticket, formatTooltip(params));
    }, 1);
    return formatTooltip(params);
  },
  tooltip: {
    show: true,
    trigger: 'item',
    triggerOn: 'click',
    appendTo: document.getElementById('content'),
    position: (point, params, don, react, size) => {
      const scrollTop = document.getElementById('content').scrollTop;
      if (point && point.length === 2) {
        return [
          point[0] - size.contentSize[0] / 2,
          point[1] - size.contentSize[1] - scrollTop,
        ];
      }
      return [
        window.currentX - size.contentSize[0] / 2,
        window.currentY - size.contentSize[1] - scrollTop,
      ];
    },
  },
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
document.getElementById('content').addEventListener('scroll', () => {
  myChart.dispatchAction({
    type: 'hideTip',
  });
});
document.addEventListener('touchmove', (e) => {
  console.log([
    e.originalEvent.touches[0].pageX,
    e.originalEvent.touches[0].pageY,
  ]);
  window.currentX = e.originalEvent.touches[0].pageX;
  window.currentY = e.originalEvent.touches[0].pageY;
});
