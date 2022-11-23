#include <Wire.h>
#include <ArduinoJson.h>

// DHT Sensor Var
#include <dht.h>

#define DHTTYPE DHT11
#define DHT11_PIN 7

dht DHT;

// JSON Format initializing
StaticJsonDocument<200> doc;
StaticJsonDocument<200> dac;

// Gyrosko initializing
const int MPU_ADDR = 0x68; // I2C address of the MPU-6050. If AD0 pin is set to HIGH, the I2C address will be 0x69.

int16_t accelerometer_x, accelerometer_y, accelerometer_z; // variables for accelerometer raw data
int16_t gyro_x, gyro_y, gyro_z;                            // variables for gyro raw data
int16_t temperature;                                       // variables for temperature data

char tmp_str[7]; // temporary variable used in convert function

char *convert_int16_to_str(int16_t i)
{ // converts int16 to string. Moreover, resulting strings will have the same length in the debug monitor.
    sprintf(tmp_str, "%6d", i);
    return tmp_str;
}

// Start Setup
void setup()
{
    Serial.begin(9600); // Baudrate
    Wire.begin();
    Wire.beginTransmission(MPU_ADDR); // Begins a transmission to the I2C slave (GY-521 board)
    Wire.write(0x6B);                 // PWR_MGMT_1 register
    Wire.write(0);                    // set to zero (wakes up the MPU-6050)
    Wire.endTransmission(true);
}

void loop()
{

    // Gyroskop Data
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B);                        // starting with register 0x3B (ACCEL_XOUT_H) [MPU-6000 and MPU-6050 Register Map and Descriptions Revision 4.2, p.40]
    Wire.endTransmission(false);             // the parameter indicates that the Arduino will send a restart. As a result, the connection is kept active.
    Wire.requestFrom(MPU_ADDR, 7 * 2, true); // request a total of 7*2=14 registers

    // "Wire.read()<<8 | Wire.read();" means two registers are read and stored in the same variable
    accelerometer_x = Wire.read() << 8 | Wire.read(); // reading registers: 0x3B (ACCEL_XOUT_H) and 0x3C (ACCEL_XOUT_L)
    accelerometer_y = Wire.read() << 8 | Wire.read(); // reading registers: 0x3D (ACCEL_YOUT_H) and 0x3E (ACCEL_YOUT_L)
    accelerometer_z = Wire.read() << 8 | Wire.read(); // reading registers: 0x3F (ACCEL_ZOUT_H) and 0x40 (ACCEL_ZOUT_L)    // reading registers: 0x41 (TEMP_OUT_H) and 0x42 (TEMP_OUT_L)
    gyro_x = Wire.read() << 8 | Wire.read();          // reading registers: 0x43 (GYRO_XOUT_H) and 0x44 (GYRO_XOUT_L)
    gyro_y = Wire.read() << 8 | Wire.read();          // reading registers: 0x45 (GYRO_YOUT_H) and 0x46 (GYRO_YOUT_L)
    gyro_z = Wire.read() << 8 | Wire.read();          // reading registers: 0x47 (GYRO_ZOUT_H) and 0x48 (GYRO_ZOUT_L)

    float aX = accelerometer_x;
    float aY = accelerometer_y;
    float aZ = accelerometer_z;
    float gX = gyro_x;
    float gY = gyro_y;
    float gZ = gyro_z;

    doc["Sensor"] = "GY-521";
    doc["aX"] = aX;
    doc["aY"] = aY;
    doc["aZ"] = aZ;
    doc["gX"] = gX;
    doc["gY"] = gY;
    doc["gZ"] = gZ;

    // Temp & Humidity Data

    int chk = DHT.read11(DHT11_PIN);

    float h = DHT.humidity;    // Read Humidity
    float t = DHT.temperature; // Read temperature as Celsius
    dac["Sensor"] = "Temperature & humidity";
    dac["temp"] = t;     // JSON format Temp
    dac["humidity"] = h; // JSON format Humidity


    // Print in JSON format
    serializeJson(doc, Serial);
    serializeJson(dac, Serial);
    Serial.println();

    // delay
    delay(1000);
}