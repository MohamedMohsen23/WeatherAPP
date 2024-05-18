import sys
import io
import pickle
import numpy as np
from sklearn.model_selection import train_test_split
from keras import layers, models
import tensorflow as tf

# Set default encoding to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

data_dict = pickle.load(open('./data.pickle', 'rb'))

# Pad or truncate sequences to ensure all have the same length
data = np.asarray(data_dict['data'])
labels = np.array(data_dict['labels'])
labels = tf.keras.utils.to_categorical(labels)

# Split data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(data, labels, test_size=0.2, shuffle=True, stratify=labels)

# Build the model
model = models.Sequential([
    layers.Dense(128, activation='relu', input_shape=(42,)),
    layers.Dense(256, activation="relu"),
    layers.Dense(256, activation="relu"),
    layers.Dense(128, activation="relu"),
    layers.Dense(6, activation='softmax')
])

model.compile(optimizer='RMSprop',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, epochs=10)

# Evaluate the model
loss, accuracy = model.evaluate(x_test, y_test)
print(f"Test accuracy: {accuracy*100}")

model.save(r"C:\Users\NoteBook\Downloads\AmericanSignLangauge-master\models.h5")
