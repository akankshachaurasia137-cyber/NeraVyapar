import pandas as pd
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

import joblib


# --------------------------------------------------
# 1. LOAD DATA
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

DATA_PATH = BASE_DIR / "ml" / "data" / "empty_return_data.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)


# --------------------------------------------------
# 2. SEPARATE FEATURES AND TARGET
# --------------------------------------------------

X = df.drop("empty_return", axis=1)

y = df["empty_return"]


print("\nFeatures:")
print(X.columns.tolist())

print("\nTarget:")
print(y.name)


# --------------------------------------------------
# 3. DEFINE NUMERICAL FEATURES
# --------------------------------------------------

numeric_features = [
    "truck_capacity",
    "distance_km",
    "available_loads",
    "historical_route_success"
]


# --------------------------------------------------
# 4. DEFINE CATEGORICAL FEATURES
# --------------------------------------------------

categorical_features = [
    "vehicle_type",
    "destination",
    "cargo_type",
    "day_of_week",
    "season",
    "demand_level"
]


# --------------------------------------------------
# 5. PREPROCESSING
# --------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        ),

        (
            "numerical",
            "passthrough",
            numeric_features
        )
    ]
)


# --------------------------------------------------
# 6. CREATE RANDOM FOREST MODEL
# --------------------------------------------------

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)


# --------------------------------------------------
# 7. CREATE COMPLETE PIPELINE
# --------------------------------------------------

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# --------------------------------------------------
# 8. TRAIN / TEST SPLIT
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# --------------------------------------------------
# 9. TRAIN MODEL
# --------------------------------------------------

print("\nTraining Random Forest...")

pipeline.fit(X_train, y_train)

print("Training completed!")


# --------------------------------------------------
# 10. MAKE PREDICTIONS
# --------------------------------------------------

y_pred = pipeline.predict(X_test)


# --------------------------------------------------
# 11. EVALUATE MODEL
# --------------------------------------------------

accuracy = accuracy_score(y_test, y_pred)

print("\n==============================")
print("MODEL RESULTS")
print("==============================")

print("\nAccuracy:")
print(round(accuracy, 4))


print("\nClassification Report:")
print(classification_report(y_test, y_pred))


print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# --------------------------------------------------
# 12. SAVE MODEL
# --------------------------------------------------

MODEL_DIR = BASE_DIR / "ml" / "models"

MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "empty_return_model.pkl"

joblib.dump(pipeline, MODEL_PATH)

print("\n==============================")
print("MODEL SAVED")
print("==============================")

print(MODEL_PATH)