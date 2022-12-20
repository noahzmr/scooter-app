const Minio = require('minio')
require('dotenv').config()

console.log('Initializing Minio...')

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_CLIENT_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_CLIENT_ACCESSKEY,
  secretKey: process.env.MINIO_CLIENT_SECRETKEY
})

minioClient.listBuckets((err, buckets) => {
  if (err) return console.log(err, minioClient)
  if (buckets.length !== 0) {
    console.log('Bucket already exist!')
  } else {
    // Make a bucket called europetrip.
    minioClient.makeBucket('scooter', 'us-east-1', function (err) {
      if (err) return console.log(err)

      console.log('Bucket created successfully in "us-east-1".')
    })
  }
  console.log('buckets :', buckets)
})

module.exports = minioClient
