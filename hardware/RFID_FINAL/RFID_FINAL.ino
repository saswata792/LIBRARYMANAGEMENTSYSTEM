#if defined(ESP32)
#include <WiFi.h>
#include <FirebaseESP32.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <ThingSpeak.h>
#endif
//Provide the token generation process info.
#include <addons/TokenHelper.h>

//Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

#include <SPI.h>
#include <MFRC522.h>

/* 1. Define the WiFi credentials */
#define WIFI_SSID "TP-Link_CB2C"
#define WIFI_PASSWORD "sps9804814979"
long myChannelNumber = 1675826;
const char myWriteAPIKey[] = "QC1SWFFMBLIXTQ2O";

//For the following credentials, see examples/Authentications/SignInAsUser/EmailPassword/EmailPassword.ino

/* 2. Define the API Key */
#define API_KEY "gi0WAVA4zqVhEJehJIeyzBgAWVPGjPTGqTZ2sK1X"

/* 3. Define the RTDB URL */
#define DATABASE_URL "smart-library-8f386-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app


//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

unsigned long count = 0;
WiFiClient client;



constexpr uint8_t RST_PIN = D3;     // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = D4;     // Configurable, see typical pin layout above
MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;
String tag;


void setup()
{
  pinMode(D0, OUTPUT);
  digitalWrite(D0,HIGH);

  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  digitalWrite(D0, LOW);
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  config.database_url = DATABASE_URL;



  //////////////////////////////////////////////////////////////////////////////////////////////
  //Please make sure the device free Heap is not lower than 80 k for ESP32 and 10 k for ESP8266,
  //otherwise the SSL connection will fail.
  //////////////////////////////////////////////////////////////////////////////////////////////

  Firebase.begin(DATABASE_URL, API_KEY);

  //Comment or pass false value when WiFi reconnection will control by your code or third party library
 // Firebase.reconnectWiFi(true);

  Firebase.setDoubleDigits(5);
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  pinMode(D1, OUTPUT);
  digitalWrite(D1, HIGH);
  ThingSpeak.begin(client);
}
//boolean UpdateRideDataFn(uint8_t rt=BUS_ROUTE,uint16_t stpid=DAY_STOP)
//{
//  HTTPClient http;
//  String http_url="http://rt.theride.org/bustime/api/v3/getpredictions?key="+RIDE_API+"&format=json&rt="+rt+"&stpid="+stpid+"&top=3";
//  http.begin(http_url);
//  int httpCode=http.GET();
//  if(httpCode>0)
//  {
//    if(httpCode==HTTP_CODE_OK)
//    {
//      String payload=http.getString();
//      http.end();
//    }  
//  } 
//}
void loop()
{
  
  
  //rfid code
  if ( ! rfid.PICC_IsNewCardPresent())
    return;
  if (rfid.PICC_ReadCardSerial()) {
    for (byte i = 0; i < 4; i++) {
      tag += rfid.uid.uidByte[i];
    }
    
    if (tag !="") {
      ThingSpeak.writeField(myChannelNumber, 1, tag, myWriteAPIKey);
      digitalWrite(D1, LOW);
      delay(100);
      digitalWrite(D1, HIGH);
      delay(100);
      digitalWrite(D1, LOW);
      delay(100);
      digitalWrite(D1, HIGH);
      delay(100);
      digitalWrite(D1, LOW);
      delay(100);
      digitalWrite(D1, HIGH);
      delay(100);
    }
      
      
      
    
//    else 
//    {
//      Serial.println("Access Denied!");
//      digitalWrite(D1, LOW);
//      delay(2000);
//      digitalWrite(D1, HIGH);
//    }
    tag = "";
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }
}
