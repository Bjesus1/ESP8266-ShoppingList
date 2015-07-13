#include <ESP8266WiFi.h>

const char* ssid     = "ShiftForward";
const char* password = "quaky5.abuts";
const char* host = "192.168.154.123";

const int buttonPin = 2;
int buttonState = 0;
int lastButtonState = 0;
int buttonPushCounter = 0;


void setup() {

  pinMode(buttonPin,INPUT);

  Serial.begin(115200);
  delay(10);

  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  
     
  }
   

void loop() {

  Serial.print("connecting to ");
  Serial.println(ssid);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 3020;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
    String postData;
    postData += "";
    postData += "cookies";
    
  
    buttonState = digitalRead(buttonPin);
    if ( buttonState != lastButtonState) {
      
      if( buttonState == HIGH ) {
  
        buttonPushCounter=1;
     
          
          Serial.println("connected");
          client.println("POST /products HTTP/1.1");
          client.println("Host: 192.168.154.123");
          client.println("Content-Type: application/x-www-form-urlencoded");
          client.println("Connection: close"); 
          client.print("Content-Length: ");
          client.println(postData.length());
          client.println();
          client.println(postData);
          client.println();

          Serial.println("POST / HTTP/1.1");
          Serial.println("Host: 192.168.154.123");
          Serial.println("Content-Type: application/x-www-form-urlencoded");
          Serial.println("Connection: close"); 
          Serial.print("Content-Length: ");
          Serial.println(postData.length());
          Serial.println();
          Serial.println(postData);
          Serial.println();
          
          
          Serial.println();
          Serial.println("closing connection");
        
        
      }else{
        
      }
        Serial.println();
        Serial.println("closing connection");
        
    }
      
    lastButtonState = buttonState;
  
  delay(5000);
}
