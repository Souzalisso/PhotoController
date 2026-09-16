const int BUTTON_PIN = 22;

const int ENCODER_CLK = 24;
const int ENCODER_DT  = 25;

int lastEncoderCLK = HIGH;


void setup() {

    Serial.begin(115200);

    pinMode(
        BUTTON_PIN,
        INPUT_PULLUP
    );

    pinMode(
        ENCODER_CLK,
        INPUT_PULLUP
    );

    pinMode(
        ENCODER_DT,
        INPUT_PULLUP
    );

    lastEncoderCLK =
        digitalRead(ENCODER_CLK);
}


void loop() {

    testButton();
    testEncoder();
}


void testButton() {

    static int lastButtonState = HIGH;

    int currentState =
        digitalRead(BUTTON_PIN);


    if (
        lastButtonState == HIGH &&
        currentState == LOW
    ) {

        Serial.println(
            "KRN|BTN|15|PRESS"
        );

        delay(30);
    }


    lastButtonState =
        currentState;
}


void testEncoder() {

    int currentCLK =
        digitalRead(ENCODER_CLK);


    if (
        currentCLK != lastEncoderCLK &&
        currentCLK == LOW
    ) {

        int currentDT =
            digitalRead(ENCODER_DT);


        if (currentDT != currentCLK) {

            Serial.println(
                "KRN|ENC|1|1"
            );

        } else {

            Serial.println(
                "KRN|ENC|1|-1"
            );
        }
    }


    lastEncoderCLK =
        currentCLK;
}