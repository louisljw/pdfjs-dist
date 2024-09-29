var dom = document.getElementById('chart-container');
var myChart = echarts.init(dom, null, {
  renderer: 'canvas',
  useDirtyRect: false,
});
var app = {};

var option;

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
  tooltip: {
    show: true,
    trigger: 'item',
    triggerOn: 'click',
    appendTo: document.getElementById('content'),
    position: (point, params) => {
      console.log(point);
      return 'top';
    },
  },
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
