# analyze.py
import sys
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Create an instance of the VADER sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

# Get the input text from command line arguments
text = sys.argv[1]

# Analyze the sentiment of the text
scores = analyzer.polarity_scores(text)

# Print the scores as a JSON object
print(json.dumps(scores))
