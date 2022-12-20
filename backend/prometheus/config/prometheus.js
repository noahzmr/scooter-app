const client = require('prom-client')
const collectDefaultMetrics = client.collectDefaultMetrics

// Create a Registry which registers the metrics
const register = new client.Registry()

// Enable the collection of default metrics
collectDefaultMetrics({
  register,
  labels: { NODE_APP_INSTANCE: 'backend' }
})

// Create a histogram metric
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

// Create a gauge metric
const totalHttpRequestDuration = new client.Gauge({
  name: 'http_total_duration',
  help: 'the last duration or response time of last request',
  labelNames: ['method', 'route', 'code']
})

// Register the histogram
register.registerMetric(httpRequestDurationMicroseconds)
register.registerMetric(totalHttpRequestDuration)

module.exports = register
