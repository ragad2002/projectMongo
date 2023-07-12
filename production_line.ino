#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "WiFiSSID";
const char* password = "WiFiPassword";
const char* serverUrl = "http://server_url/api/phase-durations";

const int relayPin = 2;
const int lampPin = 9;

void setup() {
  pinMode(relayPin, OUTPUT);
  pinMode(lampPin, OUTPUT);

  Serial.begin(9600);

  connectToWiFi();
}

void loop() {
  int duration = fetchDurationFromServer();

  if (duration > 2) {
    activateHeating();
    delay(duration * 1000);
    deactivateHeating();
    delay(2000);
  }
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi");
}

int fetchDurationFromServer() {
  WiFiClient client;
  HTTPClient http;

  Serial.print("Fetching duration from server...");

  if (http.begin(client, serverUrl)) {
    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();

      int index = response.indexOf("\"duration\":");
      if (index >= 0) {
        String durationString = response.substring(index + 12);
        int duration = durationString.substring(0, durationString.indexOf('}')).toInt();
        Serial.print("Duration: ");
        Serial.println(duration);
        return duration;
      }
    } else {
      Serial.print("HTTP GET request failed with error code: ");
      Serial.println(httpCode);
    }

    http.end();
  } else {
    Serial.println("Unable to connect to the server.");
  }

  return 0;
}

void activateHeating() {
  digitalWrite(relayPin, HIGH);
  analogWrite(lampPin, 255); // Set maximum brightness
}

void deactivateHeating() {
  digitalWrite(relayPin, LOW);
  analogWrite(lampPin, 0); // Turn off the lamp
}