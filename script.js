const dataElements = document.querySelectorAll('[data-title]'),
  navEl = document.querySelector('.nav'),
  menyEls = document.querySelectorAll('.card-header img')
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

  const timeFrameFormat = getTimeFrameMessage(timeFrame)

  dataElements.forEach((el) => {
    const currentDataEl = el.querySelector('.card-data-current'),
      previousDataEl = el.querySelector('.card-data-previous'),
      activityTitle = el.dataset.title,
      activity = data.find(
        (acitivityData) => acitivityData.title === activityTitle
      )

    currentDataEl.innerHTML = activity.timeframes[timeFrame].current + 'hrs'

    previousDataEl.innerHTML = `${timeFrameFormat} - ${activity.previous}hrs`
  })
}

async function getData() {
  const res = await fetch('data.json')
  const data = await res.json()

  return data
}

function getTimeFrameMessage(timeFrame) {
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

menyEls.forEach((el) => {
  el.addEventListener('mouseenter', (e) => {
    e.target.parentElement.parentElement.classList.add('meny-hover')
  })

  el.addEventListener('mouseleave', (e) => {
    e.target.parentElement.parentElement.classList.remove('meny-hover')
  })
})
