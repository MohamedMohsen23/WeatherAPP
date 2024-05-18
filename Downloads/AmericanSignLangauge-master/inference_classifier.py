import sys
import io
import cv2
import mediapipe as mp
import numpy as np
from keras import models

# Set default encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

model = models.load_model(r"C:\Users\NoteBook\Downloads\AmericanSignLangauge-master\models.h5")
cap = cv2.VideoCapture(0)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(static_image_mode=True, min_detection_confidence=0.3)

labels_dict = {0: 'Really,I love You', 1: 'I am watching you', 2: 'I wish you a happy life', 3: 'This is terrible', 4: 'Search', 5: 'Phone'}

while True:
    data_aux = []
    x_ = []
    y_ = []

    ret, frame = cap.read()
    H, W, _ = frame.shape

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_drawing_styles.get_default_hand_landmarks_style(),
                mp_drawing_styles.get_default_hand_connections_style())

        for hand_landmarks in results.multi_hand_landmarks:
            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y

                x_.append(x)
                y_.append(y)

            for i in range(len(hand_landmarks.landmark)):
                x = hand_landmarks.landmark[i].x
                y = hand_landmarks.landmark[i].y
                data_aux.append(x - min(x_))
                data_aux.append(y - min(y_))

        x1 = int(min(x_) * W) - 10
        y1 = int(min(y_) * H) - 10
        x2 = int(max(x_) * W) - 10
        y2 = int(max(y_) * H) - 10
        # print(np.array(data_aux))
        data_aux = np.array(data_aux).reshape(1, 42)
        data_split = [data_aux[i:i + 42] for i in range(0, len(data_aux), 42)]
        prediction = model.predict(data_aux)
        predicted_label = np.argmax(prediction)
        predicted_character = labels_dict[int(predicted_label)]
        accuracy = prediction[0][predicted_label] * 100

        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 0), 4)
        text = f"{predicted_character}"
        print(f"Accuracy: {accuracy:.2f}%")
        cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 255, 0), 3, cv2.LINE_AA)

    cv2.imshow('frame', frame)
    cv2.waitKey(1)

cap.release()
cv2.destroyAllWindows()
