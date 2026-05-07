const formEl = document.querySelector("form");
const resultEl = document.querySelector(".result");
const metricContainerEl = document.querySelector(".metric-container");
const imperialContainerEl = document.querySelector(".imperial-container");
const measureTypeEls = document.querySelectorAll("input[name='measure']");
const inputContainers = document.querySelectorAll(".input-container");

formReset();

formEl.addEventListener("input", (e) => {
  e.preventDefault();

  const rawData = new FormData(formEl);
  const data = Object.fromEntries(rawData);

  calculate(data);
});

function calculate(data) {
  // Check for metric input
  if (data.measure === "metric") {
    if (data.height > 0 && data.weight > 0) {
      const bmi = ((data.weight / (data.height * data.height)) * 10000).toFixed(
        2,
      );
      const minWeight = (18.5 * Math.pow(data.height / 100, 2)).toFixed(2);
      const maxWeight = (24.9 * Math.pow(data.height / 100, 2)).toFixed(2);

      resultEl.innerHTML = `
        <div class="md:grid md:grid-cols-2 md:gap-x-6">
                <div class="mb-6 md:mb-0">
                  <p
                    class="text-preset-6 text-base leading-[150%] font-semibold text-white mb-2"
                  >
                    Your BMI is...
                  </p>
                  <span class="text-preset-2 text-white">${bmi}</span>
                </div>
                <p class="text-preset-7-regular text-white md:self-center">
                  Your BMI suggests you're a ${Number(bmi) > 24.9 || Number(bmi) < 18.5 ? "unhealthy" : "healthy"} weight. Your Ideal wieght is
                  between <span class="text-preset-7-bold">${minWeight}kgs - ${maxWeight}kgs</span>.
                </p>
              </div>`;
    } else {
      resultEl.innerHTML = `
              <p class="text-preset-4 text-white mb-6">Welcome!</p>

              <p class="text-preset-7-regular text-white">
                Enter your height and weight and you’ll see your BMI result here
              </p>`;
    }
  }

  // Check for imperial input
  if (data.measure === "imperial") {
    if (data.foot >= 0 && data.inch > 0 && data.stone >= 0 && data.pounds > 0) {
      const totalIn = Math.pow(Number(data.foot) * 12 + Number(data.inch), 2);
      const totalLbs = Number(data.stone) * 14 + Number(data.pounds);
      const bmi = ((totalLbs / totalIn) * 703).toFixed(2);

      const totalMinWeight = (18.5 * totalIn) / 703;
      const minWeightSt = Math.trunc(totalMinWeight / 14);
      const minWeightLbs = Math.trunc(totalMinWeight - minWeightSt * 14);

      const totalMaxWeight = (24.9 * totalIn) / 703;
      const maxWeightSt = Math.trunc(totalMaxWeight / 14);
      const maxWeightLbs = Math.trunc(totalMaxWeight - maxWeightSt * 14);

      resultEl.innerHTML = `
        <div class="md:grid md:grid-cols-2 md:gap-x-6">
                <div class="mb-6 md:mb-0">
                  <p
                    class="text-preset-6 text-base leading-[150%] font-semibold text-white mb-2"
                  >
                    Your BMI is...
                  </p>
                  <span class="text-preset-2 text-white">${bmi}</span>
                </div>
                <p class="text-preset-7-regular text-white md:self-center">
                  Your BMI suggests you're a ${Number(bmi) > 24.9 || Number(bmi) < 18.5 ? "unhealthy" : "healthy"} weight. Your Ideal wieght is
                  between <span class="text-preset-7-bold">${minWeightSt}st ${minWeightLbs}lbs - ${maxWeightSt}st ${maxWeightLbs}lbs</span>.
                </p>
              </div>`;
    } else {
      resultEl.innerHTML = `
              <p class="text-preset-4 text-white mb-6">Welcome!</p>

              <p class="text-preset-7-regular text-white">
                Enter your height and weight and you’ll see your BMI result here
              </p>`;
    }
  }
}

measureTypeEls.forEach((measure) => {
  measure.addEventListener("change", (e) => {
    if (e.target.checked) {
      metricContainerEl.classList.toggle("hidden");
      metricContainerEl.classList.toggle("flex");
      imperialContainerEl.classList.toggle("hidden");
      imperialContainerEl.classList.toggle("flex");
    }
  });
});

inputContainers.forEach((container) => {
  container.addEventListener("click", () => {
    container.querySelector("input").focus();
  });
});

function formReset() {
  formEl.reset();
  measureTypeEls[0].checked;
}
