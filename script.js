Papa.parse('catsvdogs_clean.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {
    console.log("running");
    console.log(results.data);

    const tbody = document.querySelector('#dataTable tbody');
    const labels = [];
    const dogValues = [];
    const catValues = [];

    results.data.forEach(row => {
      // 填充表格
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.State}</td>
        <td>${row.DogOwnersPct}</td>
        <td>${row.CatOwnersPct}</td>
      `;
      tbody.appendChild(tr);

      // 收集图表数据
      labels.push(row.State);
      dogValues.push(cleanNumber(row.DogOwnersPct));
      catValues.push(cleanNumber(row.CatOwnersPct));
    });

    // 画柱状图
    new Chart(
      document.getElementById('revenueChart'),
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Dog Owners (%)',
              data: dogValues,
              backgroundColor: '#4e79a7'
            },
            {
              label: 'Cat Owners (%)',
              data: catValues,
              backgroundColor: '#f28e2b'
            }
          ]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Households with pet (%)'
              }
            }
          }
        }
      }
    );
  },

  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
});

function cleanNumber(value) {
  return Number(
    String(value).replace(/[^0-9.-]/g, '')
  );
}