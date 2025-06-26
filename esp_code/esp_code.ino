#include <ESP8266WiFi.h>
#include <Servo.h>

// Wi-Fi credentials
const char* ssid = "Sai";
const char* password = "sai21shashank";

// Servo & IR sensor config
Servo gateServo;
const int servoPin = D4;      // Change to your wiring
const int irSensorPin = D5;   // IR sensor pin

WiFiServer server(80);

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ Connected to WiFi");
  Serial.print("📡 IP Address: ");
  Serial.println(WiFi.localIP());

  server.begin();

  // Setup pins
  gateServo.attach(servoPin);
  pinMode(irSensorPin, INPUT);

  // Initialize gate closed
  gateServo.write(0);
}

void loop() {
  WiFiClient client = server.available();
  if (!client) return;

  Serial.println("🛜 Client connected");

  String request = client.readStringUntil('\r');
  Serial.println("➡️ Request: " + request);
  client.flush();

  if (request.indexOf("/open") != -1) {
    openGate(client);
  } else {
    client.println("HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\n\r\nInvalid endpoint");
  }

  delay(10);
}

void openGate(WiFiClient client) {
  client.println("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n");
  client.println("<h2>🚗 Gate opening...</h2>");
  Serial.println("🔓 Opening gate...");

  // Open the gate
  gateServo.write(180); // Adjust angle as needed
  delay(2000);

  // Wait for car to enter using IR sensor
  Serial.println("🔍 Waiting for IR sensor trigger...");
  unsigned long timeout = millis() + 8000; // 8 second timeout
  while (digitalRead(irSensorPin) == HIGH && millis() < timeout) {
    delay(100);
  }

  if (digitalRead(irSensorPin) == LOW) {
    Serial.println("✅ Car detected by IR sensor!");
    client.println("<p>✅ Car entered!</p>");
  } else {
    Serial.println("⚠️ No car detected. Closing anyway.");
    client.println("<p>⚠️ No car detected.</p>");
  }

  // Close the gate
  gateServo.write(0);
  Serial.println("🔒 Gate closed");
  client.println("<p>🔒 Gate closed</p>");
}
