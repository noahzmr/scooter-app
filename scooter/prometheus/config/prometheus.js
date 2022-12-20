const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics
require('dotenv').config()

const id = process.env.ID

// Create a Registry which registers the metrics
const register = new client.Registry()

// Enable the collection of default metrics
collectDefaultMetrics({
  register,
  labels: { NODE_APP_INSTANCE: `scooter_${id}` }
})

// Custom Metric

const max = 100
let battery = Math.floor(Math.random() * (max / 2) + (max / 2))

const batteryLevelGauge = new client.Gauge({
  name: 'battery_level',
  help: 'Shows the Battery Status!',

  labelNames: ['NODE_APP_INSTANCE', 'SCOOTER_ID'],
  collect: () => {
    const rnd = Math.random()
    let step
    if (rnd > 0.98) {
      step = max
    } else {
      step = Math.floor((rnd * (max / 25))) - (max / 52)
    }

    battery += step
    if (battery < 0) {
      battery = Math.abs(step)
    }
    if (battery > max) {
      battery = max - Math.abs(step)
    }
    battery = Math.round(battery * 100) / 100.00
    console.log('Battery Level: ', battery)
    batteryLevelGauge.set({ NODE_APP_INSTANCE: `scooter_${id}`, SCOOTER_ID: `${id}` }, battery)
  }
})

batteryLevelGauge.set(battery)

register.registerMetric(batteryLevelGauge)

module.exports = register
