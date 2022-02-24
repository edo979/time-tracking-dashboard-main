const dataElements = document.querySelectorAll('[data-title]'),
  navEl = document.querySelector('.nav'),
  data = []

showData('weekly')

navEl.addEventListener('click', (e) => {
  navEl.querySelectorAll('p').forEach((el) => el.classList.remove('active'))

  if (e.target.classList.contains('daily')) {
    e.target.classList.add('active')
    showData('daily')
  }
  if (e.target.classList.contains('weekly')) {
    e.target.classList.add('active')
    showData('weekly')
  }
  if (e.target.classList.contains('monthly')) {
    e.target.classList.add('active')
    showData('monthly')
  }
})

async function showData(timeFrame) {
  if (data.length === 0) {
    data.push(...(await getData()))
  }

  const timeFrameFormat = getTimeFrameFormat(timeFrame)

  dataElements.forEach((el) => {
    const currentDataEl = el.querySelector('.card-data-current'),
      previousDataEl = el.querySelector('.card-data-previous'),
      dataTitle = el.dataset.title

    currentDataEl.innerHTML =
      data.find((d) => d.title === dataTitle).timeframes[timeFrame].current +
      'hrs'

    previousDataEl.innerHTML = `${timeFrameFormat} - ${
      data.find((d) => d.title === dataTitle).timeframes[timeFrame].previous
    }hrs`
  })
}

async function getData() {
  const res = await fetch('data.json')
  const data = await res.json()

  return data
}

function getTimeFrameFormat(timeFrame) {
  switch (timeFrame) {
    case 'daily':
      return 'Yesterday'
    case 'weekly':
      return 'Last Week'
    case 'monthly':
      return 'Last Month'

    default:
      return 'Yesterday'
  }
}
