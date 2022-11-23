#include <dht.h>
#include <ArduinoJson.h>

#define DHTTYPE DHT11
#define DHT11_PIN 7

dht DHT;

StaticJsonDocument<48> dac;

void setup()
{
  Serial.begin(9600); // Baudrate
}

void loop()
{
  int chk = DHT.read11(DHT11_PIN);

  float h = DHT.humidity;    // Read Humidity
  float t = DHT.temperature; // Read temperature as Celsius
  dac[Sensor] = "Temperature & humidity";
  dac[temp] = t;     // JSON format Temp
  dac[humidity] = h; // JSON format Humidity

  // Print in JSON format
  serializeJson(dac, Serial);
  Serial.println();

  // delay
  delay(1000);
}