document.addEventListener("DOMContentLoaded", function () {
  console.log("Main JS Loaded"); // Para depuración

  // ==================================================
  //          Funciones Auxiliares (si aplica)
  // ==================================================

  // Función de animación de contador (de Page 7) - La definimos una vez
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const numericEnd =
        parseFloat(String(end).replace(/\./g, "").replace(",", ".")) || 0;
      const value = Math.floor(progress * (numericEnd - start) + start);
      element.textContent = value.toLocaleString("es-ES");
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = numericEnd.toLocaleString("es-ES");
      }
    };
    window.requestAnimationFrame(step);
  };

  // Helper para inicializar gráficos de Page 6 (evita repetir options/plugins)
  function initializePage6Chart(canvasId, chartConfig) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      console.log(`Initializing ${canvasId} (Page 6)`);
      const ctx = canvas.getContext("2d");
      // Opciones comunes para gráficos de Page 6 (simplificadas)
      const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }, // Tooltips desactivados en el original
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#A7A9AC", font: { size: 10 } },
          },
          y: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#A7A9AC", font: { size: 10 } },
            beginAtZero: true, // Default, se puede sobreescribir
          },
        },
        animation: {
          duration: 1500, // Duración común (ajustar si es necesario)
          easing: "easeOutQuart",
        },
      };
      // Fusionar opciones comunes con las específicas del gráfico
      const finalOptions = { ...commonOptions, ...chartConfig.options };
      if (chartConfig.options?.scales?.y) {
        // Sobrescribir escala Y si se especifica
        finalOptions.scales.y = {
          ...commonOptions.scales.y,
          ...chartConfig.options.scales.y,
        };
      }

      new Chart(ctx, { ...chartConfig, options: finalOptions });
    }
  }

  // ==================================================
  //          Inicialización Condicional por Página
  // ==================================================

  // --- Código para Page 2 (Gráfico de Precios Simple) ---
  // Nota: Page 4 también usa 'priceChart'. Necesitamos distinguirlos.
  // Page 4 también tiene 'transactionsChart', lo usaremos como indicador.
  const priceChartCanvasP2 = document.getElementById("priceChart");
  if (priceChartCanvasP2 && !document.getElementById("transactionsChart")) {
    console.log("Initializing priceChart (Page 2)");
    const ctx = priceChartCanvasP2.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para priceChart de page_2.html
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Abr 24",
          "Jun 24",
          "Ago 24",
          "Oct 24",
          "Dic 24",
          "Feb 25",
          "Abr 25",
        ],
        datasets: [
          {
            label: "Precio medio por m² (€)",
            data: [2167, 2240, 2340, 2405, 2482, 2530, 2580],
            backgroundColor: "rgba(78, 205, 196, 0.2)",
            borderColor: "#4ECDC4",
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: "#4ECDC4",
            pointRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ffffff",
              font: { size: 10, family: "Montserrat" },
            },
          },
          title: {
            display: true,
            text: "Evolución del precio medio de la vivienda (+12.7% en 12 meses)",
            color: "#ffffff",
            font: { size: 12, family: "Montserrat" },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 2000,
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              callback: function (v) {
                return v + " €";
              },
            },
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: { color: "#A7A9AC" },
          },
        },
        animation: { duration: 2000, easing: "easeOutQuart" },
      },
    });
  }

  // --- Código para Page 3 (Gráfico de Metodología) ---
  const methodologyChartCanvas = document.getElementById("methodologyChart");
  if (methodologyChartCanvas) {
    console.log("Initializing methodologyChart (Page 3)");
    const ctx = methodologyChartCanvas.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para methodologyChart de page_3.html
    new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Análisis Estadístico",
          "Estudio Sectorial",
          "Encuestas de Mercado",
          "Entrevistas Expertos",
          "Análisis Comparativo",
          "Proyección de Tendencias",
        ],
        datasets: [
          {
            label: "Peso metodológico",
            data: [90, 75, 65, 60, 80, 85],
            backgroundColor: "rgba(78, 205, 196, 0.3)",
            borderColor: "#4ECDC4",
            borderWidth: 2,
            pointBackgroundColor: "#4ECDC4",
            pointRadius: 4,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "white",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ffffff",
              font: { family: "Montserrat" },
              padding: 15,
            },
          },
          title: {
            display: true,
            text: "Enfoque metodológico (peso sobre 100)",
            color: "#ffffff",
            font: { family: "Montserrat", size: 14 },
            padding: { bottom: 15 },
          },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.8)",
            titleFont: { family: "Montserrat" },
            bodyFont: { family: "Montserrat" },
          },
        },
        scales: {
          r: {
            angleLines: { color: "rgba(255, 255, 255, 0.1)" },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            pointLabels: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 11 },
            },
            ticks: {
              color: "#A7A9AC",
              backdropColor: "transparent",
              font: { size: 9 },
            },
          },
        },
        animation: { duration: 2000, easing: "easeOutQuart" },
      },
    });
  }

  // --- Código para Page 4 (Gráficos Venta/Alquiler y Transacciones) ---
  const transactionsChartCanvas = document.getElementById("transactionsChart");
  const priceChartCanvasP4 = document.getElementById("priceChart"); // Referencia de nuevo
  if (transactionsChartCanvas && priceChartCanvasP4) {
    // Aseguramos que AMBOS existan
    console.log("Initializing charts for Page 4");

    // Gráfico Venta/Alquiler (priceChart)
    const priceCtx = priceChartCanvasP4.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para priceChart de page_4.html (con gradientes)
    const saleGradient = priceCtx.createLinearGradient(0, 0, 0, 400);
    saleGradient.addColorStop(0, "rgba(78, 205, 196, 0.4)");
    saleGradient.addColorStop(1, "rgba(78, 205, 196, 0.0)");
    const rentGradient = priceCtx.createLinearGradient(0, 0, 0, 400);
    rentGradient.addColorStop(0, "rgba(255, 107, 107, 0.4)");
    rentGradient.addColorStop(1, "rgba(255, 107, 107, 0.0)");
    new Chart(priceCtx, {
      type: "line",
      data: {
        labels: [
          "Abr 24",
          "May 24",
          "Jun 24",
          "Jul 24",
          "Ago 24",
          "Sep 24",
          "Oct 24",
          "Nov 24",
          "Dic 24",
          "Ene 25",
          "Feb 25",
          "Mar 25",
          "Abr 25",
        ],
        datasets: [
          {
            label: "Venta (€/m²)",
            data: [
              2167, 2205, 2240, 2290, 2340, 2372, 2405, 2430, 2482, 2510, 2530,
              2565, 2580,
            ],
            borderColor: "#4ECDC4",
            backgroundColor: saleGradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: "#4ECDC4",
            pointHoverBackgroundColor: "white",
            pointBorderColor: "rgba(255, 255, 255, 0.8)",
            pointBorderWidth: 2,
            yAxisID: "y",
          },
          {
            label: "Alquiler (€/m²/mes)",
            data: [
              12.1, 12.3, 12.6, 12.8, 13.0, 13.2, 13.5, 13.7, 13.9, 14.0, 14.1,
              14.2, 14.2,
            ],
            borderColor: "#FF6B6B",
            backgroundColor: rentGradient,
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: "#FF6B6B",
            pointHoverBackgroundColor: "white",
            pointBorderColor: "rgba(255, 255, 255, 0.8)",
            pointBorderWidth: 2,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            labels: {
              padding: 15,
              color: "#ffffff",
              font: { family: "Montserrat", size: 11 },
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.8)",
            titleFont: { family: "Montserrat", size: 12 },
            bodyFont: { family: "Montserrat", size: 12 },
            padding: 10,
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function (c) {
                let l = c.dataset.label || "";
                if (l) {
                  l += ": ";
                }
                if (c.parsed.y !== null) {
                  l += c.parsed.y.toLocaleString("es-ES", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  });
                  l += c.dataset.label.includes("Venta")
                    ? " €/m²"
                    : " €/m²/mes";
                }
                return l;
              },
            },
          },
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "Precio Venta (€/m²)",
              color: "#ffffff",
              font: { family: "Montserrat", size: 12 },
            },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 10 },
              callback: function (v) {
                return v.toLocaleString("es-ES") + " €";
              },
            },
          },
          y1: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "Precio Alquiler (€/m²/mes)",
              color: "#ffffff",
              font: { family: "Montserrat", size: 12 },
            },
            grid: { drawOnChartArea: false, color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 10 },
              callback: function (v) {
                return (
                  v.toLocaleString("es-ES", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }) + " €"
                );
              },
            },
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 10 },
            },
          },
        },
        animation: { duration: 2000, easing: "easeOutQuart" },
      },
    });

    // Gráfico Transacciones (transactionsChart)
    const transactionsCtx = transactionsChartCanvas.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para transactionsChart de page_4.html (con gradiente)
    const transactionsGradient = transactionsCtx.createLinearGradient(
      0,
      0,
      0,
      400
    );
    transactionsGradient.addColorStop(0, "rgba(78, 205, 196, 0.4)");
    transactionsGradient.addColorStop(1, "rgba(78, 205, 196, 0.0)");
    new Chart(transactionsCtx, {
      type: "bar",
      data: {
        labels: [
          "Abr 24",
          "May 24",
          "Jun 24",
          "Jul 24",
          "Ago 24",
          "Sep 24",
          "Oct 24",
          "Nov 24",
          "Dic 24",
          "Ene 25",
          "Feb 25",
          "Mar 25",
          "Abr 25",
        ],
        datasets: [
          {
            label: "Transacciones mensuales",
            data: [
              380, 410, 450, 390, 370, 420, 430, 440, 460, 400, 410, 430, 340,
            ],
            backgroundColor: transactionsGradient,
            borderColor: "#4ECDC4",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(78, 205, 196, 0.6)",
            hoverBorderColor: "#4ECDC4",
            hoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              padding: 15,
              color: "#ffffff",
              font: { family: "Montserrat", size: 11 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.8)",
            titleFont: { family: "Montserrat", size: 12 },
            bodyFont: { family: "Montserrat", size: 12 },
            padding: 10,
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function (c) {
                let l = c.dataset.label || "";
                if (l) {
                  l += ": ";
                }
                if (c.parsed.y !== null) {
                  l += c.parsed.y.toLocaleString("es-ES");
                }
                return l;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 10 },
            },
            title: {
              display: true,
              text: "Número de transacciones",
              color: "#ffffff",
              font: { family: "Montserrat", size: 12 },
            },
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              color: "#A7A9AC",
              font: { family: "Montserrat", size: 10 },
            },
          },
        },
        animation: { duration: 2000, easing: "easeOutQuart" },
      },
    });
  }

  // --- Código para Page 5 (Gráfico Distritos y Hover Mapa) ---
  const districtCtxCanvas = document.getElementById("districtsChart");
  if (districtCtxCanvas) {
    console.log("Initializing districtsChart (Page 5)");
    const districtCtx = districtCtxCanvas.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para districtsChart de page_5.html (con gradiente)
    const chartHeight =
      districtCtx.canvas.clientHeight > 0
        ? districtCtx.canvas.clientHeight
        : 260;
    const gradient = districtCtx.createLinearGradient(0, 0, 0, chartHeight);
    gradient.addColorStop(0, "rgba(78, 205, 196, 0.8)");
    gradient.addColorStop(1, "rgba(78, 205, 196, 0.3)");
    new Chart(districtCtx, {
      type: "bar",
      data: {
        labels: [
          "Centro",
          "Pto-Cant.",
          "Vegueta",
          "M. López",
          "Guanart.",
          "C. Alta",
          "Tamarac.",
        ],
        datasets: [
          {
            label: "Precio medio (€/m²)",
            data: [3320, 3240, 3150, 3050, 2950, 2280, 1980],
            backgroundColor: gradient,
            borderColor: "rgba(78, 205, 196, 1)",
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.8,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.9)",
            titleFont: { family: "Montserrat", size: 11 },
            bodyFont: { family: "Montserrat", size: 11 },
            padding: 8,
            callbacks: {
              label: function (c) {
                return c.raw + " €/m²";
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            ticks: {
              callback: function (v) {
                return v / 1000 + "k €";
              },
              color: "#A7A9AC",
              font: { size: 9 },
              maxTicksLimit: 5,
            },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#ffffff", font: { size: 9 } },
          },
        },
      },
    });

    // Efecto Hover para distritos del mapa
    const districts = document.querySelectorAll(".district");
    if (districts.length > 0) {
      console.log("Adding hover effects to districts (Page 5)");
      districts.forEach((district) => {
        district.addEventListener("mouseover", function () {
          districts.forEach((d) => {
            if (d !== district) d.style.opacity = "0.5";
          });
          district.style.zIndex = "3";
        });
        district.addEventListener("mouseout", function () {
          districts.forEach((d) => {
            d.style.opacity = "1";
            d.style.zIndex = "2";
          });
        });
      });
    }
  }

  // --- Código para Page 6 (Múltiples Gráficos Pequeños y Animación Impacto) ---
  // Usamos la función helper 'initializePage6Chart' definida arriba
  const tourismConfig = {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Visitantes (M)",
          data: [8.3, 4.2, 5.6, 7.8, 8.5, 9.2],
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#4ECDC4",
        },
      ],
    },
  };
  const foreignInvestmentConfig = {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Compradores extranjeros (%)",
          data: [18.2, 16.5, 19.8, 21.9, 23.5, 25.1],
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#4ECDC4",
        },
      ],
    },
  };
  const digitalNomadsConfig = {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Crecimiento (%)",
          data: [5, 10, 20, 25, 30, 45],
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#4ECDC4",
        },
      ],
    },
  };
  const housingPolicyConfig = {
    type: "bar",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Viviendas públicas",
          data: [180, 210, 250, 280, 310, 336],
          backgroundColor: "rgba(78, 205, 196, 0.6)",
          borderColor: "#4ECDC4",
          borderWidth: 1,
          borderRadius: 3,
        },
      ],
    },
  };
  const economicFactorsConfig = {
    type: "line",
    data: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      datasets: [
        {
          label: "Crecimiento económico (%)",
          data: [2.8, -1.2, 2.5, 3.1, 3.3, 3.6],
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.2)",
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#4ECDC4",
        },
      ],
    },
    options: { scales: { y: { beginAtZero: false } } },
  }; // Sobreescribir beginAtZero

  initializePage6Chart("tourismChart", tourismConfig);
  initializePage6Chart("foreignInvestmentChart", foreignInvestmentConfig);
  initializePage6Chart("digitalnomadsChart", digitalNomadsConfig);
  initializePage6Chart("housingPolicyChart", housingPolicyConfig);
  initializePage6Chart("economicFactorsChart", economicFactorsConfig);

  // Animación Medidores de Impacto (Solo si estamos en Page 6 - detectado por presencia de un gráfico)
  if (document.getElementById("tourismChart")) {
    const impactFills = document.querySelectorAll(".impact-fill");
    if (impactFills.length > 0) {
      console.log("Animating impact meters (Page 6)");
      setTimeout(function () {
        impactFills.forEach((fill) => {
          const percentageSpan =
            fill.parentElement.querySelector("span:last-child");
          if (percentageSpan) {
            const percentage = percentageSpan.textContent.replace("%", "");
            fill.style.transition = "width 1.5s ease-out"; // Asegurar transición
            fill.style.width = percentage + "%";
          }
        });
      }, 500);
    }
  }

  // --- Código para Page 7 (Gráficos Impacto Económico/Social y Animaciones) ---
  const economicImpactChartCanvas = document.getElementById(
    "economicImpactChart"
  );
  if (economicImpactChartCanvas) {
    // Usamos este gráfico como indicador de Page 7
    console.log("Initializing charts and animations for Page 7");

    // Animación Contadores Numéricos
    const animatedNumbers = document.querySelectorAll(".animated-number");
    if (animatedNumbers.length > 0) {
      console.log("Animating numbers (Page 7)");
      setTimeout(() => {
        animatedNumbers.forEach((el) => {
          const textValue = el.textContent || "0";
          const value = parseFloat(
            textValue.replace(/\./g, "").replace(",", ".")
          );
          if (!isNaN(value)) {
            animateValue(el, 0, value, 1500); // Usamos la función helper definida arriba
          } else {
            console.error("Invalid number for animation:", textValue, el);
          }
        });
      }, 500);
    }

    // Animación Barras de Impacto (similar a Page 6)
    const impactFillsPage7 = document.querySelectorAll(".impact-fill");
    if (impactFillsPage7.length > 0) {
      console.log("Animating impact fills (Page 7)");
      setTimeout(() => {
        impactFillsPage7.forEach((el) => {
          const finalWidth = el.style.width;
          if (finalWidth) {
            el.style.width = "0%";
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // La transición debe estar definida en el CSS
                el.style.width = finalWidth;
              });
            });
          }
        });
      }, 500);
    }

    // Gráfico Impacto Económico
    const economicCtx = economicImpactChartCanvas.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para economicImpactChart de page_7.html (con gradiente)
    const gradientFill = economicCtx.createLinearGradient(0, 0, 0, 250);
    gradientFill.addColorStop(0, "rgba(78, 205, 196, 0.6)");
    gradientFill.addColorStop(1, "rgba(78, 205, 196, 0.1)");
    new Chart(economicCtx, {
      type: "bar",
      data: {
        labels: ["2021", "2022", "2023", "2024", "2025 (P)"],
        datasets: [
          {
            label: "Inversión (M€)",
            data: [520, 645, 712, 825, 910],
            backgroundColor: gradientFill,
            borderColor: "#4ECDC4",
            borderWidth: 1,
            borderRadius: 5,
            order: 2,
          },
          {
            label: "PIB local (%)",
            data: [10.2, 11.8, 12.7, 14.5, 15.8],
            type: "line",
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            borderColor: "#FF6B6B",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#FF6B6B",
            pointBorderColor: "white",
            pointBorderWidth: 1,
            tension: 0.4,
            yAxisID: "y1",
            order: 1,
            fill: false,
          },
        ],
      },
      options: {
        /* ... opciones detalladas de page_7 ... */ responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "center",
            labels: {
              color: "#ffffff",
              padding: 10,
              usePointStyle: true,
              boxWidth: 10,
              font: { family: "Montserrat", size: 10 },
            },
          },
          title: {
            display: true,
            text: "Inversión Inmob. y Contribución PIB",
            color: "#ffffff",
            font: { family: "Montserrat", size: 12, weight: "normal" },
            padding: { bottom: 10 },
          },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.9)",
            titleFont: { family: "Montserrat", size: 11 },
            bodyFont: { family: "Montserrat", size: 11 },
            padding: 8,
            cornerRadius: 4,
            displayColors: true,
            boxPadding: 3,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: {
              color: "#A7A9AC",
              font: { size: 9 },
              callback: function (v) {
                return v + " M€";
              },
              maxTicksLimit: 6,
            },
          },
          y1: {
            position: "right",
            grid: { drawOnChartArea: false },
            beginAtZero: true,
            max: 20,
            ticks: {
              color: "#FF6B6B",
              font: { size: 9 },
              callback: function (v) {
                return v + "%";
              },
              maxTicksLimit: 5,
            },
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: { color: "#A7A9AC", font: { size: 9 } },
          },
        },
        animations: { tension: { duration: 1000, easing: "linear" } },
        layout: { padding: { top: 5, bottom: 0, left: 0, right: 5 } },
      },
    });

    // Gráfico Impacto Social
    const socialImpactChartCanvas =
      document.getElementById("socialImpactChart");
    if (socialImpactChartCanvas) {
      console.log("Initializing socialImpactChart (Page 7)");
      const socialCtx = socialImpactChartCanvas.getContext("2d");
      // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para socialImpactChart de page_7.html (con gradientes)
      const housingGradient = socialCtx.createLinearGradient(0, 0, 0, 250);
      housingGradient.addColorStop(0, "rgba(78, 205, 196, 0.3)");
      housingGradient.addColorStop(1, "rgba(78, 205, 196, 0.0)");
      const salaryGradient = socialCtx.createLinearGradient(0, 0, 0, 250);
      salaryGradient.addColorStop(0, "rgba(255, 107, 107, 0.3)");
      salaryGradient.addColorStop(1, "rgba(255, 107, 107, 0.0)");
      new Chart(socialCtx, {
        type: "line",
        data: {
          labels: ["'20", "'21", "'22", "'23", "'24", "'25(P)"],
          datasets: [
            {
              label: "Precio Viv. (€/m²)",
              data: [1950, 2060, 2170, 2380, 2580, 2750],
              borderColor: "#4ECDC4",
              backgroundColor: housingGradient,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              pointRadius: 3,
              pointHoverRadius: 5,
              pointBackgroundColor: "#4ECDC4",
              pointBorderColor: "white",
              pointBorderWidth: 1,
            },
            {
              label: "Salario (€/100)",
              data: [2230, 2250, 2280, 2320, 2390, 2450],
              borderColor: "#FF6B6B",
              backgroundColor: salaryGradient,
              borderWidth: 2,
              borderDash: [4, 4],
              tension: 0.4,
              fill: true,
              pointRadius: 3,
              pointStyle: "circle",
              pointBackgroundColor: "#FF6B6B",
            },
          ],
        },
        options: {
          /* ... opciones detalladas de page_7 ... */ responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              align: "center",
              labels: {
                color: "#ffffff",
                usePointStyle: true,
                padding: 10,
                boxWidth: 10,
                font: { family: "Montserrat", size: 10 },
              },
            },
            title: {
              display: true,
              text: "Precios Vivienda vs Salarios",
              color: "#ffffff",
              font: { family: "Montserrat", size: 12, weight: "normal" },
              padding: { bottom: 10 },
            },
            tooltip: {
              backgroundColor: "rgba(10, 35, 66, 0.9)",
              titleFont: { family: "Montserrat", size: 11 },
              bodyFont: { family: "Montserrat", size: 11 },
              padding: 8,
              cornerRadius: 4,
              boxPadding: 3,
            },
          },
          interaction: { mode: "index", intersect: false },
          scales: {
            y: {
              grid: { color: "rgba(255, 255, 255, 0.08)" },
              ticks: {
                color: "#A7A9AC",
                font: { size: 9 },
                callback: function (v) {
                  return v + " €";
                },
                maxTicksLimit: 6,
              },
            },
            x: {
              grid: { color: "rgba(255, 255, 255, 0.08)" },
              ticks: { color: "#A7A9AC", font: { size: 9 } },
            },
          },
          animations: { tension: { duration: 1000, easing: "linear" } },
          layout: { padding: { top: 5, bottom: 0, left: 0, right: 5 } },
        },
      });
    }
  }

  // --- Código para Page 8 (Gráfico Proyecciones y Hover Tarjetas) ---
  const projectionsChartCanvas = document.getElementById("projectionsChart");
  if (projectionsChartCanvas) {
    console.log("Initializing projectionsChart (Page 8)");
    const ctx = projectionsChartCanvas.getContext("2d");
    // Pegar aquí el CÓDIGO ESPECÍFICO de Chart.js para projectionsChart de page_8.html (con gradientes)
    const chartHeight =
      ctx.canvas.clientHeight > 0 ? ctx.canvas.clientHeight : 280;
    const optimisticGradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    optimisticGradient.addColorStop(0, "rgba(78, 205, 196, 0.3)");
    optimisticGradient.addColorStop(1, "rgba(78, 205, 196, 0.0)");
    const conservativeGradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    conservativeGradient.addColorStop(0, "rgba(255, 209, 102, 0.3)");
    conservativeGradient.addColorStop(1, "rgba(255, 209, 102, 0.0)");
    const pessimisticGradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    pessimisticGradient.addColorStop(0, "rgba(239, 71, 111, 0.3)");
    pessimisticGradient.addColorStop(1, "rgba(239, 71, 111, 0.0)");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["A25", "J25", "O25", "E26", "A26", "J26", "O26", "D26"],
        datasets: [
          {
            label: "Optimista",
            data: [2580, 2650, 2720, 2800, 2870, 2950, 3020, 3100],
            borderColor: "#4ECDC4",
            backgroundColor: optimisticGradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: "#4ECDC4",
            pointBorderColor: "white",
            pointBorderWidth: 1,
          },
          {
            label: "Conservador",
            data: [2580, 2610, 2650, 2680, 2720, 2760, 2790, 2830],
            borderColor: "#FFD166",
            backgroundColor: conservativeGradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: "#FFD166",
            pointBorderColor: "white",
            pointBorderWidth: 1,
          },
          {
            label: "Pesimista",
            data: [2580, 2590, 2605, 2620, 2635, 2650, 2660, 2670],
            borderColor: "#EF476F",
            backgroundColor: pessimisticGradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: "#EF476F",
            pointBorderColor: "white",
            pointBorderWidth: 1,
          },
        ],
      },
      options: {
        /* ... opciones detalladas de page_8 ... */ maintainAspectRatio: false,
        responsive: true,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            align: "center",
            labels: {
              color: "#ffffff",
              padding: 10,
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 8,
              font: { family: "Montserrat", size: 10 },
            },
          },
          tooltip: {
            backgroundColor: "rgba(10, 35, 66, 0.9)",
            titleFont: { family: "Montserrat", size: 11 },
            bodyFont: { family: "Montserrat", size: 11 },
            padding: 8,
            cornerRadius: 4,
            displayColors: true,
            boxPadding: 3,
            callbacks: {
              label: function (c) {
                return c.dataset.label + ": " + c.parsed.y + " €/m²";
              },
            },
          },
          title: { display: false },
        },
        scales: {
          y: {
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: {
              color: "#A7A9AC",
              font: { size: 9, family: "Montserrat" },
              callback: function (v) {
                return v + "€";
              },
              maxTicksLimit: 5,
            },
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: {
              color: "#A7A9AC",
              font: { size: 9, family: "Montserrat" },
            },
          },
        },
        animations: { tension: { duration: 1000, easing: "linear" } },
        layout: { padding: { top: 5, bottom: 0, left: 0, right: 5 } },
      },
    });

    // Hover Tarjetas Escenario
    const scenarioCards = document.querySelectorAll(".scenario-card");
    if (scenarioCards.length > 0) {
      console.log("Adding hover effects to scenario cards (Page 8)");
      scenarioCards.forEach((card) => {
        card.addEventListener("mouseenter", () =>
          card.classList.add("hover-active")
        );
        card.addEventListener("mouseleave", () =>
          card.classList.remove("hover-active")
        );
      });
    }
  }

  // --- Código para Page 9 (Animación Barras de Progreso) ---
  // Usamos la presencia de '.conclusion-card' como indicador de Page 9
  const conclusionCards = document.querySelectorAll(".conclusion-card");
  if (conclusionCards.length > 0) {
    const progressBars = document.querySelectorAll(".progress-fill");
    if (progressBars.length > 0) {
      console.log("Animating progress bars (Page 9)");
      setTimeout(() => {
        progressBars.forEach((bar) => {
          const width = bar.style.width; // Asume que está definido inline o en CSS
          if (width) {
            bar.style.width = "0%";
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                bar.style.transition = "width 1s ease-out";
                bar.style.width = width;
              });
            });
          }
        });
      }, 500);
    }
  }
}); // Fin de DOMContentLoaded
